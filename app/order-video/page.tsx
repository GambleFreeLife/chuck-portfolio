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
      <div className="flow-shell">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="flow-hero" aria-labelledby="order-video-title">
          <div className="sec-label">Order your video</div>
          <h1 id="order-video-title">Tell me what to make.</h1>
          <p>
            Send the short brief, choose a video style, and checkout opens with the plan you picked.
          </p>
          <div className="flow-proof" aria-label="Video order details">
            <span>Script preview comes within 24 hours.</span>
            <span>Your rendered preview comes within 48 hours after script approval.</span>
            <span>Final delivery includes MP4 plus captioned versions for social platforms.</span>
          </div>
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
