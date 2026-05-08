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

function Read-SecretValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Prompt
  )

  do {
    $secureValue = Read-Host $Prompt -AsSecureString
    $value = Convert-SecureStringToPlainText -SecureString $secureValue

    if (-not [string]::IsNullOrWhiteSpace($value)) {
      return $value.Trim()
    }

    Write-Host "This secret is required."
  } while ($true)
}

function Read-EnvMap {
  $envMap = @{}

  if (-not (Test-Path -LiteralPath ".env.local")) {
    return $envMap
  }

  foreach ($line in Get-Content -LiteralPath ".env.local") {
    if ($line -match "^\s*#" -or [string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $parts = $line.Split("=", 2)

    if ($parts.Count -eq 2) {
      $envMap[$parts[0]] = $parts[1]
    }
  }

  return $envMap
}

function Write-EnvMap {
  param(
    [Parameter(Mandatory = $true)]
    [hashtable]$EnvMap
  )

  $orderedKeys = @(
    "STRIPE_SECRET_KEY",
    "STRIPE_DEPOSIT_PRICE_ID",
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_PUBLISHABLE_KEY",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "FROM_EMAIL",
    "ADMIN_EMAIL"
  )

  $lines = New-Object System.Collections.Generic.List[string]

  foreach ($key in $orderedKeys) {
    if ($EnvMap.ContainsKey($key) -and -not [string]::IsNullOrWhiteSpace([string]$EnvMap[$key])) {
      $lines.Add("$key=$($EnvMap[$key])")
    }
  }

  foreach ($key in ($EnvMap.Keys | Sort-Object)) {
    if ($orderedKeys -notcontains $key -and -not [string]::IsNullOrWhiteSpace([string]$EnvMap[$key])) {
      $lines.Add("$key=$($EnvMap[$key])")
    }
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllLines((Resolve-Path ".env.local"), $lines, $utf8NoBom)
}

$envMap = Read-EnvMap
$stripeSecretKey = $envMap["STRIPE_SECRET_KEY"]

if ([string]::IsNullOrWhiteSpace([string]$stripeSecretKey)) {
  Write-Host ""
  Write-Host "Paste your Stripe test secret key. It starts with sk_test_. It will not be printed."
  $stripeSecretKey = Read-SecretValue "Stripe secret key"
}

Write-Host ""
Write-Host "Creating Stripe product and one-time price in the account that owns this key."

$env:STRIPE_SECRET_KEY = [string]$stripeSecretKey

$nodeScript = @'
const Stripe = require("stripe");

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  });

  const product = await stripe.products.create({
    name: "Landing Page Service",
    description: "48-hour landing page service with a refundable $50 deposit.",
    metadata: {
      project: "chuck-portfolio",
      service: "landing-page",
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 5000,
    currency: "usd",
    metadata: {
      project: "chuck-portfolio",
      service: "landing-page-deposit",
    },
  });

  console.log(JSON.stringify({ productId: product.id, priceId: price.id }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
'@

$resultJson = $nodeScript | node -
$result = $resultJson | ConvertFrom-Json

$envMap["STRIPE_SECRET_KEY"] = [string]$stripeSecretKey
$envMap["STRIPE_DEPOSIT_PRICE_ID"] = [string]$result.priceId

if (-not $envMap.ContainsKey("STRIPE_WEBHOOK_SECRET") -or [string]::IsNullOrWhiteSpace([string]$envMap["STRIPE_WEBHOOK_SECRET"])) {
  $envMap["STRIPE_WEBHOOK_SECRET"] = "whsec_replace_after_running_stripe_listen"
}

Write-EnvMap -EnvMap $envMap

Write-Host ""
Write-Host "Created Stripe deposit product and price."
Write-Host "Product ID: $($result.productId)"
Write-Host "Deposit price ID: $($result.priceId)"
Write-Host ""
Write-Host "Updated .env.local with STRIPE_DEPOSIT_PRICE_ID."
