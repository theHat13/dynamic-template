#!/bin/bash

# Nunjucks Version Compatibility Fix Script

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Specific Versions
NUNJUCKS_VERSION="3.2.4"

# Logging functions
log_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Remove existing conflicting packages
log_warning "Removing existing nunjucks and nunjucks-loader packages..."
npm uninstall nunjucks-loader nunjucks || true

# Clear npm cache
npm cache clean --force

# Install compatible versions
log_warning "Installing compatible Nunjucks and Simple Nunjucks Loader versions..."
npm install nunjucks@"$NUNJUCKS_VERSION" simple-nunjucks-loader --save-dev

# Update Storybook configuration
log_warning "Updating Storybook webpack configuration..."
STORYBOOK_CONFIG=".storybook/main.js"

if [ -f "$STORYBOOK_CONFIG" ]; then
    # Replace nunjucks-loader references with simple-nunjucks-loader
    sed -i 's/nunjucks-loader/simple-nunjucks-loader/g' "$STORYBOOK_CONFIG"
    
    # Ensure loader configuration is correct
    if ! grep -q "simple-nunjucks-loader" "$STORYBOOK_CONFIG"; then
        sed -i '/rules: \[/a\      {\n        test: /\.njk$/,\n        use: ["simple-nunjucks-loader"]\n      },' "$STORYBOOK_CONFIG"
    fi
else
    log_warning "Storybook configuration file not found. You may need to manually update webpack configuration."
fi

# Verify installations
log_warning "Verifying package installations..."
npm list nunjucks
npm list simple-nunjucks-loader

# Final check and cleanup
log_warning "Running npm audit to check for any remaining issues..."
npm audit fix

log_success "Nunjucks version compatibility fix completed!"
log_success "Recommended next steps:"
log_success "1. Review your project's Nunjucks and loader configurations"
log_success "2. Test your build and development processes"
log_success "3. Commit changes to version control"

exit 0