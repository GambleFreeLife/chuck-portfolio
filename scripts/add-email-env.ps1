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

    Write-Host "That did not look like the full API key. Paste the full value."
  } while ($true)
}

function Upsert-EnvValue {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Lines,
    [Parameter(Mandatory = $true)]
    [string]$Key,
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  $found = $false
  $updated = foreach ($line in $Lines) {
    if ($line -match "^$Key=") {
      $found = $true
      "$Key=$Value"
    }
    else {
      $line
    }
  }

  if (-not $found) {
    $updated += "$Key=$Value"
  }

  return $updated
}

if (-not (Test-Path -LiteralPath ".env.local")) {
  Write-Host ".env.local was not found. Run .\scripts\setup-local.ps1 first."
  exit 1
}

Write-Host ""
Write-Host "Add Resend email environment variables."
if ($VisibleSecrets) {
  Write-Host "Visible secret mode is on, so pasted secrets will be visible while you type."
}
Write-Host ""

$resendApiKey = Read-SecretValue "Resend API key, re_..."
$fromEmail = Read-RequiredValue "From email, for example Chuck <hello@yourdomain.com>"
$adminEmail = Read-RequiredValue "Admin email where new intake notifications should go"

$lines = Get-Content -LiteralPath ".env.local"
$lines = Upsert-EnvValue -Lines $lines -Key "RESEND_API_KEY" -Value $resendApiKey
$lines = Upsert-EnvValue -Lines $lines -Key "FROM_EMAIL" -Value $fromEmail
$lines = Upsert-EnvValue -Lines $lines -Key "ADMIN_EMAIL" -Value $adminEmail

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines((Resolve-Path ".env.local"), $lines, $utf8NoBom)

Write-Host ""
Write-Host "Updated .env.local. Restart the dev server before testing email delivery."
