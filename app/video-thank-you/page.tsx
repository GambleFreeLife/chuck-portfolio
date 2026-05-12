export default function VideoThankYouPage() {
  const fromEmail = process.env.FROM_EMAIL ?? "cbaryames24@gmail.com";

  return (
    <main className="flow-page">
      <div className="flow-shell flow-shell-narrow">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="thank-you-card" aria-labelledby="video-thank-you-title">
          <div className="sec-label">Video order received</div>
          <h1 id="video-thank-you-title">Thanks. I got your video brief and payment.</h1>
          <p>Here is what happens next:</p>
          <ul>
            <li>Script preview comes within 24 hours, sent to your email.</li>
            <li>After you approve the script, your rendered video preview comes within 48 hours.</li>
            <li>After you approve the video, I deliver MP4 plus captioned versions for LinkedIn, X, and Instagram.</li>
          </ul>
          <p>
            I will email you from {fromEmail}. Watch for it. If you do not see it within 24 hours,
            check spam and then email cbaryames24@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
