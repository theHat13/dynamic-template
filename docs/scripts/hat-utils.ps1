# ============================================================
# HAT Dynamic Template - Common Utilities for Windows
# ============================================================
# Shared functions for HAT Dynamic Template installation scripts
# ============================================================

# Configuration variables
$repoUrl = "https://github.com/theHat13/dynamic-template.git"
$nodeVersionMin = 18
$nodeVersionRecommended = 20

# ===================== UTILITY FUNCTIONS =====================

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

# Function to display section headers
function Show-SectionHeader {
    param (
        [string]$Title
    )
    Write-Host "`n===== $Title =====" -ForegroundColor Blue
}

# Function to check if a command exists
function Test-CommandExists {
    param (
        [string]$Command
    )
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to check prerequisites
function Test-Prerequisites {
    Show-SectionHeader "CHECKING PREREQUISITES"
    
    # Check for Git
    try {
        $gitVersion = git --version
        Show-Success "Git is already installed: $gitVersion"
    }
    catch {
        Show-Error "Git is required but not installed. Please install Git from https://git-scm.com/download/win"
    }
    
    # Check for Node.js
    try {
        $nodeVersion = node -v
        $nodeVersionNumber = $nodeVersion.Substring(1).Split('.')[0]
        
        if ([int]$nodeVersionNumber -lt $nodeVersionMin) {
            Show-Warning "Node.js version $nodeVersion is too old. Version $nodeVersionMin or higher required."
            Show-Warning "Please consider upgrading your Node.js installation."
        }
        else {
            Show-Success "Node.js version $nodeVersionNumber is installed (recommended: $nodeVersionRecommended+)."
        }
    }
    catch {
        Show-Error "Node.js is required but not installed. Please install Node.js version $nodeVersionRecommended from https://nodejs.org/"
    }
    
    # Check for npm
    try {
        $npmVersion = npm --version
        Show-Success "npm is installed: v$npmVersion"
    }
    catch {
        Show-Error "npm is required but not installed. It should be included with Node.js installation."
    }
    
    # Check PowerShell version
    $psVersion = $PSVersionTable.PSVersion
    Show-Info "PowerShell version: $($psVersion.Major).$($psVersion.Minor).$($psVersion.Patch)"
    
    if ($psVersion.Major -lt 5) {
        Show-Warning "PowerShell version is lower than 5.0. Some features might not work correctly."
        Show-Warning "Consider updating PowerShell to version 5.1 or later."
    }
}

# Function to update npm
function Update-NPM {
    Show-Warning "Updating npm..."
    
    try {
        npm install -g npm@latest
        $npmVersion = npm --version
        Show-Success "npm updated to latest version successfully: $npmVersion"
    }
    catch {
        Show-Warning "Could not update to latest npm. Trying compatible version..."
        $nodeVersion = node -v
        $nodeVersionNumber = $nodeVersion.Substring(1).Split('.')[0]
        
        if ([int]$nodeVersionNumber -eq 18) {
            try {
                npm install -g npm@9.8.1
                Show-Success "npm updated to version 9.8.1 (compatible with Node.js 18)."
            }
            catch {
                Show-Warning "Could not update npm. You may need to update manually."
            }
        }
        elseif ([int]$nodeVersionNumber -eq 20) {
            try {
                npm install -g npm@10.2.4
                Show-Success "npm updated to version 10.2.4 (compatible with Node.js 20)."
            }
            catch {
                Show-Warning "Could not update npm. You may need to update manually."
            }
        }
        else {
            try {
                npm install -g npm@9.8.1
                Show-Success "npm updated to a compatible version."
            }
            catch {
                Show-Warning "Could not update npm. You may need to update manually."
            }
        }
    }
}

# Function to clone repository
function Clone-Repository {
    param (
        [string]$ProjectName,
        [string]$DefaultName
    )
    
    # Use the provided name or ask for one
    if ([string]::IsNullOrEmpty($ProjectName)) {
        $ProjectName = Read-Host "Enter project name (press Enter to use '$DefaultName')"
    }
    
    # Use default if still empty
    if ([string]::IsNullOrEmpty($ProjectName)) {
        $ProjectName = $DefaultName
    }
    
    # Check if directory already exists
    if (Test-Path $ProjectName) {
        $timestamp = Get-Date -Format "yyyyMMddHHmmss"
        $ProjectName = "$ProjectName-$timestamp"
        Show-Warning "Directory already exists. Using alternative name: $ProjectName"
    }
    
    # Clone the repository
    Show-Warning "Cloning GitHub repository..."
    try {
        git clone $repoUrl $ProjectName
        Show-Success "Repository cloned successfully into $ProjectName folder."
    }
    catch {
        Show-Error "Failed to clone repository. Error: $_"
    }
    
    return $ProjectName
}

# Function to install TailwindCSS with CLI only
function Install-Tailwind {
    param (
        [string]$ProjectDir
    )
    
    Push-Location $ProjectDir
    
    Show-Warning "Installing TailwindCSS with CLI..."
    try {
        npm install tailwindcss @tailwindcss/cli --save-dev
        
        # Verify installation
        $tailwindVersion = npx tailwindcss --version
        Show-Success "TailwindCSS installed successfully. Version: $tailwindVersion"
    }
    catch {
        Show-Warning "Error installing TailwindCSS and CLI: $_"
        Show-Warning "You may need to install it manually with: npm install tailwindcss @tailwindcss/cli"
    }
    
    Pop-Location
}

# Function to install common dependencies
function Install-Dependencies {
    param (
        [string]$ProjectDir
    )
    
    # Navigate to project directory
    Push-Location $ProjectDir
    
    # Install npm dependencies
    Show-Warning "Installing npm dependencies..."
    try {
        npm install
        Show-Success "Dependencies installed successfully."
    }
    catch {
        Pop-Location
        Show-Error "Failed to install dependencies. Error: $_"
    }
    
    # Install concurrently
    Show-Warning "Installing concurrently..."
    try {
        npm install concurrently --save-dev
        Show-Success "Concurrently installed successfully."
    }
    catch {
        Show-Warning "Failed to install concurrently. Error: $_"
    }
    
    # Install TailwindCSS with CLI
    Install-Tailwind $ProjectDir
    
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
    
    # Return to original directory
    Pop-Location
}

# Function to install Storybook
function Install-Storybook {
    param (
        [string]$ProjectDir
    )
    
    # Navigate to project directory
    Push-Location $ProjectDir
    
    # Install Storybook and related dependencies
    Show-Warning "Installing Storybook for HTML..."
    try {
        npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport
        Show-Success "Storybook dependencies installed successfully."
    }
    catch {
        Show-Warning "Storybook installation failed. Check package compatibility."
    }
    
    # Initialize Storybook
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
    try {
        $packageJson = Get-Content -Path "package.json" -Raw | ConvertFrom-Json
        if (-not $packageJson.scripts.storybook) {
            Show-Warning "Adding Storybook scripts to package.json..."
            $packageJson.scripts | Add-Member -NotePropertyName "storybook" -NotePropertyValue "storybook dev -p 6006"
            $packageJson.scripts | Add-Member -NotePropertyName "build-storybook" -NotePropertyValue "storybook build"
            $packageJson | ConvertTo-Json -Depth 32 | Set-Content -Path "package.json"
            Show-Success "Storybook scripts added to package.json."
        }
    }
    catch {
        Show-Warning "Failed to update package.json. You may need to add Storybook scripts manually."
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
    
    # Return to original directory
    Pop-Location
}

# Function to compile TailwindCSS
function Compile-TailwindCSS {
    param (
        [string]$ProjectDir
    )
    
    # Navigate to project directory
    Push-Location $ProjectDir
    
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
    
    # Return to original directory
    Pop-Location
}

# Function to update package.json for concurrent execution
function Update-PackageJson {
    param (
        [string]$ProjectDir
    )
    
    # Navigate to project directory
    Push-Location $ProjectDir
    
    # Update package.json to use concurrently for start script
    try {
        $packageJson = Get-Content -Path "package.json" -Raw | ConvertFrom-Json
        
        # Check if concurrently is already configured
        if ($packageJson.scripts.start -and -not ($packageJson.scripts.start -like "*concurrently*")) {
            $startScript = $packageJson.scripts.start
            $packageJson.scripts.start = "concurrently `"$startScript`" `"npm run storybook`""
            $packageJson | ConvertTo-Json -Depth 32 | Set-Content -Path "package.json"
            Show-Success "Updated start script to run Eleventy and Storybook concurrently."
        }
        elseif (-not $packageJson.scripts.start) {
            Show-Warning "No start script found to update."
        }
    }
    catch {
        Show-Warning "Failed to update package.json. You may need to configure it manually."
    }
    
    # Return to original directory
    Pop-Location
}

# Function to show installation summary
function Show-Summary {
    param (
        [string]$ProjectDir
    )
    
    Write-Host "=================================================================" -ForegroundColor Blue
    Write-Host "                   HAT Dynamic Template                          " -ForegroundColor Blue
    Write-Host "              Setup completed successfully!                      " -ForegroundColor Blue
    Write-Host "=================================================================" -ForegroundColor Blue
    Show-Success "Project created: $ProjectDir"
    Write-Host ""
    Show-Success "Key components installed:"
    Show-Success "✓ TailwindCSS"
    Show-Success "✓ Eleventy"
    Show-Success "✓ Storybook"
    Show-Success "✓ Nunjucks support"
    Show-Success "✓ Concurrently"
    Write-Host ""
    Show-Success "Use the following commands to start:"
    Write-Host "cd $ProjectDir" -ForegroundColor Green
    Write-Host "npm start          # Start Eleventy development server + Storybook" -ForegroundColor Green
    Write-Host "=================================================================" -ForegroundColor Blue
    Write-Host "The site will be available at: " -ForegroundColor Green -NoNewline
    Write-Host "http://localhost:8080" -ForegroundColor Cyan
    Write-Host "Storybook will be available at: " -ForegroundColor Green -NoNewline
    Write-Host "http://localhost:6006" -ForegroundColor Cyan
    Write-Host "=================================================================" -ForegroundColor Blue
}