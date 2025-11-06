# Quick Start Guide: Multi-Root VS Code Workspace

Get your multi-platform development environment up and running in minutes!

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Visual Studio Code** installed (latest version recommended)
- ✅ **Node.js** and **npm** (for web development)
- ✅ **Android Studio** (for Android development - optional but recommended)
- ✅ **Xcode** (for iOS development - macOS only)
- ✅ **Git** (for version control)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Your Workspace File

**Option A: Use the Example (Fastest)**
```bash
# Copy the example workspace file
cp example-project.code-workspace my-project.code-workspace
```

**Option B: Create from Scratch**
1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type: `Workspaces: Add Folder to Workspace...`
4. Add each project folder (Web, Android, iOS)
5. Press `Ctrl+Shift+P` again and select `Workspaces: Save Workspace As...`

### Step 2: Edit Folder Paths

Open your `.code-workspace` file and update the paths:

```json
{
  "folders": [
    {
      "name": "🌐 Web Frontend",
      "path": "./web-frontend"  // ← Update this
    },
    {
      "name": "🤖 Android App",
      "path": "./android-app"   // ← Update this
    },
    {
      "name": "🍎 iOS App",
      "path": "./ios-app"       // ← Update this
    }
  ],
  "settings": { /* ... */ }
}
```

### Step 3: Open the Workspace

**Double-click** the `.code-workspace` file or:
1. Open VS Code
2. `File > Open Workspace from File...`
3. Select your `.code-workspace` file

### Step 4: Install Recommended Extensions

VS Code will prompt you to install recommended extensions. Click **"Install All"** or:

1. Open Extensions view (`Ctrl+Shift+X`)
2. Search for "Workspace Recommendations"
3. Click "Install Workspace Extension Recommendations"

**Essential Extensions:**
- Web: ESLint, Prettier, React snippets
- Android: Gradle, Kotlin
- iOS: Swift, SwiftLint
- General: GitLens

### Step 5: Configure Your Projects

For each project folder, ensure you have:

**Web Frontend:**
```bash
cd web-frontend
npm install
npm start
```

**Android App:**
```bash
cd android-app
./gradlew assembleDebug  # Linux/Mac
gradlew.bat assembleDebug  # Windows
```

**iOS App:**
```bash
cd ios-app
pod install
```

---

## 🎯 Common Tasks

### Running Multiple Projects

Open the integrated terminal (`` Ctrl+` ``) and create separate terminals:

```bash
# Terminal 1: Web Frontend
cd web-frontend && npm start

# Terminal 2: Web Backend (if separate)
cd web-frontend && npm run server

# Terminal 3: Android (optional - build)
cd android-app && ./gradlew installDebug

# Terminal 4: iOS (optional)
cd ios-app && open MyApp.xcworkspace
```

**Tip:** Right-click each terminal tab and rename it (e.g., "Web", "Android", "iOS") for easy identification.

### Searching Across All Projects

- **Quick Open**: `Ctrl+P` - Search for files across all folders
- **Search in Files**: `Ctrl+Shift+F` - Search content in all projects
- **Go to Symbol**: `Ctrl+T` - Find functions, classes, etc.

### Debugging

1. Open the **Run and Debug** panel (`Ctrl+Shift+D`)
2. Select a debug configuration from the dropdown
3. Press `F5` to start debugging

Available configurations (from example workspace):
- 🌐 Launch React App (Chrome)
- 🌐 Debug Node.js Backend
- 🤖 Debug Android App
- 🍎 Debug iOS App (Simulator)
- 🚀 Full Stack (runs React + Node.js together)

---

## ⚙️ Customization Checklist

After initial setup, customize your workspace:

### Basic Settings

- [ ] Update folder paths in `.code-workspace`
- [ ] Rename folders with descriptive names (add emojis!)
- [ ] Configure your preferred default shell in terminal settings
- [ ] Set up auto-save preferences (`files.autoSave`)

### Extensions

- [ ] Install recommended extensions
- [ ] Disable unnecessary extensions per workspace
- [ ] Configure ESLint rules for your web project
- [ ] Set up SwiftLint configuration for iOS

### Debugging

- [ ] Update `launch.json` configurations with actual paths
- [ ] Test each debug configuration
- [ ] Set up compound configurations if needed
- [ ] Configure pre-launch tasks (e.g., building before debugging)

### Tasks

- [ ] Review automated tasks in the workspace file
- [ ] Update npm scripts, Gradle tasks, or Xcode schemes
- [ ] Add custom tasks for your workflow
- [ ] Set up keyboard shortcuts for frequently used tasks

---

## 🔧 Troubleshooting

### Extensions Not Working

**Problem:** Extensions not activating in specific folders

**Solutions:**
1. Check extension is enabled: Right-click extension → Ensure not disabled
2. Reload window: `Ctrl+Shift+P` → `Developer: Reload Window`
3. Check extension settings scope (User vs Workspace vs Folder)

### Can't Find Files in Search

**Problem:** Files not appearing in search results

**Solutions:**
1. Check `search.exclude` settings in `.code-workspace`
2. Ensure folder isn't in `.gitignore` and `files.exclude`
3. Reload window to refresh file indexing

### Debugging Not Starting

**Problem:** Debugger fails to launch

**Solutions:**
1. Verify paths in `launch.json` are correct
2. Check that development server is running (for web)
3. Ensure APK is built (for Android)
4. Verify simulator/emulator is running (for mobile)
5. Check console output for error messages

### Terminal Opens in Wrong Directory

**Problem:** New terminals don't open in project folders

**Solutions:**
1. Use terminal selector: Click `+` dropdown and choose folder
2. Set `terminal.integrated.splitCwd` to `"workspaceRoot"` in settings
3. Manually navigate: `cd path/to/project`

### Performance Issues

**Problem:** VS Code running slowly with multiple projects

**Solutions:**
1. Exclude large folders: Add to `files.exclude`
   ```json
   "files.exclude": {
     "**/node_modules": true,
     "**/build": true,
     "**/Pods": true,
     "**/.gradle": true,
     "**/DerivedData": true
   }
   ```
2. Disable unused extensions per workspace
3. Close unused folders temporarily
4. Increase VS Code memory limit if needed

### Git Issues

**Problem:** Git not working correctly with multiple projects

**Solutions:**
1. Each folder should have its own `.git` directory
2. Use Git panel: Select the folder before committing
3. Consider using separate Git operations per folder
4. Check that Git is in your PATH

---

## 📚 Next Steps

Once you're comfortable with the basics:

1. **Read the Full Guide**: Check `VSCODE_MULTIROOT_SETUP.md` for detailed information
2. **Customize Further**: Adjust settings, keybindings, and tasks to your workflow
3. **Share with Team**: Commit `.code-workspace` to version control
4. **Explore Advanced Features**:
   - Workspace tasks and problem matchers
   - Custom snippets per project
   - Live Share for collaboration
   - Remote development extensions

---

## 💡 Pro Tips

### Use Emojis in Folder Names
Makes visual identification super easy!
- 🌐 Web Frontend
- 🤖 Android App
- 🍎 iOS App
- 📦 Shared
- 🔧 Tools
- 📝 Docs

### Keyboard Shortcuts to Remember

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open | `Ctrl+P` | `Cmd+P` |
| Search in Files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Open Terminal | `` Ctrl+` `` | `` Cmd+` `` |
| New Terminal | `` Ctrl+Shift+` `` | `` Cmd+Shift+` `` |
| Go to Symbol | `Ctrl+T` | `Cmd+T` |
| Debug | `F5` | `F5` |
| Extensions View | `Ctrl+Shift+X` | `Cmd+Shift+X` |

### Name Your Terminals
Right-click terminal tab → Rename → Enter descriptive name
- "Web Dev Server"
- "Android Build"
- "iOS Simulator"
- "Git Operations"

### Use Workspace Tasks
Access via `Ctrl+Shift+P` → `Tasks: Run Task`

Pre-configured tasks:
- Install Web Dependencies
- Start Web Development Server
- Build Android Debug APK
- Install iOS Pods
- Lint All Projects

### Set Up Snippets
Create `.vscode/snippets/` in each project folder for project-specific code snippets.

### Use Split Editors
- `Ctrl+\` - Split editor
- Drag files to different editor groups
- View web code and mobile code side-by-side

---

## 📞 Getting Help

- **Full Documentation**: `VSCODE_MULTIROOT_SETUP.md` in this folder
- **VS Code Docs**: https://code.visualstudio.com/docs/editor/multi-root-workspaces
- **Example Config**: `example-project.code-workspace` in this folder

---

## ✅ Setup Verification Checklist

Before you start developing, verify:

- [ ] Workspace opens correctly in VS Code
- [ ] All project folders are visible in the Explorer
- [ ] Recommended extensions are installed
- [ ] Can open terminals in each project folder
- [ ] Can search across all folders (`Ctrl+Shift+F`)
- [ ] Each project builds/runs successfully
- [ ] Debug configurations work (test at least one)
- [ ] Git integration working in all folders
- [ ] Linting and formatting working in web project
- [ ] Language support working (syntax highlighting, autocomplete)

---

**You're all set! Happy coding! 🎉**

For detailed information, workflows, and best practices, see the complete guide in `VSCODE_MULTIROOT_SETUP.md`.
