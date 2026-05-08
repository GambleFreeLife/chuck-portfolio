param(
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

function Read-SecretValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Prompt
  )

  do {
    if ($VisibleSecrets) {
      $value = Read-Host $Prompt
    }
    else {
      $secureValue = Read-Host $Prompt -AsSecureString
      $value = Convert-SecureStringToPlainText -SecureString $secureValue
    }

    if (-not [string]::IsNullOrWhiteSpace($value) -and $value.Trim().Length -gt 10) {
      return $value.Trim()
    }

    Write-Host "That did not look like the full secret. Paste the full value."
  } while ($true)
}

if (-not (Test-Path -LiteralPath ".env.local")) {
  Write-Host ".env.local was not found. Run .\scripts\setup-local.ps1 first."
  exit 1
}

Write-Host ""
Write-Host "This repairs only the local secret values that were captured incorrectly."
if ($VisibleSecrets) {
  Write-Host "Visible secret mode is on, so pasted secrets will be visible while you type."
}
Write-Host ""

$stripeSecretKey = Read-SecretValue "Paste the full Stripe secret key, sk_test_..."
$supabaseServiceRoleKey = Read-SecretValue "Paste the full Supabase service_role key"

$lines = Get-Content -LiteralPath ".env.local"
$sawStripe = $false
$sawSupabase = $false
$newLines = foreach ($line in $lines) {
  if ($line -match "^STRIPE_SECRET_KEY=") {
    $sawStripe = $true
    "STRIPE_SECRET_KEY=$stripeSecretKey"
  }
  elseif ($line -match "^SUPABASE_SERVICE_ROLE_KEY=") {
    $sawSupabase = $true
    "SUPABASE_SERVICE_ROLE_KEY=$supabaseServiceRoleKey"
  }
  else {
    $line
  }
}

if (-not $sawStripe) {
  $newLines += "STRIPE_SECRET_KEY=$stripeSecretKey"
}

if (-not $sawSupabase) {
  $newLines += "SUPABASE_SERVICE_ROLE_KEY=$supabaseServiceRoleKey"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines((Resolve-Path ".env.local"), $newLines, $utf8NoBom)

Write-Host ""
Write-Host "Updated .env.local. Restart the dev server before testing checkout again."
