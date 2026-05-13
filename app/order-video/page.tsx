import { VideoOrderForm } from "@/components/VideoOrderForm";

type VideoPlan = "single" | "pack" | "retainer";

type OrderVideoPageProps = {
  searchParams: Promise<{
    plan?: string;
    canceled?: string;
  }>;
};

function getPlan(plan: string | undefined): VideoPlan {
  if (plan === "pack" || plan === "retainer") {
    return plan;
  }

  return "single";
}

export default async function OrderVideoPage({ searchParams }: OrderVideoPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);
  const wasCanceled = params.canceled === "1" || params.canceled === "true";

  return (
    <main className="flow-page">
      <div className="flow-shell video-order-shell">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="flow-hero video-order-hero" aria-labelledby="order-video-title">
          <div className="sec-label">Order your video</div>
          <h1 id="order-video-title">Start your video order.</h1>
          <p>
            Choose your plan, send the short brief, and checkout opens with the price already matched to your order.
          </p>
          <p className="flow-hero-note">
            You get a script preview within 24 hours, then the rendered video preview arrives within 48 hours after script approval.
          </p>
        </section>
        {wasCanceled ? (
          <div className="flow-alert" role="status">
            Checkout was canceled. Your brief is still here, so you can review it and try again.
          </div>
        ) : null}
        <VideoOrderForm plan={plan} />
      </div>
    </main>
  );
}
