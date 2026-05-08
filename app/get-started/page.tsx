import { IntakeForm } from "@/components/IntakeForm";

type GetStartedPageProps = {
  searchParams: Promise<{
    canceled?: string;
  }>;
};

export default async function GetStartedPage({ searchParams }: GetStartedPageProps) {
  const params = await searchParams;
  const wasCanceled = params.canceled === "true";

  return (
    <main className="flow-page">
      <div className="flow-shell">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="flow-hero" aria-labelledby="get-started-title">
          <div className="sec-label">Start your landing page</div>
          <h1 id="get-started-title">Tell me what to build.</h1>
          <p>
            Fill out the build brief, pay the $50 deposit, and I will start the 48-hour preview.
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
