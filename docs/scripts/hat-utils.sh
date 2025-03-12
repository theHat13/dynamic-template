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

function error_exit {
    echo -e "${RED}ERROR: $1${NC}" 1>&2
    exit 1
}

function warning_message {
    echo -e "${YELLOW}$1${NC}"
}

function success_message {
    echo -e "${GREEN}$1${NC}"
}

function info_message {
    echo -e "${CYAN}$1${NC}"
}

function command_exists {
    command -v "$1" &>/dev/null
}

# ===================== PREREQUISITES CHECK =====================

function check_prerequisites {
    info_message "Checking prerequisites..."
    
    if ! command_exists git; then
        error_exit "Git is required but not installed. Please install Git."
    fi
    
    if ! command_exists node; then
        error_exit "Node.js is required but not installed. Install Node.js (v${NODE_VERSION_MIN}+ recommended)."
    fi

    if ! command_exists npm; then
        error_exit "npm is required but not installed. It should be included with Node.js."
    fi
    
    success_message "All prerequisites are met."
}

# ===================== CLONE REPOSITORY =====================

function clone_repository {
    local project_dir=$1
    local default_dir=$2

    if [ -z "$project_dir" ]; then
        read -p "Enter project name (press Enter to use '$default_dir'): " project_dir
    fi

    if [ -z "$project_dir" ]; then
        project_dir="$default_dir"
    fi

    if [ -d "$project_dir" ]; then
        warning_message "Directory $project_dir already exists. Using alternative name."
        project_dir="${project_dir}-$(date +%s)"
    fi

    warning_message "Cloning GitHub repository into $project_dir..."
    git clone "$REPO_URL" "$project_dir" || error_exit "Failed to clone repository"

    if [ ! -d "$project_dir" ]; then
        error_exit "Cloning failed. Directory $project_dir does not exist."
    fi

    echo "$project_dir"
}

# ===================== INSTALL DEPENDENCIES =====================

function install_dependencies {
    local project_dir=$1

    if [ ! -d "$project_dir" ]; then
        error_exit "Invalid project directory: '$project_dir'. Cannot install dependencies."
    fi

    cd "$project_dir" || error_exit "Failed to access project directory: '$project_dir'."

    warning_message "Installing npm dependencies in $project_dir..."
    npm install || error_exit "Error installing dependencies."

    success_message "Dependencies installed successfully."
}

# ===================== NPM UPDATE =====================

function update_npm {
    warning_message "Updating npm..."
    npm install -g npm@latest || error_exit "Failed to update npm."
    success_message "npm updated to latest version: v$(npm --version)"
}

# ===================== INSTALL STORYBOOK =====================

function install_storybook {
    local project_dir=$1

    warning_message "Installing Storybook..."
    (cd "$project_dir" && npm install --save-dev @storybook/html @storybook/addon-essentials) || warning_message "Storybook installation failed."

    warning_message "Initializing Storybook..."
    (cd "$project_dir" && npx storybook init --builder webpack5 --use-npm) || warning_message "Storybook initialization failed."

    success_message "Storybook installed successfully."
}

# ===================== TAILWIND COMPILATION =====================

function compile_tailwind {
    local project_dir=$1

    mkdir -p "$project_dir/public/css"
    touch "$project_dir/public/css/output.css"

    warning_message "Compiling TailwindCSS styles..."
    (cd "$project_dir" && npx tailwindcss -i ./src/input.css -o ./public/css/output.css) || warning_message "Error compiling TailwindCSS."
    success_message "TailwindCSS styles compiled successfully."
}

# ===================== RUN SCRIPT =====================

check_prerequisites

project_dir=$(clone_repository "$1" "new-hat-project")

install_dependencies "$project_dir"
update_npm
install_storybook "$project_dir"
compile_tailwind "$project_dir"

success_message "Project setup completed successfully!"
