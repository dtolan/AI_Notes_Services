# Product Context: VS Code Multi-Root Workspace Documentation

## Why This Project Exists

### Problem Statement
Modern software development often involves multiple related projects:
- Web frontend and backend
- Mobile apps for multiple platforms
- Shared libraries and utilities

Developers face challenges managing these simultaneously:
- **Context Switching**: Constantly switching between VS Code windows loses productivity
- **Configuration Duplication**: Setting up editor configs, extensions, and workflows for each project separately
- **Search Limitations**: Can't easily search across all related codebases
- **Workflow Fragmentation**: Running dev servers, building apps, and debugging requires juggling multiple windows

Many developers are unaware that VS Code supports multi-root workspaces, or don't know how to set them up effectively for cross-platform projects.

## What This Solves

### Primary Benefits
1. **Single Window Workflow**: All related projects accessible in one VS Code window
2. **Unified Development Environment**: Shared settings, extensions, and configurations
3. **Cross-Project Search**: Find code, references, and TODOs across all projects instantly
4. **Simplified Debugging**: Run web frontend, backend API, and view mobile code simultaneously
5. **Team Collaboration**: Share workspace configurations with team members

### Target User Scenarios

#### Scenario 1: Full-Stack + Mobile Developer
A developer building a web app with mobile companions needs to:
- Edit React components and Node.js API endpoints
- Review/update Android and iOS implementations
- Ensure API contracts match across all platforms
- Debug issues that span multiple codebases

**Solution**: Multi-root workspace with Web, Android, and iOS folders. Single search finds all API usages, single window for all code.

#### Scenario 2: Team Setting Up New Developer
A new team member needs to configure their environment:
- Install correct VS Code extensions
- Set up linting and formatting rules
- Configure debug settings for each platform
- Learn team conventions

**Solution**: Share `.code-workspace` file with embedded extension recommendations and pre-configured settings. One file contains everything.

#### Scenario 3: Microservices-Like Architecture
A project has separate repositories/folders for:
- React frontend
- Node.js backend
- Android app
- iOS app
- Shared TypeScript types library

**Solution**: Multi-root workspace brings them together while maintaining independence. Each can have its own Git repo.

## How It Should Work

### User Journey

#### Getting Started (5 Minutes)
1. User opens QUICKSTART.md
2. Copies example-project.code-workspace
3. Updates folder paths to match their projects
4. Opens workspace in VS Code
5. Installs recommended extensions when prompted
6. Immediately productive

#### Day-to-Day Usage
- Opens workspace file instead of individual folders
- Uses `Ctrl+P` to quickly navigate between projects
- Runs dev servers in split terminals (Web, Android build, iOS)
- Searches across all projects with `Ctrl+Shift+F`
- Debugs frontend and backend simultaneously
- Consistent formatting across all projects

#### Deep Customization
- Refers to VSCODE_MULTIROOT_SETUP.md for advanced features
- Customizes settings per platform
- Adds custom tasks for build automation
- Sets up compound debug configurations
- Shares configuration with team

### Key User Experience Goals

#### Simplicity
- Quick start guide gets users running in 5 minutes
- Example configuration works with minimal changes
- Clear, concise documentation with examples
- Progressive disclosure: simple first, advanced later

#### Completeness
- Covers all three platforms (Web, Android, iOS)
- Includes debugging, not just editing
- Addresses performance concerns
- Troubleshooting for common issues

#### Practicality
- Real-world examples and configurations
- Platform-specific tips (when to use Xcode vs VS Code)
- Pro tips from experienced developers
- Keyboard shortcuts and productivity hints

#### Shareability
- Team-ready configurations
- Relative paths for portability
- Documentation suitable for team wikis
- Version control friendly

## Success Metrics

### Immediate Success
- User can open workspace with all folders visible
- Extensions install successfully
- Can search across all projects
- At least one debug configuration works

### Long-Term Success
- Daily usage of workspace instead of separate windows
- Team adoption of shared workspace configuration
- Reduced setup time for new developers
- Improved productivity (subjective but measurable by user satisfaction)

## User Pain Points Addressed

### Before Multi-Root Workspace
- ❌ Multiple VS Code windows cluttering screen
- ❌ Manual extension installation per project
- ❌ Can't search across projects easily
- ❌ Switching contexts breaks flow
- ❌ Inconsistent settings between projects
- ❌ Difficult to debug cross-project issues

### After Multi-Root Workspace
- ✅ Single window, organized sidebar
- ✅ Extensions shared across projects
- ✅ Unified search with `Ctrl+Shift+F`
- ✅ Seamless context switching
- ✅ Consistent formatting and settings
- ✅ Debug multiple projects simultaneously

## Design Principles

### Documentation Philosophy
1. **Show, Don't Just Tell**: Include complete examples, not just descriptions
2. **Layered Information**: Quick start → Detailed guide → Reference
3. **Real-World Focus**: Address actual developer workflows
4. **Platform Awareness**: Acknowledge platform differences (macOS for iOS, etc.)

### Configuration Philosophy
1. **Ready to Use**: Example should work with minimal changes
2. **Opinionated but Flexible**: Provide good defaults, document customization
3. **Performance Conscious**: Exclude large directories from search
4. **Team Friendly**: Portable paths, documented setup steps

### Support Philosophy
1. **Self-Service**: Comprehensive troubleshooting sections
2. **Common Issues**: Address frequent problems upfront
3. **External References**: Link to official docs for deeper learning
4. **Checklists**: Provide verification steps
