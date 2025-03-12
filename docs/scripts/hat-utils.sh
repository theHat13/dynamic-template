#!/bin/bash

# ============================================================
# HAT Dynamic Template - Common Utilities
# ============================================================
# Shared functions for HAT Dynamic Template installation scripts
# ============================================================

# Configuration variables
REPO_URL="https://github.com/theHat13/dynamic-template.git"
NODE_VERSION_MIN="18"
NODE_VERSION_RECOMMENDED="20"

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ===================== UTILITY FUNCTIONS =====================

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

# Function to display info messages
function info_message {
    echo -e "${CYAN}$1${NC}"
}

# Function to display section headers
function section_header {
    echo -e "${BLUE}===== $1 =====${NC}"
}

# Function to check if a command exists
function command_exists {
    command -v "$1" &>/dev/null
}

# Function to check prerequisites
function check_prerequisites {
    section_header "CHECKING PREREQUISITES"
    
    # Check for Git
    if ! command_exists git; then
        error_exit "Git is required but not installed. Please install Git before running this script."
    else
        success_message "Git is installed: $(git --version)"
    fi
    
    # Check for Node.js
    if ! command_exists node; then
        error_exit "Node.js is required but not installed. Please install Node.js (v${NODE_VERSION_MIN}+ recommended) before running this script."
    else
        NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
        if [[ $NODE_VERSION -lt $NODE_VERSION_MIN ]]; then
            warning_message "Node.js version $NODE_VERSION is below the minimum required version $NODE_VERSION_MIN."
            warning_message "Some features may not work correctly. Consider upgrading Node.js."
        else
            success_message "Node.js is installed: $(node -v)"
        fi
    fi
    
    # Check for npm
    if ! command_exists npm; then
        error_exit "npm is required but not installed. It should be included with Node.js installation."
    else
        success_message "npm is installed: v$(npm --version)"
    fi
    
    # Check package manager availability (informational only)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if ! command_exists brew; then
            warning_message "Homebrew is not installed. Some automated installations may require it."
            info_message "Install Homebrew with: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        else
            success_message "Homebrew is installed: $(brew --version | head -n 1)"
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command_exists apt-get || command_exists dnf || command_exists yum || command_exists pacman; then
            success_message "Package manager detected"
        else
            warning_message "No standard package manager detected. Manual installations may be required."
        fi
    fi
}

# Function to update npm
function update_npm {
    warning_message "Updating npm..."
    
    if npm install -g npm@latest; then
        success_message "npm updated to latest version: v$(npm --version)"
    else
        warning_message "Could not update to latest npm. Trying compatible version..."
        NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
        
        if [[ $NODE_VERSION -eq 18 ]]; then
            npm install -g npm@9.8.1 || warning_message "Could not update npm. You may need to update manually."
            success_message "npm updated to version 9.8.1 (compatible with Node.js 18)."
        elif [[ $NODE_VERSION -eq 20 ]]; then
            npm install -g npm@10.2.4 || warning_message "Could not update npm. You may need to update manually."
            success_message "npm updated to version 10.2.4 (compatible with Node.js 20)."
        else
            npm install -g npm@9.8.1 || warning_message "Could not update npm. You may need to update manually."
            success_message "npm updated to a compatible version: v$(npm --version)"
        fi
    fi
}

# Function to clone repository
function clone_repository {
    local project_dir=$1
    local default_dir=$2
    
    # Ask for project name if not provided
    if [ -z "$project_dir" ]; then
        read -p "Enter project name (press Enter to use '$default_dir'): " project_dir
    fi
    
    # Use default if still empty
    if [ -z "$project_dir" ]; then
        project_dir="$default_dir"
    fi
    
    # Check if directory already exists
    if [ -d "$project_dir" ]; then
        warning_message "Directory $project_dir already exists. Using alternative name."
        project_dir="${project_dir}-$(date +%s)"
    fi
    
    # Display info but avoid mixing output with the return value
    warning_message "Cloning GitHub repository into $project_dir..."
    
    # Clone the repository
    git clone "$REPO_URL" "$project_dir" || error_exit "Failed to clone repository"
    
    # Ensure the directory exists before returning it
    if [ ! -d "$project_dir" ]; then
        error_exit "Cloning failed. Directory $project_dir does not exist."
    fi
    
    # Return the project directory (no extra messages here!)
    echo "$project_dir"
}

# Function to install common dependencies
function install_dependencies {
    local project_dir=$1

    # Debugging: check if project_dir is valid
    if [ ! -d "$project_dir" ]; then
        error_exit "Invalid project directory: '$project_dir'. Cannot install dependencies."
    fi

    # Install npm dependencies
    warning_message "Installing npm dependencies in $project_dir..."
    (cd "$project_dir" && npm install) || error_exit "Error installing dependencies."
    
    success_message "Dependencies installed successfully."
}

# Function to install Storybook
function install_storybook {
    local project_dir=$1
    
    # Install Storybook and related dependencies
    warning_message "Installing Storybook..."
    (cd "$project_dir" && npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport) || warning_message "Storybook installation failed."
    
    # Initialize Storybook
    warning_message "Initializing Storybook..."
    (cd "$project_dir" && npx storybook init --builder webpack5 --use-npm) || warning_message "Storybook initialization failed."
    
    # Install Nunjucks loader
    warning_message "Installing Nunjucks support..."
    (cd "$project_dir" && npm install --save-dev simple-nunjucks-loader) || warning_message "Nunjucks loader installation failed."
    
    # Add scripts to package.json if needed
    if ! grep -q '"storybook":' "$project_dir/package.json"; then
        (cd "$project_dir" && sed -i.bak 's/"scripts": {/"scripts": {\n    "storybook": "storybook dev -p 6006",\n    "build-storybook": "storybook build",/g' package.json && rm -f package.json.bak)
    fi
    
    # Create example story if needed
    if [ ! -d "$project_dir/stories" ]; then
        warning_message "Creating example Button story..."
        mkdir -p "$project_dir/stories"
        
        cat > "$project_dir/stories/Button.stories.js" << 'EOL'
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
    fi
    
    success_message "Storybook installed successfully."
}

# Function to compile TailwindCSS
function compile_tailwind {
    local project_dir=$1
    
    # Ensure CSS directory exists
    mkdir -p "$project_dir/public/css"
    
    # Create output file if it doesn't exist
    touch "$project_dir/public/css/output.css"
    
    # Compile styles
    warning_message "Compiling TailwindCSS styles..."
    (cd "$project_dir" && npx tailwindcss -i ./src/input.css -o ./public/css/output.css) || warning_message "Error compiling TailwindCSS."
    success_message "TailwindCSS styles compiled successfully."
}

# Function to update package.json for concurrent execution
function update_package_json {
    local project_dir=$1
    
    # Check if concurrently is already configured
    if ! grep -q "concurrently" "$project_dir/package.json"; then
        warning_message "Updating npm scripts to use concurrently..."
        
        # Check if there's a start script
        if grep -q '"start":' "$project_dir/package.json"; then
            # Backup the original file
            cp "$project_dir/package.json" "$project_dir/package.json.bak"
            
            # Extract current start command
            CURRENT_START=$(grep -o '"start": *"[^"]*"' "$project_dir/package.json")
            
            if [ -n "$CURRENT_START" ]; then
                # Extract just the command
                CURRENT_CMD=$(echo "$CURRENT_START" | grep -o '"[^"]*"$' | tr -d '"')
                
                # Create new command with concurrently
                NEW_CMD="concurrently \"$CURRENT_CMD\" \"npm run storybook\""
                
                # Update the package.json
                sed -i.tmp "s|$CURRENT_START|\"start\": \"$NEW_CMD\"|" "$project_dir/package.json"
                rm -f "$project_dir/package.json.tmp"
                
                success_message "Updated start script to run Eleventy and Storybook concurrently."
            else
                warning_message "Could not update start script automatically."
            fi
        else
            warning_message "No start script found to update."
        fi
    fi
}

# Function to show installation summary
function show_summary {
    local project_dir=$1
    
    section_header "INSTALLATION SUMMARY"
    
    echo -e "${BLUE}=================================================================${NC}"
    echo -e "${BLUE}                   HAT Dynamic Template                          ${NC}"
    echo -e "${BLUE}              Setup completed successfully!                      ${NC}"
    echo -e "${BLUE}=================================================================${NC}"
    success_message "Project created: $project_dir"
    echo ""
    success_message "Key components installed:"
    success_message "✓ TailwindCSS"
    success_message "✓ Eleventy"
    success_message "✓ Storybook"
    success_message "✓ Nunjucks support"
    success_message "✓ Concurrently"
    echo ""
    success_message "Use the following commands to start:"
    echo -e "${GREEN}cd $project_dir${NC}"
    echo -e "${GREEN}npm start          # Start Eleventy development server${NC}"
    echo -e "${GREEN}npm run storybook  # Start Storybook development server${NC}"
    echo -e "${BLUE}=================================================================${NC}"
    echo -e "${GREEN}The site will be available at: ${CYAN}http://localhost:8080${NC}"
    echo -e "${GREEN}Storybook will be available at: ${CYAN}http://localhost:6006${NC}"
    echo -e "${BLUE}=================================================================${NC}"
}