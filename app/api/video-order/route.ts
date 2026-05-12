import { NextResponse } from "next/server";
import { getVideoRetainerPriceId, getVideoSinglePriceId } from "@/lib/server/env";
import { getStripe } from "@/lib/server/stripe";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

type ProductType = "single" | "retainer";
type StylePreference = "brand_intro" | "service_explainer" | "testimonial_cinematic";

type VideoOrderPayload = {
  full_name: string;
  email: string;
  business_name: string;
  brand_offer: string;
  target_audience: string;
  style_preference: StylePreference;
  product_type: ProductType;
};

type InsertedVideoOrder = {
  id: string;
};

type ValidationResult =
  | {
      ok: true;
      data: VideoOrderPayload;
    }
  | {
      ok: false;
      errors: Record<string, string>;
    };

const maxRequestBytes = 16_000;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 6;
const videoOrderAttempts = new Map<string, { count: number; resetAt: number }>();

const stylePreferences = ["brand_intro", "service_explainer", "testimonial_cinematic"] as const;
const productTypes = ["single", "retainer"] as const;

function jsonError(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ error: message, errors }, { status });
}

function getSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");

  if (origin !== requestOrigin) {
    return null;
  }

  return requestOrigin;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(request: Request) {
  const clientIp = getClientIp(request);
  const now = Date.now();
  const current = videoOrderAttempts.get(clientIp);

  if (!current || current.resetAt <= now) {
    videoOrderAttempts.set(clientIp, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return false;
  }

  current.count += 1;

  return current.count > rateLimitMaxRequests;
}

function isRequestTooLarge(request: Request) {
  const contentLength = request.headers.get("content-length");

  if (!contentLength) {
    return false;
  }

  const byteLength = Number.parseInt(contentLength, 10);

  return Number.isFinite(byteLength) && byteLength > maxRequestBytes;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getTrimmedString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isStylePreference(value: string): value is StylePreference {
  return stylePreferences.some((stylePreference) => stylePreference === value);
}

function isProductType(value: string): value is ProductType {
  return productTypes.some((productType) => productType === value);
}

function validateVideoOrderPayload(payload: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!isRecord(payload)) {
    return {
      ok: false,
      errors: {
        form: "Submit the video brief again.",
      },
    };
  }

  const fullName = getTrimmedString(payload, "full_name");
  const email = getTrimmedString(payload, "email").toLowerCase();
  const businessName = getTrimmedString(payload, "business_name");
  const brandOffer = getTrimmedString(payload, "brand_offer");
  const targetAudience = getTrimmedString(payload, "target_audience");
  const stylePreference = getTrimmedString(payload, "style_preference");
  const productType = getTrimmedString(payload, "product_type");

  if (!fullName) {
    errors.full_name = "Add your full name.";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Add a valid email address.";
  }

  if (!businessName) {
    errors.business_name = "Add your business name.";
  }

  if (brandOffer.length < 20) {
    errors.brand_offer = "Write at least 20 characters about what you sell.";
  }

  if (targetAudience.length < 20) {
    errors.target_audience = "Write at least 20 characters about who you want to reach.";
  }

  if (!isStylePreference(stylePreference)) {
    errors.style_preference = "Choose a video style.";
  }

  if (!isProductType(productType)) {
    errors.product_type = "Choose a valid video plan.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  if (!isStylePreference(stylePreference) || !isProductType(productType)) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    data: {
      full_name: fullName,
      email,
      business_name: businessName,
      brand_offer: brandOffer,
      target_audience: targetAudience,
      style_preference: stylePreference,
      product_type: productType,
    },
  };
}

function getPriceId(productType: ProductType) {
  return productType === "retainer" ? getVideoRetainerPriceId() : getVideoSinglePriceId();
}

export async function POST(request: Request) {
  const origin = getSameOrigin(request);

  if (!origin) {
    return jsonError("Request origin is not allowed.", 403);
  }

  if (isRateLimited(request)) {
    return jsonError("Too many checkout attempts. Wait a few minutes, then try again.", 429);
  }

  if (isRequestTooLarge(request)) {
    return jsonError("The video brief is too long. Shorten it, then try again.", 413);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError("Submit the form again.", 400);
  }

  const validation = validateVideoOrderPayload(payload);

  if (!validation.ok) {
    return jsonError("Add the required details, then try again.", 400, validation.errors);
  }

  try {
    const supabase = getSupabaseAdmin();
    const stripe = getStripe();
    const order = validation.data;

    const { data, error: insertError } = await supabase
      .from("video_orders")
      .insert({
        full_name: order.full_name,
        email: order.email,
        business_name: order.business_name,
        brand_offer: order.brand_offer,
        target_audience: order.target_audience,
        style_preference: order.style_preference,
        product_type: order.product_type,
        stripe_payment_status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !data) {
      return jsonError("The video brief could not be saved.", 500);
    }

    const row = data as InsertedVideoOrder;
    const metadata = {
      video_order_id: row.id,
      product_type: order.product_type,
    };
    const session =
      order.product_type === "retainer"
        ? await stripe.checkout.sessions.create(
            {
              mode: "subscription",
              line_items: [
                {
                  price: getPriceId(order.product_type),
                  quantity: 1,
                },
              ],
              success_url: `${origin}/video-thank-you?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${origin}/order-video?plan=${order.product_type}&canceled=1`,
              customer_email: order.email,
              metadata,
              subscription_data: {
                metadata,
              },
            },
            {
              idempotencyKey: `video-order-${row.id}`,
            },
          )
        : await stripe.checkout.sessions.create(
            {
              mode: "payment",
              line_items: [
                {
                  price: getPriceId(order.product_type),
                  quantity: 1,
                },
              ],
              success_url: `${origin}/video-thank-you?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${origin}/order-video?plan=${order.product_type}&canceled=1`,
              customer_email: order.email,
              metadata,
              payment_intent_data: {
                metadata,
              },
            },
            {
              idempotencyKey: `video-order-${row.id}`,
            },
          );

    if (!session.url) {
      return jsonError("Checkout could not be opened.", 500);
    }

    const { error: updateError } = await supabase
      .from("video_orders")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", row.id);

    if (updateError) {
      return jsonError("Checkout could not be linked to the video brief.", 500);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown video checkout error";
    console.error("Video checkout failed", errorMessage);
    return jsonError("Checkout is not configured yet.", 500);
  }
}
