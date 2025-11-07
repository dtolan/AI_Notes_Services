# NIDOnote Technical Architecture

**Version 1.0 | January 2025**

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Data Architecture](#data-architecture)
5. [Security & Privacy](#security--privacy)
6. [Platform-Specific Implementation](#platform-specific-implementation)
7. [Real-Time Collaboration](#real-time-collaboration)
8. [AI Integration](#ai-integration)
9. [Scalability & Performance](#scalability--performance)
10. [Development Workflow](#development-workflow)
11. [Deployment Strategy](#deployment-strategy)
12. [Monitoring & Analytics](#monitoring--analytics)

---

## Architecture Overview

### Design Philosophy

NIDOnote is built on three core architectural principles:

1. **User-Controlled Data**: All user data stored in their personal cloud accounts (Google Drive, iCloud, OneDrive)
2. **Offline-First**: Full functionality without internet connection, intelligent sync when online
3. **Privacy-by-Design**: Minimal backend, zero access to user content, end-to-end encryption

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
├──────────────┬──────────────┬─────────────┬─────────────────┤
│  Web App     │   iOS App    │ Android App │  Browser Ext.   │
│  (React)     │(React Native)│(React Native)│   (Optional)    │
└──────────────┴──────────────┴─────────────┴─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Minimal Backend                         │
├──────────────┬──────────────┬─────────────┬─────────────────┤
│ Subscription │  AI Proxy    │   Presence  │  Email Service  │
│  Validation  │   (GPT-4o)   │  (WebSocket)│   (SendGrid)    │
└──────────────┴──────────────┴─────────────┴─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                User's Personal Cloud Storage                 │
├──────────────┬──────────────┬──────────────────────────────┤
│ Google Drive │ iCloud Drive │        OneDrive              │
│  (Android +  │   (iOS +     │          (Web +              │
│    Web)      │    Mac)      │         Windows)             │
└──────────────┴──────────────┴──────────────────────────────┘
```

### Data Flow

**Write Operation:**
```
User Input → Local Database (IndexedDB/SQLite) →
CRDT Sync Engine → Cloud Storage API →
User's Personal Cloud → Shared Folder →
Other Devices (via Cloud Provider's Sync)
```

**Read Operation:**
```
App Launch → Check Local Database →
Sync from Cloud Storage → Apply CRDT Merge →
Update Local Database → Render UI
```

---

## System Architecture

### Component Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        Presentation Layer                      │
├─────────────┬─────────────┬─────────────┬────────────────────┤
│ React       │ React Native│ TypeScript  │ TailwindCSS        │
│ Components  │  Components │ Type Safety │ Styling            │
└─────────────┴─────────────┴─────────────┴────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                         Business Logic Layer                   │
├─────────────┬─────────────┬─────────────┬────────────────────┤
│ State Mgmt  │ Validation  │ Permissions │ Event Handlers     │
│ (Zustand)   │ (Zod)       │ Management  │                    │
└─────────────┴─────────────┴─────────────┴────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                          Data Layer                            │
├─────────────┬─────────────┬─────────────┬────────────────────┤
│ CRDT Engine │ Local DB    │ Cloud Sync  │ Cache Manager      │
│ (Yjs)       │(IndexedDB/  │ (OAuth APIs)│                    │
│             │ SQLite)     │             │                    │
└─────────────┴─────────────┴─────────────┴────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                      Infrastructure Layer                      │
├─────────────┬─────────────┬─────────────┬────────────────────┤
│ Cloud       │ Networking  │ Error       │ Analytics          │
│ Storage APIs│ (Axios)     │ Handling    │ (PostHog)          │
└─────────────┴─────────────┴─────────────┴────────────────────┘
```

### Module Organization

```
/src
  /core
    /auth           # OAuth authentication for cloud providers
    /sync           # CRDT sync engine, conflict resolution
    /storage        # Local database abstraction
    /cloud          # Cloud provider APIs (Google Drive, iCloud, OneDrive)
    /permissions    # Access control and sharing
  /features
    /calendar       # Calendar functionality
    /notes          # Note taking and editing
    /tasks          # Todo/checklist management
    /events         # Event planning, RSVP, signup sheets
    /ai             # AI features (voice-to-text, summaries, suggestions)
    /spaces         # Shared spaces management
  /ui
    /components     # Reusable UI components
    /layouts        # Page layouts
    /hooks          # Custom React hooks
    /styles         # Global styles and theme
  /utils
    /validation     # Input validation (Zod schemas)
    /formatting     # Date, time, text formatting
    /crypto         # Encryption utilities
    /logger         # Error logging and debugging
  /config
    /constants      # App constants
    /environment    # Environment variables
```

---

## Technology Stack

### Frontend (Web Application)

**Framework & Libraries:**
- **React 18.3+**: UI framework with concurrent features
- **TypeScript 5.3+**: Type safety and developer experience
- **Vite 5.0+**: Fast build tool and dev server
- **React Router 6.20+**: Client-side routing
- **TanStack Router**: Type-safe routing (alternative consideration)

**State Management:**
- **Zustand**: Lightweight state management for global state
- **React Query (TanStack Query)**: Server state management, caching
- **Yjs**: CRDT-based collaborative state

**Styling:**
- **TailwindCSS 3.4+**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library built on Radix UI
- **Radix UI**: Unstyled, accessible components
- **Framer Motion**: Animations and transitions

**Data Management:**
- **Yjs**: Conflict-free replicated data types (CRDT)
- **y-indexeddb**: Yjs persistence adapter for IndexedDB
- **Zod**: Schema validation and TypeScript inference
- **IndexedDB (via Dexie.js)**: Local database for offline storage

**Authentication & Cloud:**
- **OAuth 2.0**: Google, Microsoft, Apple authentication
- **Google Drive API v3**: Google Drive integration
- **Microsoft Graph API**: OneDrive integration
- **CloudKit JS**: iCloud integration (web)

**AI Integration:**
- **OpenAI SDK**: GPT-4o-mini for text generation, Whisper for voice
- **Anthropic SDK**: Claude Sonnet for advanced reasoning
- **Web Speech API**: Browser-native voice recognition (fallback)

**Development Tools:**
- **ESLint + Prettier**: Code linting and formatting
- **Vitest**: Unit testing framework
- **Playwright**: End-to-end testing
- **Storybook**: Component development and documentation

### Frontend (Mobile Applications)

**Framework:**
- **React Native 0.73+**: Cross-platform mobile development
- **Expo 50+**: Development framework and toolchain
- **Expo Router**: File-based routing for React Native

**Platform-Specific:**
- **iOS:**
  - Swift/Objective-C bridges for native features
  - CloudKit for iCloud integration
  - HealthKit for family health tracking (future)

- **Android:**
  - Kotlin/Java bridges for native features
  - Google Play Services for Google Drive
  - Work Manager for background sync

**Mobile-Specific Libraries:**
- **React Native MMKV**: Fast, encrypted key-value storage
- **WatermelonDB**: Reactive SQLite database
- **React Native Reanimated**: High-performance animations
- **React Native Gesture Handler**: Native gesture system

### Backend (Minimal Services)

**Runtime & Framework:**
- **Node.js 20 LTS**: Server runtime
- **Hono**: Lightweight edge-compatible web framework
- **TypeScript**: Type safety across frontend and backend

**Database:**
- **PostgreSQL 16**: Subscription management only
  - User accounts (email, subscription tier, payment status)
  - No user content data
- **Drizzle ORM**: Type-safe SQL query builder

**Hosting Platform (choose one):**
- **Option 1: Cloudflare Workers** (Recommended)
  - Edge deployment for low latency
  - Hono framework optimized for CF Workers
  - Cloudflare D1 (SQLite) for subscription data
  - R2 for static assets
  - Cost-effective ($5-20/month at scale)

- **Option 2: Vercel + Supabase**
  - Vercel for serverless functions
  - Supabase for PostgreSQL + Auth
  - Faster initial development
  - Higher costs at scale ($50-200/month)

**Authentication:**
- **Option 1**: Custom JWT-based auth
- **Option 2**: Supabase Auth
- **Option 3**: Clerk (easier, more expensive)

**Payment Processing:**
- **Stripe**: Subscription billing
- **Apple App Store**: In-app purchases (iOS)
- **Google Play Billing**: In-app purchases (Android)

**Email Service:**
- **Resend**: Transactional emails (invitations, RSVP notifications)
- Fallback: SendGrid or AWS SES

**AI Proxy:**
- Backend proxies AI requests to avoid exposing API keys
- Rate limiting per user tier
- Cost tracking and limiting

### Infrastructure

**Version Control:**
- **GitHub**: Code repository
- **GitHub Actions**: CI/CD pipelines

**Monitoring & Logging:**
- **Sentry**: Error tracking and performance monitoring
- **PostHog**: Product analytics (privacy-friendly, can self-host)
- **Cloudflare Analytics**: CDN and edge analytics

**CDN & Static Hosting:**
- **Cloudflare Pages**: Web app hosting
- **Cloudflare CDN**: Global content delivery
- **Cloudflare R2**: Static asset storage (images, fonts)

**Domain & DNS:**
- **Cloudflare DNS**: Domain management
- **SSL/TLS**: Automatic via Cloudflare

---

## Data Architecture

### Data Models

#### User Account (Backend Only)
```typescript
interface UserAccount {
  id: string;                    // UUID
  email: string;                 // Primary identifier
  created_at: Date;
  updated_at: Date;
  subscription_tier: 'free' | 'essential' | 'premium' | 'family';
  subscription_status: 'active' | 'past_due' | 'canceled' | 'trialing';
  subscription_expires: Date | null;
  stripe_customer_id: string | null;
  cloud_provider: 'google' | 'apple' | 'microsoft' | 'none';
}
```

#### Shared Space (User's Cloud)
```typescript
interface SharedSpace {
  id: string;                    // UUID
  name: string;                  // "Family Calendar", "Vacation 2025"
  type: 'calendar' | 'notes' | 'tasks' | 'event' | 'general';
  created_at: Date;
  updated_at: Date;
  manager_id: string;            // User who created the space
  members: SpaceMember[];
  settings: SpaceSettings;
  cloud_folder_id: string;       // Google Drive/iCloud folder ID
  yjs_document_id: string;       // Yjs document identifier
}

interface SpaceMember {
  user_id: string;
  email: string;
  role: 'manager' | 'editor' | 'viewer';
  joined_at: Date;
  last_active: Date;
  avatar_url?: string;
}

interface SpaceSettings {
  default_calendar_view: 'month' | 'week' | 'day';
  allow_guests: boolean;
  require_rsvp: boolean;
  send_notifications: boolean;
  color_theme: string;           // Hex color for calendar events
}
```

#### Calendar Event
```typescript
interface CalendarEvent {
  id: string;                    // UUID
  space_id: string;
  title: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  all_day: boolean;
  location?: string;
  created_by: string;            // User ID
  created_at: Date;
  updated_at: Date;

  // Event planning features
  rsvp_enabled: boolean;
  rsvp_list: RSVP[];
  signup_sheets: SignupSheet[];
  attachments: Attachment[];

  // Recurrence
  recurrence?: RecurrenceRule;

  // Metadata
  color?: string;
  reminder?: ReminderConfig;
}

interface RSVP {
  user_id: string;
  email: string;
  name: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  guest_count: number;           // Number of additional guests
  note?: string;
  responded_at: Date;
}

interface SignupSheet {
  id: string;
  title: string;                 // "Bring a dish", "Setup help"
  description?: string;
  slots: SignupSlot[];
  max_signups?: number;
}

interface SignupSlot {
  id: string;
  label: string;                 // "Potato salad", "9am setup"
  user_id?: string;
  name?: string;
  quantity?: number;
  note?: string;
  signed_up_at?: Date;
}
```

#### Note
```typescript
interface Note {
  id: string;                    // UUID
  space_id: string;
  title: string;
  content: string;               // Plain text or markdown
  content_type: 'text' | 'markdown' | 'rich-text';
  created_by: string;
  created_at: Date;
  updated_at: Date;

  // Collaboration
  yjs_state?: Uint8Array;        // Yjs document state for real-time collab

  // Organization
  tags: string[];
  folder?: string;
  pinned: boolean;
  archived: boolean;

  // Metadata
  attachments: Attachment[];
  checklist_items?: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completed_by?: string;
  completed_at?: Date;
  order: number;
}
```

#### Task/Todo
```typescript
interface Task {
  id: string;                    // UUID
  space_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'canceled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_by: string;
  created_at: Date;
  updated_at: Date;

  // Assignment
  assigned_to?: string;
  due_date?: Date;

  // Organization
  tags: string[];
  parent_task_id?: string;       // For subtasks
  order: number;

  // Metadata
  completed_at?: Date;
  completed_by?: string;
  attachments: Attachment[];
}
```

#### Attachment
```typescript
interface Attachment {
  id: string;
  name: string;
  type: string;                  // MIME type
  size: number;                  // Bytes
  cloud_file_id: string;         // Google Drive/iCloud file ID
  cloud_url: string;             // Direct download URL
  uploaded_by: string;
  uploaded_at: Date;
  thumbnail_url?: string;
}
```

### Database Schema (Backend - Subscription Only)

```sql
-- Users table (minimal data)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  subscription_tier VARCHAR(20) DEFAULT 'free',
  subscription_status VARCHAR(20) DEFAULT 'active',
  subscription_expires TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  cloud_provider VARCHAR(20)
);

-- Subscription events (for analytics and support)
CREATE TABLE subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(50),        -- 'created', 'upgraded', 'downgraded', 'canceled'
  from_tier VARCHAR(20),
  to_tier VARCHAR(20),
  occurred_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- AI usage tracking (for rate limiting and cost management)
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  feature VARCHAR(50),           -- 'voice-to-text', 'summary', 'meal-plan'
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 6),
  occurred_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe ON users(stripe_customer_id);
CREATE INDEX idx_subscription_events_user ON subscription_events(user_id);
CREATE INDEX idx_ai_usage_user_date ON ai_usage(user_id, occurred_at);
```

### Local Database Schema (Client - IndexedDB/SQLite)

```typescript
// Dexie.js schema for IndexedDB (Web)
class NIDOnoteDatabase extends Dexie {
  spaces!: Table<SharedSpace>;
  events!: Table<CalendarEvent>;
  notes!: Table<Note>;
  tasks!: Table<Task>;
  attachments!: Table<Attachment>;
  sync_status!: Table<SyncStatus>;

  constructor() {
    super('NIDOnoteDB');
    this.version(1).stores({
      spaces: 'id, manager_id, updated_at',
      events: 'id, space_id, start_time, updated_at',
      notes: 'id, space_id, updated_at, pinned',
      tasks: 'id, space_id, status, due_date, updated_at',
      attachments: 'id, cloud_file_id',
      sync_status: 'id, last_synced, cloud_version'
    });
  }
}
```

### Cloud Storage Structure

**Google Drive Folder Structure:**
```
NIDOnote/
  ├── spaces/
  │   ├── space-{uuid}/
  │   │   ├── metadata.json       # Space settings, members
  │   │   ├── calendar.yjs        # Yjs document for calendar events
  │   │   ├── notes/
  │   │   │   ├── note-{uuid}.json
  │   │   │   └── note-{uuid}.yjs  # For collaborative editing
  │   │   ├── tasks/
  │   │   │   └── tasks.json
  │   │   └── attachments/
  │   │       └── {file-name}
  │   └── ...
  └── user-settings.json          # Personal preferences, offline
```

**File Format - metadata.json:**
```json
{
  "version": "1.0",
  "space_id": "uuid",
  "name": "Family Calendar",
  "type": "calendar",
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-20T15:30:00Z",
  "manager_id": "user-uuid",
  "members": [
    {
      "user_id": "user-uuid",
      "email": "parent@example.com",
      "role": "manager",
      "joined_at": "2025-01-15T10:00:00Z"
    }
  ],
  "settings": {
    "default_view": "month",
    "color_theme": "#4A90E2",
    "notifications_enabled": true
  }
}
```

---

## Security & Privacy

### Privacy Architecture

**Zero-Knowledge Principle:**
- Backend never accesses user content
- All content stored in user's personal cloud
- Backend only validates subscription status
- AI processing happens via proxy, no storage

**Data Storage Locations:**
- **User Content**: User's Google Drive / iCloud / OneDrive
- **User Metadata**: User's cloud + local device cache
- **Subscription Data**: NIDOnote backend (encrypted)
- **Temporary AI Data**: In-memory only, never persisted

### Authentication & Authorization

**Cloud Provider OAuth Flow:**
```
1. User clicks "Sign in with Google"
2. Redirect to Google OAuth consent screen
3. Request scopes:
   - https://www.googleapis.com/auth/drive.file (app-created files only)
   - https://www.googleapis.com/auth/userinfo.email
   - https://www.googleapis.com/auth/userinfo.profile
4. User grants permission
5. Receive OAuth token + refresh token
6. Store tokens securely (encrypted in local storage)
7. Use tokens for Drive API requests
8. Refresh token when expired (handled automatically)
```

**Subscription Validation:**
```
1. User authenticates with cloud provider (OAuth)
2. Extract email from OAuth response
3. Check subscription status via backend API:
   POST /api/subscription/validate
   { email: "user@example.com" }
4. Backend returns: { tier: "premium", status: "active", features: [...] }
5. Frontend enables/disables features based on tier
6. Revalidate periodically (every 24 hours)
```

**Permission Model:**

| Role | Create | Edit | Delete | Invite | Change Settings |
|------|--------|------|--------|--------|-----------------|
| Manager | ✅ | ✅ | ✅ | ✅ | ✅ |
| Editor | ✅ | ✅ | Own only | ❌ | ❌ |
| Viewer | ❌ | ❌ | ❌ | ❌ | ❌ |

### Encryption

**Data at Rest:**
- **Cloud Storage**: Encrypted by cloud provider (Google/Apple/Microsoft)
- **Local Storage**:
  - Web: IndexedDB (browser encryption)
  - Mobile: Encrypted SQLite (SQLCipher on Android, iOS native encryption)
  - Sensitive data: AES-256 encryption with user-derived key

**Data in Transit:**
- **HTTPS/TLS 1.3**: All network communication
- **Certificate Pinning**: Mobile apps pin to expected certificates
- **OAuth Tokens**: Encrypted before storage

**End-to-End Encryption (Optional Future Feature):**
- User-generated encryption key (derived from password)
- Content encrypted before cloud upload
- Sharing requires key exchange (QR code or secure link)

### Security Best Practices

**Input Validation:**
- All user input validated with Zod schemas
- Sanitize HTML input to prevent XSS
- Strict CSP (Content Security Policy) headers

**API Security:**
- Rate limiting on all endpoints
- CORS restricted to app domains
- API keys never exposed to frontend
- JWT tokens expire after 24 hours

**Dependency Security:**
- Automated dependency updates (Dependabot)
- Security scanning (npm audit, Snyk)
- Lock files committed (package-lock.json, yarn.lock)

**Compliance:**
- **GDPR**: User data in their cloud, full data portability, right to deletion
- **CCPA**: User controls their data, no selling of data
- **COPPA**: Require 13+ age verification (App Store handles this)

---

## Platform-Specific Implementation

### Web Application

**Build Configuration:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      manifest: {
        name: 'NIDOnote',
        short_name: 'NIDOnote',
        description: 'Your family nest for notes, calendar, and events',
        theme_color: '#8B6F47',
        background_color: '#F5F1E8',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'vendor-data': ['zustand', '@tanstack/react-query', 'yjs']
        }
      }
    }
  }
});
```

**Progressive Web App (PWA):**
- Install prompt for desktop/mobile
- Offline support with service workers
- Background sync for pending changes
- Push notifications (with permission)

**Cloud Provider Integration:**
```typescript
// Google Drive integration
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

async function connectGoogleDrive() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/drive.file');

  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const accessToken = credential?.accessToken;

  // Store token securely
  await storeToken('google', accessToken);

  // Initialize Drive API client
  return initializeDriveClient(accessToken);
}
```

### iOS Application

**Tech Stack:**
- React Native 0.73+
- Expo 50+ (managed workflow)
- iCloud integration via native modules

**Native Modules:**
```swift
// iCloudModule.swift
import Foundation
import CloudKit

@objc(iCloudModule)
class iCloudModule: NSObject {

  @objc
  func saveToiCloud(_ data: NSDictionary, filename: String,
                    resolver: @escaping RCTPromiseResolveBlock,
                    rejecter: @escaping RCTPromiseRejectBlock) {

    guard let containerURL = FileManager.default.url(
      forUbiquityContainerIdentifier: nil
    )?.appendingPathComponent("Documents") else {
      rejecter("ICLOUD_ERROR", "iCloud not available", nil)
      return
    }

    let fileURL = containerURL.appendingPathComponent(filename)

    do {
      let jsonData = try JSONSerialization.data(withJSONObject: data)
      try jsonData.write(to: fileURL)
      resolver(["success": true, "url": fileURL.absoluteString])
    } catch {
      rejecter("WRITE_ERROR", error.localizedDescription, error)
    }
  }

  @objc
  func readFromiCloud(_ filename: String,
                      resolver: @escaping RCTPromiseResolveBlock,
                      rejecter: @escaping RCTPromiseRejectBlock) {
    // Implementation...
  }
}
```

**App Configuration:**
```json
// app.json (Expo)
{
  "expo": {
    "name": "NIDOnote",
    "slug": "nidonote",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#F5F1E8"
    },
    "ios": {
      "bundleIdentifier": "com.nidonote.app",
      "supportsTablet": true,
      "infoPlist": {
        "NSUbiquitousContainers": {
          "iCloud.com.nidonote.app": {
            "NSUbiquitousContainerIsDocumentScopePublic": true,
            "NSUbiquitousContainerName": "NIDOnote"
          }
        }
      },
      "usesIcloudStorage": true,
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

### Android Application

**Tech Stack:**
- React Native 0.73+
- Expo 50+ (managed workflow)
- Google Play Services for Drive integration

**Native Module:**
```kotlin
// GoogleDriveModule.kt
package com.nidonote.modules

import com.facebook.react.bridge.*
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential
import com.google.api.services.drive.Drive
import com.google.api.services.drive.DriveScopes

class GoogleDriveModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "GoogleDriveModule"

  @ReactMethod
  fun saveToDrive(data: ReadableMap, filename: String, promise: Promise) {
    try {
      val account = GoogleSignIn.getLastSignedInAccount(reactApplicationContext)

      if (account == null) {
        promise.reject("NOT_SIGNED_IN", "User not signed in to Google")
        return
      }

      val credential = GoogleAccountCredential.usingOAuth2(
        reactApplicationContext,
        listOf(DriveScopes.DRIVE_FILE)
      )
      credential.selectedAccount = account.account

      val driveService = Drive.Builder(
        AndroidHttp.newCompatibleTransport(),
        GsonFactory(),
        credential
      ).setApplicationName("NIDOnote").build()

      // Save file to Drive...
      promise.resolve("File saved successfully")

    } catch (e: Exception) {
      promise.reject("DRIVE_ERROR", e.message, e)
    }
  }
}
```

**Permissions:**
```xml
<!-- AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.GET_ACCOUNTS" />
  <uses-permission android:name="android.permission.USE_CREDENTIALS" />

  <application
    android:allowBackup="true"
    android:usesCleartextTraffic="false">
    <!-- App components -->
  </application>
</manifest>
```

---

## Real-Time Collaboration

### CRDT Implementation (Yjs)

**Why Yjs:**
- Conflict-free merging of concurrent edits
- Works offline, syncs when online
- Efficient binary encoding
- Proven in production (Figma, Notion-like apps)

**Architecture:**
```typescript
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

// Initialize Yjs document
const ydoc = new Y.Doc();

// Persist to IndexedDB
const indexeddbProvider = new IndexeddbPersistence('nidonote-space-123', ydoc);

// Shared types
const yCalendarEvents = ydoc.getArray<CalendarEvent>('calendar-events');
const yNotes = ydoc.getMap<Note>('notes');
const yTasks = ydoc.getArray<Task>('tasks');

// Listen for changes
yCalendarEvents.observe((event) => {
  console.log('Calendar events changed:', event.changes);
  syncToCloudStorage(yCalendarEvents.toArray());
});

// Add an event
yCalendarEvents.push([{
  id: uuid(),
  title: 'Family BBQ',
  start_time: new Date('2025-07-04'),
  // ... other fields
}]);
```

**Sync Strategy:**
```typescript
class SyncEngine {
  private ydoc: Y.Doc;
  private cloudProvider: CloudProvider;
  private syncInterval: number = 30000; // 30 seconds

  async sync() {
    // 1. Get current Yjs state
    const currentState = Y.encodeStateAsUpdate(this.ydoc);

    // 2. Get cloud state
    const cloudState = await this.cloudProvider.downloadYjsState();

    // 3. Merge states (Yjs handles conflicts automatically)
    if (cloudState) {
      Y.applyUpdate(this.ydoc, cloudState);
    }

    // 4. Upload merged state to cloud
    const mergedState = Y.encodeStateAsUpdate(this.ydoc);
    await this.cloudProvider.uploadYjsState(mergedState);

    // 5. Update local IndexedDB
    await this.saveToLocal();
  }

  startAutoSync() {
    setInterval(() => this.sync(), this.syncInterval);

    // Also sync on visibility change (tab becomes active)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.sync();
    });
  }
}
```

### Presence & Awareness

**Real-Time Presence:**
```typescript
import { Awareness } from 'y-protocols/awareness';

const awareness = new Awareness(ydoc);

// Set local user info
awareness.setLocalStateField('user', {
  name: 'John Doe',
  email: 'john@example.com',
  color: '#4A90E2',
  cursor: null
});

// Listen for other users
awareness.on('change', () => {
  const states = awareness.getStates();
  states.forEach((state, clientId) => {
    if (clientId !== awareness.clientID) {
      console.log('Other user:', state.user);
      // Show avatar/cursor in UI
    }
  });
});
```

**Conflict Resolution:**
- Yjs automatically resolves conflicts using CRDT algorithms
- Last-write-wins for scalar values
- Array positions preserved during concurrent insertions
- No "version conflicts" shown to users

**Offline Handling:**
```typescript
class OfflineManager {
  private isOnline: boolean = navigator.onLine;
  private pendingChanges: Y.Update[] = [];

  constructor() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  handleOffline() {
    this.isOnline = false;
    // Show offline indicator in UI
    showToast('Working offline. Changes will sync when online.', 'info');
  }

  async handleOnline() {
    this.isOnline = true;
    showToast('Back online. Syncing changes...', 'info');

    // Sync all pending changes
    await syncEngine.sync();

    showToast('All changes synced!', 'success');
  }
}
```

---

## AI Integration

### AI Features

**1. Voice-to-Text (Whisper API)**
```typescript
async function transcribeVoice(audioBlob: Blob): Promise<string> {
  // Call backend proxy (to avoid exposing API keys)
  const formData = new FormData();
  formData.append('audio', audioBlob);

  const response = await fetch('/api/ai/transcribe', {
    method: 'POST',
    headers: { Authorization: `Bearer ${userToken}` },
    body: formData
  });

  const { transcript } = await response.json();
  return transcript;
}

// Usage in note editor
const handleVoiceInput = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = async () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const transcript = await transcribeVoice(audioBlob);
    insertTextAtCursor(transcript);
  };

  recorder.start();
  setTimeout(() => recorder.stop(), 30000); // Max 30 seconds
};
```

**2. Meeting Summaries (GPT-4o-mini)**
```typescript
async function generateMeetingSummary(noteContent: string): Promise<string> {
  const response = await fetch('/api/ai/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify({
      content: noteContent,
      prompt: 'Summarize this meeting note in 3-5 bullet points, highlighting action items and decisions made.'
    })
  });

  const { summary } = await response.json();
  return summary;
}
```

**3. Smart Suggestions (Claude Sonnet)**
```typescript
async function getSuggestions(context: string, type: 'event' | 'task' | 'note'): Promise<string[]> {
  const prompts = {
    event: 'Based on this calendar, suggest 3 upcoming events this family might want to plan:',
    task: 'Based on this grocery list, suggest 3 commonly forgotten items:',
    note: 'Based on this vacation plan, suggest 3 things they might have missed:'
  };

  const response = await fetch('/api/ai/suggest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify({
      context,
      prompt: prompts[type],
      model: 'claude-sonnet-4'
    })
  });

  const { suggestions } = await response.json();
  return suggestions;
}
```

### AI Backend Proxy

**Rate Limiting by Tier:**
```typescript
// Backend: /api/ai/transcribe
const AI_LIMITS = {
  free: { minutes: 5, requests: 10 },
  essential: { minutes: 15, requests: 50 },
  premium: { minutes: 60, requests: 200 },
  family: { minutes: 120, requests: 500 }
};

async function checkAIUsage(userId: string, feature: string): Promise<boolean> {
  const user = await db.users.findById(userId);
  const usage = await db.aiUsage.countForUser(userId, feature, 'this-month');

  const limit = AI_LIMITS[user.subscription_tier];
  return usage < limit.requests;
}
```

**Cost Tracking:**
```typescript
async function trackAICost(userId: string, feature: string, tokensUsed: number) {
  const costPerToken = {
    'whisper': 0.006 / 60, // $0.006 per minute, estimate tokens
    'gpt-4o-mini': 0.00015 / 1000, // $0.15 per 1M tokens
    'claude-sonnet': 0.003 / 1000 // $3 per 1M tokens
  };

  const cost = tokensUsed * costPerToken[feature];

  await db.aiUsage.create({
    user_id: userId,
    feature,
    tokens_used: tokensUsed,
    cost_usd: cost,
    occurred_at: new Date()
  });
}
```

---

## Scalability & Performance

### Performance Targets

**Load Times:**
- Initial load (web): < 2 seconds
- Time to interactive: < 3 seconds
- Route transitions: < 200ms
- Mobile app launch: < 1.5 seconds

**Sync Performance:**
- Sync latency: < 500ms (local network)
- Sync latency: < 2 seconds (cloud)
- Offline→online sync: < 5 seconds for 100 items

**Database Performance:**
- Query time (local): < 50ms for 1000 records
- Query time (cloud): < 500ms
- Concurrent edits: Support 10+ users editing simultaneously

### Optimization Strategies

**Frontend:**
- Code splitting by route
- Lazy loading for images and non-critical components
- Virtual scrolling for long lists (react-window)
- Memoization for expensive calculations (useMemo, React.memo)
- Debouncing for search and auto-save
- Service worker caching for static assets

**Data Management:**
- IndexedDB for fast local queries
- Incremental sync (only changed data)
- Pagination for large datasets
- Background sync for non-urgent updates
- Optimistic UI updates

**Cloud Storage:**
- Batch operations (upload multiple files at once)
- Compression before upload (gzip)
- Differential sync (only send changes)
- Parallel uploads for attachments

### Caching Strategy

**Multi-Layer Cache:**
```
1. Memory (Zustand): Immediate access, cleared on refresh
2. IndexedDB: Persistent, survives refresh, 50MB+ storage
3. Service Worker: Static assets, API responses
4. Cloud Storage: Source of truth
```

**Cache Invalidation:**
```typescript
// Invalidate cache when data changes
function invalidateCache(spaceId: string) {
  // 1. Clear memory cache
  useStore.getState().clearSpace(spaceId);

  // 2. Mark IndexedDB as stale
  db.syncStatus.update(spaceId, { stale: true });

  // 3. Trigger background sync
  syncEngine.syncSpace(spaceId);
}
```

### Scalability Plan

**Phase 1: 0-1,000 users**
- Cloudflare Workers + D1
- Single-region deployment
- Manual monitoring
- Cost: ~$20/month

**Phase 2: 1,000-10,000 users**
- Multi-region deployment (US, EU)
- Automated monitoring (Sentry, PostHog)
- CDN for static assets
- Cost: ~$100-200/month

**Phase 3: 10,000-100,000 users**
- Distributed database (CockroachDB or PlanetScale)
- Edge functions for low latency
- Advanced caching (Redis)
- Dedicated AI infrastructure
- Cost: ~$500-1,000/month

**Phase 4: 100,000+ users**
- Kubernetes for backend services
- Multi-cloud strategy (AWS + GCP)
- Dedicated support team
- Enterprise features (SSO, audit logs)
- Cost: $5,000+/month

---

## Development Workflow

### Development Environment

**Prerequisites:**
- Node.js 20 LTS
- pnpm (faster than npm/yarn)
- Git
- VS Code (recommended IDE)

**Setup:**
```bash
# Clone repository
git clone https://github.com/nidonote/nidonote.git
cd nidonote

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

**Environment Variables:**
```bash
# .env.local
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_MICROSOFT_CLIENT_ID=your-client-id
VITE_BACKEND_URL=http://localhost:8787
VITE_OPENAI_PROXY_URL=http://localhost:8787/api/ai
VITE_ENVIRONMENT=development
```

### Code Quality

**Linting:**
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": "off"
  }
}
```

**Testing Strategy:**
```
Unit Tests (Vitest):
  - Utility functions
  - React hooks
  - Business logic
  - Coverage target: 80%

Integration Tests (React Testing Library):
  - User interactions
  - Component integration
  - State management
  - Coverage target: 60%

E2E Tests (Playwright):
  - Critical user flows
  - Authentication
  - Data sync
  - Cross-browser testing
  - Coverage: 10-15 key flows
```

**Git Workflow:**
```
main          (production)
  ↑
develop       (integration branch)
  ↑
feature/      (feature branches)
bugfix/       (bug fix branches)
hotfix/       (urgent production fixes)
```

**Commit Messages:**
```
feat: Add voice-to-text for notes
fix: Resolve calendar sync conflict
docs: Update API documentation
test: Add tests for event RSVP
refactor: Simplify auth flow
chore: Update dependencies
```

### CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Unit tests
        run: pnpm test:unit

      - name: E2E tests
        run: pnpm test:e2e

      - name: Build
        run: pnpm build

  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Cloudflare Pages (Preview)
        run: pnpm deploy:preview
```

---

## Deployment Strategy

### Web Deployment (Cloudflare Pages)

**Build Configuration:**
```bash
# Build command
pnpm build

# Output directory
dist/

# Environment variables (set in Cloudflare dashboard)
VITE_GOOGLE_CLIENT_ID=prod-client-id
VITE_BACKEND_URL=https://api.nidonote.com
```

**Deployment:**
```bash
# Automatic deployment on git push (main branch)
git push origin main

# Manual deployment
pnpm wrangler pages deploy dist/
```

**Custom Domain:**
- Primary: https://app.nidonote.com
- Alternative: https://nidonote.com (redirects to app)
- SSL: Automatic via Cloudflare

### Mobile Deployment

**iOS (App Store):**
```bash
# Build for production
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios

# Release timeline
# Review: 1-3 days
# TestFlight: Instant
# Production: After Apple approval
```

**Android (Google Play):**
```bash
# Build for production
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android

# Release timeline
# Review: 1-3 days
# Internal testing: Instant
# Production: After Google approval
```

**App Store Metadata:**
```
Title: NIDOnote
Subtitle: Family Notes & Calendar
Description: [245 character version of product description]
Keywords: family organizer, shared calendar, notes, todo list, event planning
Category: Productivity
Age Rating: 4+ (no objectionable content)
```

### Backend Deployment (Cloudflare Workers)

**Configuration:**
```toml
# wrangler.toml
name = "nidonote-api"
main = "src/index.ts"
compatibility_date = "2024-01-15"

[env.production]
vars = { ENVIRONMENT = "production" }

[[d1_databases]]
binding = "DB"
database_name = "nidonote-production"
database_id = "your-database-id"

[env.staging]
vars = { ENVIRONMENT = "staging" }
```

**Deployment:**
```bash
# Deploy to production
pnpm wrangler deploy --env production

# Deploy to staging
pnpm wrangler deploy --env staging
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

**Configuration:**
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.VITE_ENVIRONMENT,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, // 100% of errors

  beforeSend(event) {
    // Don't send user content to Sentry
    if (event.request?.data) {
      delete event.request.data;
    }
    return event;
  }
});
```

### Product Analytics (PostHog)

**Configuration:**
```typescript
import posthog from 'posthog-js';

posthog.init('your-posthog-key', {
  api_host: 'https://app.posthog.com',
  autocapture: false, // Manual tracking only
  capture_pageview: true,
  disable_session_recording: false,
  session_recording: {
    maskAllInputs: true, // Privacy: mask all input fields
    maskAllText: false
  }
});

// Track key events
posthog.capture('space_created', { type: 'calendar' });
posthog.capture('event_created', { has_rsvp: true });
posthog.capture('ai_feature_used', { feature: 'voice-to-text' });
```

**Key Metrics:**
- DAU / MAU (Daily/Monthly Active Users)
- Retention (D1, D7, D30)
- Feature adoption (% using AI, events, shared spaces)
- Conversion (free → paid)
- Churn rate
- NPS (Net Promoter Score)

### Performance Monitoring

**Web Vitals:**
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  posthog.capture('web_vital', {
    name: metric.name,
    value: metric.value,
    rating: metric.rating
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s
- TTFB (Time to First Byte): < 600ms

### Logging

**Structured Logging:**
```typescript
const logger = {
  info: (message: string, context?: object) => {
    console.log(JSON.stringify({ level: 'info', message, ...context, timestamp: new Date() }));
  },
  error: (message: string, error?: Error, context?: object) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      ...context,
      timestamp: new Date()
    }));
    Sentry.captureException(error, { extra: context });
  },
  warn: (message: string, context?: object) => {
    console.warn(JSON.stringify({ level: 'warn', message, ...context, timestamp: new Date() }));
  }
};

// Usage
logger.info('User created shared space', { spaceId: '123', userId: 'abc' });
logger.error('Failed to sync to cloud', error, { spaceId: '123' });
```

---

## Appendix

### Technology Decisions

**Why React over Vue/Svelte?**
- Largest ecosystem and community
- Best mobile support via React Native (code sharing)
- Mature tooling and libraries
- Easier hiring for React developers

**Why Cloudflare over AWS/Vercel?**
- Edge deployment for low latency globally
- Cost-effective at scale ($5-20/month vs $50-200/month)
- Integrated stack (Pages, Workers, D1, R2)
- Excellent DX (developer experience)

**Why Yjs over Operational Transform?**
- Simpler to implement and reason about
- Better offline support
- Proven at scale (Figma uses similar CRDT)
- Active community and maintenance

**Why Minimal Backend?**
- Aligns with privacy-first philosophy
- Lower infrastructure costs
- Simpler to maintain
- Faster development

### Future Enhancements

**Phase 2 Features (6-12 months):**
- End-to-end encryption option
- Advanced meal planning with recipes
- Family budget tracking
- Health tracking integration (HealthKit, Google Fit)
- Video calling for events (WebRTC)
- Custom templates for notes and events

**Phase 3 Features (12-24 months):**
- Desktop apps (Electron or Tauri)
- Browser extension (quick capture)
- Apple Watch / Wear OS apps
- Smart home integration (Alexa, Google Home)
- Public event pages (shareable links)
- Marketplace for templates and themes

### Resources

**Documentation:**
- [Yjs Documentation](https://docs.yjs.dev/)
- [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [iCloud Web Services](https://developer.apple.com/icloud/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/)

**Community:**
- Discord: https://discord.gg/nidonote
- GitHub Discussions: https://github.com/nidonote/nidonote/discussions
- Reddit: r/nidonote

**Support:**
- Email: support@nidonote.com
- Help Center: https://help.nidonote.com
- Status Page: https://status.nidonote.com

---

**End of Technical Architecture Document**

*For technical questions or contributions, see CONTRIBUTING.md*
