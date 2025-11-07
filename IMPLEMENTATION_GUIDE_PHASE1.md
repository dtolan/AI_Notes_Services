# NIDOnote Implementation Guide - Phase 1
## Web Foundation Setup (Month 1)

**Project Goal:** Create a working web application where users can log in with Google, create notes, view a calendar, and have data sync to Google Drive.

**Timeline:** 4 weeks (Month 1)
**Responsible Parties:** Dan (Human) + Claude (AI Assistant)

---

## Table of Contents

1. [Week 1: Environment Setup & Authentication](#week-1-environment-setup--authentication)
2. [Week 2: Note Editor & Google Drive Integration](#week-2-note-editor--google-drive-integration)
3. [Week 3: Calendar Implementation](#week-3-calendar-implementation)
4. [Week 4: Sync Engine & Polish](#week-4-sync-engine--polish)

---

# Week 1: Environment Setup & Authentication

## Day 1: Account Setup & Repository Creation

### Task 1.1: Create GitHub Repository
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**
1. Go to https://github.com/new
2. Repository name: `nidonote-monorepo`
3. Description: `NIDOnote - Family nest for notes, calendar, and events`
4. Set to: **Private** (for now)
5. ✅ Check "Add a README file"
6. ✅ Check "Add .gitignore" → Select template: **Node**
7. License: **MIT License** (or proprietary if you prefer)
8. Click **Create repository**
9. Copy the repository URL: `https://github.com/[your-username]/nidonote-monorepo.git`

**Verification:**
- [ ] Repository created successfully
- [ ] README.md exists
- [ ] .gitignore exists

---

### Task 1.2: Clone Repository Locally
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
1. Open terminal/command prompt
2. Navigate to your projects folder:
   ```bash
   cd c:/Github
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/nidonote-monorepo.git
   cd nidonote-monorepo
   ```
4. Open in VS Code:
   ```bash
   code .
   ```

**Verification:**
- [ ] Repository cloned to `c:/Github/nidonote-monorepo`
- [ ] VS Code opened with project
- [ ] Can see README.md and .gitignore

---

### Task 1.3: Update README with Project Info
**Responsible:** Claude
**Estimated Time:** 5 minutes

**Action for Dan:**
Say to Claude: "Update the README.md file with project information for NIDOnote"

**What Claude will do:**
- Read current README.md
- Write comprehensive README with:
  - Project description
  - Tech stack
  - Folder structure
  - Setup instructions (to be filled in as we go)
  - License info

**Verification:**
- [ ] README.md updated with project info
- [ ] File committed to git

---

### Task 1.4: Create Supabase Account & Project
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**
1. Go to https://supabase.com
2. Click **Start your project**
3. Sign up with GitHub (easiest for integration)
4. Click **New Project**
5. Fill in:
   - **Organization:** Create new → Name: "NIDOnote" or your name
   - **Project name:** `nidonote-production`
   - **Database Password:** Generate strong password → **SAVE THIS SECURELY**
   - **Region:** Choose closest to you (e.g., "US East" if in USA)
   - **Pricing Plan:** Free (no credit card required)
6. Click **Create new project**
7. Wait 2-3 minutes for project to provision

**IMPORTANT - Save These Credentials:**
Once project is created, go to **Settings** → **API**:
- **Project URL:** `https://[your-project].supabase.co`
- **anon public key:** `eyJhbGc...` (long string)
- **service_role key:** `eyJhbGc...` (different long string)

**Where to save:**
Create a file `CREDENTIALS.txt` in your local project (NOT in git):
```
# DO NOT COMMIT THIS FILE
# Add to .gitignore

SUPABASE_PROJECT_URL=https://[your-project].supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
DATABASE_PASSWORD=[your-password]
```

**Verification:**
- [ ] Supabase project created
- [ ] Project URL and keys saved securely
- [ ] Can access Supabase dashboard

---

### Task 1.5: Update .gitignore to Protect Secrets
**Responsible:** Claude
**Estimated Time:** 2 minutes

**Action for Dan:**
Say to Claude: "Update .gitignore to prevent committing secrets and credentials"

**What Claude will do:**
- Edit `.gitignore` to add:
  ```
  # Environment variables
  .env
  .env.local
  .env.development
  .env.production

  # Credentials (NEVER commit)
  CREDENTIALS.txt
  **/credentials.json

  # Supabase local files
  .supabase/

  # IDEs
  .vscode/settings.json
  .idea/

  # OS files
  .DS_Store
  Thumbs.db
  ```

**Verification:**
- [ ] .gitignore updated
- [ ] CREDENTIALS.txt is ignored (test by running `git status`)

---

### Task 1.6: Create Google Cloud Project
**Responsible:** Dan
**Estimated Time:** 15 minutes

**Steps:**

1. **Go to Google Cloud Console:**
   - Navigate to: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create New Project:**
   - Click dropdown at top (says "Select a project")
   - Click **New Project**
   - **Project name:** `NIDOnote`
   - **Organization:** No organization (unless you have one)
   - **Location:** No organization
   - Click **Create**
   - Wait ~30 seconds for project creation
   - Select the new project from the dropdown

3. **Enable Google Drive API:**
   - In left sidebar, click **APIs & Services** → **Library**
   - Search for: `Google Drive API`
   - Click on **Google Drive API**
   - Click **Enable**
   - Wait for activation

4. **Enable Google People API (for user info):**
   - Click **APIs & Services** → **Library** again
   - Search for: `Google People API`
   - Click on **Google People API**
   - Click **Enable**

5. **Configure OAuth Consent Screen:**
   - Go to **APIs & Services** → **OAuth consent screen**
   - Choose **External** (unless you have Google Workspace)
   - Click **Create**
   - Fill in:
     - **App name:** `NIDOnote`
     - **User support email:** [your-email]
     - **App logo:** (skip for now)
     - **Application home page:** `https://nidonote.com` (even if not live yet)
     - **Authorized domains:** `nidonote.com`
     - **Developer contact:** [your-email]
   - Click **Save and Continue**

   - **Scopes:** Click **Add or Remove Scopes**
     - Filter and select:
       - `userinfo.email`
       - `userinfo.profile`
       - `drive.file` (app-created files only)
     - Click **Update**
     - Click **Save and Continue**

   - **Test users:** Click **Add Users**
     - Add your email (you'll be testing)
     - Add 2-3 friend/family emails (optional)
     - Click **Save and Continue**

   - Review and click **Back to Dashboard**

6. **Create OAuth Credentials (Web):**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - **Application type:** Web application
   - **Name:** `NIDOnote Web App`
   - **Authorized JavaScript origins:**
     - Click **Add URI**
     - Add: `http://localhost:5173` (Vite dev server)
     - Click **Add URI**
     - Add: `https://nidonote.com` (production)
   - **Authorized redirect URIs:**
     - Click **Add URI**
     - Add: `http://localhost:5173/auth/callback`
     - Click **Add URI**
     - Add: `https://nidonote.com/auth/callback`
   - Click **Create**

   **SAVE THESE CREDENTIALS:**
   - **Client ID:** `1234567890-abc...apps.googleusercontent.com`
   - **Client Secret:** `GOCSPX-abc...`
   - Copy to your `CREDENTIALS.txt` file:
     ```
     GOOGLE_CLIENT_ID=1234567890-abc...
     GOOGLE_CLIENT_SECRET=GOCSPX-abc...
     ```

7. **Create OAuth Credentials (Android - for later):**
   - Click **Create Credentials** → **OAuth client ID**
   - **Application type:** Android
   - **Name:** `NIDOnote Android App`
   - **Package name:** `com.nidonote.app`
   - **SHA-1 certificate fingerprint:** (we'll get this later when setting up Android)
     - For now, leave blank, click **Create**
   - Save the Client ID to CREDENTIALS.txt

**Verification:**
- [ ] Google Cloud project created
- [ ] Google Drive API enabled
- [ ] Google People API enabled
- [ ] OAuth consent screen configured
- [ ] Web OAuth credentials created
- [ ] All credentials saved in CREDENTIALS.txt

---

### Task 1.7: Configure Supabase Auth with Google
**Responsible:** Dan (with Claude guidance)
**Estimated Time:** 10 minutes

**Steps:**

1. **Go to Supabase Dashboard:**
   - Navigate to: https://supabase.com/dashboard
   - Select your `nidonote-production` project

2. **Enable Google Auth Provider:**
   - Click **Authentication** in left sidebar
   - Click **Providers**
   - Find **Google** in the list
   - Toggle **Enable** to ON

3. **Configure Google Provider:**
   - **Client ID:** Paste from CREDENTIALS.txt (Google OAuth Client ID)
   - **Client Secret:** Paste from CREDENTIALS.txt (Google OAuth Client Secret)
   - **Authorized Client IDs:** Leave empty for now
   - Click **Save**

4. **Get Supabase Redirect URL:**
   - Still in Google provider settings
   - Copy the **Callback URL (for OAuth):**
     - It will look like: `https://[your-project].supabase.co/auth/v1/callback`
   - Save this to CREDENTIALS.txt

5. **Add Supabase Callback to Google Cloud:**
   - Go back to Google Cloud Console
   - **APIs & Services** → **Credentials**
   - Click on your **NIDOnote Web App** OAuth client
   - Under **Authorized redirect URIs**, click **Add URI**
   - Paste the Supabase callback URL
   - Click **Save**

**Verification:**
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret configured
- [ ] Supabase callback URL added to Google Cloud

---

## Day 2: Initialize Web Project

### Task 2.1: Create React + Vite Project
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**

1. **Open terminal in your project root:**
   ```bash
   cd c:/Github/nidonote-monorepo
   ```

2. **Create Vite project:**
   ```bash
   npm create vite@latest web-frontend -- --template react-ts
   ```

   This will create a `web-frontend` folder with React + TypeScript

3. **Navigate to web-frontend:**
   ```bash
   cd web-frontend
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Test that it works:**
   ```bash
   npm run dev
   ```

   - Should see: `Local: http://localhost:5173/`
   - Open browser to http://localhost:5173
   - Should see Vite + React default page

6. **Stop the dev server:**
   - Press `Ctrl+C` in terminal

**Verification:**
- [ ] `web-frontend` folder created
- [ ] Dependencies installed (node_modules exists)
- [ ] Dev server runs successfully
- [ ] Can see React app in browser

---

### Task 2.2: Install Required Packages
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**

1. **Still in `web-frontend` folder, install core packages:**
   ```bash
   npm install @supabase/supabase-js zustand @tanstack/react-query
   ```

2. **Install UI packages:**
   ```bash
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Install routing:**
   ```bash
   npm install react-router-dom
   ```

4. **Install utilities:**
   ```bash
   npm install date-fns uuid
   npm install -D @types/uuid
   ```

5. **Install Google Drive API:**
   ```bash
   npm install googleapis
   ```

**Verification:**
- [ ] All packages installed successfully
- [ ] `package.json` shows all dependencies
- [ ] `tailwind.config.js` created

---

### Task 2.3: Configure TailwindCSS
**Responsible:** Claude
**Estimated Time:** 5 minutes

**Action for Dan:**
Say to Claude: "Configure TailwindCSS for the web-frontend project with NIDOnote brand colors"

**What Claude will do:**
1. Edit `tailwind.config.js` to add brand colors:
   ```js
   theme: {
     extend: {
       colors: {
         'nest-brown': '#8B6F47',
         'sky-blue': '#4A90E2',
         'soft-cream': '#F5F1E8',
         'fresh-green': '#7CB342',
         'warm-orange': '#FF9800',
       }
     }
   }
   ```

2. Update `src/index.css` to include Tailwind directives

3. Remove default Vite styles

**Verification:**
- [ ] `tailwind.config.js` has brand colors
- [ ] `src/index.css` has Tailwind directives
- [ ] Default styles removed

---

### Task 2.4: Create Environment Variables File
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**

1. **Create `.env.local` file in `web-frontend` folder:**
   ```bash
   cd c:/Github/nidonote-monorepo/web-frontend
   touch .env.local
   ```

   Or create manually in VS Code: `web-frontend/.env.local`

2. **Add environment variables** (using your saved credentials):
   ```env
   VITE_SUPABASE_URL=https://[your-project].supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   VITE_GOOGLE_CLIENT_ID=1234567890-abc...apps.googleusercontent.com
   ```

3. **Verify .env.local is ignored by git:**
   ```bash
   git status
   ```
   - Should NOT show `.env.local` (it's in .gitignore)

**Verification:**
- [ ] `.env.local` file created
- [ ] All three variables added
- [ ] File is NOT tracked by git

---

### Task 2.5: Create Project Folder Structure
**Responsible:** Claude
**Estimated Time:** 3 minutes

**Action for Dan:**
Say to Claude: "Create the folder structure for the web-frontend project"

**What Claude will do:**
Using the Bash tool, create folders:
```bash
cd web-frontend/src
mkdir -p components/ui
mkdir -p components/layout
mkdir -p features/auth
mkdir -p features/notes
mkdir -p features/calendar
mkdir -p features/spaces
mkdir -p lib
mkdir -p hooks
mkdir -p types
mkdir -p utils
```

**Resulting structure:**
```
web-frontend/
  src/
    components/
      ui/           # Reusable UI components (Button, Input, etc.)
      layout/       # Layout components (Header, Sidebar, etc.)
    features/
      auth/         # Authentication (login, OAuth)
      notes/        # Note editor, note list
      calendar/     # Calendar views, event creation
      spaces/       # Shared spaces management
    lib/            # External service clients (Supabase, Google Drive)
    hooks/          # Custom React hooks
    types/          # TypeScript types/interfaces
    utils/          # Utility functions
```

**Verification:**
- [ ] All folders created
- [ ] Folder structure matches above

---

### Task 2.6: Create TypeScript Types
**Responsible:** Claude
**Estimated Time:** 10 minutes

**Action for Dan:**
Say to Claude: "Create TypeScript type definitions for User, Note, CalendarEvent, and SharedSpace in web-frontend/src/types/index.ts"

**What Claude will do:**
Create `web-frontend/src/types/index.ts` with:
```typescript
// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  subscription_tier: 'free' | 'essential' | 'premium' | 'family';
}

// Note types
export interface Note {
  id: string;
  space_id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  pinned: boolean;
  archived: boolean;
}

// Calendar Event types
export interface CalendarEvent {
  id: string;
  space_id: string;
  title: string;
  description?: string;
  start_time: string; // ISO 8601
  end_time: string;
  all_day: boolean;
  location?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  rsvp_enabled: boolean;
  rsvp_list: RSVP[];
  color?: string;
}

export interface RSVP {
  user_id: string;
  email: string;
  name: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  guest_count: number;
  note?: string;
  responded_at: string;
}

// Shared Space types
export interface SharedSpace {
  id: string;
  name: string;
  type: 'calendar' | 'notes' | 'tasks' | 'event' | 'general';
  created_at: string;
  updated_at: string;
  manager_id: string;
  members: SpaceMember[];
  settings: SpaceSettings;
  cloud_folder_id?: string;
}

export interface SpaceMember {
  user_id: string;
  email: string;
  role: 'manager' | 'editor' | 'viewer';
  joined_at: string;
  last_active: string;
  avatar_url?: string;
}

export interface SpaceSettings {
  default_calendar_view: 'month' | 'week' | 'day';
  allow_guests: boolean;
  send_notifications: boolean;
  color_theme: string;
}
```

**Verification:**
- [ ] `types/index.ts` created
- [ ] All interfaces defined
- [ ] No TypeScript errors

---

## Day 3: Implement Supabase Client & Authentication

### Task 3.1: Create Supabase Client
**Responsible:** Claude
**Estimated Time:** 5 minutes

**Action for Dan:**
Say to Claude: "Create a Supabase client in web-frontend/src/lib/supabase.ts"

**What Claude will do:**
Create `web-frontend/src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Verification:**
- [ ] File created
- [ ] Imports environment variables correctly
- [ ] No TypeScript errors

---

### Task 3.2: Create Authentication Hook
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Create a useAuth hook in web-frontend/src/hooks/useAuth.ts that handles Google login and session management"

**What Claude will do:**
Create `web-frontend/src/hooks/useAuth.ts` with:
- `signInWithGoogle()` function
- `signOut()` function
- `useAuth()` hook that returns current user
- Session state management

**Verification:**
- [ ] File created
- [ ] Functions implemented
- [ ] Hook returns user state

---

### Task 3.3: Create Login Page
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Create a login page component at web-frontend/src/features/auth/LoginPage.tsx with NIDOnote branding"

**What Claude will do:**
Create login page with:
- NIDOnote branding (logo placeholder, tagline)
- "Sign in with Google" button
- Uses `useAuth` hook
- TailwindCSS styling with brand colors

**Verification:**
- [ ] LoginPage.tsx created
- [ ] Styled with brand colors
- [ ] Google sign-in button present

---

### Task 3.4: Create Dashboard Layout
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Create a dashboard layout component at web-frontend/src/components/layout/DashboardLayout.tsx with header, sidebar, and main content area"

**What Claude will do:**
Create dashboard layout with:
- Header with NIDOnote logo and user menu
- Sidebar with navigation (Notes, Calendar, Spaces)
- Main content area
- Responsive design

**Verification:**
- [ ] DashboardLayout.tsx created
- [ ] Header, sidebar, main area present
- [ ] Styled with brand colors

---

### Task 3.5: Set Up Routing
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Set up React Router in web-frontend/src/App.tsx with routes for login, dashboard, notes, and calendar"

**What Claude will do:**
Update `App.tsx` with:
- React Router setup
- Protected routes (require authentication)
- Routes: `/login`, `/dashboard`, `/notes`, `/calendar`
- Redirect logic (logged out → /login, logged in → /dashboard)

**Verification:**
- [ ] App.tsx updated with router
- [ ] Routes configured
- [ ] Protected routes work

---

### Task 3.6: Test Authentication Flow
**Responsible:** Dan
**Estimated Time:** 15 minutes

**Steps:**

1. **Start dev server:**
   ```bash
   cd c:/Github/nidonote-monorepo/web-frontend
   npm run dev
   ```

2. **Open browser:** http://localhost:5173

3. **Test login flow:**
   - Should see login page
   - Click "Sign in with Google"
   - Google OAuth popup should appear
   - Sign in with your Google account
   - Should redirect to dashboard
   - Should see your email/name in header

4. **Test logout:**
   - Click user menu
   - Click "Sign out"
   - Should redirect to login page

5. **Test protected routes:**
   - While logged out, try to access: http://localhost:5173/dashboard
   - Should redirect to login page

**Verification:**
- [ ] Login with Google works
- [ ] Dashboard loads after login
- [ ] User info displayed
- [ ] Logout works
- [ ] Protected routes redirect when logged out

---

### Task 3.7: Commit Initial Setup
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**

1. **Check git status:**
   ```bash
   cd c:/Github/nidonote-monorepo
   git status
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit:**
   ```bash
   git commit -m "feat: Initial web frontend setup with Google authentication

   - Set up React + Vite + TypeScript
   - Configure TailwindCSS with brand colors
   - Implement Supabase client
   - Add Google OAuth authentication
   - Create login page and dashboard layout
   - Set up routing with protected routes"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

**Verification:**
- [ ] Changes committed
- [ ] Pushed to GitHub
- [ ] Can see commit on GitHub website

---

## Day 4-5: Google Drive Integration Setup

### Task 4.1: Create Google Drive Client
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Create a Google Drive client in web-frontend/src/lib/google-drive.ts that can create folders, upload files, and download files"

**What Claude will do:**
Create `web-frontend/src/lib/google-drive.ts` with:
- `initializeDriveClient()` - Initialize with OAuth token
- `createFolder(name, parentId?)` - Create folder
- `uploadFile(name, content, folderId)` - Upload file
- `downloadFile(fileId)` - Download file
- `listFiles(folderId)` - List files in folder
- Error handling

**Verification:**
- [ ] File created
- [ ] All functions implemented
- [ ] TypeScript types correct

---

### Task 4.2: Request Additional Google Scopes
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**

1. **Update Supabase Google Provider:**
   - Go to Supabase Dashboard → Authentication → Providers → Google
   - Find **Scopes** field
   - Update to: `email profile https://www.googleapis.com/auth/drive.file`
   - Click **Save**

2. **Test with new scopes:**
   - Clear browser cookies/cache for localhost:5173
   - Log out of app if logged in
   - Log in again
   - Google consent screen should now ask for Drive access
   - Grant permission

**Verification:**
- [ ] Scopes updated in Supabase
- [ ] Re-login requests Drive permission
- [ ] Permission granted

---

### Task 4.3: Create Drive Service Hook
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Create a useDrive hook in web-frontend/src/hooks/useDrive.ts that initializes Google Drive client and provides methods for folder/file operations"

**What Claude will do:**
Create hook that:
- Initializes Drive client with Supabase session token
- Returns functions: `createFolder`, `uploadFile`, `downloadFile`
- Handles loading and error states
- Refreshes token if expired

**Verification:**
- [ ] useDrive.ts created
- [ ] Functions wrapped in hook
- [ ] Error handling implemented

---

### Task 4.4: Test Drive Integration
**Responsible:** Dan
**Estimated Time:** 15 minutes

**Steps:**

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12)

3. **Add test button to dashboard** (temporary):
   - Ask Claude: "Add a test button to the dashboard that creates a folder in Google Drive called 'NIDOnote-Test'"

4. **Click test button:**
   - Should see console logs
   - Check your Google Drive: https://drive.google.com
   - Should see new folder: "NIDOnote-Test"

5. **Remove test button after verification**

**Verification:**
- [ ] Test button creates folder in Drive
- [ ] Folder visible in Google Drive web interface
- [ ] No errors in console

---

### Task 4.5: Commit Drive Integration
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Add Google Drive integration

- Create Drive client with folder/file operations
- Add useDrive hook for easy access
- Request Drive API scope in OAuth
- Test folder creation successfully"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

# Week 2: Note Editor & Google Drive Integration

## Day 6-7: Note Editor Implementation

### Task 5.1: Create Note Editor Component
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Create a note editor component at web-frontend/src/features/notes/NoteEditor.tsx with title input and markdown textarea"

**What Claude will do:**
Create note editor with:
- Title input field
- Content textarea (plain text for now, markdown later)
- Auto-save functionality (debounced)
- Character count
- Last saved timestamp
- Styled with TailwindCSS

**Verification:**
- [ ] NoteEditor.tsx created
- [ ] Title and content inputs
- [ ] Auto-save implemented

---

### Task 5.2: Create Notes List Component
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Create a notes list component at web-frontend/src/features/notes/NotesList.tsx that displays all notes with search and filter"

**What Claude will do:**
Create notes list with:
- List of note cards (title, preview, date)
- Search bar
- Filter by tags (future feature)
- Click to open note in editor
- Create new note button
- Empty state (when no notes)

**Verification:**
- [ ] NotesList.tsx created
- [ ] Search functionality
- [ ] Click opens note

---

### Task 5.3: Create Notes Page Layout
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Create a notes page at web-frontend/src/features/notes/NotesPage.tsx with a two-column layout: notes list on left, editor on right"

**What Claude will do:**
Create responsive layout:
- Desktop: Two columns (list | editor)
- Mobile: Single column (toggle between list and editor)
- Resizable divider (optional, nice-to-have)

**Verification:**
- [ ] NotesPage.tsx created
- [ ] Two-column layout
- [ ] Responsive design

---

### Task 5.4: Implement Local Storage (IndexedDB)
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Install Dexie.js and create an IndexedDB database for local note storage in web-frontend/src/lib/db.ts"

**What Claude will do:**
1. Install Dexie.js:
   ```bash
   npm install dexie
   ```

2. Create `web-frontend/src/lib/db.ts`:
   - Define Dexie database class
   - Tables: `notes`, `events`, `spaces`, `sync_status`
   - CRUD operations for notes

**Verification:**
- [ ] Dexie.js installed
- [ ] Database schema defined
- [ ] CRUD operations implemented

---

### Task 5.5: Create Notes State Management
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Create a Zustand store for notes in web-frontend/src/features/notes/notesStore.ts"

**What Claude will do:**
Create Zustand store with:
- State: `notes` array, `selectedNote`, `isLoading`, `error`
- Actions: `addNote`, `updateNote`, `deleteNote`, `selectNote`
- Persistence to IndexedDB
- Selectors for filtering/searching

**Verification:**
- [ ] notesStore.ts created
- [ ] State and actions defined
- [ ] Connected to IndexedDB

---

### Task 5.6: Connect Editor to Store
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Update NoteEditor to use the notes store for loading and saving notes"

**What Claude will do:**
- Connect editor to Zustand store
- Load selected note from store
- Save changes to store (debounced)
- Handle create new note

**Verification:**
- [ ] Editor loads notes from store
- [ ] Changes save to store
- [ ] New notes can be created

---

### Task 5.7: Test Note Editor End-to-End
**Responsible:** Dan
**Estimated Time:** 20 minutes

**Steps:**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Notes page:** http://localhost:5173/notes

3. **Test creating a note:**
   - Click "New Note"
   - Type title: "Test Note"
   - Type content: "This is a test note"
   - Wait 2 seconds for auto-save
   - Should see "Saved at [time]" indicator

4. **Test persistence:**
   - Refresh page (F5)
   - Note should still be there
   - Content should be preserved

5. **Test multiple notes:**
   - Create 3-4 notes with different titles
   - Should see all in left sidebar
   - Click between notes
   - Each should load correct content

6. **Test search:**
   - Type in search bar
   - Notes list should filter

**Verification:**
- [ ] Can create new notes
- [ ] Auto-save works
- [ ] Notes persist after refresh
- [ ] Can switch between notes
- [ ] Search filters notes

---

### Task 5.8: Commit Notes Feature
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Implement note editor with local storage

- Create note editor with title and content
- Add notes list with search
- Implement IndexedDB storage with Dexie
- Add Zustand state management
- Auto-save functionality
- Responsive two-column layout"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

## Day 8-9: Sync Notes to Google Drive

### Task 6.1: Create Sync Engine
**Responsible:** Claude
**Estimated Time:** 45 minutes

**Action for Dan:**
Say to Claude: "Create a sync engine in web-frontend/src/lib/sync-engine.ts that syncs notes between IndexedDB and Google Drive"

**What Claude will do:**
Create sync engine with:
- `syncNote(note)` - Upload note to Drive as JSON
- `downloadNote(fileId)` - Download note from Drive
- `syncAllNotes()` - Sync all local notes to Drive
- `pullFromDrive()` - Pull all notes from Drive
- Conflict detection (compare timestamps)
- Merge strategy (newer wins for now)

**Verification:**
- [ ] sync-engine.ts created
- [ ] Upload/download functions implemented
- [ ] Conflict handling basic

---

### Task 6.2: Create NIDOnote Folder Structure in Drive
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Update sync engine to create a 'NIDOnote' folder structure in Google Drive: NIDOnote/spaces/[space-id]/notes/"

**What Claude will do:**
- `initializeDriveStructure()` function
- Creates folders: `NIDOnote` → `spaces` → `default-space` → `notes`
- Stores folder IDs in IndexedDB for future use
- Only creates once (checks if exists)

**Verification:**
- [ ] Function creates folder structure
- [ ] Folder IDs stored locally
- [ ] Doesn't recreate if exists

---

### Task 6.3: Add Sync Button to UI
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Add a sync button to the notes page header that manually triggers sync to Google Drive"

**What Claude will do:**
- Add sync button with icon
- Shows sync status (syncing, success, error)
- Calls `syncAllNotes()` on click
- Toast notification on success/error

**Verification:**
- [ ] Sync button added
- [ ] Shows loading state
- [ ] Success/error feedback

---

### Task 6.4: Implement Background Sync
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Implement automatic background sync that runs every 30 seconds when the app is active"

**What Claude will do:**
- Create `useSync` hook
- Set up interval for background sync (30 seconds)
- Pause when app not visible (Page Visibility API)
- Resume when app becomes visible
- Sync on note save (debounced)

**Verification:**
- [ ] useSync hook created
- [ ] Background sync runs every 30s
- [ ] Pauses when tab not visible

---

### Task 6.5: Test Drive Sync End-to-End
**Responsible:** Dan
**Estimated Time:** 25 minutes

**Steps:**

1. **Clear existing data** (fresh start):
   - Open browser DevTools (F12)
   - Application tab → IndexedDB → Delete database
   - Refresh page

2. **Log in and create a note:**
   - Create new note: "Test Drive Sync"
   - Content: "This should sync to Google Drive"
   - Wait for auto-save

3. **Click manual sync button:**
   - Should see "Syncing..." indicator
   - Should see "Sync complete" toast

4. **Verify in Google Drive:**
   - Go to https://drive.google.com
   - Navigate to: `NIDOnote` → `spaces` → `default-space` → `notes`
   - Should see JSON file for your note
   - Open file, should see note content

5. **Test sync from Drive:**
   - In Google Drive, manually edit the JSON file (change note title)
   - Save file in Drive
   - Back in app, click sync button
   - Note should update with new title

6. **Test multi-device simulation:**
   - Open app in incognito window (simulates second device)
   - Log in with same Google account
   - Should pull note from Drive
   - Edit note in incognito window
   - Sync in both windows
   - Changes should propagate

**Verification:**
- [ ] Notes sync to Google Drive
- [ ] Files visible in Drive
- [ ] Can pull notes from Drive
- [ ] Multi-device sync works (simulated)

---

### Task 6.6: Add Sync Status Indicator
**Responsible:** Claude
**Estimated Time:** 15 minutes

**Action for Dan:**
Say to Claude: "Add a sync status indicator to each note in the notes list showing if it's synced, syncing, or has errors"

**What Claude will do:**
- Add status icons to note cards
- ✓ Synced (green checkmark)
- ↻ Syncing (spinning icon)
- ⚠ Error (warning icon)
- Update in real-time as sync happens

**Verification:**
- [ ] Status icons added
- [ ] Updates in real-time
- [ ] Clear visual feedback

---

### Task 6.7: Commit Drive Sync Feature
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Implement Google Drive sync for notes

- Create sync engine with upload/download
- Initialize Drive folder structure
- Add manual sync button
- Implement background sync (30s interval)
- Add sync status indicators
- Test multi-device sync (simulated)"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

# Week 3: Calendar Implementation

## Day 10-12: Calendar Views & Events

### Task 7.1: Install Calendar Library
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
cd c:/Github/nidonote-monorepo/web-frontend
npm install react-big-calendar date-fns
npm install -D @types/react-big-calendar
```

**Verification:**
- [ ] Packages installed
- [ ] No errors

---

### Task 7.2: Create Calendar Component
**Responsible:** Claude
**Estimated Time:** 40 minutes

**Action for Dan:**
Say to Claude: "Create a calendar component at web-frontend/src/features/calendar/CalendarView.tsx using react-big-calendar with month, week, and day views"

**What Claude will do:**
- Set up react-big-calendar
- Configure date-fns as localizer
- Implement month/week/day view toggle
- Style with NIDOnote brand colors
- Event click handler
- Time slot click handler (create event)

**Verification:**
- [ ] CalendarView.tsx created
- [ ] All views working
- [ ] Styled correctly

---

### Task 7.3: Create Event Form Modal
**Responsible:** Claude
**Estimated Time:** 35 minutes

**Action for Dan:**
Say to Claude: "Create an event form modal at web-frontend/src/features/calendar/EventFormModal.tsx for creating and editing events"

**What Claude will do:**
Create modal with form fields:
- Title (required)
- Description (optional)
- Start date/time
- End date/time
- All-day toggle
- Location (optional)
- Color picker (for event color)
- Save and Cancel buttons

**Verification:**
- [ ] Modal component created
- [ ] All form fields present
- [ ] Validation works

---

### Task 7.4: Create Events Store
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Create a Zustand store for calendar events in web-frontend/src/features/calendar/eventsStore.ts"

**What Claude will do:**
- State: `events` array, `selectedEvent`, `isLoading`
- Actions: `addEvent`, `updateEvent`, `deleteEvent`
- Persistence to IndexedDB
- Integration with sync engine

**Verification:**
- [ ] eventsStore.ts created
- [ ] CRUD operations implemented
- [ ] Connected to IndexedDB

---

### Task 7.5: Connect Calendar to Store
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Connect CalendarView to the events store and enable creating events by clicking time slots"

**What Claude will do:**
- Load events from store
- Display events on calendar
- Click time slot → Open event form with pre-filled time
- Click existing event → Open event form in edit mode
- Save event → Add to store → Sync to Drive

**Verification:**
- [ ] Calendar displays events
- [ ] Can create events by clicking
- [ ] Can edit events by clicking

---

### Task 7.6: Test Calendar End-to-End
**Responsible:** Dan
**Estimated Time:** 20 minutes

**Steps:**

1. **Navigate to Calendar page:** http://localhost:5173/calendar

2. **Test creating an event:**
   - Click on a date/time
   - Fill in: "Family Dinner" on tomorrow at 6 PM
   - Click Save
   - Event should appear on calendar

3. **Test different views:**
   - Switch to Week view → Event should show
   - Switch to Day view → Event should show
   - Switch back to Month view

4. **Test editing an event:**
   - Click on "Family Dinner" event
   - Change time to 7 PM
   - Click Save
   - Event should update on calendar

5. **Test all-day events:**
   - Create event "Birthday" as all-day
   - Should display differently (no time shown)

6. **Test persistence:**
   - Refresh page
   - Events should still be there

7. **Test sync to Drive:**
   - Click sync button (if visible) or wait for background sync
   - Check Google Drive: `NIDOnote/spaces/default-space/calendar.json`
   - Should see events in JSON format

**Verification:**
- [ ] Can create events
- [ ] All views work
- [ ] Can edit events
- [ ] All-day events work
- [ ] Events persist
- [ ] Sync to Drive works

---

### Task 7.7: Commit Calendar Feature
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Implement calendar with event creation

- Add react-big-calendar with month/week/day views
- Create event form modal
- Implement events store with IndexedDB
- Connect calendar to sync engine
- Support all-day events
- Event editing and deletion"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

## Day 13-14: RSVP Feature for Events

### Task 8.1: Add RSVP Fields to Event Model
**Responsible:** Claude
**Estimated Time:** 10 minutes

**Action for Dan:**
Say to Claude: "Update the CalendarEvent type in types/index.ts to include rsvp_enabled and rsvp_list fields"

**What Claude will do:**
- Update TypeScript interface
- Ensure RSVP type is defined

**Verification:**
- [ ] Type updated
- [ ] No TypeScript errors

---

### Task 8.2: Add RSVP Toggle to Event Form
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Update EventFormModal to include an 'Enable RSVP' toggle and RSVP list display"

**What Claude will do:**
- Add toggle for "Enable RSVP"
- Show RSVP list section when enabled
- Display current RSVPs (if any)
- Add "Share Event Link" button (for later)

**Verification:**
- [ ] Toggle added
- [ ] RSVP section shows conditionally
- [ ] UI looks good

---

### Task 8.3: Create RSVP Response Modal
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Create an RSVP response modal at web-frontend/src/features/calendar/RSVPModal.tsx for guests to respond to event invitations"

**What Claude will do:**
Create modal with:
- Event details (title, date, location)
- RSVP buttons: Yes, No, Maybe
- Guest count input (bring +X guests)
- Optional note field
- Submit button

**Verification:**
- [ ] RSVPModal.tsx created
- [ ] All RSVP options present
- [ ] Guest count input works

---

### Task 8.4: Add RSVP Status Display
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Add RSVP status display to event details showing who responded Yes/No/Maybe"

**What Claude will do:**
- Group RSVPs by status
- Display attendee list with avatars/names
- Show total count: "5 Yes, 2 No, 1 Maybe"
- Color-coded for easy scanning

**Verification:**
- [ ] RSVP status displayed
- [ ] Grouped by response
- [ ] Looks clean and organized

---

### Task 8.5: Test RSVP Feature
**Responsible:** Dan
**Estimated Time:** 15 minutes

**Steps:**

1. **Create an event with RSVP:**
   - Create event "Family BBQ" next Saturday
   - Enable RSVP
   - Save event

2. **Simulate RSVP responses** (manually add to store for now):
   - Open DevTools console
   - Manually add RSVP entries (Claude can provide test code)
   - Add: John Doe (Yes, +2 guests), Jane Smith (Maybe), Bob Wilson (No)

3. **View RSVP status:**
   - Click on event
   - Should see: "2 Yes, 1 No, 1 Maybe"
   - Should see attendee list with names

4. **Test syncing:**
   - Sync to Drive
   - Check JSON file, should include RSVP data

**Verification:**
- [ ] RSVP toggle works
- [ ] Can add RSVPs
- [ ] Status displays correctly
- [ ] Syncs to Drive

---

### Task 8.6: Commit RSVP Feature
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Add RSVP functionality to calendar events

- Add RSVP toggle to event form
- Create RSVP response modal
- Display RSVP status and attendee list
- Include guest count option
- Sync RSVP data to Drive"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

# Week 4: Sync Engine Polish & Testing

## Day 15-16: Yjs Integration for Conflict-Free Sync

### Task 9.1: Install Yjs
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
cd c:/Github/nidonote-monorepo/web-frontend
npm install yjs y-indexeddb
```

**Verification:**
- [ ] Packages installed

---

### Task 9.2: Integrate Yjs with Notes
**Responsible:** Claude
**Estimated Time:** 45 minutes

**Action for Dan:**
Say to Claude: "Integrate Yjs into the notes sync engine to enable conflict-free merging when multiple people edit the same note"

**What Claude will do:**
- Create Yjs document for each note
- Store Yjs state in IndexedDB
- Update sync engine to sync Yjs state to Drive
- Implement merge logic using Yjs.applyUpdate()
- Test conflict scenarios

**Verification:**
- [ ] Yjs integrated
- [ ] Notes use Yjs documents
- [ ] Conflicts merge automatically

---

### Task 9.3: Integrate Yjs with Calendar
**Responsible:** Claude
**Estimated Time:** 40 minutes

**Action for Dan:**
Say to Claude: "Integrate Yjs with calendar events for conflict-free syncing"

**What Claude will do:**
- Same as notes, but for calendar events
- Yjs document per shared space (not per event)
- Events stored in Yjs array

**Verification:**
- [ ] Calendar uses Yjs
- [ ] Events sync without conflicts

---

### Task 9.4: Test Conflict Resolution
**Responsible:** Dan
**Estimated Time:** 30 minutes

**Steps:**

1. **Simulate offline editing:**
   - Open app in two browser windows (Window A, Window B)
   - Turn off network in Window B (DevTools → Network → Offline)
   - Edit same note in both windows
   - Window A: Change title to "Version A"
   - Window B: Change title to "Version B"

2. **Bring Window B back online:**
   - Turn network back on
   - Wait for sync (or click manual sync)

3. **Check merge result:**
   - Yjs should merge both edits
   - Last edit should win (or both preserved depending on timing)
   - NO "Conflict" error message
   - NO data loss

4. **Test with calendar events:**
   - Same process but with calendar events
   - Edit event time in Window A
   - Edit event location in Window B
   - Both changes should merge successfully

**Verification:**
- [ ] Conflicts resolve automatically
- [ ] No data loss
- [ ] No error messages
- [ ] Both edits preserved where possible

---

### Task 9.5: Commit Yjs Integration
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Integrate Yjs for conflict-free sync

- Add Yjs for CRDT-based merging
- Update notes sync to use Yjs documents
- Update calendar sync to use Yjs
- Implement automatic conflict resolution
- Test multi-device editing scenarios"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

## Day 17-18: Shared Spaces Foundation

### Task 10.1: Create Spaces Store
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Create a Zustand store for shared spaces in web-frontend/src/features/spaces/spacesStore.ts"

**What Claude will do:**
- State: `spaces` array, `currentSpace`, `isLoading`
- Actions: `createSpace`, `switchSpace`, `inviteMember`
- Default space created automatically
- Store current space ID in localStorage

**Verification:**
- [ ] spacesStore.ts created
- [ ] CRUD operations implemented
- [ ] Current space persists

---

### Task 10.2: Create Space Selector UI
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Add a space selector dropdown to the dashboard header that allows switching between shared spaces"

**What Claude will do:**
- Dropdown in header showing current space
- List all spaces when clicked
- "Create New Space" button
- Switch space on click
- Show space icon/color

**Verification:**
- [ ] Dropdown added to header
- [ ] Can switch between spaces
- [ ] Current space highlighted

---

### Task 10.3: Filter Notes/Events by Space
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Update notes and calendar to only show content for the currently selected space"

**What Claude will do:**
- Add `space_id` field to all notes and events
- Filter queries by current space
- Update create operations to include space_id
- Sync per-space (separate Drive folders)

**Verification:**
- [ ] Notes filtered by space
- [ ] Events filtered by space
- [ ] Creating content adds to current space

---

### Task 10.4: Create Space Settings Modal
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Create a space settings modal at web-frontend/src/features/spaces/SpaceSettingsModal.tsx for managing space name, members, and settings"

**What Claude will do:**
Create modal with:
- Space name input
- Member list (with roles: manager, editor, viewer)
- Invite member input (email)
- Space color picker
- Delete space button (with confirmation)

**Verification:**
- [ ] Modal created
- [ ] Can edit space name
- [ ] Member list displayed
- [ ] Settings save correctly

---

### Task 10.5: Test Shared Spaces
**Responsible:** Dan
**Estimated Time:** 20 minutes

**Steps:**

1. **Create multiple spaces:**
   - Create "Family" space
   - Create "Vacation 2025" space
   - Create "Work" space

2. **Add content to each space:**
   - Switch to "Family" space
   - Create note "Grocery List"
   - Create event "Family Dinner"

   - Switch to "Vacation 2025" space
   - Create note "Packing List"
   - Create event "Flight Departure"

3. **Test filtering:**
   - Switch to "Family" → Should only see Family content
   - Switch to "Vacation 2025" → Should only see Vacation content
   - Switch to "Work" → Should be empty

4. **Test persistence:**
   - Refresh page
   - Current space should be remembered
   - Content filtering should work

5. **Test Drive sync:**
   - Check Google Drive
   - Should see folders: `NIDOnote/spaces/family/`, `NIDOnote/spaces/vacation-2025/`
   - Each with separate notes and calendar files

**Verification:**
- [ ] Multiple spaces work
- [ ] Content filtered correctly
- [ ] Space persists across refresh
- [ ] Separate Drive folders created

---

### Task 10.6: Commit Shared Spaces
**Responsible:** Dan
**Estimated Time:** 5 minutes

**Steps:**
```bash
git add .
git commit -m "feat: Implement shared spaces for organizing content

- Create spaces store with multiple spaces support
- Add space selector to header
- Filter notes and events by current space
- Create space settings modal
- Sync each space to separate Drive folder
- Support space switching and persistence"
git push origin main
```

**Verification:**
- [ ] Committed and pushed

---

## Day 19-20: Polish & End-of-Month Testing

### Task 11.1: Add Loading States
**Responsible:** Claude
**Estimated Time:** 30 minutes

**Action for Dan:**
Say to Claude: "Add loading skeletons and spinners throughout the app for better UX during data fetching"

**What Claude will do:**
- Add skeleton loaders to notes list
- Add skeleton loaders to calendar
- Add spinner to sync button when syncing
- Add loading state to login
- Smooth transitions

**Verification:**
- [ ] Loading states added
- [ ] Looks professional
- [ ] No layout shift

---

### Task 11.2: Add Error Boundaries
**Responsible:** Claude
**Estimated Time:** 20 minutes

**Action for Dan:**
Say to Claude: "Add React error boundaries to catch and display errors gracefully"

**What Claude will do:**
- Create ErrorBoundary component
- Wrap main app sections
- Show user-friendly error message
- Log errors to console
- "Try again" button

**Verification:**
- [ ] Error boundary implemented
- [ ] Catches errors without crashing
- [ ] User-friendly messaging

---

### Task 11.3: Add Toast Notifications
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Implement a toast notification system for user feedback (success, error, info)"

**What Claude will do:**
- Install or create toast library
- Add toast container to app
- Create toast utility functions
- Add toasts for key actions:
  - "Note saved"
  - "Event created"
  - "Sync complete"
  - "Error: Failed to sync"

**Verification:**
- [ ] Toast system working
- [ ] Shows for key actions
- [ ] Auto-dismisses

---

### Task 11.4: Improve Mobile Responsiveness
**Responsible:** Claude
**Estimated Time:** 40 minutes

**Action for Dan:**
Say to Claude: "Audit and improve mobile responsiveness for all pages (notes, calendar, dashboard)"

**What Claude will do:**
- Test on mobile viewport (DevTools)
- Fix layout issues
- Make buttons touch-friendly (44px min)
- Collapsible sidebar on mobile
- Bottom navigation bar (optional)

**Verification:**
- [ ] Works well on mobile (375px width)
- [ ] Touch targets adequate
- [ ] No horizontal scroll

---

### Task 11.5: Add Keyboard Shortcuts
**Responsible:** Claude
**Estimated Time:** 25 minutes

**Action for Dan:**
Say to Claude: "Add keyboard shortcuts for common actions: Ctrl+N (new note), Ctrl+S (save/sync), Ctrl+K (search)"

**What Claude will do:**
- Create keyboard shortcut hook
- Implement shortcuts:
  - Ctrl+N: New note
  - Ctrl+S: Manual sync
  - Ctrl+K: Focus search
  - Escape: Close modals
- Show keyboard shortcut hints in UI

**Verification:**
- [ ] Shortcuts work
- [ ] Hints visible
- [ ] Cross-browser compatible

---

### Task 11.6: Comprehensive End-to-End Testing
**Responsible:** Dan
**Estimated Time:** 60 minutes

**Complete User Flow Test:**

1. **Fresh Start:**
   - Clear all data (IndexedDB, localStorage)
   - Log out if logged in

2. **Authentication Flow:**
   - [ ] Open app → See login page
   - [ ] Click "Sign in with Google" → OAuth popup
   - [ ] Grant permissions → Redirect to dashboard
   - [ ] See welcome message or empty state

3. **Notes Flow:**
   - [ ] Navigate to Notes
   - [ ] Create 5 notes with different titles
   - [ ] Edit notes
   - [ ] Search for notes
   - [ ] Delete a note
   - [ ] Check sync status
   - [ ] Verify in Google Drive

4. **Calendar Flow:**
   - [ ] Navigate to Calendar
   - [ ] Create event tomorrow at 3 PM
   - [ ] Create all-day event next week
   - [ ] Enable RSVP on one event
   - [ ] Switch between month/week/day views
   - [ ] Edit an event
   - [ ] Delete an event
   - [ ] Verify in Google Drive

5. **Shared Spaces Flow:**
   - [ ] Create "Test Space"
   - [ ] Switch to Test Space
   - [ ] Create note in Test Space
   - [ ] Create event in Test Space
   - [ ] Switch back to default space
   - [ ] Verify content filtered correctly
   - [ ] Check separate Drive folders

6. **Sync Testing:**
   - [ ] Turn off network (DevTools → Offline)
   - [ ] Create note offline
   - [ ] Edit existing note offline
   - [ ] Turn network back on
   - [ ] Manual sync or wait for auto-sync
   - [ ] Verify changes uploaded to Drive

7. **Multi-Device Simulation:**
   - [ ] Open incognito window
   - [ ] Log in with same account
   - [ ] Should pull all data from Drive
   - [ ] Create note in Window A
   - [ ] Sync in both windows
   - [ ] Note appears in Window B
   - [ ] Edit same note in both windows (different parts)
   - [ ] Sync → No conflicts, both edits merged

8. **Mobile Testing:**
   - [ ] Open DevTools → Toggle device toolbar
   - [ ] Test on iPhone SE (375px)
   - [ ] Test on iPad (768px)
   - [ ] All features accessible
   - [ ] UI looks good
   - [ ] Touch targets adequate

9. **Error Scenarios:**
   - [ ] Disconnect Drive (revoke permissions in Google settings)
   - [ ] Try to sync → Should show error message
   - [ ] Reconnect Drive → Should recover
   - [ ] Delete Drive folder manually
   - [ ] App should recreate it

10. **Performance:**
    - [ ] Create 50 notes
    - [ ] Create 20 events
    - [ ] App still responsive
    - [ ] Search still fast
    - [ ] Sync completes in < 10 seconds

**Issues Found:** (Document any issues discovered)
```
Issue 1: [Description]
Severity: High/Medium/Low
Steps to reproduce: [Steps]

Issue 2: ...
```

**Verification:**
- [ ] All flows completed successfully
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Ready for Android development (Month 2)

---

### Task 11.7: Create Issue Tracker
**Responsible:** Dan
**Estimated Time:** 15 minutes

**Steps:**

1. **Create GitHub Issues for bugs found:**
   - Go to GitHub repo → Issues tab
   - Click "New Issue"
   - For each bug found in testing:
     - Title: "Bug: [Short description]"
     - Description: Steps to reproduce, expected vs actual behavior
     - Labels: `bug`, `high-priority` / `medium-priority` / `low-priority`

2. **Create issues for future features:**
   - "Feature: Android app" (Month 2 milestone)
   - "Feature: Voice-to-text" (Month 3 milestone)
   - "Feature: Signup sheets for events" (Future)
   - "Feature: iOS app" (Subcontractor milestone)

**Verification:**
- [ ] Bugs documented as issues
- [ ] Future features tracked
- [ ] Issues prioritized

---

### Task 11.8: Final Commit for Month 1
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**
```bash
git add .
git commit -m "polish: Month 1 completion - Web MVP ready

- Add loading states and skeletons
- Implement error boundaries
- Add toast notifications
- Improve mobile responsiveness
- Add keyboard shortcuts
- Complete end-to-end testing
- Fix critical bugs

Month 1 deliverables complete:
✅ Google OAuth authentication
✅ Note editor with auto-save
✅ Calendar with event creation
✅ RSVP functionality
✅ Google Drive sync
✅ Conflict-free merging with Yjs
✅ Shared spaces (multiple spaces)
✅ Responsive design
✅ Manual and background sync

Ready for Month 2: Android development"

git push origin main
```

**Verification:**
- [ ] Final commit pushed
- [ ] GitHub repo up to date

---

### Task 11.9: Create Month 1 Release
**Responsible:** Dan
**Estimated Time:** 10 minutes

**Steps:**

1. **Go to GitHub repo:** https://github.com/[your-username]/nidonote-monorepo

2. **Create release:**
   - Click "Releases" → "Create a new release"
   - Tag: `v0.1.0-alpha`
   - Title: "Month 1 Alpha - Web MVP"
   - Description:
     ```markdown
     # NIDOnote v0.1.0 Alpha - Web MVP

     First working version of NIDOnote web application.

     ## Features
     - ✅ Google OAuth authentication
     - ✅ Note taking with auto-save
     - ✅ Calendar with month/week/day views
     - ✅ Event creation with RSVP tracking
     - ✅ Google Drive sync
     - ✅ Conflict-free merging (Yjs CRDT)
     - ✅ Multiple shared spaces
     - ✅ Responsive design

     ## Known Limitations
     - Web only (no mobile apps yet)
     - No voice-to-text (coming in Month 3)
     - No member invitations (coming in Month 2)
     - Beta quality, not production-ready

     ## Next Steps
     - Month 2: Android app development
     - Month 3: Voice-to-text and AI features

     ## Testing
     Deployed at: [Cloudflare Pages URL]
     Login required (Google account)
     ```
   - Click "Publish release"

**Verification:**
- [ ] Release created
- [ ] Version tagged

---

## Month 1 Completion Checklist

### Core Features ✅
- [ ] User can log in with Google OAuth
- [ ] User can create, edit, and delete notes
- [ ] Notes auto-save every 2-3 seconds
- [ ] User can create calendar events with date/time
- [ ] User can view calendar in month/week/day views
- [ ] User can enable RSVP for events
- [ ] User can view RSVP responses
- [ ] All data syncs to Google Drive
- [ ] Sync happens automatically every 30 seconds
- [ ] User can manually trigger sync
- [ ] Conflicts resolve automatically (Yjs)
- [ ] User can create multiple shared spaces
- [ ] User can switch between spaces
- [ ] Content filtered by current space

### Technical ✅
- [ ] React + TypeScript + Vite setup
- [ ] TailwindCSS configured with brand colors
- [ ] Supabase authentication working
- [ ] Google Drive API integration complete
- [ ] IndexedDB for local storage
- [ ] Yjs for CRDT conflict resolution
- [ ] Zustand for state management
- [ ] React Router for navigation
- [ ] Error boundaries implemented
- [ ] Loading states throughout

### Quality ✅
- [ ] Responsive design (mobile-friendly)
- [ ] Loading skeletons for better UX
- [ ] Toast notifications for feedback
- [ ] Keyboard shortcuts work
- [ ] No critical bugs
- [ ] End-to-end testing complete
- [ ] Code committed to GitHub
- [ ] Release created

### Documentation ✅
- [ ] README updated with setup instructions
- [ ] Environment variables documented
- [ ] Known issues tracked in GitHub Issues
- [ ] Future features planned in Issues

---

## Time Tracking Summary

| Week | Tasks | Estimated Hours | Notes |
|------|-------|----------------|-------|
| Week 1 | Environment setup, auth | 15-20 hours | Account creation, OAuth configuration |
| Week 2 | Notes editor, Drive sync | 20-25 hours | Core functionality |
| Week 3 | Calendar, RSVP | 20-25 hours | Most complex features |
| Week 4 | Yjs, spaces, polish | 20-25 hours | Integration and testing |
| **Total** | **Month 1** | **75-95 hours** | **~20-25 hours/week** |

**Note for Dan:** This is aggressive but achievable with AI assistance (Claude). Expect to work 20-25 hours per week if this is a side project, or can be done in 2-3 weeks full-time.

---

## What's Next: Month 2 Preview

### Android App Development (Flutter)
- Install Flutter and Android Studio
- Create Flutter project structure
- Port core features to Flutter
- Implement native Google Drive integration
- Add native voice-to-text (FREE!)
- Test on Android emulator
- Publish to Google Play (beta track)

**Separate guide will be created: `IMPLEMENTATION_GUIDE_PHASE2.md`**

---

## Support & Questions

### When Dan Gets Stuck

**For Account Setup Issues:**
- Google Cloud: Check https://console.cloud.google.com/getting-started
- Supabase: Check https://supabase.com/docs
- GitHub: Check https://docs.github.com

**For Code Issues:**
- Ask Claude: "I'm getting error [X], how do I fix it?"
- Provide full error message
- Mention which task you're on

**For Design Decisions:**
- Refer back to `PRODUCT_STRATEGY_NIDONOTE.md`
- Refer to `BRAND_IDENTITY_NIDONOTE.md`
- Ask Claude: "Which approach is better: A or B?"

### Communication with Claude

**Good requests:**
✅ "Create a note editor component with auto-save"
✅ "I'm getting error 'Cannot read property of undefined' when clicking sync button"
✅ "Update the calendar to show events from the current space only"

**Less helpful requests:**
❌ "Make it work" (too vague)
❌ "Fix the bug" (which bug? what's the symptom?)
❌ "Do the next thing" (specify which task)

---

## Cost Tracking (Month 1)

| Item | Cost | Status |
|------|------|--------|
| Domain (nidonote.com) | $12/year | Already paid |
| Google Play Developer | $0 | Not needed until Month 2 |
| Supabase | $0 | Free tier |
| Cloudflare | $0 | Free tier |
| OpenAI API | $0-5 | Not needed until Month 3 |
| **Total Month 1** | **$0** | (Domain already paid) |

---

**End of Implementation Guide - Phase 1**

**Questions? Issues? Blockers?**
→ Document in GitHub Issues
→ Ask Claude for help
→ Refer to technical docs

**Ready to start?** Begin with Task 1.1: Create GitHub Repository

Good luck, Dan! 🚀

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Next Guide:** `IMPLEMENTATION_GUIDE_PHASE2.md` (Android Development)
