import Stripe from "stripe";
import { getRequiredEnv } from "./env";

let stripeClient: Stripe | null = null;

type StripeConfig = NonNullable<ConstructorParameters<typeof Stripe>[1]>;

const stripeApiVersion = "2026-02-25.clover" as StripeConfig["apiVersion"];

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"), {
      apiVersion: stripeApiVersion,
      typescript: true,
    });
  }

  return stripeClient;
}
