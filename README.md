# HAT dynamic template (HDT)

## Table of Contents

- [HAT dynamic template (HDT)](#hat-dynamic-template-hdt)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup Instructions](#setup-instructions)
    - [Operating Procedure: Using the Script to Set Up a Web Project](#operating-procedure-using-the-script-to-set-up-a-web-project)
      - [Prerequisites](#prerequisites)
      - [Bash Script](#bash-script)
      - [Steps to Follow](#steps-to-follow)
      - [Troubleshooting](#troubleshooting)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

Welcome to HAT dynamic template! This project is a web application built using Eleventy, Nunjucks, TailwindCSS, Vite, Netlify, and Decap CMS. Follow the setup instructions below to get started.

## Features

- **Eleventy**: Static site generator.
- **Nunjucks**: Templating engine.
- **TailwindCSS**: Utility-first CSS framework.
- **Vite**: Fast build tool.
- **Netlify**: Deployment platform.
- **Decap CMS**: Headless CMS.

## Setup Instructions

### Operating Procedure: Using the Script to Set Up a Web Project

This guide explains how to use a Bash script to automate the setup of a web project from a GitHub repository. Follow these simple steps to configure your project without needing development skills.

#### Prerequisites

- A computer with a compatible operating system (Linux, macOS, or Windows with a compatible terminal like Git Bash).
- An internet connection.

#### Bash Script

Here is the Bash script you will use to automate the setup of your web project.

```bash
#!/bin/bash

# Variables
REPO_URL="https://git@github.com:theHat13/dynamic-template.git"
PROJECT_DIR="new-HDT-project"

# Function to display error messages
function error_exit {
    echo "$1" 1>&2
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
git clone $REPO_URL $PROJECT_DIR || error_exit "Error cloning the repository."

# Navigate to the project directory
cd $PROJECT_DIR || error_exit "Error navigating to the project directory."

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

echo "Project setup completed successfully!"
```

#### Steps to Follow

1. **Download the Script**
   - Open your web browser and download the Bash script from the following link: [Download the script](#) (replace this link with the actual URL where the script is hosted).
   - Save the file to your desktop or an easily accessible folder. The file should have a `.sh` extension, for example, `setup-project.sh`.

2. **Open the Terminal**
   - On Linux or macOS: Open the "Terminal" application from your applications menu.
   - On Windows: Open "Git Bash" if you have it installed, or use "PowerShell".

3. **Navigate to the Script's Directory**
   - Use the `cd` command to navigate to the directory where you saved the script. For example, if the script is on your desktop, type:
     ```sh
     cd ~/Desktop
     ```
     or
     ```sh
     cd C:\Users\YourName\Desktop
     ```
     on Windows.

4. **Make the Script Executable**
   - Type the following command to make the script executable:
     ```sh
     chmod +x setup-project.sh
     ```
     This command allows you to run the script as a program.

5. **Run the Script**
   - Type the following command to run the script:
     ```sh
     ./setup-project.sh
     ```
   - Follow the instructions displayed in the terminal. The script will:
     - Check if the necessary tools (Git, Node.js, npm) are installed and install them if needed.
     - Clone the specified GitHub repository.
     - Install the project dependencies.
     - Initialize the necessary tools (Eleventy, TailwindCSS, Vite, Netlify, Decap CMS).

6. **Verify the Installation**
   - Once the script is finished, you will see a message indicating that the project setup is complete.
   - Open the project folder created by the script (by default, it is named `my-web-project`) to verify that all files are present.

#### Troubleshooting

- If an error occurs, the script will display an error message. Follow the instructions in the message or contact a system administrator for help.
- Ensure you have an active internet connection while running the script, as it downloads files from the internet.

## Usage

Once the project is set up, you can start developing your web application. Use the following commands to run the development server:

```sh
cd my-web-project
npm run dev
```

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your fork.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contact technical support if you have any further questions or issues.