#!/bin/bash

# Variables
REPO_URL="https://github.com/theHat13/dynamic-template.git"
PROJECT_DIR="new-hat-project"

# Function to display error messages
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Install Git if not installed
if ! command -v git &>/dev/null; then
    echo "Installing Git..."
    if command -v apt-get &>/dev/null; then
        sudo apt-get update && sudo apt-get install -y git
    elif command -v brew &>/dev/null; then
        brew install git
    else
        error_exit "Unable to install Git. Please install it manually."
    fi
else
    echo "Git is already installed."
fi

# Install Node.js if not installed
if ! command -v node &>/dev/null; then
    echo "Installing Node.js..."
    if command -v apt-get &>/dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v brew &>/dev/null; then
        brew install node
    else
        error_exit "Unable to install Node.js. Please install it manually."
    fi
else
    echo "Node.js is already installed."
fi

# Clone the GitHub repository
echo "Cloning the GitHub repository..."
git clone "$REPO_URL" "$PROJECT_DIR" || error_exit "Error cloning the repository."

# Navigate to the project directory
cd "$PROJECT_DIR" || error_exit "Error navigating to the project directory."

# Install dependencies
echo "Installing dependencies..."
npm install || error_exit "Error installing dependencies."

# Install TailwindCSS and CLI
echo "Installing TailwindCSS and CLI..."
npm install tailwindcss @tailwindcss/cli || error_exit "Error installing TailwindCSS."

# Initialize Eleventy
echo "Initializing Eleventy..."
npx eleventy --serve || error_exit "Error initializing Eleventy."

# Ensure TailwindCSS compiles styles
echo "Building TailwindCSS..."
npx tailwindcss -i ./src/input.css -o ./public/css/output.css --watch || error_exit "Error building TailwindCSS."

# Initialize Netlify
echo "Initializing Netlify..."
npx netlify init || error_exit "Error initializing Netlify."

# Initialize Decap CMS
echo "Initializing Decap CMS..."
npx decap-cms init || error_exit "Error initializing Decap CMS."

echo "Hell yeah! New Hat Dynamic Template setup completed successfully!"

