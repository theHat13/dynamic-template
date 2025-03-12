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

Before running the installation scripts, make sure you have:

- **Git**: Required for cloning the repository
- **Node.js**: Version 18.0.0 minimum, 20.0.0 recommended
- **npm**: Latest version (will be updated by scripts if needed)

### Package Manager Requirements

Depending on your operating system, you may need:

- **macOS**: [Homebrew](https://brew.sh) (`brew`)
- **Linux**: A package manager (apt, dnf, yum or pacman)

## 🚀 Installation Options

### 1️⃣ Create a New Project Based on HAT Template

Use these scripts to set up a new project based on the HAT Dynamic Template:

#### On Linux/macOS

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/hat-utils.sh && chmod +x hat-utils.sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-new-project.sh && chmod +x setup-new-project.sh
./setup-new-project.sh
```

#### On Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-new-project.ps1" -OutFile "setup-new-project.ps1" ; .\setup-new-project.ps1
```

### 2️⃣ Clone the HAT Template for Framework Development

If you want to work on the HAT template framework itself, use these scripts:

#### On Linux/macOS

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/hat-utils.sh && chmod +x hat-utils.sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/clone-hat-template.sh && chmod +x clone-hat-template.sh
./clone-hat-template.sh
```

#### On Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/clone-hat-template.ps1" -OutFile "clone-hat-template.ps1" ; .\clone-hat-template.ps1
```

### 3️⃣ Manual Installation Process

1. **Clone the repository**

   ```sh
   git clone https://github.com/theHat13/dynamic-template.git your-project
   cd your-project
   ```

2. **Install dependencies**

   ```sh
   npm install
   npm install concurrently --save-dev
   ```

3. **Install Storybook**

   ```sh
   npm install --save-dev @storybook/html @storybook/addon-essentials
   npx storybook init --builder webpack5
   ```

4. **Compile TailwindCSS**

   ```sh
   npx tailwindcss -i ./src/input.css -o ./public/css/output.css
   ```

## 🔄 Update and Maintenance

Keep your HAT Dynamic Template installation up to date with these scripts:

#### On Linux/macOS

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/update-project.sh && chmod +x update-project.sh && ./update-project.sh
```

#### On Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/update-project.ps1" -OutFile "update-project.ps1" ; .\update-project.ps1
```

These scripts will:

- Check current versions of all dependencies
- Compare with latest available versions
- Provide options to update components interactively

Monitored technologies:

- Node.js
- npm
- Eleventy
- Nunjucks
- TailwindCSS
- Storybook
- Decap CMS

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
- **Organisms**: Complete sections
- **Core**: Base templates (base, header, footer)

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

## 🤝 Contribution

Contributions are welcome! Create a pull request or open an issue to discuss improvements.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For any questions or assistance, contact: <carpentier.dev@gmail.com>
