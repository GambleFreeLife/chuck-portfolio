param(
  [string]$WebhookUrl = "https://chuck-portfolio.vercel.app/api/stripe/webhook"
)

$ErrorActionPreference = "Stop"

function Read-EnvFile {
  param([string]$Path)

  $envMap = @{}

  foreach ($line in Get-Content -LiteralPath $Path) {
    if ($line -match "^\s*#" -or [string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $parts = $line.Split("=", 2)

    if ($parts.Count -eq 2) {
      $envMap[$parts[0]] = $parts[1].Trim()
    }
  }

  return $envMap
}

function Get-RequiredValue {
  param(
    [hashtable]$Map,
    [string]$Name
  )

  if (-not $Map.ContainsKey($Name) -or [string]::IsNullOrWhiteSpace([string]$Map[$Name])) {
    throw "Missing $Name in .env.local."
  }

  return [string]$Map[$Name]
}

function ConvertTo-PlainText {
  param([securestring]$SecureValue)

  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)

  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  }
  finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

function Get-HmacSha256 {
  param(
    [string]$Secret,
    [string]$Payload
  )

  $encoding = [Text.Encoding]::UTF8
  $secretBytes = $encoding.GetBytes($Secret)
  $payloadBytes = $encoding.GetBytes($Payload)
  $hmac = [Security.Cryptography.HMACSHA256]::new($secretBytes)

  try {
    $hashBytes = $hmac.ComputeHash($payloadBytes)
    return -join ($hashBytes | ForEach-Object { $_.ToString("x2") })
  }
  finally {
    $hmac.Dispose()
  }
}

if (-not (Test-Path -LiteralPath ".env.local")) {
  throw ".env.local was not found. Run this from the project root."
}

$envMap = Read-EnvFile -Path ".env.local"
$supabaseUrl = (Get-RequiredValue -Map $envMap -Name "SUPABASE_URL").TrimEnd("/")
$supabaseUrl = $supabaseUrl -replace "/rest/v1$", ""
$supabaseServiceRoleKey = Get-RequiredValue -Map $envMap -Name "SUPABASE_SERVICE_ROLE_KEY"
$adminEmail = if ($envMap.ContainsKey("ADMIN_EMAIL") -and -not [string]::IsNullOrWhiteSpace([string]$envMap["ADMIN_EMAIL"])) {
  [string]$envMap["ADMIN_EMAIL"]
} else {
  "cbaryames24@gmail.com"
}

$secureSecret = Read-Host "Paste the live Stripe webhook signing secret (whsec_...). It will not be printed" -AsSecureString
$webhookSecret = (ConvertTo-PlainText -SecureValue $secureSecret).Trim().Trim('"').Trim("'")

if (-not $webhookSecret.StartsWith("whsec_")) {
  throw "That does not look like a Stripe webhook signing secret."
}

$headers = @{
  apikey = $supabaseServiceRoleKey
  Authorization = "Bearer $supabaseServiceRoleKey"
  "Content-Type" = "application/json"
  Prefer = "return=representation"
}

$now = Get-Date -Format "yyyyMMdd-HHmmss"
$testEmail = $adminEmail
$insertBody = @{
  full_name = "Production Webhook Smoke Test"
  email = $testEmail
  business_name = "Production Webhook Smoke Test Ignore"
  business_description = "This row verifies the production Stripe webhook without charging a card."
  target_customer = "Internal QA only."
  primary_goal = "Capture email leads"
  offer_description = "Webhook simulation for the $50 deposit flow."
  benefits = "Confirms Supabase update. Confirms webhook signature handling. Triggers production email sending."
  domain_status = "I'll send it after payment"
  brand_notes = "Ignore this test row."
  additional_notes = "Created by scripts/test-production-webhook.ps1 at $now. No payment was collected."
  deadline_preference = "No rush"
  stripe_session_id = "cs_live_webhook_smoke_$now"
  stripe_payment_status = "pending_deposit"
} | ConvertTo-Json -Depth 5

Write-Host "Creating a clearly labeled smoke-test intake row..."
$insertedRows = Invoke-RestMethod `
  -Uri "$supabaseUrl/rest/v1/intake_submissions" `
  -Method Post `
  -Headers $headers `
  -Body $insertBody

$intakeId = $insertedRows[0].id

if (-not $intakeId) {
  throw "Supabase did not return a test intake ID."
}

$created = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$sessionId = "cs_live_webhook_smoke_$now"
$event = @{
  id = "evt_live_webhook_smoke_$now"
  object = "event"
  api_version = "2026-02-25.clover"
  created = $created
  data = @{
    object = @{
      id = $sessionId
      object = "checkout.session"
      amount_total = 5000
      currency = "usd"
      customer_email = $testEmail
      livemode = $true
      metadata = @{
        intake_id = $intakeId
        payment_phase = "deposit"
      }
      mode = "payment"
      payment_status = "paid"
      status = "complete"
    }
  }
  livemode = $true
  pending_webhooks = 1
  request = $null
  type = "checkout.session.completed"
}

$payload = $event | ConvertTo-Json -Depth 10 -Compress
$signedPayload = "$created.$payload"
$signature = Get-HmacSha256 -Secret $webhookSecret -Payload $signedPayload
$stripeSignature = "t=$created,v1=$signature"

Write-Host "Sending signed checkout.session.completed event to production webhook..."
$webhookResponse = Invoke-RestMethod `
  -Uri $WebhookUrl `
  -Method Post `
  -Headers @{ "Stripe-Signature" = $stripeSignature } `
  -ContentType "application/json" `
  -Body $payload

Write-Host "Webhook response:"
$webhookResponse | ConvertTo-Json

Start-Sleep -Seconds 2

$encodedId = [uri]::EscapeDataString("eq.$intakeId")
$rows = Invoke-RestMethod `
  -Uri "$supabaseUrl/rest/v1/intake_submissions?id=$encodedId&select=id,business_name,email,stripe_payment_status,paid_at" `
  -Method Get `
  -Headers @{
    apikey = $supabaseServiceRoleKey
    Authorization = "Bearer $supabaseServiceRoleKey"
  }

$row = $rows[0]

Write-Host ""
Write-Host "Smoke-test row:"
[pscustomobject]@{
  IntakeId = $row.id
  BusinessName = $row.business_name
  Email = $row.email
  PaymentStatus = $row.stripe_payment_status
  PaidAt = $row.paid_at
} | Format-List

if ($row.stripe_payment_status -ne "deposit_paid") {
  throw "Webhook did not update the row to deposit_paid."
}

Write-Host "Done. Check the inbox for the admin and client emails."
