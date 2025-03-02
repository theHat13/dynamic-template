# Hat Dynamic Template (HDT)

## Introduction

Hat Dynamic Template is a front-end development framework based on **Eleventy**, **Nunjucks**, **TailwindCSS v4**, **Storybook** and **Decap CMS**. This project follows the OMA (Organism-Molecule-Atom) architecture for a clear and maintainable component structure.

## Prerequisites

- **Node.js** (v20.0.0 or newer recommended, v18.0.0 minimum)
- **npm** (latest version)
- **Git**

## Quick Installation

### On Linux/macOS

Simply copy and paste this one-liner in your terminal:

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.sh && chmod +x setup-project.sh && ./setup-project.sh
```

### On Windows (PowerShell)

Copy and paste this one-liner in PowerShell:

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.ps1" -OutFile "setup-project.ps1" ; .\setup-project.ps1
```

## Manual Installation

If you prefer to install components manually:

1. **Clone the repository**

   ```sh
   git clone https://github.com/theHat13/dynamic-template.git your-project
   cd your-project
   ```

2. **Install latest Node.js**

   We recommend Node.js 20+ for the best experience:

   ```sh
   # For macOS with Homebrew:
   brew install node

   # For Linux:
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Update npm to latest version**

   ```sh
   npm install -g npm@latest
   ```

4. **Install dependencies**

   ```sh
   npm install
   ```

5. **Install Storybook**

   ```sh
   npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport
   npx storybook init --builder webpack5
   npm install --save-dev simple-nunjucks-loader
   ```

6. **Start the development server**

   ```sh
   npm start
   ```

7. **Start Storybook**

   ```sh
   npm run storybook
   ```

## Troubleshooting Installation

If you encounter errors during installation:

### Node.js Issues

We recommend using Node.js 20+ for the best compatibility with all tools:

```sh
# Check Node.js version
node -v

# Update to Node.js 20:
# For macOS with Homebrew:
brew install node

# For Linux:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### npm Issues

If you encounter npm compatibility errors:

```sh
# First try latest version
npm install -g npm@latest

# If that fails and you're using Node.js 18:
npm install -g npm@9.8.1

# If you're using Node.js 20:
npm install -g npm@10.2.4

# Clean npm cache if needed
npm cache clean --force
```

### Eleventy Issues

```sh
# Install Eleventy globally
npm install -g @11ty/eleventy@latest

# Verify installation
eleventy --version
```

### TailwindCSS Issues

```sh
# Install TailwindCSS dependencies explicitly
npm install tailwindcss@latest @tailwindcss/cli@latest
```

### Storybook Issues

```sh
# Install Storybook dependencies explicitly
npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/addon-viewport

# Rebuild Storybook configuration
npx storybook init --builder webpack5 --use-npm
```

## NPM Scripts

- `npm start` - Start the development server with hot-reload
- `npm run build` - Build the site for production
- `npm run refresh` - Clean cache and generated files
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🔄 Technology Maintenance

### Automatic Technology Update Script

Our project includes a bash script (`check_web_versions.sh` for Unix ou `check_web_versions.ps1` for Windows) for managing and tracking web technology versions.

#### 🚀 Key Features

- Check current technology versions
- Compare with latest available versions
- Interactive updates
- Links to official documentation

#### 🛠 Monitored Technologies

- Node.js
- npm
- Eleventy
- Nunjucks
- TailwindCSS
- Storybook
- Decap CMS
- Netlify Updates

#### 💡 Usage

```bash
# Make the script executable
chmod +x check_web_versions.sh

# Run version check
./check_web_versions.sh
```

#### ⚠️ Recommendations

- Always backup the project before updating
- Manually verify version compatibility
- Test the application after each update

*Tool developed to simplify project maintenance.*

## Customization

### Styles

- Modify `src/input.css` to add custom styles via Tailwind
- Use the Tailwind theme to maintain visual consistency

### Components

Follow the OMA architecture:

- Atoms: Basic components (buttons, form fields)
- Molecules: Combinations of atoms (cards, section headers)
- Organisms: Complete sections (header, footer, page sections)

### Storybook

- Create component stories in the `stories` folder
- Use Storybook to develop and document components in isolation
- Follow the naming convention: `componentName.stories.js`

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `public`

### Decap CMS Configuration

1. Enable Netlify Identity authentication
2. Invite administrators via the Netlify Identity panel
3. Configure `src/admin/config.yml` according to your needs

## Contributing

Contributions are welcome! Create a pull request or open an issue to discuss improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For any questions or assistance, contact us at <carpentier.dev@gmail.com> or open an issue on GitHub.
