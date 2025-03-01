#!/bin/bash

# Variables
REPO_URL="https://github.com/theHat13/dynamic-template.git"
PROJECT_DIR="new-hat-project"

# Versions
NODE_VERSION_PREFERRED="20"
NPM_VERSION="10.2.4"
NUNJUCKS_LOADER_VERSION="1.0.7"

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display error messages and exit
function error_exit {
    echo -e "${RED}ERROR: $1${NC}" 1>&2
    exit 1
}

# Function to display success messages
function success_message {
    echo -e "${GREEN}$1${NC}"
}

# Function to display warning messages
function warning_message {
    echo -e "${YELLOW}$1${NC}"
}

# ... [Rest of the original script remains the same until Node.js version check]

# Install latest Node.js or check version
NODE_VERSION_MINIMUM="18"
if ! command -v node &>/dev/null; then
    warning_message "Node.js not found. Installing version $NODE_VERSION_PREFERRED..."
    if [[ "$OS" == "macOS" ]]; then
        brew install node@"$NODE_VERSION_PREFERRED" || error_exit "Could not install Node.js via Homebrew."
    elif [[ "$OS" == "Linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_"$NODE_VERSION_PREFERRED".x | bash - || error_exit "Could not set up Node.js repository."
        apt-get install -y nodejs || error_exit "Could not install Node.js. Try running with sudo."
    elif [[ "$OS" == "Windows" ]]; then
        error_exit "Node.js is not installed. Please install it manually from https://nodejs.org/"
    else
        error_exit "Could not install Node.js. Please install it manually."
    fi
    success_message "Node.js $NODE_VERSION_PREFERRED installed successfully."
else
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [[ $NODE_VERSION -lt $NODE_VERSION_MINIMUM ]]; then
        warning_message "Node.js version ($NODE_VERSION) is too old. Version $NODE_VERSION_PREFERRED or higher required."
        warning_message "Attempting to install Node.js $NODE_VERSION_PREFERRED..."
        # [Same installation logic as above]
    elif [[ $NODE_VERSION -lt $NODE_VERSION_PREFERRED ]]; then
        warning_message "Node.js version $NODE_VERSION detected. Version $NODE_VERSION_PREFERRED is recommended."
    else
        success_message "Node.js version $NODE_VERSION is installed (recommended: $NODE_VERSION_PREFERRED+)."
    fi
fi

# Update npm to specific version
warning_message "Attempting to update npm to version $NPM_VERSION..."
npm install -g npm@"$NPM_VERSION" || error_exit "Could not update npm to version $NPM_VERSION. Please try manually."
success_message "npm updated to version $NPM_VERSION successfully."

# ... [Continue with the rest of the original script]

# Install Storybook and related dependencies
warning_message "Installing Storybook for HTML..."
npm install --save-dev \
    @storybook/html@latest \
    @storybook/addon-essentials \
    @storybook/addon-interactions \
    @storybook/addon-a11y \
    @storybook/addon-links \
    @storybook/addon-viewport || warning_message "Storybook installation failed. Check package compatibility."

# Initialize Storybook using the official command with Webpack 5
warning_message "Initializing Storybook..."
npx storybook init --builder webpack5 || warning_message "Storybook initialization failed. You may need to run it manually later."

# Install Nunjucks loader with specific version
warning_message "Installing Nunjucks loader version $NUNJUCKS_LOADER_VERSION..."
npm install --save-dev simple-nunjucks-loader@"$NUNJUCKS_LOADER_VERSION" || warning_message "Nunjucks loader installation failed. You may need to install it manually."

# ... [Rest of the script remains the same]