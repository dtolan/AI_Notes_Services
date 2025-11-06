# iOS App

Native iOS application for the multi-platform project.

## Setup

**Requirements:** macOS with Xcode installed

```bash
pod install
open MyApp.xcworkspace
```

## Project Structure

```
ios-app/
├── MyApp/
│   ├── AppDelegate.swift        # Application lifecycle
│   ├── SceneDelegate.swift      # Scene management
│   ├── ViewController.swift     # Main view controller
│   ├── Assets.xcassets/         # Images and assets
│   ├── Base.lproj/              # Storyboards
│   └── Info.plist              # App configuration
├── MyApp.xcodeproj/            # Xcode project file
├── MyApp.xcworkspace/          # Xcode workspace (after pod install)
├── Podfile                     # CocoaPods dependencies
├── Podfile.lock                # Locked dependency versions
└── .vscode/                    # VS Code configuration
    └── launch.json             # Debug configuration
```

## Available Commands

- `pod install` - Install CocoaPods dependencies
- `pod update` - Update dependencies
- Build via Xcode or xcodebuild CLI

## Development

This is part of a multi-root workspace. See the workspace configuration file in the root directory.

### Using Xcode vs VS Code

**Use Xcode for:**
- Interface Builder (Storyboards/XIBs)
- Signing & Capabilities configuration
- Complex build configurations
- Asset catalog management
- Debugging with breakpoints and instruments

**Use VS Code for:**
- Code editing (Swift files)
- Quick edits and reviews
- Side-by-side with web/Android code
- Git operations across all projects

## Platform Notes

- **macOS only**: iOS development requires macOS and Xcode
- **Simulator**: Use iOS Simulator for testing
- **Device testing**: Requires Apple Developer account for signing
