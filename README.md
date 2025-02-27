# Hat Dynamic Template (HDT)

## Introduction

Welcome to **Hat Dynamic Template**! This project is a web application built with **Eleventy, Nunjucks, TailwindCSS, CLI, Netlify, and Decap CMS**. Follow the setup instructions below to get started.

## Setup Instructions

### Prerequisites

- Linux, macOS, or Windows with a compatible terminal (Git Bash, PowerShell, etc.).
- An active internet connection.

### Installation Steps

1. **Download the Setup Script**  
   Save the `setup-project.sh` file in an accessible folder.

2. **Open a Terminal**  
   - On **Linux/macOS**: Open the Terminal.
   - On **Windows**: Use Git Bash or PowerShell.

3. **Navigate to the Script's Directory**

   ```sh
   cd ~/Desktop  # On Linux/macOS
   cd C:\Users\YourName\Desktop  # On Windows
   ```

4. **Make the Script Executable**

   ```sh
   chmod +x setup-project.sh
   ```

5. **Run the Script**

   ```sh
   ./setup-project.sh
   ```

   The script will:
   - Install necessary dependencies (Git, Node.js, npm) if missing.
   - Clone the project repository.
   - Install project dependencies.
   - Install **TailwindCSS and its CLI**.
   - Initialize **Eleventy, Netlify, and Decap CMS**.

6. **Verify Installation**  
   Once complete, open the `new-hat-project` folder to verify all files.

## Usage

Start the development server:

```sh
cd new-hat-project
npm start
```

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make changes and commit with a descriptive message.
4. Push your branch and open a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
For any issues or questions, feel free to reach out!