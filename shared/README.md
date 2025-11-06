# Shared

Shared code, types, and utilities used across all platforms.

## Purpose

This folder contains code and resources that are shared between:
- Web frontend
- Android app
- iOS app

## Structure

```
shared/
├── types/              # TypeScript type definitions / interfaces
├── constants/          # Shared constants and configurations
├── utils/             # Utility functions
└── api/               # API contracts and specifications
```

## Usage

### API Contracts

Define API endpoints and data structures that all platforms must follow:

```typescript
// shared/api/endpoints.ts
export const API_BASE_URL = 'https://api.example.com';

export const ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  auth: '/api/auth'
};
```

### Type Definitions

Share TypeScript interfaces that can be referenced by web frontend:

```typescript
// shared/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
```

### Constants

Define shared constants used across platforms:

```typescript
// shared/constants/app.ts
export const APP_NAME = 'Multi-Platform App';
export const APP_VERSION = '1.0.0';
export const API_TIMEOUT = 30000; // 30 seconds
```

## Platform Integration

### Web Frontend
```javascript
import { API_BASE_URL } from '../shared/api/endpoints';
```

### Android
Kotlin/Java can reference constants through documentation or code generation.

### iOS
Swift can reference constants through documentation or code generation.

## Development

This is part of a multi-root workspace. See the workspace configuration file in the root directory.
