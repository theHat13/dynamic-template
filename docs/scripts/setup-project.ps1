# PowerShell script for installing Hat Dynamic Template on Windows

# Variables
$repoUrl = "https://github.com/theHat13/dynamic-template.git"
$projectDir = "new-hat-project"

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

# Check if Git is installed
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

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    $nodeVersionNumber = $nodeVersion.Substring(1).Split('.')[0]
    if ([int]$nodeVersionNumber -lt 18) {
        Show-Warning "Node.js version $nodeVersion is too old. Version 18 or higher is required."
        Show-Warning "Please install Node.js from https://nodejs.org/"
        Show-Warning "After installing Node.js, restart this script."
        Start-Process "https://nodejs.org/"
        exit 1
    }
    Show-Success "Node.js is already installed: $nodeVersion"
}
catch {
    Show-Warning "Node.js not found. Please install Node.js from https://nodejs.org/"
    Show-Warning "After installing Node.js, restart this script."
    Start-Process "https://nodejs.org/"
    exit 1
}

# Update npm to a compatible version based on Node.js version
Show-Warning "Updating npm..."
try {
    if ([int]$nodeVersionNumber -eq 18) {
        npm install -g npm@latest-9
        Show-Success "npm updated to a compatible version for Node.js 18."
    }
    elseif ([int]$nodeVersionNumber -eq 20) {
        npm install -g npm@latest-10
        Show-Success "npm updated to a compatible version for Node.js 20."
    }
    else {
        npm install -g npm@latest-9
        Show-Success "npm updated to a compatible version."
    }
}
catch {
    Show-Error "Failed to update npm. Error: $_"
}

# Clone the GitHub repository
Show-Warning "Cloning GitHub repository..."
if (Test-Path $projectDir) {
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $projectDir = "new-hat-project-$timestamp"
    Show-Warning "Directory 'new-hat-project' already exists. Using '$projectDir' instead."
}

try {
    git clone $repoUrl $projectDir
    Show-Success "Repository cloned successfully into $projectDir folder."
}
catch {
    Show-Error "Failed to clone repository. Error: $_"
}

# Navigate to the project directory
Set-Location $projectDir

# Install dependencies
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
    npm install tailwindcss@latest @tailwindcss/cli@latest
    Show-Success "TailwindCSS and CLI installed successfully."
}
catch {
    Show-Warning "Explicit TailwindCSS installation failed, but it may be included in project dependencies."
}

# Install Eleventy globally
Show-Warning "Installing Eleventy globally..."
try {
    npm install -g @11ty/eleventy
    Show-Success "Eleventy installed globally."
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
    npx storybook init --builder webpack5
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

# Ensure TailwindCSS compiles styles
Show-Warning "Compiling TailwindCSS styles..."
try {
    npx tailwindcss -i ./src/input.css -o ./public/css/output.css
    Show-Success "TailwindCSS styles compiled successfully."
}
catch {
    Show-Warning "TailwindCSS compilation failed. Check the configuration."
}

# Setup complete
Show-Success "================================================================="
Show-Success "Hat Dynamic Template setup completed successfully!"
Show-Success "================================================================="
Show-Success "Use the following commands to start:"
Show-Success "cd $projectDir"
Show-Success "npm start          # Start Eleventy development server"
Show-Success "npm run storybook  # Start Storybook development server"
Show-Success "================================================================="
Show-Success "The site will be available at: http://localhost:8080"
Show-Success "Storybook will be available at: http://localhost:6006"
Show-Success "================================================================="