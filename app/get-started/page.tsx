import { IntakeForm } from "@/components/IntakeForm";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Existing landing page agreement | Chuck Baryames", robots: { index: false, follow: false } };

type GetStartedPageProps = {
  searchParams: Promise<{
    canceled?: string;
  }>;
};

export default async function GetStartedPage({ searchParams }: GetStartedPageProps) {
  const params = await searchParams;
  const wasCanceled = params.canceled === "true";

  return (
    <main id="main-content" className="flow-page">
      <div className="flow-shell">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="flow-hero" aria-labelledby="get-started-title">
          <div className="sec-label">Existing agreements only</div>
          <h1 id="get-started-title">Your agreed landing page brief.</h1>
          <p>This form is for a previously agreed $497 landing page with a $50 deposit. Use it only if those are the terms in your written scope. <a href="/?offer=landing-page#pricing">See current services and prices</a> for a new project.</p>
          <p>
            Your existing agreement stays in place: complete the brief and $50 deposit to start its 48-hour preview.
          </p>
          <div className="flow-proof" aria-label="Service details">
            <span>The $50 deposit holds your build slot.</span>
            <span>I handle the copy, design, and build.</span>
            <span>Three revision rounds are included.</span>
          </div>
        </section>
        {wasCanceled ? (
          <div className="flow-alert" role="status">
            Payment was canceled. Your form is still here, so you can review it and try again.
          </div>
        ) : null}
        <IntakeForm />
      </div>
    </main>
  );
}
