# VS Code Multi-Root Workspace Setup Guide

## Complete Guide for Web (React/Node.js), Android, and iOS Development

This guide will help you set up a multi-root workspace in Visual Studio Code for projects that include:
- **Web Frontend**: React and Node.js
- **Android Mobile App**: Native Android development
- **iOS Mobile App**: Native iOS development

---

## Table of Contents

1. [What is a Multi-Root Workspace?](#what-is-a-multi-root-workspace)
2. [Creating a Multi-Root Workspace](#creating-a-multi-root-workspace)
3. [Adding Project Folders](#adding-project-folders)
4. [Recommended Extensions](#recommended-extensions)
5. [Running and Debugging](#running-and-debugging)
6. [Project Organization](#project-organization)
7. [Workspace Configuration](#workspace-configuration)
8. [Tips and Best Practices](#tips-and-best-practices)

---

## What is a Multi-Root Workspace?

A multi-root workspace allows you to work with multiple project folders simultaneously in a single VS Code window. This is ideal for full-stack or multi-platform projects where you need to:

- Work on web and mobile apps together
- Share code between projects
- Run multiple development servers simultaneously
- Keep related projects organized in one workspace

**Benefits:**
- Single window for all related projects
- Shared settings and extensions
- Unified search across all folders
- Easier context switching between platforms

---

## Creating a Multi-Root Workspace

### Method 1: Creating from Scratch

1. **Open VS Code** (start with an empty window or close current folders)

2. **Open the Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac)

3. **Type and select**: `Workspaces: Add Folder to Workspace...`

4. **Select your first project folder** (e.g., your web frontend folder)

5. **Repeat steps 2-4** for each additional folder:
   - Add your Android project folder
   - Add your iOS project folder

6. **Save the workspace**:
   - Open Command Palette again (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type and select: `Workspaces: Save Workspace As...`
   - Choose a location and name (e.g., `my-app-workspace.code-workspace`)

### Method 2: Creating from Existing Folder

1. **Open one of your project folders** in VS Code

2. **Add additional folders**:
   - Use Command Palette → `Workspaces: Add Folder to Workspace...`
   - Add each additional project folder

3. **Save the workspace** as described above

### Method 3: Manual Creation

1. **Create a new file** with `.code-workspace` extension (e.g., `my-app-workspace.code-workspace`)

2. **Add the following structure**:
```json
{
  "folders": [
    {
      "name": "Web Frontend",
      "path": "./web-frontend"
    },
    {
      "name": "Android App",
      "path": "./android-app"
    },
    {
      "name": "iOS App",
      "path": "./ios-app"
    }
  ],
  "settings": {}
}
```

3. **Open the workspace file**:
   - Double-click the `.code-workspace` file, or
   - Use `File > Open Workspace from File...` in VS Code

---

## Adding Project Folders

### Folder Structure Recommendations

Organize your projects in one of these ways:

**Option 1: Sibling Folders**
```
project-root/
├── my-app-workspace.code-workspace
├── web-frontend/
│   ├── package.json
│   ├── src/
│   └── public/
├── android-app/
│   ├── app/
│   ├── build.gradle
│   └── AndroidManifest.xml
└── ios-app/
    ├── MyApp.xcodeproj
    ├── MyApp/
    └── Podfile
```

**Option 2: Separate Root Locations**
```
C:/Projects/
├── my-workspace.code-workspace
├── MyApp-Web/
├── MyApp-Android/
└── MyApp-iOS/
```

### Folder Paths

In your `.code-workspace` file, paths can be:

- **Relative**: `./web-frontend` (relative to workspace file location)
- **Absolute**: `C:/Projects/MyApp-Web` or `/Users/dev/projects/MyApp-Web`

**Recommendation**: Use relative paths when possible for portability across machines.

---

## Recommended Extensions

### For Web Development (React & Node.js)

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`
   - Provides code snippets for React

2. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - JavaScript/TypeScript linting

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Code formatting

4. **Auto Rename Tag**
   - ID: `formulahendry.auto-rename-tag`
   - Auto rename paired HTML/XML tags

5. **JavaScript (ES6) code snippets**
   - ID: `xabikos.JavaScriptSnippets`
   - JavaScript snippets

6. **npm Intellisense**
   - ID: `christian-kohler.npm-intellisense`
   - Autocompletes npm modules

7. **Path Intellisense**
   - ID: `christian-kohler.path-intellisense`
   - Autocompletes filenames

### For Android Development

1. **Android iOS Emulator**
   - ID: `dimagoltsman.vscode-android-emulator`
   - Launch Android emulators from VS Code

2. **Gradle for Java**
   - ID: `vscjava.vscode-gradle`
   - Gradle build support

3. **Kotlin Language**
   - ID: `mathiasfrohlich.Kotlin`
   - Kotlin syntax highlighting and support

4. **XML Tools**
   - ID: `DotJoshJohnson.xml`
   - XML formatting and XPath evaluation

5. **Android Studio Extensions Pack** (optional)
   - ID: `alexkrechik.android-studio-extensions-pack`
   - Collection of useful Android extensions

### For iOS Development

1. **Swift Language**
   - ID: `sswg.swift-lang`
   - Official Swift language support

2. **iOS Common Files**
   - ID: `Orta.vscode-ios-common-files`
   - File navigation for iOS projects

3. **iOS Debug**
   - ID: `iosdev.ios-debug`
   - Debug iOS apps from VS Code

4. **Xcode Extension Pack** (optional)
   - ID: `mantador.xcode-extension-pack`
   - Collection of iOS development tools

5. **SwiftLint**
   - ID: `vknabel.vscode-swiftlint`
   - Swift code linting

### General Development Tools

1. **GitLens**
   - ID: `eamodio.gitlens`
   - Enhanced Git capabilities

2. **Live Share**
   - ID: `MS-vsliveshare.vsliveshare`
   - Real-time collaboration

3. **Todo Tree**
   - ID: `Gruntfuggly.todo-tree`
   - Show TODO, FIXME comments

4. **Better Comments**
   - ID: `aaron-bond.better-comments`
   - Colorful comment annotations

5. **Error Lens**
   - ID: `usernamehw.errorlens`
   - Inline error highlights

### Installing Extensions

**Method 1: Via Extensions View**
1. Open Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for extension name
3. Click Install

**Method 2: Via Command Line**
```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
# ... and so on
```

**Method 3: Workspace Recommendations**
Add to your `.code-workspace` file (see Workspace Configuration section)

---

## Running and Debugging

### Running Multiple Projects Simultaneously

VS Code allows you to run multiple terminal instances for different projects:

1. **Open Integrated Terminal** (`Ctrl+`` or `Cmd+``)

2. **Create separate terminals for each project**:
   - Click the `+` button or press `Ctrl+Shift+`` 
   - Select the workspace folder for each terminal

3. **Example workflow**:
   - **Terminal 1 (Web)**: `cd web-frontend && npm start`
   - **Terminal 2 (Android)**: `cd android-app && ./gradlew assembleDebug`
   - **Terminal 3 (iOS)**: `cd ios-app && pod install`

**Tip**: Name your terminals for easy identification:
- Right-click terminal tab → `Rename`
- Or use `Terminal: Rename` command

### Setting Up Debug Configurations

Create a `.vscode/launch.json` file in your workspace root or in each project folder:

**For Web (React/Node.js) - In web-frontend/.vscode/launch.json**:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch React App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Debug Node.js Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/index.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

**For Android - In android-app/.vscode/launch.json**:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "android",
      "request": "launch",
      "name": "Debug Android App",
      "appSrcRoot": "${workspaceFolder}/app/src/main",
      "apkFile": "${workspaceFolder}/app/build/outputs/apk/debug/app-debug.apk",
      "adbPort": 5037
    }
  ]
}
```

**For iOS - In ios-app/.vscode/launch.json**:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug iOS App",
      "program": "${workspaceFolder}/build/Debug-iphonesimulator/MyApp.app",
      "preLaunchTask": "build-ios"
    }
  ]
}
```

### Debugging Tips

1. **Compound Configurations**: Launch multiple debuggers simultaneously
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       { "name": "React", "..." },
       { "name": "Node", "..." }
     ],
     "compounds": [
       {
         "name": "Full Stack",
         "configurations": ["React", "Node"]
       }
     ]
   }
   ```

2. **Use Breakpoints**: Set breakpoints in any file across all projects

3. **Debug Console**: Switch between different debug sessions in the Debug Console

4. **Platform-Specific Debugging**:
   - **Web**: Use Chrome DevTools integration
   - **Android**: Connect via ADB, use Android logcat
   - **iOS**: Use lldb, iOS simulator logs

---

## Project Organization

### Best Practices

1. **Keep Projects Separate**: Each platform should be in its own folder
   - Don't mix web, Android, and iOS code in the same directory
   - Maintain clear boundaries between projects

2. **Shared Code**: If you have shared code (e.g., API contracts, types):
   ```
   project-root/
   ├── shared/
   │   ├── types/
   │   ├── constants/
   │   └── utils/
   ├── web-frontend/
   ├── android-app/
   └── ios-app/
   ```

3. **Documentation**: Keep project-level docs in each folder
   ```
   web-frontend/
   ├── README.md          (Web-specific setup)
   android-app/
   ├── README.md          (Android-specific setup)
   ios-app/
   ├── README.md          (iOS-specific setup)
   ```

4. **Workspace-Level Files**:
   ```
   project-root/
   ├── my-app.code-workspace
   ├── README.md          (Overall project info)
   ├── CONTRIBUTING.md
   └── .gitignore         (Workspace-level ignores)
   ```

### Workspace Settings Organization

Use folder-specific settings when needed:
```json
{
  "folders": [
    {
      "name": "Web",
      "path": "./web-frontend"
    }
  ],
  "settings": {
    "files.exclude": {
      "**/node_modules": true
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
}
```

---

## Workspace Configuration

### Complete Example `.code-workspace` File

Here's a comprehensive example that includes all recommended settings:

```json
{
  "folders": [
    {
      "name": "🌐 Web Frontend",
      "path": "./web-frontend"
    },
    {
      "name": "🤖 Android App",
      "path": "./android-app"
    },
    {
      "name": "🍎 iOS App",
      "path": "./ios-app"
    },
    {
      "name": "📦 Shared",
      "path": "./shared"
    }
  ],
  "settings": {
    // Editor Settings
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.tabSize": 2,
    "editor.detectIndentation": true,
    
    // File Settings
    "files.autoSave": "onFocusChange",
    "files.exclude": {
      "**/.git": true,
      "**/.DS_Store": true,
      "**/node_modules": true,
      "**/.gradle": true,
      "**/build": true,
      "**/.idea": true,
      "**/Pods": true,
      "**/*.xcworkspace": false
    },
    
    // Search Settings
    "search.exclude": {
      "**/node_modules": true,
      "**/bower_components": true,
      "**/*.code-search": true,
      "**/build": true,
      "**/Pods": true
    },
    
    // JavaScript/TypeScript
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    
    // React
    "emmet.includeLanguages": {
      "javascript": "javascriptreact"
    },
    
    // Kotlin/Android
    "[kotlin]": {
      "editor.tabSize": 4
    },
    
    // Swift/iOS
    "[swift]": {
      "editor.tabSize": 4
    },
    
    // XML for Android
    "[xml]": {
      "editor.defaultFormatter": "DotJoshJohnson.xml",
      "editor.tabSize": 4
    },
    
    // Terminal
    "terminal.integrated.splitCwd": "workspaceRoot",
    
    // Git
    "git.autofetch": true,
    "git.confirmSync": false,
    
    // ESLint
    "eslint.workingDirectories": [
      "./web-frontend"
    ]
  },
  "extensions": {
    "recommendations": [
      // Web Development
      "dsznajder.es7-react-js-snippets",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "formulahendry.auto-rename-tag",
      "christian-kohler.npm-intellisense",
      "christian-kohler.path-intellisense",
      
      // Android Development
      "dimagoltsman.vscode-android-emulator",
      "vscjava.vscode-gradle",
      "mathiasfrohlich.Kotlin",
      "DotJoshJohnson.xml",
      
      // iOS Development
      "sswg.swift-lang",
      "vknabel.vscode-swiftlint",
      
      // General Tools
      "eamodio.gitlens",
      "Gruntfuggly.todo-tree",
      "usernamehw.errorlens"
    ]
  },
  "launch": {
    "version": "0.2.0",
    "configurations": [],
    "compounds": []
  },
  "tasks": {
    "version": "2.0.0",
    "tasks": []
  }
}
```

### Understanding the Configuration

**Folders Section**:
- `name`: Display name in VS Code sidebar (use emojis for visual clarity!)
- `path`: Relative or absolute path to the folder

**Settings Section**:
- Workspace-wide settings that apply to all folders
- Can be overridden in individual folder `.vscode/settings.json` files

**Extensions Section**:
- `recommendations`: Extensions VS Code will suggest installing
- Users will see a prompt when opening the workspace

**Launch Section**:
- Shared debug configurations
- Can reference files in any workspace folder

**Tasks Section**:
- Automated build/test tasks
- Can be triggered with keyboard shortcuts

---

## Tips and Best Practices

### Workspace Management

1. **Use Descriptive Names**: Name your workspace file and folder entries clearly
   - ✅ `myapp-fullstack.code-workspace`
   - ❌ `workspace.code-workspace`

2. **Emojis for Visual Clarity**: Add emojis to folder names
   - Makes it easier to identify projects in the sidebar
   - Examples: 🌐 Web, 🤖 Android, 🍎 iOS, 📦 Shared, 🔧 Tools

3. **Version Control**: Commit your `.code-workspace` file
   - Share configuration with your team
   - Consider using relative paths for portability

4. **Gitignore**: Add workspace-specific files to `.gitignore`:
   ```
   # VS Code workspace specific
   .vscode/
   *.code-workspace.backup
   ```

### Platform-Specific Tips

#### Web Development

- **Hot Reload**: React's hot module replacement works seamlessly
- **Port Management**: Use different ports for frontend and backend
  - Frontend: `localhost:3000`
  - Backend: `localhost:5000` or `localhost:8080`
- **Environment Variables**: Use `.env` files, keep them out of version control

#### Android Development

- **Use Android Studio When Needed**: VS Code is great for editing, but use Android Studio for:
  - Complex UI layout design
  - Gradle configuration issues
  - Advanced debugging
- **ADB**: Ensure ADB is in your PATH for emulator access
- **Gradle Wrapper**: Always use `./gradlew` (or `gradlew.bat` on Windows)

#### iOS Development

- **Use Xcode When Needed**: VS Code is excellent for code editing, but use Xcode for:
  - Interface Builder (Storyboards/XIBs)
  - Signing & Capabilities configuration
  - Complex build configurations
  - Asset catalogs
- **CocoaPods/SPM**: Manage dependencies outside VS Code initially
- **Build Output**: iOS builds generate many files; exclude them from search

### Performance Tips

1. **Exclude Build Folders**: Add to `files.exclude` and `search.exclude`
   - `node_modules`, `build`, `Pods`, `.gradle`

2. **Disable Extensions per Workspace**: Some extensions may not be needed
   - Right-click extension → `Disable (Workspace)`

3. **Use Workspace Trust**: Be aware of VS Code's Workspace Trust feature
   - Only open workspaces from trusted sources

### Collaboration

1. **Share Workspace Configuration**: Commit the `.code-workspace` file

2. **Document Setup Steps**: Include README with setup instructions

3. **Standardize Extensions**: Use the `recommendations` section

4. **Use Shared Settings**: Define formatting rules in workspace settings

### Keyboard Shortcuts

- **Switch Focus**: `Ctrl+Q` (show all workspaces/folders)
- **Quick Open**: `Ctrl+P` searches across all folders
- **Go to Symbol**: `Ctrl+T` searches symbols in workspace
- **Search in Files**: `Ctrl+Shift+F` searches all folders
- **Focus Terminal**: `` Ctrl+` ``
- **New Terminal**: `` Ctrl+Shift+` ``

### Common Issues and Solutions

**Issue**: Extensions not working in specific folders
- **Solution**: Check extension settings scope (user vs. workspace vs. folder)

**Issue**: Can't find files in search
- **Solution**: Check `search.exclude` settings

**Issue**: Debugging not working
- **Solution**: Ensure `launch.json` is in the correct folder or workspace root

**Issue**: Terminals opening in wrong directory
- **Solution**: Use workspace-relative commands or set `terminal.integrated.splitCwd`

**Issue**: Too many files causing slowdown
- **Solution**: Exclude large directories in `files.exclude`

---

## Next Steps

1. ✅ Create your `.code-workspace` file using the example provided
2. ✅ Add your project folders
3. ✅ Install recommended extensions
4. ✅ Configure debugging for each platform
5. ✅ Set up tasks for common operations
6. ✅ Share the workspace with your team

---

## Additional Resources

- [VS Code Multi-Root Workspaces Documentation](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Android Studio Documentation](https://developer.android.com/studio)
- [Xcode Documentation](https://developer.apple.com/xcode/)

---

**Happy Multi-Platform Development! 🚀**
