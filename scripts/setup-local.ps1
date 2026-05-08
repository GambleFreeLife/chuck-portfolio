param(
  [switch]$SkipSupabasePush,
  [switch]$StartDev,
  [switch]$VisibleSecrets
)

$ErrorActionPreference = "Stop"

function Convert-SecureStringToPlainText {
  param(
    [Parameter(Mandatory = $true)]
    [System.Security.SecureString]$SecureString
  )

  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureString)

  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  }
  finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

function Read-RequiredValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Prompt
  )

  do {
    $value = Read-Host $Prompt
    if (-not [string]::IsNullOrWhiteSpace($value)) {
      return $value.Trim()
    }

    Write-Host "This value is required."
  } while ($true)
}

function Read-SecretValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Prompt,
    [switch]$AllowEmpty
  )

  do {
    if ($VisibleSecrets) {
      $value = Read-Host $Prompt
    }
    else {
      $secureValue = Read-Host $Prompt -AsSecureString
      $value = Convert-SecureStringToPlainText -SecureString $secureValue
    }

    if ($AllowEmpty -or -not [string]::IsNullOrWhiteSpace($value)) {
      return $value.Trim()
    }

    Write-Host "This secret is required."
  } while ($true)
}

function Write-EnvFile {
  param(
    [Parameter(Mandatory = $true)]
    [System.Collections.Specialized.OrderedDictionary]$Values
  )

  $lines = New-Object System.Collections.Generic.List[string]

  foreach ($key in $Values.Keys) {
    $value = [string]$Values[$key]

    if (-not [string]::IsNullOrWhiteSpace($value)) {
      $lines.Add("$key=$value")
    }
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllLines((Resolve-Path ".env.local"), $lines, $utf8NoBom)
}

Write-Host ""
Write-Host "Local setup for chuck-portfolio"
Write-Host "Paste secrets only into this terminal. They will be written to .env.local and not printed."
if ($VisibleSecrets) {
  Write-Host "Visible secret mode is on, so pasted secrets will be visible while you type."
}
Write-Host ""

$supabaseProjectRef = Read-RequiredValue "Supabase project ref, from https://supabase.com/dashboard/project/YOUR_REF"
$supabaseUrl = Read-RequiredValue "Supabase project URL, for example https://YOUR_REF.supabase.co"
$supabaseServiceRoleKey = Read-SecretValue "Supabase service_role key"
$stripeSecretKey = Read-SecretValue "Stripe secret key, sk_test_ or sk_live_"
$stripeDepositPriceId = Read-RequiredValue "Stripe $50 deposit price ID, price_..."
$stripeWebhookSecret = Read-SecretValue "Stripe webhook secret, whsec_... Press Enter if you have not made it yet" -AllowEmpty
$stripePublishableKey = Read-SecretValue "Stripe publishable key, optional. Press Enter to skip" -AllowEmpty
$resendApiKey = Read-SecretValue "Resend API key, re_... Press Enter if you have not made it yet" -AllowEmpty
$fromEmail = Read-RequiredValue "From email, for example Chuck <hello@yourdomain.com>"
$adminEmail = Read-RequiredValue "Admin email where new intake notifications should go"

if ([string]::IsNullOrWhiteSpace($stripeWebhookSecret)) {
  $stripeWebhookSecret = "whsec_replace_after_running_stripe_listen"
}

$envValues = [ordered]@{
  "STRIPE_SECRET_KEY" = $stripeSecretKey
  "STRIPE_DEPOSIT_PRICE_ID" = $stripeDepositPriceId
  "STRIPE_WEBHOOK_SECRET" = $stripeWebhookSecret
  "SUPABASE_URL" = $supabaseUrl
  "SUPABASE_SERVICE_ROLE_KEY" = $supabaseServiceRoleKey
}

if (-not [string]::IsNullOrWhiteSpace($stripePublishableKey)) {
  $envValues["STRIPE_PUBLISHABLE_KEY"] = $stripePublishableKey
}

if (-not [string]::IsNullOrWhiteSpace($resendApiKey)) {
  $envValues["RESEND_API_KEY"] = $resendApiKey
}

$envValues["FROM_EMAIL"] = $fromEmail
$envValues["ADMIN_EMAIL"] = $adminEmail

Write-EnvFile -Values $envValues
Write-Host ""
Write-Host "Wrote .env.local."

if (-not $SkipSupabasePush) {
  Write-Host ""
  Write-Host "Logging into Supabase if needed."
  npx supabase login

  Write-Host ""
  Write-Host "Linking Supabase project."
  npx supabase link --project-ref $supabaseProjectRef

  Write-Host ""
  Write-Host "Applying Supabase migrations."
  npx supabase db push
}

Write-Host ""
Write-Host "Local setup is done."
Write-Host "Next, run the app with:"
Write-Host 'npm run dev -- -p 3001'
Write-Host ""
Write-Host "For local Stripe webhook testing, open another PowerShell window and run:"
Write-Host '.\scripts\stripe-webhook-local.ps1'

if ($StartDev) {
  Write-Host ""
  Write-Host "Starting the dev server on port 3001."
  npm run dev -- -p 3001
}
