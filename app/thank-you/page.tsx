export default function ThankYouPage() {
  const fromEmail = process.env.REPLY_TO_EMAIL ?? "chuck@chuckbaryames.com";

  return (
    <main className="flow-page">
      <div className="flow-shell flow-shell-narrow">
        <a href="/" className="flow-back">
          CB
        </a>
        <section className="thank-you-card" aria-labelledby="thank-you-title">
          <div className="sec-label">Deposit received</div>
          <h1 id="thank-you-title">Thanks. I just got your intake form and your $50 deposit.</h1>
          <p>Here is what happens next:</p>
          <ul>
            <li>Within 4 hours, I will send a quick confirmation email with my plan for your page.</li>
            <li>Within 48 hours, your landing page is deployed to a temporary URL for review.</li>
            <li>You get 3 rounds of revisions.</li>
            <li>After you approve it, I send the Stripe link for the $447 balance.</li>
            <li>Once the balance is paid, I deploy it to your domain within 24 hours.</li>
          </ul>
          <p>
            I will email you from {fromEmail}. Watch for it. If you do not see it within 4
            hours, check spam.
          </p>
        </section>
      </div>
    </main>
  );
}
