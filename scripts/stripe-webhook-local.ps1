$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Starting Stripe webhook forwarding for local testing."

if (-not (Get-Command stripe -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "Stripe CLI is not installed."
  Write-Host "Install it with:"
  Write-Host "winget install Stripe.StripeCLI"
  Write-Host ""
  Write-Host "Then run this script again."
  exit 1
}

Write-Host ""
Write-Host "If Stripe prints a whsec_ secret, add it to .env.local as STRIPE_WEBHOOK_SECRET."
Write-Host "After changing .env.local, restart npm run dev."
Write-Host ""

stripe login
stripe listen --forward-to localhost:3001/api/stripe/webhook
