import { Resend } from "resend";
import { getRequiredEnv } from "./env";

let resendClient: Resend | null = null;

export function getResend() {
  if (!resendClient) {
    resendClient = new Resend(getRequiredEnv("RESEND_API_KEY"));
  }

  return resendClient;
}
