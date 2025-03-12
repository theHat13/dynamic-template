#!/bin/bash

# ============================================================
# HAT Dynamic Template Setup Script
# ============================================================
# This script creates a new project based on the HAT Dynamic
# Template repository.
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
echo -e "${BLUE}               New HAT Project Setup - Start                    ${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Check prerequisites
check_prerequisites

# Update npm
update_npm

# Clone the repository with default name
PROJECT_DIR=$(clone_repository "" "new-hat-project")

# Install dependencies
install_dependencies "$PROJECT_DIR"

# Install and configure Storybook
install_storybook "$PROJECT_DIR"

# Update package.json to run Eleventy and Storybook concurrently
update_package_json "$PROJECT_DIR"

# Compile TailwindCSS
compile_tailwind "$PROJECT_DIR"

# Verify or setup Decap CMS
section_header "CHECKING DECAP CMS CONFIGURATION"

if [ -d "$PROJECT_DIR/src/admin" ] || [ -d "$PROJECT_DIR/admin" ]; then
    ADMIN_DIR=$([ -d "$PROJECT_DIR/src/admin" ] && echo "src/admin" || echo "admin")
    success_message "Decap CMS admin directory found at: $ADMIN_DIR"
    
    # Check if CMS is properly configured
    if [ -f "$PROJECT_DIR/$ADMIN_DIR/config.yml" ] && [ -f "$PROJECT_DIR/$ADMIN_DIR/index.html" ]; then
        success_message "Decap CMS appears to be configured properly."
        
        # Check if decap-cms script is present
        if ! grep -q "decap-cms" "$PROJECT_DIR/$ADMIN_DIR/index.html"; then
            warning_message "Updating CMS script references in index.html..."
            if grep -q "netlify-cms" "$PROJECT_DIR/$ADMIN_DIR/index.html"; then
                sed -i 's/netlify-cms/decap-cms/g' "$PROJECT_DIR/$ADMIN_DIR/index.html"
                success_message "Updated Netlify CMS references to Decap CMS."
            fi
        fi
    else
        warning_message "Decap CMS configuration might be incomplete."
    fi
else
    warning_message "Decap CMS admin directory not found."
    read -p "Would you like to set up basic Decap CMS configuration? (y/N) " setup_cms
    
    if [[ "$setup_cms" == "y" || "$setup_cms" == "Y" ]]; then
        # Create admin directory
        mkdir -p "$PROJECT_DIR/src/admin"
        
        # Create basic config.yml
        cat > "$PROJECT_DIR/src/admin/config.yml" << 'EOL'
backend:
  name: git-gateway
  branch: main

media_folder: "public/assets/uploads"
public_folder: "/assets/uploads"

collections:
  - name: "pages"
    label: "Pages"
    files:
      - name: "home"
        label: "Home Page"
        file: "src/_data/home.json"
        fields:
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Description", name: "description", widget: "text"}
          
  - name: "blog"
    label: "Blog"
    folder: "src/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "image", widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
EOL
        
        # Create admin index.html
        cat > "$PROJECT_DIR/src/admin/index.html" << 'EOL'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
EOL

        # Create necessary directories
        mkdir -p "$PROJECT_DIR/src/blog" "$PROJECT_DIR/public/assets/uploads"
        
        # Create basic home.json if it doesn't exist
        if [ ! -f "$PROJECT_DIR/src/_data/home.json" ]; then
            mkdir -p "$PROJECT_DIR/src/_data"
            cat > "$PROJECT_DIR/src/_data/home.json" << 'EOL'
{
  "title": "Welcome to HAT Dynamic Template",
  "description": "A flexible and modern web template using Eleventy, Nunjucks, and TailwindCSS"
}
EOL
        fi
        
        success_message "Decap CMS set up successfully in src/admin/"
        info_message "Note: You'll need to enable Identity service in your Netlify dashboard to use Decap CMS."
    else
        info_message "Skipping Decap CMS setup. You can configure it manually later if needed."
    fi
fi

# Set proper permissions for the project directory
chmod -R u+w "$PROJECT_DIR"

# Show installation summary with extra details
section_header "SETUP COMPLETED"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${BLUE}                   HAT Dynamic Template                          ${NC}"
echo -e "${BLUE}              Setup completed successfully!                      ${NC}"
echo -e "${BLUE}=================================================================${NC}"
success_message "Project created: $PROJECT_DIR"
echo ""
success_message "Key components installed:"
success_message "✓ TailwindCSS"
success_message "✓ Eleventy"
success_message "✓ Storybook"
success_message "✓ Nunjucks support"
success_message "✓ Concurrently"

# Add Decap CMS information if configured
if [ -d "$PROJECT_DIR/src/admin" ] || [ -d "$PROJECT_DIR/admin" ]; then
    success_message "✓ Decap CMS (configured)"
    info_message "  To use Decap CMS with Netlify:"
    info_message "  1. Deploy this site to Netlify"
    info_message "  2. Enable Identity in Netlify dashboard"
    info_message "  3. Enable Git Gateway in Netlify dashboard"
fi

echo ""
success_message "Use the following commands to start:"
echo -e "${GREEN}cd $PROJECT_DIR${NC}"
echo -e "${GREEN}npm start          # Start Eleventy development server + Storybook${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}The site will be available at: ${CYAN}http://localhost:8080${NC}"
echo -e "${GREEN}Storybook will be available at: ${CYAN}http://localhost:6006${NC}"
echo -e "${BLUE}=================================================================${NC}"