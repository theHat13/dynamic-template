# Hat Dynamic Template (HDT)

## 🌟 Introduction

Hat Dynamic Template is a front-end development framework designed to create modular and maintainable websites. It combines the following technologies:

- **Eleventy**: Static site generator
- **Nunjucks**: Template engine
- **TailwindCSS v4**: Utility-first CSS framework
- **Storybook**: Isolated component development
- **Decap CMS**: Content management

### Architecture

The project follows the OMA (Organism-Molecule-Atom) architecture to ensure a clear and scalable component structure.

## 🔧 Prerequisites

- Node.js (v20.0.0 recommended, minimum v18.0.0)
- npm (latest version)
- Git

## 🚀 Quick Installation

### On Linux/macOS

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.sh && chmod +x setup-project.sh && ./setup-project.sh
```

### On Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.ps1" -OutFile "setup-project.ps1" ; .\setup-project.ps1
```

## 📦 Manual Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/theHat13/dynamic-template.git your-project
   cd your-project
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Install Storybook**

   ```sh
   npm install --save-dev @storybook/html @storybook/addon-essentials
   npx storybook init --builder webpack5
   ```

## 🖥 NPM Scripts

- `npm start`: Start development server
- `npm run build`: Compile site for production
- `npm run refresh`: Clear cache and generated files
- `npm run storybook`: Start Storybook
- `npm run build-storybook`: Compile Storybook for production

## 🛠 Customization

### Styles

- Modify `src/input.css` to add custom styles
- Use Tailwind theme to maintain visual consistency

### Components

Follow the OMA architecture:

- **Atoms**: Basic components (buttons, form fields)
- **Molecules**: Combinations of atoms (cards, section headers)
- **Organisms**: Complete sections (header, footer)

### Storybook

- Create component stories in the `stories` folder
- Develop and document components in isolation
- Follow naming convention: `componentName.stories.js`

## 🚢 Deployment

### Netlify

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `public`

### Decap CMS Configuration

1. Enable Netlify Identity authentication
2. Invite administrators via Netlify Identity panel
3. Configure `src/admin/config.yml` according to your needs

## 🔄 Technology Maintenance

Use the `check_web_versions.sh` (Unix) or `check_web_versions.ps1` (Windows) script to:

- Check current versions
- Compare with latest available versions
- Update interactively

Monitored technologies:

- Node.js
- npm
- Eleventy
- Nunjucks
- TailwindCSS
- Storybook
- Decap CMS

## 🤝 Contribution

Contributions are welcome! Create a pull request or open an issue to discuss improvements.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For any questions or assistance, contact: <carpentier.dev@gmail.com>
