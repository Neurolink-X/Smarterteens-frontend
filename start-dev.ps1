# SmarterTeens Development Server Launcher
# This script automatically navigates to the correct directory and starts the dev server

$projectRoot = Join-Path $PSScriptRoot "Smarterteens-frontend-main"

if (-not (Test-Path $projectRoot)) {
    Write-Host "❌ Error: Project directory not found at $projectRoot" -ForegroundColor Red
    Write-Host "Current location: $PSScriptRoot" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path (Join-Path $projectRoot "package.json"))) {
    Write-Host "❌ Error: package.json not found in $projectRoot" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Navigating to project directory..." -ForegroundColor Cyan
Set-Location $projectRoot

Write-Host "✅ Found package.json" -ForegroundColor Green
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host ""

npm run dev
