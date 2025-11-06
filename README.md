# VS Code Multi-Root Workspace Documentation

Complete guide and configuration files for setting up a Visual Studio Code multi-root workspace for cross-platform development with Web (React/Node.js), Android, and iOS applications.

---

## 📚 Documentation Files

This repository contains comprehensive documentation and example configurations to help you set up an efficient multi-platform development environment:

### 1. **[QUICKSTART.md](QUICKSTART.md)** - Start Here! ⚡
   - 5-minute setup guide
   - Essential steps to get started quickly
   - Common tasks and troubleshooting
   - Perfect for developers who want to dive in immediately

### 2. **[VSCODE_MULTIROOT_SETUP.md](VSCODE_MULTIROOT_SETUP.md)** - Complete Guide 📖
   - Detailed explanation of multi-root workspaces
   - Step-by-step instructions for all features
   - Platform-specific tips and best practices
   - Advanced configuration options
   - Comprehensive troubleshooting guide

### 3. **[example-project.code-workspace](example-project.code-workspace)** - Sample Configuration 🔧
   - Ready-to-use workspace configuration file
   - Includes settings for Web, Android, and iOS development
   - Pre-configured debug configurations
   - Automated build tasks
   - Extension recommendations

---

## 🎯 What You'll Learn

This documentation covers:

- ✅ Creating and managing multi-root workspaces in VS Code
- ✅ Configuring settings for React, Node.js, Android, and iOS projects
- ✅ Installing and configuring recommended extensions
- ✅ Setting up debugging for all three platforms
- ✅ Running multiple development servers simultaneously
- ✅ Organizing project directories effectively
- ✅ Best practices for cross-platform development
- ✅ Performance optimization tips
- ✅ Team collaboration strategies

---

## 🚀 Quick Start

### Option 1: Use the Example Configuration (Recommended)

1. **Copy the example workspace file:**
   ```bash
   cp example-project.code-workspace my-project.code-workspace
   ```

2. **Edit the file** and update folder paths to match your project structure

3. **Open the workspace** in VS Code:
   ```bash
   code my-project.code-workspace
   ```

4. **Install recommended extensions** when prompted

5. **Start developing!** 🎉

### Option 2: Follow the Guides

1. Read **[QUICKSTART.md](QUICKSTART.md)** for a rapid setup
2. Refer to **[VSCODE_MULTIROOT_SETUP.md](VSCODE_MULTIROOT_SETUP.md)** for detailed information
3. Customize the workspace configuration to your needs

---

## 📁 Recommended Project Structure

Your projects should be organized like this:

```
your-project-root/
├── my-app.code-workspace          # Workspace configuration file
├── web-frontend/                   # React/Node.js web application
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── .vscode/
│       └── launch.json             # Web debugging config
├── android-app/                    # Native Android application
│   ├── app/
│   ├── build.gradle
│   ├── gradlew
│   └── .vscode/
│       └── launch.json             # Android debugging config
├── ios-app/                        # Native iOS application
│   ├── MyApp.xcodeproj
│   ├── MyApp/
│   ├── Podfile
│   └── .vscode/
│       └── launch.json             # iOS debugging config
└── shared/                         # Shared code/resources (optional)
    ├── types/
    ├── constants/
    └── utils/
```

---

## 🛠️ Technologies Covered

### Web Development
- **React** - Frontend framework
- **Node.js** - Backend runtime
- **TypeScript/JavaScript** - Programming languages
- **npm/yarn** - Package managers
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Android Development
- **Java/Kotlin** - Programming languages
- **Gradle** - Build system
- **Android SDK** - Development kit
- **ADB** - Android Debug Bridge

### iOS Development
- **Swift/Objective-C** - Programming languages
- **Xcode** - IDE and build tools
- **CocoaPods/SPM** - Dependency managers
- **LLDB** - Debugger

---

## 💡 Key Features of Multi-Root Workspaces

### Single Window, Multiple Projects
Work on web and mobile apps simultaneously without switching windows.

### Unified Search
Search across all projects with `Ctrl+Shift+F` to find code, references, and documentation quickly.

### Shared Settings
Configure editor settings, formatting rules, and extensions once for all projects.

### Independent Git Repositories
Each project can have its own Git repository while being managed in one workspace.

### Platform-Specific Configurations
Customize settings per project folder (e.g., 2-space tabs for JavaScript, 4-space for Kotlin).

### Simultaneous Debugging
Debug web and backend APIs together, or run multiple build processes at once.

---

## 📦 Recommended VS Code Extensions

The example workspace includes recommendations for these essential extensions:

### Web Development
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- npm Intellisense
- Path Intellisense

### Android Development
- Android iOS Emulator
- Gradle for Java
- Kotlin Language
- XML Tools

### iOS Development
- Swift Language
- SwiftLint
- iOS Common Files

### General Tools
- GitLens (Git supercharged)
- Live Share (Collaboration)
- Todo Tree
- Error Lens
- Better Comments

---

## 🎨 Workspace Features Demonstrated

The example configuration includes:

### 1. **Smart File Exclusions**
Automatically exclude `node_modules`, `build`, `Pods`, and other generated directories from search and file watching.

### 2. **Platform-Specific Formatters**
- Prettier for JavaScript/TypeScript/JSON
- XML Tools for Android layouts
- SwiftLint for iOS code

### 3. **Debug Configurations**
Pre-configured debugging for:
- Chrome (React apps)
- Node.js (Backend APIs)
- Android (APK debugging)
- iOS (Simulator debugging)

### 4. **Automated Tasks**
Run common tasks from the Command Palette:
- Install dependencies
- Start development servers
- Build release versions
- Run linters
- Clean build artifacts

### 5. **Compound Launch Configs**
Launch multiple debuggers together (e.g., React frontend + Node.js backend).

---

## 🔥 Pro Tips

1. **Use Emojis in Folder Names**: 🌐 Web, 🤖 Android, 🍎 iOS - makes visual identification easier!

2. **Name Your Terminals**: Right-click terminal tabs and give them descriptive names.

3. **Keyboard Shortcuts**: Learn these for maximum productivity:
   - `Ctrl+P` - Quick file open
   - `Ctrl+Shift+F` - Search in all files
   - `Ctrl+T` - Go to symbol
   - `` Ctrl+` `` - Toggle terminal

4. **Split Editors**: View web and mobile code side-by-side with `Ctrl+\`.

5. **Workspace Tasks**: Access pre-configured tasks with `Ctrl+Shift+P` → "Tasks: Run Task".

---

## 🤝 Team Collaboration

### Sharing Your Workspace Configuration

1. **Commit the `.code-workspace` file** to version control
2. **Use relative paths** for portability across different machines
3. **Document setup steps** in a project README
4. **Include extension recommendations** in the workspace file

### Best Practices

- Keep platform-specific configurations in each project's `.vscode` folder
- Use workspace settings for shared preferences (formatting, linting rules)
- Document any manual setup steps (API keys, environment variables)
- Consider using `.env.example` files for required environment variables

---

## 🐛 Troubleshooting

Common issues and solutions are covered in:
- **[QUICKSTART.md](QUICKSTART.md)** - Quick fixes for common problems
- **[VSCODE_MULTIROOT_SETUP.md](VSCODE_MULTIROOT_SETUP.md)** - Detailed troubleshooting section

Quick checks:
- ✅ Are all folders accessible and at the correct paths?
- ✅ Are recommended extensions installed?
- ✅ Is each project buildable independently?
- ✅ Are debug configurations using correct paths?
- ✅ Is Git installed and accessible?

---

## 📖 Additional Resources

### Official Documentation
- [VS Code Multi-Root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)
- [VS Code Tasks](https://code.visualstudio.com/docs/editor/tasks)

### Platform-Specific Resources
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Android Developer Guides](https://developer.android.com/guide)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)

---

## 🎯 Getting Started Checklist

Before diving into development:

- [ ] Read [QUICKSTART.md](QUICKSTART.md) for setup instructions
- [ ] Copy and customize `example-project.code-workspace`
- [ ] Update folder paths in the workspace file
- [ ] Open the workspace in VS Code
- [ ] Install recommended extensions
- [ ] Verify each project builds successfully
- [ ] Test at least one debug configuration
- [ ] Set up version control for the workspace file
- [ ] Share the configuration with your team

---

## 📝 Customization Guide

### Adapting for Your Project

1. **Update Folder Names**: Change folder names to match your actual project structure
2. **Modify Paths**: Update all paths in the workspace file
3. **Adjust Settings**: Customize editor settings, formatting rules, and preferences
4. **Add/Remove Extensions**: Update extension recommendations based on your stack
5. **Configure Tasks**: Add custom build, test, or deployment tasks
6. **Update Debug Configs**: Modify debug configurations with your actual URLs and paths

### When to Use Multi-Root Workspaces

✅ **Great for:**
- Full-stack web + mobile apps
- Monorepo-style projects
- Related microservices
- Shared component libraries
- Projects with common team members

❌ **Not ideal for:**
- Completely unrelated projects
- Projects with conflicting dependencies
- When one project is rarely modified
- Projects with different team ownership

---

## 💻 System Requirements

### Minimum Requirements
- **VS Code**: Version 1.70 or later
- **RAM**: 8GB minimum (16GB recommended for iOS development)
- **Storage**: SSD recommended for better performance

### Platform-Specific Requirements
- **Windows 10/11** or **macOS 10.14+** or **Linux** (for web and Android)
- **macOS** required for iOS development
- **Android Studio** recommended for Android development
- **Xcode** required for iOS development

---

## 📄 License

This documentation and example configurations are provided as-is for educational and development purposes.

---

## 🙋 Contributing

Found an issue or have a suggestion? Contributions are welcome!

1. Identify the relevant documentation file
2. Make your changes
3. Test the configuration
4. Submit your improvements

---

## 🌟 Summary

This comprehensive documentation package provides everything you need to set up an efficient multi-platform development environment in Visual Studio Code. Whether you're building a web app with a mobile companion or managing a full-stack project across multiple platforms, these guides and configurations will help you work more productively.

**Start with [QUICKSTART.md](QUICKSTART.md) and you'll be up and running in 5 minutes!**

---

**Happy Multi-Platform Development! 🚀**

*Last Updated: November 2025*
