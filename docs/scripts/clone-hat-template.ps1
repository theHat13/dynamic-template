# ============================================================
# HAT Dynamic Template Installation Script for Windows
# ============================================================
# This script clones the HAT Dynamic Template repository and
# installs all necessary dependencies for a complete project.
# ============================================================

# Configuration variables
$repoUrl = "https://github.com/theHat13/dynamic-template.git"
$projectDir = "hat-dynamic-template"
$nodeVersionMin = 18
$nodeVersionRecommended = 20

# Function to display error messages and exit
function Show-Error {
    param (
        [string]$Message
    )
    Write-Host "ERROR: $Message" -ForegroundColor Red
    exit 1
}

# Function to display success messages
function Show-Success {
    param (
        [string]$Message
    )
    Write-Host $Message -ForegroundColor Green
}

# Function to display warning messages
function Show-Warning {
    param (
        [string]$Message
    )
    Write-Host $Message -ForegroundColor Yellow
}

# Function to display info messages
function Show-Info {
    param (
        [string]$Message
    )
    Write-Host $Message -ForegroundColor Cyan
}

# Display script title
Write-Host "=================================================================" -ForegroundColor Blue
Write-Host "           HAT Dynamic Template Installation - Start            " -ForegroundColor Blue
Write-Host "=================================================================" -ForegroundColor Blue

# ===================== ENVIRONMENT DETECTION =====================

# Check Windows version
$osInfo = Get-CimInstance -ClassName Win32_OperatingSystem
$winVersion = $osInfo.Caption
$winBuild = $osInfo.BuildNumber
Show-Info "Windows version: $winVersion (Build $winBuild)"

# Check system resources
$computerSystem = Get-CimInstance -ClassName Win32_ComputerSystem
$totalMemoryGB = [math]::Round($computerSystem.TotalPhysicalMemory / 1GB, 2)
Show-Info "Total memory: $totalMemoryGB GB"

if ($totalMemoryGB -lt 4) {
    Show-Warning "Low memory detected. Some operations might be slow."
}

# Check disk space
$systemDrive = $env:SystemDrive
$disk = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DeviceID='$systemDrive'"
$freeSpaceGB = [math]::Round($disk.FreeSpace / 1GB, 2)
Show-Info "Available disk space: $freeSpaceGB GB on $systemDrive"

if ($freeSpaceGB -lt 5) {
    Show-Warning "Low disk space detected. Ensure you have at least 5GB available."
}

# Check CPU information
$processor = Get-CimInstance -ClassName Win32_Processor
$cpuCores = $processor.NumberOfCores
$cpuLogicalProcessors = $processor.NumberOfLogicalProcessors
Show-Info "CPU: $($processor.Name)"
Show-Info "CPU cores: $cpuCores (Logical processors: $cpuLogicalProcessors)"

# Check PowerShell version
$psVersion = $PSVersionTable.PSVersion
Show-Info "PowerShell version: $($psVersion.Major).$($psVersion.Minor).$($psVersion.Patch)"

if ($psVersion.Major -lt 5) {
    Show-Warning "PowerShell version is lower than 5.0. Some features might not work correctly."
    Show-Warning "Consider updating PowerShell to version 5.1 or later."
}

# ===================== DEPENDENCY CHECKS AND INSTALLATION =====================

# Check for Git installation
try {
    $gitVersion = git --version
    Show-Success "Git is already installed: $gitVersion"
}
catch {
    Show-Warning "Git not found. Please install Git from https://git-scm.com/download/win"
    Show-Warning "After installing Git, restart this script."
    Start-Process "https://git-scm.com/download/win"
    exit 1
}

# Check for Node.js installation
try {
    $nodeVersion = node -v
    $nodeVersionNumber = $nodeVersion.Substring(1).Split('.')[0]
    
    if ([int]$nodeVersionNumber -lt $nodeVersionMin) {
        Show-Warning "Node.js version $nodeVersion is too old. Version $nodeVersionMin or higher required."
        Show-Warning "Please install Node.js $nodeVersionRecommended from https://nodejs.org/"
        Show-Warning "After installing Node.js, restart this script."
        Start-Process "https://nodejs.org/"
        exit 1
    }
    elseif ([int]$nodeVersionNumber -lt $nodeVersionRecommended) {
        Show-Warning "Node.js version $nodeVersionNumber detected. Version $nodeVersionRecommended is recommended for best compatibility."
        Show-Warning "Continuing with current version, but consider upgrading for better compatibility with latest tools."
    }
    else {
        Show-Success "Node.js version $nodeVersionNumber is installed (recommended: $nodeVersionRecommended+)."
    }
}
catch {
    Show-Warning "Node.js not found. Please install Node.js $nodeVersionRecommended from https://nodejs.org/"
    Show-Warning "After installing Node.js, restart this script."
    Start-Process "https://nodejs.org/"
    exit 1
}

# Update npm to latest version with fallback for compatibility issues
Show-Warning "Attempting to update npm to latest version..."
try {
    npm install -g npm@latest
    $npmVersion = npm --version
    Show-Success "npm updated to latest version successfully: $npmVersion"
}
catch {
    Show-Warning "Could not update to latest npm. Trying compatible version..."
    
    if ([int]$nodeVersionNumber -eq 18) {
        try {
            npm install -g npm@9.8.1
            Show-Success "npm updated to version 9.8.1 (compatible with Node.js 18)."
        }
        catch {
            Show-Error "Could not update npm. Please try manually: npm install -g npm@9.8.1"
        }
    }
    elseif ([int]$nodeVersionNumber -eq 20) {
        try {
            npm install -g npm@10.2.4
            Show-Success "npm updated to version 10.2.4 (compatible with Node.js 20)."
        }
        catch {
            Show-Error "Could not update npm. Please try manually: npm install -g npm@10.2.4"
        }
    }
    else {
        try {
            npm install -g npm@9.8.1
            Show-Success "npm updated to a compatible version."
        }
        catch {
            Show-Error "Could not update npm. Please try manually: npm install -g npm@9.8.1"
        }
    }
}

# ===================== PROJECT SETUP =====================

# Clone GitHub repository
Show-Warning "Cloning GitHub repository..."

# Ask for project name
$customProjectDir = Read-Host "Enter project name (press Enter to use '$projectDir')"
if ($customProjectDir) {
    $projectDir = $customProjectDir
}

# Check if directory already exists
if (Test-Path $projectDir) {
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $projectDir = "$projectDir-$timestamp"
    Show-Warning "Directory $projectDir already exists. Using alternative name: $projectDir"
}

# Clone repository
try {
    git clone $repoUrl $projectDir
    Show-Success "Repository cloned successfully into $projectDir folder."
}
catch {
    Show-Error "Failed to clone repository. Error: $_"
}

# Navigate to project directory
Set-Location $projectDir

# ===================== DEPENDENCY INSTALLATION =====================

# Install npm dependencies
Show-Warning "Installing npm dependencies..."
try {
    npm install
    Show-Success "Dependencies installed successfully."
}
catch {
    Show-Error "Failed to install dependencies. Error: $_"
}

# Install TailwindCSS and CLI explicitly
Show-Warning "Installing TailwindCSS and CLI..."
try {
    npm install tailwindcss@latest postcss autoprefixer --save-dev
    $tailwindVersion = npx tailwindcss --version
    Show-Success "TailwindCSS and dependencies installed successfully."
    Show-Success "TailwindCSS version: $tailwindVersion"
}
catch {
    Show-Warning "Explicit TailwindCSS installation failed, but it may be included in project dependencies."
}

# Install Eleventy globally
Show-Warning "Installing Eleventy globally..."
try {
    npm install -g @11ty/eleventy@latest
    $eleventyVersion = npx eleventy --version
    Show-Success "Eleventy installed successfully."
    Show-Success "Eleventy version: $eleventyVersion"
}
catch {
    Show-Warning "Global Eleventy installation failed, but the project may still work with local installation."
}

# Install Storybook and related dependencies
Show-Warning "Installing Storybook for HTML..."
try {
    npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport
    Show-Success "Storybook dependencies installed successfully."
}
catch {
    Show-Warning "Storybook installation failed. Check package compatibility."
}

# Initialize Storybook using the official command
Show-Warning "Initializing Storybook..."
try {
    npx storybook init --builder webpack5 --use-npm
    Show-Success "Storybook initialized successfully."
}
catch {
    Show-Warning "Storybook initialization failed. You may need to run it manually later."
}

# Add Storybook scripts to package.json if they don't exist
Show-Warning "Checking for Storybook scripts in package.json..."
$packageJson = Get-Content -Path "package.json" -Raw | ConvertFrom-Json
if (-not $packageJson.scripts.storybook) {
    Show-Warning "Adding Storybook scripts to package.json..."
    $packageJson.scripts | Add-Member -NotePropertyName "storybook" -NotePropertyValue "storybook dev -p 6006"
    $packageJson.scripts | Add-Member -NotePropertyName "build-storybook" -NotePropertyValue "storybook build"
    $packageJson | ConvertTo-Json -Depth 32 | Set-Content -Path "package.json"
    Show-Success "Storybook scripts added to package.json."
}

# Create example Storybook story for a component if stories directory doesn't exist
if (-not (Test-Path "stories")) {
    Show-Warning "Creating Storybook stories directory and example story..."
    New-Item -Path "stories" -ItemType Directory -Force
    
    $buttonStory = @'
export default {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  render: ({ label, primary, backgroundColor, size, onClick }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerText = label;
    btn.addEventListener('click', onClick);
    
    const mode = primary ? 'btn px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none whitespace-nowrap bg-black hover:bg-white text-white hover:text-black' : 'btn px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none whitespace-nowrap';
    
    btn.className = ['btn', `btn--${size}`, mode].join(' ');
    
    return btn;
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
    size: 'medium',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    size: 'medium',
  },
};

export const Large = {
  args: {
    primary: true,
    label: 'Button',
    size: 'large',
  },
};

export const Small = {
  args: {
    primary: true,
    label: 'Button',
    size: 'small',
  },
};
'@
    Set-Content -Path "stories/Button.stories.js" -Value $buttonStory
    Show-Success "Created example Storybook story for Button component."
}

# Install necessary webpack loaders for Nunjucks support
Show-Warning "Installing Nunjucks support for Storybook..."
try {
    npm install --save-dev simple-nunjucks-loader
    Show-Success "Nunjucks loader installed successfully."
}
catch {
    Show-Warning "Nunjucks loader installation failed. You may need to install it manually."
}

# Create necessary directories if they don't exist
if (!(Test-Path "public/css")) {
    New-Item -Path "public/css" -ItemType Directory -Force
}

# Create TailwindCSS output file if it doesn't exist
if (!(Test-Path "public/css/output.css")) {
    New-Item -Path "public/css/output.css" -ItemType File -Force
}

# Compile TailwindCSS styles
Show-Warning "Compiling TailwindCSS styles..."
try {
    npx tailwindcss -i ./src/input.css -o ./public/css/output.css
    Show-Success "TailwindCSS styles compiled successfully."
}
catch {
    Show-Warning "TailwindCSS compilation failed. Check the configuration."
}

# ===================== FINALIZATION =====================

# Setup complete
Write-Host "=================================================================" -ForegroundColor Blue
Write-Host "                   HAT Dynamic Template                          " -ForegroundColor Blue
Write-Host "              Setup completed successfully!                      " -ForegroundColor Blue
Write-Host "=================================================================" -ForegroundColor Blue
Show-Success "Project created: $projectDir"
Write-Host ""
Show-Success "Key components installed:"
Show-Success "✓ Node.js"
Show-Success "✓ npm"
Show-Success "✓ TailwindCSS"
Show-Success "✓ Eleventy"
Show-Success "✓ Storybook"
Show-Success "✓ Nunjucks support"
Write-Host ""
Show-Success "Use the following commands to start:"
Write-Host "cd $projectDir" -ForegroundColor Green
Write-Host "npm start          # Start Eleventy development server" -ForegroundColor Green
Write-Host "npm run storybook  # Start Storybook development server" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Blue
Write-Host "The site will be available at: " -ForegroundColor Green -NoNewline
Write-Host "http://localhost:8080" -ForegroundColor Cyan
Write-Host "Storybook will be available at: " -ForegroundColor Green -NoNewline
Write-Host "http://localhost:6006" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Blue

# Open project folder in explorer
$openFolder = Read-Host "Do you want to open the project folder? (y/n)"
if ($openFolder -eq "y" -or $openFolder -eq "Y") {
    Start-Process explorer.exe -ArgumentList $projectDir
}