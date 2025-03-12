# ============================================================
# HAT Dynamic Template Installation Script for Windows
# ============================================================
# This script clones the HAT Dynamic Template repository and
# installs all necessary dependencies.
# ============================================================

# Check if hat-utils.ps1 is available and load it
if (Test-Path ".\hat-utils.ps1") {
    . .\hat-utils.ps1
}
else {
    Write-Host "Error: Could not load utilities. Please ensure hat-utils.ps1 is in the same directory." -ForegroundColor Red
    Write-Host "Download it with: Invoke-WebRequest -Uri `"https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/hat-utils.ps1`" -OutFile hat-utils.ps1" -ForegroundColor Yellow
    exit 1
}

# Display welcome message
Write-Host "=================================================================" -ForegroundColor Blue
Write-Host "           HAT Dynamic Template Installation - Start            " -ForegroundColor Blue
Write-Host "=================================================================" -ForegroundColor Blue

# Check environment and prerequisites
Test-Prerequisites

# Update npm
Update-NPM

# Clone the repository
$projectDir = Clone-Repository "" "hat-dynamic-template"

# Install dependencies
Install-Dependencies $projectDir

# Install and configure Storybook
Install-Storybook $projectDir

# Compile TailwindCSS
Compile-TailwindCSS $projectDir

# Show installation summary
Show-Summary $projectDir

# Open project folder in explorer (optional)
$openFolder = Read-Host "Do you want to open the project folder? (y/n)"
if ($openFolder -eq "y" -or $openFolder -eq "Y") {
    Start-Process explorer.exe -ArgumentList $projectDir
}