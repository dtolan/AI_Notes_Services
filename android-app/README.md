# Android App

Native Android application for the multi-platform project.

## Setup

```bash
./gradlew assembleDebug
```

Or open in Android Studio for full IDE support.

## Project Structure

```
android-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/          # Kotlin/Java source files
│   │   │   ├── res/           # Resources (layouts, strings, etc.)
│   │   │   └── AndroidManifest.xml
│   │   └── test/              # Unit tests
│   └── build.gradle           # App-level Gradle configuration
├── build.gradle               # Project-level Gradle configuration
├── settings.gradle            # Gradle settings
├── gradlew                    # Gradle wrapper (Unix)
├── gradlew.bat               # Gradle wrapper (Windows)
└── .vscode/                  # VS Code configuration
    └── launch.json           # Debug configuration
```

## Available Commands

- `./gradlew assembleDebug` - Build debug APK
- `./gradlew assembleRelease` - Build release APK
- `./gradlew installDebug` - Build and install debug APK
- `./gradlew clean` - Clean build artifacts
- `./gradlew lint` - Run linter

## Development

This is part of a multi-root workspace. See the workspace configuration file in the root directory.

### Using Android Studio

While you can edit code in VS Code, you'll want to use Android Studio for:
- UI layout design
- Complex Gradle configuration
- Advanced debugging
- Resource management
