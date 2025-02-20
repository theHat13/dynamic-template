# Hat Dynamic Template (HDT)

## Introduction

Welcome to Hat Dynamic Template ! This project is a web application built using Eleventy, Nunjucks, TailwindCSS, Vite, Netlify, and Decap CMS. Follow the setup instructions below to get started.

## Setup Instructions

### Prerequisites

- A computer with a compatible operating system (Linux, macOS, or Windows with a compatible terminal like Git Bash).
- An internet connection.

### Steps to Follow

1. **Download the Script**
   - Save the `setup-project.sh` file to your desktop or an easily accessible folder.

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

## Usage

Once the project is set up, you can start developing your web application. Use the following commands to run the development server:

```sh
cd new-hat-project
npm start
```

To build only the CSS, run:

```sh
npm run build:css
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