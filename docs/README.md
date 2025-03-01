# Hat Dynamic Template (HDT)

## Introduction

Hat Dynamic Template is a front-end development framework based on **Eleventy**, **Nunjucks**, **TailwindCSS v4**, **Storybook** and **Decap CMS**. This project follows the OMA (Organism-Molecule-Atom) architecture for a clear and maintainable component structure.

## Prerequisites

- **Node.js** (v20.0.0 or newer recommended, v18.0.0 minimum)
- **npm** (latest version)
- **Git**

## Installation via script (recommended)

For an automated installation that handles all dependencies and configurations:

### On Linux/macOS

1. **Download the script**

   ```sh
   curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.sh
   ```

2. **Make the script executable**

   ```sh
   chmod +x setup-project.sh
   ```

3. **Run the script**

   ```sh
   ./setup-project.sh
   ```

### On Windows (PowerShell)

1. **Download the script**

   ```powershell
   Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.ps1" -OutFile "setup-project.ps1"
   ```

2. **Run the script**

   ```powershell
   .\setup-project.ps1
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

7. **Access the site**  
   The site is available at [http://localhost:8080](http://localhost:8080)

8. **Start Storybook**

   ```sh
   npm run storybook
   ```

9.  **Access Storybook**  
   Storybook is available at [http://localhost:6006](http://localhost:6006)

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
npm install --save-dev @storybook/html @storybook/addon-essentials @storybook/addon-interactions

# Rebuild Storybook configuration
npx storybook init --builder webpack5
```

## Project Structure

```sh
.
├── src/                    # Source code
│   ├── _data/              # Global data for templates
│   ├── _includes/          # Components and partials
│   │   ├── 00-organisms-*/ # Organism components (large blocks)
│   │   ├── 01-molecules-*/ # Molecule components (groups of atoms)
│   │   └── 02-atoms-*/     # Atom components (basic elements)
│   ├── admin/              # Decap CMS interface
│   ├── assets/             # Images, static files
│   ├── blog/               # Blog posts
│   └── input.css           # Main CSS file for Tailwind
├── .storybook/            # Storybook configuration
├── stories/               # Storybook component stories
├── .eleventy.js            # Eleventy configuration
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

## NPM Scripts

- `npm start` - Start the development server with hot-reload
- `npm run build` - Build the site for production
- `npm run refresh` - Clean cache and generated files
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

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
