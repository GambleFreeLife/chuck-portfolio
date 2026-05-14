param(
  [ValidateSet("production", "preview", "development")]
  [string]$Environment = "production"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath ".env.local")) {
  Write-Host ".env.local was not found. Run .\scripts\setup-local.ps1 first."
  exit 1
}

$requiredKeys = @(
  "STRIPE_SECRET_KEY",
  "STRIPE_DEPOSIT_PRICE_ID",
  "STRIPE_VIDEO_SINGLE_PRICE_ID",
  "STRIPE_VIDEO_PACK_PRICE_ID",
  "STRIPE_VIDEO_RETAINER_PRICE_ID",
  "STRIPE_WEBHOOK_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "REPLY_TO_EMAIL",
  "ADMIN_EMAIL"
)

$envMap = @{}

foreach ($line in Get-Content -LiteralPath ".env.local") {
  if ($line -match "^\s*#" -or [string]::IsNullOrWhiteSpace($line)) {
    continue
  }

  $parts = $line.Split("=", 2)

  if ($parts.Count -eq 2) {
    $envMap[$parts[0]] = $parts[1]
  }
}

if ($Environment -eq "production" -and ([string]$envMap["STRIPE_SECRET_KEY"]).StartsWith("sk_test_")) {
  Write-Host "Production env setup stopped because .env.local contains a Stripe test secret key."
  Write-Host "Use live Stripe values for production, especially STRIPE_SECRET_KEY and all Stripe price IDs."
  exit 1
}

Write-Host ""
Write-Host "This will add env vars to Vercel for $Environment."
Write-Host "Vercel may ask you to log in or link the project."
Write-Host ""

foreach ($key in $requiredKeys) {
  if (-not $envMap.ContainsKey($key) -or [string]::IsNullOrWhiteSpace([string]$envMap[$key])) {
    Write-Host "Skipping $key because it is missing in .env.local."
    continue
  }

  $tempFile = New-TemporaryFile

  try {
    Set-Content -LiteralPath $tempFile.FullName -Value ([string]$envMap[$key]) -NoNewline -Encoding UTF8
    Get-Content -LiteralPath $tempFile.FullName -Raw | npx vercel env add $key $Environment
  }
  finally {
    Remove-Item -LiteralPath $tempFile.FullName -Force
  }
}

Write-Host ""
Write-Host "Done. If any value already existed, Vercel may have asked whether to overwrite it."
