import type { Metadata } from "next";
import s from "../privacy/privacy.module.css";

export const metadata: Metadata = {
  title: "Next steps | Chuck Baryames",
  description: "What to expect after paying for your agreed website or marketing project.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className={s.page}>
      <div className={s.content}>
        <a className={s.back} href="/">← Chuck Baryames</a>
        <h1>Thanks. Here’s what happens next.</h1>
        <p>If you just completed checkout, Stripe shows your payment confirmation. I’ll review the order and reply personally within 2 business days.</p>
        <h2>First, confirm the project details</h2>
        <p>I’ll check the payment against our written scope and confirm the start date, next steps, and any photos, footage, copy, or account access I need from you. Please don’t send passwords by email.</p>
        <h2>Then, I’ll get to work</h2>
        <p>Website preview timing begins once the deposit and required materials are in: 3 business days for a Landing Page, 7 for a Business Website, and 10 for Website + Google Ads Launch. The remaining 50% is due after your approval, before launch.</p>
        <p>For monthly services or a one-time video, we’ll follow the schedule in your agreed scope. Monthly services are month-to-month with 30 days’ notice to cancel.</p>
        <h2>Need help with your order?</h2>
        <p>Email <a href="mailto:chuck@chuckbaryames.com">chuck@chuckbaryames.com</a> with your business name and the email used at checkout. Please leave card details out of your message.</p>
        <p>This page explains next steps. Your payment status is confirmed by Stripe.</p>
        <a className={s.back} href="/">Return to the website →</a>
        <p><a href="/privacy">Privacy policy</a></p>
      </div>
    </main>
  );
}
