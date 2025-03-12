#!/bin/bash

# ============================================================
# HAT Dynamic Template Installation Script
# ============================================================
# This script clones the HAT Dynamic Template repository and
# installs all necessary dependencies.
# ============================================================

# Source the common utilities
if [ -f "./hat-utils.sh" ]; then
    source ./hat-utils.sh
else
    echo "Error: Could not load utilities. Please ensure hat-utils.sh is in the same directory."
    echo "Download it with: curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/hat-utils.sh"
    exit 1
fi

# Display welcome message
echo -e "${BLUE}=================================================================${NC}"
echo -e "${BLUE}           HAT Dynamic Template Installation - Start            ${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Check prerequisites
check_prerequisites

# Update npm
update_npm

# Clone the repository with default name
PROJECT_DIR=$(clone_repository "" "hat-dynamic-template")

# Install dependencies
install_dependencies "$PROJECT_DIR"

# Install and configure Storybook
install_storybook "$PROJECT_DIR"

# Compile TailwindCSS
compile_tailwind "$PROJECT_DIR"

# Set proper permissions for the project directory
chmod -R u+w "$PROJECT_DIR"

# Show installation summary
show_summary "$PROJECT_DIR"