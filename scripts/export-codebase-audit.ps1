$ErrorActionPreference = "Stop"

$outputPath = Join-Path (Get-Location) "codebase-audit-for-claude.md"

$excludedDirectories = @(
  ".git",
  ".next",
  "node_modules"
)

$excludedFiles = @(
  ".env",
  ".env.local",
  "codebase-audit-for-claude.md",
  "package-lock.json",
  "tsconfig.tsbuildinfo",
  ".stripe-listen.pid"
)

$includedExtensions = @(
  ".css",
  ".html",
  ".json",
  ".md",
  ".ps1",
  ".sql",
  ".ts",
  ".tsx"
)

function Test-IsExcludedPath {
  param(
    [Parameter(Mandatory = $true)]
    [System.IO.FileInfo]$File
  )

  $pathSegments = $File.FullName -split "[\\/]"

  foreach ($directory in $excludedDirectories) {
    if ($pathSegments -contains $directory) {
      return $true
    }
  }

  if ($excludedFiles -contains $File.Name) {
    return $true
  }

  if ($File.Name -like "*.log") {
    return $true
  }

  return $false
}

function Get-LanguageForFence {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Extension
  )

  switch ($Extension) {
    ".css" { "css" }
    ".html" { "html" }
    ".json" { "json" }
    ".md" { "md" }
    ".ps1" { "powershell" }
    ".sql" { "sql" }
    ".ts" { "ts" }
    ".tsx" { "tsx" }
    default { "text" }
  }
}

$files = Get-ChildItem -Path . -Recurse -File |
  Where-Object { -not (Test-IsExcludedPath -File $_) } |
  Where-Object { $includedExtensions -contains $_.Extension } |
  Sort-Object FullName

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# chuck-portfolio codebase audit")
$lines.Add("")
$lines.Add("Generated for external code audit. Secrets, dependencies, build output, git internals, logs, and binary assets are excluded.")
$lines.Add("")
$lines.Add("## File tree")
$lines.Add("")
$lines.Add('```text')

foreach ($file in $files) {
  $relativePath = Resolve-Path -LiteralPath $file.FullName -Relative
  $cleanPath = $relativePath -replace "^\.\\", ""
  $lines.Add($cleanPath)
}

$lines.Add('```')
$lines.Add("")
$lines.Add("## File contents")
$lines.Add("")

foreach ($file in $files) {
  $relativePath = Resolve-Path -LiteralPath $file.FullName -Relative
  $displayPath = $relativePath -replace "^\.\\", ""
  $language = Get-LanguageForFence -Extension $file.Extension

  $lines.Add("### $displayPath")
  $lines.Add("")
  $lines.Add(('```' + $language))
  $lines.Add((Get-Content -Raw -LiteralPath $file.FullName))
  $lines.Add('```')
  $lines.Add("")
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($outputPath, $lines, $utf8NoBom)

Write-Host "Wrote $outputPath"
