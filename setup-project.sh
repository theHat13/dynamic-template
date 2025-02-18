#!/bin/bash

# Variables
REPO_URL="https://github.com/theHat13/dynamic-template.git"
PROJECT_DIR="new-hat-project"

# Function to display error messages
function error_exit {
    echo "\\$1" 1>&2
    exit 1
}

# Function to install Git
function install_git {
    echo "Installing Git..."
    if command -v apt-get &>/dev/null; then
        sudo apt-get update
        sudo apt-get install -y git
    elif command -v brew &>/dev/null; then
        brew install git
    else
        error_exit "Unable to install Git. Please install Git manually."
    fi
}

# Function to install Node.js and npm
function install_node {
    echo "Installing Node.js and npm..."
    if command -v apt-get &>/dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v brew &>/dev/null; then
        brew install node
    else
        error_exit "Unable to install Node.js. Please install Node.js manually."
    fi
}

# Check and install Git if necessary
if ! command -v git &>/dev/null; then
    install_git
else
    echo "Git is already installed."
fi

# Check and install Node.js and npm if necessary
if ! command -v node &>/dev/null || ! command -v npm &>/dev/null; then
    install_node
else
    echo "Node.js and npm are already installed."
fi

# Clone the GitHub repository
echo "Cloning the GitHub repository..."
git clone \\$REPO_URL \\$PROJECT_DIR || error_exit "Error cloning the repository."

# Navigate to the project directory
cd \\$PROJECT_DIR || error_exit "Error navigating to the project directory."

# Install dependencies
echo "Installing dependencies..."
npm install || error_exit "Error installing dependencies."

# Initialize Eleventy
echo "Initializing Eleventy..."
npx eleventy --serve || error_exit "Error initializing Eleventy."

# Initialize TailwindCSS
echo "Initializing TailwindCSS..."
npx tailwindcss init || error_exit "Error initializing TailwindCSS."

# Initialize Vite
echo "Initializing Vite..."
npm run dev || error_exit "Error initializing Vite."

# Initialize Netlify
echo "Initializing Netlify..."
npx netlify init || error_exit "Error initializing Netlify."

# Initialize Decap CMS
echo "Initializing Decap CMS..."
npx decap-cms init || error_exit "Error initializing Decap CMS."

echo "Hell yeah! New Hat Dynamic Template setup completed successfully!"