# Technical Context: VS Code Multi-Root Workspace Documentation

## Technologies Used

### Documentation Format
- **Markdown**: All documentation files (.md)
  - Universal format for technical documentation
  - Renders in VS Code, GitHub, and most platforms
  - Supports code blocks, tables, links, and formatting

### Configuration Format
- **JSONC**: JSON with Comments for .code-workspace file
  - Native VS Code format
  - Allows inline comments for explanation
  - Direct integration with VS Code features

### Version Control
- **Git**: Used for project versioning
  - Repository: https://github.com/dtolan/AI_Notes_Services.git
  - Standard .gitignore patterns apply

## Development Environment

### Primary Tool
- **Visual Studio Code**: The target IDE for all configurations
  - Version: 1.70+ recommended
  - Extensions: None required for editing documentation
  - Features used: Markdown preview, JSON validation

### File Structure
No build process or compilation required. All files are human-readable text.

```
Plain Text Documentation
└── Markdown (.md files)
└── JSON (.code-workspace file)
└── Git metadata (.git/)
```

## Platform Coverage

### Web Development Stack
**Frontend:**
- React (JavaScript/TypeScript framework)
- npm/yarn (package managers)
- Webpack/Vite (build tools, implicit)

**Backend:**
- Node.js (runtime)
- Express (typical framework, examples)

**Tools:**
- ESLint (linting)
- Prettier (formatting)
- Chrome DevTools (debugging)

### Android Development Stack
**Languages:**
- Java (traditional)
- Kotlin (modern, preferred)

**Build System:**
- Gradle (build automation)
- Android Gradle Plugin

**Tools:**
- Android SDK
- ADB (Android Debug Bridge)
- Android Emulator
- Android Studio (IDE, optional but recommended)

### iOS Development Stack
**Languages:**
- Swift (modern, preferred)
- Objective-C (legacy)

**Build System:**
- Xcode build system
- xcodebuild (CLI tool)

**Dependency Management:**
- CocoaPods
- Swift Package Manager (SPM)

**Tools:**
- Xcode (required for compilation)
- iOS Simulator
- LLDB debugger

**Platform Constraint**: iOS development requires macOS

## VS Code Extension Ecosystem

### Web Development Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`
   - Purpose: Code snippets for React development

2. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Purpose: JavaScript/TypeScript linting
   - Integration: Auto-fix on save

3. **Prettier**
   - ID: `esbenp.prettier-vscode`
   - Purpose: Code formatting
   - Integration: Default formatter for JS/TS/JSON

4. **npm Intellisense**
   - ID: `christian-kohler.npm-intellisense`
   - Purpose: Autocomplete npm module names

5. **Path Intellisense**
   - ID: `christian-kohler.path-intellisense`
   - Purpose: Autocomplete file paths

### Android Development Extensions

1. **Gradle for Java**
   - ID: `vscjava.vscode-gradle`
   - Purpose: Gradle build support

2. **Kotlin Language**
   - ID: `mathiasfrohlich.Kotlin`
   - Purpose: Kotlin syntax highlighting

3. **XML Tools**
   - ID: `DotJoshJohnson.xml`
   - Purpose: XML formatting for Android layouts

4. **Android iOS Emulator**
   - ID: `dimagoltsman.vscode-android-emulator`
   - Purpose: Launch emulators from VS Code

### iOS Development Extensions

1. **Swift Language**
   - ID: `sswg.swift-lang`
   - Purpose: Official Swift language support

2. **SwiftLint**
   - ID: `vknabel.vscode-swiftlint`
   - Purpose: Swift code linting

3. **iOS Common Files**
   - ID: `Orta.vscode-ios-common-files`
   - Purpose: iOS project file navigation

### General Extensions

1. **GitLens**
   - ID: `eamodio.gitlens`
   - Purpose: Enhanced Git integration

2. **Live Share**
   - ID: `MS-vsliveshare.vsliveshare`
   - Purpose: Real-time collaboration

3. **Error Lens**
   - ID: `usernamehw.errorlens`
   - Purpose: Inline error highlights

## VS Code Features Utilized

### Multi-Root Workspace API
- `folders[]`: Array of workspace folders
- `settings{}`: Workspace-wide settings
- `extensions.recommendations[]`: Suggested extensions
- `launch.configurations[]`: Debug configs
- `tasks.tasks[]`: Automated tasks

### Variable Substitution
VS Code provides these variables in configurations:

- `${workspaceFolder}`: Root of current workspace
- `${workspaceFolder:Name}`: Specific folder by name
- `${workspaceRoot}`: Workspace root (legacy)
- `${file}`: Current file
- `${relativeFile}`: File relative to workspace

**Critical for Multi-Root**: Must use `${workspaceFolder:Name}` to target specific folders.

### Debug Adapters
- **Chrome Debugger**: For React/web apps
- **Node Debugger**: Built-in for Node.js
- **Android Debugger**: Via extensions, uses ADB
- **LLDB**: For iOS debugging

### Task System
Tasks can:
- Run shell commands
- Have platform-specific variants (Windows vs Unix)
- Chain with `dependsOn`
- Serve as pre-launch tasks for debugging
- Use problem matchers for error parsing

## Configuration Details

### Settings Scope
VS Code settings work at three levels:

1. **User Settings**: `~/.config/Code/User/settings.json` (global)
2. **Workspace Settings**: Inside `.code-workspace` file
3. **Folder Settings**: `.vscode/settings.json` per folder

**Our Approach**: 
- Shared preferences (formatting, editor config) → Workspace
- Platform-specific (tab size for Kotlin) → Workspace with language-specific keys
- Project-specific → Individual folder `.vscode/settings.json`

### File Exclusion Strategy
Two types of exclusions:

1. **`files.exclude`**: Hidden from Explorer sidebar
2. **`search.exclude`**: Hidden from search results
3. **`files.watcherExclude`**: Not monitored for changes (performance)

**Pattern**: Exclude build artifacts, dependencies, IDE files
- `node_modules/`, `Pods/`, `build/`, `.gradle/`, `DerivedData/`

### Formatter Configuration
Language-specific formatters in workspace settings:

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[kotlin]": {
    "editor.tabSize": 4
  }
}
```

## Technical Constraints

### Platform Limitations

**iOS Development:**
- **MUST have macOS**: Xcode only runs on macOS
- Cannot compile iOS apps on Windows/Linux
- Can still edit Swift code, but can't build/run

**Android Development:**
- Works on Windows, macOS, Linux
- Android Studio recommended but not required
- ADB must be in PATH for emulator access

**Web Development:**
- Works on all platforms
- Node.js required
- Browser for testing (Chrome recommended)

### Performance Considerations

**Large Codebases:**
- Multi-root workspaces can be resource-intensive
- Solution: Aggressive file exclusions
- Solution: Disable unused extensions per workspace

**File Watching:**
- Too many files can overwhelm file watcher
- Solution: `files.watcherExclude` settings
- Especially important for `node_modules/`, `Pods/`

**Search Performance:**
- Searching across multiple projects is slower
- Solution: `search.exclude` settings
- Solution: Use focused searches when possible

## Integration Points

### Git Integration
- Each folder can have its own `.git` repository
- VS Code Source Control panel shows all repos
- Can commit to specific repos independently

### Terminal Integration
- Create terminals scoped to specific workspace folders
- Each terminal inherits folder's environment
- Terminal selector dropdown for easy switching

### Debug Integration
- Debug panel shows all available configurations
- Can run multiple debug sessions simultaneously
- Compound configurations launch multiple debuggers

## File Format Specifications

### .code-workspace File
JSON format with specific schema:

```typescript
interface WorkspaceConfiguration {
  folders: Array<{
    name?: string;      // Display name
    path: string;       // Relative or absolute
  }>;
  settings?: object;    // VS Code settings
  extensions?: {
    recommendations?: string[];
    unwantedRecommendations?: string[];
  };
  launch?: object;      // Debug configurations
  tasks?: object;       // Task definitions
}
```

### Extension ID Format
`publisher.extension-name`

Examples:
- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`

Found in: Extensions view → Gear icon → Copy Extension ID

## Development Workflow

### Creating Documentation
1. Write in Markdown with VS Code
2. Preview with `Ctrl+Shift+V`
3. Validate links and formatting
4. Test code examples
5. Commit to Git

### Testing Configurations
1. Create test `.code-workspace` file
2. Open in VS Code
3. Verify folders appear
4. Test extension installation
5. Test debug configurations
6. Test tasks
7. Document any issues

### Documentation Maintenance
1. Update dates when content changes
2. Keep example config synchronized with docs
3. Test instructions on clean VS Code install
4. Validate all links periodically

## External Dependencies

### None Required for Documentation
- No npm packages
- No build tools
- No runtime dependencies
- Pure documentation project

### Users Need (for using the configurations)
- Visual Studio Code (1.70+)
- Node.js and npm (for web projects)
- Android SDK (for Android projects)
- Xcode (for iOS projects, macOS only)
- Git (recommended)

## Tool Versions
No specific version pinning required. Documentation aims to be version-agnostic with best practices that work across VS Code versions.

**Minimum VS Code Version**: 1.70 (when multi-root workspaces became stable)
