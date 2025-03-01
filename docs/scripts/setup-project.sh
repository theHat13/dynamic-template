#!/bin/bash

# Variables
REPO_URL="https://github.com/theHat13/dynamic-template.git"
PROJECT_DIR="new-hat-project"

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

# Check for root privileges on Linux
if [[ "$OSTYPE" == "linux-gnu"* ]] && [[ $EUID -ne 0 ]]; then
    warning_message "This script may require administrator privileges for some operations."
    warning_message "If installation fails, try running it with sudo."
fi

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
    warning_message "macOS system detected"
    # Check if Homebrew is installed
    if ! command -v brew &>/dev/null; then
        warning_message "Homebrew not found. Installing..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || error_exit "Could not install Homebrew."
        success_message "Homebrew installed successfully."
    else
        success_message "Homebrew is already installed."
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
    warning_message "Linux system detected"
    # Update packages
    warning_message "Updating packages..."
    apt-get update || error_exit "Could not update packages. Try running with sudo."
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    OS="Windows"
    warning_message "Windows system detected"
    # Check for chocolatey
    if ! command -v choco &>/dev/null; then
        warning_message "Chocolatey not found. On Windows, we recommend installing dependencies manually."
    fi
else
    OS="Other"
    warning_message "Unrecognized operating system. Installation might not work correctly."
fi

# Install Git if not installed
if ! command -v git &>/dev/null; then
    warning_message "Git not found. Installing..."
    if [[ "$OS" == "macOS" ]]; then
        brew install git || error_exit "Could not install Git via Homebrew."
    elif [[ "$OS" == "Linux" ]]; then
        apt-get install -y git || error_exit "Could not install Git. Try running with sudo."
    elif [[ "$OS" == "Windows" ]]; then
        error_exit "Git is not installed. Please install it manually from https://git-scm.com/download/win"
    else
        error_exit "Could not install Git. Please install it manually."
    fi
    success_message "Git installed successfully."
else
    success_message "Git is already installed."
fi

# Install Node.js if not installed or version is too old
NODE_VERSION_REQUIRED="18"
if ! command -v node &>/dev/null; then
    warning_message "Node.js not found. Installing..."
    if [[ "$OS" == "macOS" ]]; then
        brew install node@18 || error_exit "Could not install Node.js via Homebrew."
        # Add node to PATH if needed
        if ! command -v node &>/dev/null; then
            warning_message "Adding Node.js to PATH..."
            echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
            echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.bash_profile
            source ~/.zshrc 2>/dev/null || source ~/.bash_profile 2>/dev/null || true
        fi
    elif [[ "$OS" == "Linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash - || error_exit "Could not set up Node.js repository."
        apt-get install -y nodejs || error_exit "Could not install Node.js. Try running with sudo."
    elif [[ "$OS" == "Windows" ]]; then
        error_exit "Node.js is not installed. Please install it manually from https://nodejs.org/"
    else
        error_exit "Could not install Node.js. Please install it manually."
    fi
    success_message "Node.js installed successfully."
else
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [[ $NODE_VERSION -lt $NODE_VERSION_REQUIRED ]]; then
        warning_message "Node.js version ($NODE_VERSION) is too old. Version $NODE_VERSION_REQUIRED or higher required."
        if [[ "$OS" == "macOS" ]]; then
            brew install node@18 || error_exit "Could not install Node.js via Homebrew."
            # Add node to PATH if needed
            echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
            echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.bash_profile
            source ~/.zshrc 2>/dev/null || source ~/.bash_profile 2>/dev/null || true
        elif [[ "$OS" == "Linux" ]]; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | bash - || error_exit "Could not set up Node.js repository."
            apt-get install -y nodejs || error_exit "Could not install Node.js. Try running with sudo."
        else
            error_exit "Please update Node.js manually to version $NODE_VERSION_REQUIRED or higher."
        fi
        success_message "Node.js updated successfully."
    else
        success_message "Node.js version $NODE_VERSION is already installed."
    fi
fi

# Update npm to a compatible version based on Node.js version
warning_message "Updating npm..."
if [[ "$NODE_VERSION" == "18" ]]; then
    npm install -g npm@latest-9 || error_exit "Could not update npm."
    success_message "npm updated to a compatible version for Node.js 18."
elif [[ "$NODE_VERSION" == "20" ]]; then
    npm install -g npm@latest-10 || error_exit "Could not update npm."
    success_message "npm updated to a compatible version for Node.js 20."
else
    npm install -g npm@latest-9 || error_exit "Could not update npm."
    success_message "npm updated to a compatible version."
fi

# Clone the GitHub repository
warning_message "Cloning GitHub repository..."
if [ -d "$PROJECT_DIR" ]; then
    warning_message "The folder $PROJECT_DIR already exists. Using an alternative name."
    PROJECT_DIR="new-hat-project-$(date +%s)"
fi
git clone "$REPO_URL" "$PROJECT_DIR" || error_exit "Error cloning the repository."
success_message "Repository cloned successfully into folder $PROJECT_DIR."

# Navigate to the project directory
cd "$PROJECT_DIR" || error_exit "Error navigating to the project directory."

# Install dependencies
warning_message "Installing npm dependencies..."
npm install || error_exit "Error installing dependencies."
success_message "Dependencies installed successfully."

# Install TailwindCSS and CLI explicitly
warning_message "Installing TailwindCSS and CLI..."
npm install tailwindcss@latest @tailwindcss/cli@latest || warning_message "Explicit TailwindCSS installation failed, but it may be included in project dependencies."

# Install Eleventy globally
warning_message "Installing Eleventy globally..."
npm install -g @11ty/eleventy || warning_message "Global Eleventy installation failed, but the project may still work with local installation."

# Install Storybook and related dependencies
warning_message "Installing Storybook for HTML..."
npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport || warning_message "Storybook installation failed. Check package compatibility."

# Initialize Storybook using the official command
warning_message "Initializing Storybook..."
npx storybook init --builder webpack5 || warning_message "Storybook initialization failed. You may need to run it manually later."

# Add Storybook scripts to package.json if they don't exist
if ! grep -q '"storybook":' package.json; then
    warning_message "Adding Storybook scripts to package.json..."
    # Using a temporary file for sed compatibility across platforms
    sed -i.bak 's/"scripts": {/"scripts": {\n    "storybook": "storybook dev -p 6006",\n    "build-storybook": "storybook build",/g' package.json
    rm package.json.bak
fi

# Create example Storybook story for a component if stories directory doesn't exist
if [ ! -d "stories" ]; then
    warning_message "Creating Storybook stories directory and example story..."
    mkdir -p stories
    cat > stories/Button.stories.js << 'EOL'
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
EOL
    success_message "Created example Storybook story for Button component."
fi

# Install necessary webpack loaders for Nunjucks support
warning_message "Installing Nunjucks support for Storybook..."
npm install --save-dev simple-nunjucks-loader || warning_message "Nunjucks loader installation failed. You may need to install it manually."

# Initialize Eleventy
warning_message "Initializing Eleventy..."
npx eleventy --serve || warning_message "Error initializing Eleventy, but configuration may be correct."

# Create necessary directories if they don't exist
mkdir -p public/css

# Create TailwindCSS output file if it doesn't exist
touch public/css/output.css

# Ensure TailwindCSS compiles styles
warning_message "Compiling TailwindCSS styles..."
npx tailwindcss -i ./src/input.css -o ./public/css/output.css || warning_message "Error compiling TailwindCSS. Check the configuration."

# Setup complete
success_message "================================================================="
success_message "Hat Dynamic Template setup completed successfully!"
success_message "================================================================="
success_message "Use the following commands to start:"
success_message "cd $PROJECT_DIR"
success_message "npm start          # Start Eleventy development server"
success_message "npm run storybook  # Start Storybook development server"
success_message "================================================================="
success_message "The site will be available at: http://localhost:8080"
success_message "Storybook will be available at: http://localhost:6006"
success_message "================================================================="