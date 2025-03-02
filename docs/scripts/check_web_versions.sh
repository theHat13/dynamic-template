#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to get Netlify latest updates
get_netlify_updates() {
    local temp_file=$(mktemp)
    
    # Fetch latest releases from Netlify's GitHub repository
    curl -s "https://api.github.com/repos/netlify/netlify/releases" > "$temp_file"
    
    # Check if curl was successful
    if [ ! -s "$temp_file" ]; then
        echo -e "${RED}Impossible de récupérer les mises à jour de Netlify.${NC}"
        return 1
    fi

    # Extract release information using standard Unix tools
    echo -e "${BLUE}Dernières mises à jour de Netlify :${NC}"
    
    # Extract first 3 releases, using sed and grep to parse JSON-like structure
    releases_count=0
    while IFS= read -r line; do
        if [[ "$line" =~ \"name\":\ \"([^\"]+)\" ]]; then
            name="${BASH_REMATCH[1]}"
            releases_count=$((releases_count + 1))
            
            # Find corresponding published date
            read -r date_line
            if [[ "$date_line" =~ \"published_at\":\ \"([^\"]+)\" ]]; then
                date="${BASH_REMATCH[1]}"
                
                # Find description (truncated)
                read -r desc_line
                if [[ "$desc_line" =~ \"body\":\ \"([^\"]{0,200}) ]]; then
                    desc="${BASH_REMATCH[1]}..."
                    
                    # Print formatted update
                    echo -e "- ${YELLOW}$name${NC} (${GREEN}${date:0:10}${NC}): $desc"
                fi
            fi
        fi
        
        # Stop after 3 releases
        if [ $releases_count -ge 3 ]; then
            break
        fi
    done < <(grep -E '"name"|"published_at"|"body"' "$temp_file")

    # Clean up temporary file
    rm "$temp_file"
}

# Function to get current and latest versions
check_version() {
    local tool=$1
    local current_version=""
    local latest_version=""

    case $tool in
        "nodejs")
            current_version=$(node --version 2>/dev/null)
            latest_version=$(curl -s https://nodejs.org/dist/index.json | head -n 1 | sed -n 's/.*"version": "\([^"]*\)".*/\1/p')
            ;;
        "npm")
            current_version=$(npm --version 2>/dev/null)
            latest_version=$(npm view npm version)
            ;;
        "eleventy")
            current_version=$(npx @11ty/eleventy --version 2>/dev/null)
            latest_version=$(npm view @11ty/eleventy version)
            ;;
        "nunjucks")
            current_version=$(npm list nunjucks | grep nunjucks@ | head -n 1 | sed 's/.*@//')
            latest_version=$(npm view nunjucks version)
            ;;
        "tailwindcss")
            current_version=$(npm list tailwindcss | grep tailwindcss@ | head -n 1 | sed 's/.*@//')
            latest_version=$(npm view tailwindcss version)
            ;;
        "storybook")
            current_version=$(npx sb --version 2>/dev/null)
            latest_version=$(npm view @storybook/cli version)
            ;;
        "decap-cms")
            current_version=$(npm list decap-cms-app | grep decap-cms-app@ | head -n 1 | sed 's/.*@//')
            latest_version=$(npm view decap-cms-app version)
            ;;
        *)
            echo "Outil non reconnu"
            return 1
            ;;
    esac

    echo "$current_version|$latest_version"
}

# Function to open documentation
open_documentation() {
    local tool=$1
    local docs=""

    case $tool in
        "nodejs")
            docs="https://nodejs.org/en/download/"
            ;;
        "npm")
            docs="https://docs.npmjs.com/updating-npm"
            ;;
        "eleventy")
            docs="https://www.11ty.dev/docs/upgrade/"
            ;;
        "nunjucks")
            docs="https://mozilla.github.io/nunjucks/getting-started.html"
            ;;
        "tailwindcss")
            docs="https://tailwindcss.com/blog/tailwindcss-v4-alpha"
            ;;
        "storybook")
            docs="https://storybook.js.org/docs/migration/migration-guide"
            ;;
        "decap-cms")
            docs="https://decapcms.org/docs/upgrading/"
            ;;
    esac

    echo "Documentation recommandée : $docs"
    read -p "Voulez-vous ouvrir la documentation dans votre navigateur par défaut ? (o/n) " open_doc
    if [[ "$open_doc" == "o" || "$open_doc" == "O" ]]; then
        xdg-open "$docs" 2>/dev/null || open "$docs" 2>/dev/null || start "$docs" 2>/dev/null
    fi
}

# Function to update a tool
update_tool() {
    local tool=$1
    local update_command=""

    case $tool in
        "nodejs")
            echo "Veuillez utiliser nvm ou télécharger depuis nodejs.org"
            return 1
            ;;
        "npm")
            update_command="npm install -g npm@latest"
            ;;
        "eleventy")
            update_command="npm install @11ty/eleventy@latest --save-dev"
            ;;
        "nunjucks")
            update_command="npm install nunjucks@latest --save-dev"
            ;;
        "tailwindcss")
            update_command="npm install tailwindcss@latest postcss autoprefixer --save-dev"
            ;;
        "storybook")
            update_command="npx storybook@latest upgrade"
            ;;
        "decap-cms")
            update_command="npm install decap-cms-app@latest --save-dev"
            ;;
        *)
            echo "Mise à jour non prise en charge"
            return 1
            ;;
    esac

    echo -e "${YELLOW}Commande de mise à jour :${NC} $update_command"
    read -p "Voulez-vous procéder à la mise à jour ? (o/n) " confirm
    if [[ "$confirm" == "o" || "$confirm" == "O" ]]; then
        eval "$update_command"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Mise à jour réussie !${NC}"
        else
            echo -e "${RED}Échec de la mise à jour.${NC}"
        fi
    fi
}

# Main script
main() {
    # Array of tools to check
    local tools=("nodejs" "npm" "eleventy" "nunjucks" "tailwindcss" "storybook" "decap-cms")

    echo -e "${BLUE}Vérification des versions de technologies web${NC}"

    for tool in "${tools[@]}"; do
        # Get versions
        version_info=$(check_version "$tool")
        
        # Split version info
        IFS='|' read -r current_version latest_version <<< "$version_info"

        # Print version comparison
        echo -e "\n${YELLOW}$tool${NC}"
        echo -e "Version actuelle : ${GREEN}$current_version${NC}"
        echo -e "Dernière version : ${GREEN}$latest_version${NC}"

        # Compare versions
        if [ "$current_version" != "$latest_version" ]; then
            echo -e "${RED}Une nouvelle version est disponible !${NC}"
            
            # Ask about documentation
            open_documentation "$tool"

            # Ask about update
            read -p "Voulez-vous vérifier les détails de mise à jour ? (o/n) " update_check
            if [[ "$update_check" == "o" || "$update_check" == "O" ]]; then
                update_tool "$tool"
            fi
        else
            echo -e "${GREEN}Vous êtes à jour.${NC}"
        fi
    done

    # Add Netlify updates section
    echo -e "\n${BLUE}====== Mises à jour Netlify ======${NC}"
    get_netlify_updates

    # Additional Netlify resources
    echo -e "\n${YELLOW}Ressources Netlify :${NC}"
    echo -e "- Documentation : https://docs.netlify.com/"
    echo -e "- Blog : https://www.netlify.com/blog/"
    echo -e "- Changelog : https://github.com/netlify/netlify/releases"
}

# Execute main function
main