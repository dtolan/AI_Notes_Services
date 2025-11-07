# NIDOnote - Your Family Nest for Notes, Calendar, and Events

**Version:** 0.1.0 Alpha
**Status:** Development (Month 1 - Web MVP)
**Team:** Dan (Solo Developer) + Claude (AI Assistant)

---

## 🎯 Project Overview

**NIDOnote** (pronounced NEE-doh-NOTE) is a family-first organization application that helps families manage notes, calendars, events, and collaboration—all while keeping data safe in their own personal cloud storage.

### What Makes NIDOnote Different?

- **🔒 Privacy-First:** Your data stays in YOUR Google Drive/iCloud, not on our servers
- **👨‍👩‍👧‍👦 Family-Focused:** Built for families, not adapted from business software
- **🎉 Event Planning:** Built-in RSVP tracking and signup sheets for family gatherings
- **💰 Free Guest Model:** Only the host pays for premium—guests join free
- **🤖 AI-Powered:** Voice-to-text, smart suggestions, meeting summaries
- **📱 Multi-Platform:** Web, Android, iOS (coming soon)

---

## 📚 Documentation

This repository contains comprehensive documentation for building NIDOnote:

### Strategic Planning
1. **[PRODUCT_STRATEGY_NIDONOTE.md](PRODUCT_STRATEGY_NIDONOTE.md)** - Complete Product Strategy
   - Market analysis and competitive positioning
   - Feature breakdown and pricing tiers
   - Go-to-market strategy and revenue projections
   - 18-month product roadmap

2. **[BRAND_IDENTITY_NIDONOTE.md](BRAND_IDENTITY_NIDONOTE.md)** - Brand Identity Guidelines
   - Logo system and design specifications
   - Color palette with complete specifications
   - Typography system and usage
   - Brand voice and tone guidelines
   - UI component specifications
   - Marketing asset templates

### Technical Documentation
3. **[TECHNICAL_ARCHITECTURE_NIDONOTE.md](TECHNICAL_ARCHITECTURE_NIDONOTE.md)** - Technical Architecture
   - Complete system architecture
   - Technology stack decisions
   - Data models and schemas
   - Security and privacy architecture
   - Platform-specific implementation guides
   - Real-time collaboration design
   - AI integration strategy
   - Scalability and deployment plans

### Implementation Guides
4. **[IMPLEMENTATION_GUIDE_PHASE1.md](IMPLEMENTATION_GUIDE_PHASE1.md)** ⭐ **START HERE!**
   - Step-by-step setup instructions
   - Day-by-day implementation plan (Month 1)
   - Detailed tasks with responsible parties (Dan vs Claude)
   - Environment setup guides
   - Testing procedures
   - Troubleshooting tips

### Legal & Business
5. **[TRADEMARK_FILING_CHECKLIST_NIDONOTE.md](TRADEMARK_FILING_CHECKLIST_NIDONOTE.md)** - Trademark Filing Guide
   - Comprehensive trademark research checklist
   - USPTO filing instructions
   - Cost breakdowns ($700-$4,500)
   - International filing strategy
   - Domain and social media protection
   - Maintenance requirements

---

## 🚀 Quick Start

### For Dan (Developer):

**Prerequisites:**
- Windows 10/11 or macOS
- Node.js 20 LTS installed
- Git installed
- VS Code installed
- Google account
- GitHub account

**To Begin Development:**

1. **Read the Implementation Guide:**
   ```
   Open: IMPLEMENTATION_GUIDE_PHASE1.md
   Start with: Week 1, Day 1, Task 1.1
   ```

2. **The guide will walk you through:**
   - Creating GitHub repository
   - Setting up Supabase (free backend)
   - Configuring Google Cloud Project
   - Initializing React + Vite web app
   - Implementing authentication
   - Building core features (notes, calendar, sync)

3. **Work with Claude:**
   - Each task specifies: "Responsible: Dan" or "Responsible: Claude"
   - Ask Claude to perform Claude-assigned tasks
   - Dan handles account creation, testing, and verification

**Estimated Time:** 75-95 hours over 4 weeks (20-25 hours/week for side project)

---

## 🛠️ Technology Stack

### Month 1 (Web MVP) - Current Phase

**Frontend:**
- React 18.3 + TypeScript 5.3
- Vite 5.0 (build tool)
- TailwindCSS (styling)
- Zustand (state management)
- Dexie.js (IndexedDB local storage)
- Yjs (conflict-free sync)

**Backend (Minimal):**
- Supabase (PostgreSQL, Auth, Edge Functions)
- Free tier: 500MB DB, 50k monthly users

**Cloud Storage:**
- Google Drive API (user's personal storage)
- OAuth 2.0 authentication

**Hosting:**
- Cloudflare Pages (web hosting)
- Free tier: unlimited bandwidth

**Cost:** $0/month (all free tiers)

### Month 2 (Android App) - Next Phase

**Mobile Framework:**
- Flutter 3.16+ (Dart language)
- Native Android focus
- Google Drive integration
- Free native voice-to-text

**Cost:** $25 one-time (Google Play Developer account)

### Month 3 (iOS + AI Features) - Future

**iOS:**
- Subcontracted to specialist
- Native Swift or Flutter

**AI:**
- OpenAI Whisper (voice-to-text for web)
- OpenAI GPT-4o-mini (summaries)
- Cost: $0.03-0.20 per paid user per month

---

## 📁 Project Structure

```
nidonote-monorepo/
├── README.md                              # This file
├── .gitignore                             # Git ignore rules
├── CREDENTIALS.txt                        # Local only, NOT in git
│
├── docs/                                  # All documentation
│   ├── PRODUCT_STRATEGY_NIDONOTE.md
│   ├── BRAND_IDENTITY_NIDONOTE.md
│   ├── TECHNICAL_ARCHITECTURE_NIDONOTE.md
│   ├── IMPLEMENTATION_GUIDE_PHASE1.md
│   ├── IMPLEMENTATION_GUIDE_PHASE2.md     # Coming in Month 2
│   └── TRADEMARK_FILING_CHECKLIST_NIDONOTE.md
│
├── web-frontend/                          # React web application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                       # Reusable UI components
│   │   │   └── layout/                   # Layout components
│   │   ├── features/
│   │   │   ├── auth/                     # Authentication
│   │   │   ├── notes/                    # Note taking
│   │   │   ├── calendar/                 # Calendar & events
│   │   │   └── spaces/                   # Shared spaces
│   │   ├── lib/
│   │   │   ├── supabase.ts               # Supabase client
│   │   │   ├── google-drive.ts           # Drive integration
│   │   │   ├── sync-engine.ts            # Sync logic
│   │   │   └── db.ts                     # IndexedDB (Dexie)
│   │   ├── hooks/                        # Custom React hooks
│   │   ├── types/                        # TypeScript types
│   │   └── utils/                        # Utility functions
│   ├── public/
│   ├── .env.local                        # Environment variables (NOT in git)
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── android-flutter/                       # Flutter Android app (Month 2)
│   ├── lib/
│   ├── android/
│   ├── pubspec.yaml
│   └── (to be created in Month 2)
│
└── supabase/                              # Backend configuration
    ├── functions/                         # Edge Functions
    ├── migrations/                        # Database migrations
    └── config.toml
```

---

## 🎨 Brand Identity

### Colors
- **Nest Brown:** `#8B6F47` - Primary brand color
- **Sky Blue:** `#4A90E2` - Secondary, links, actions
- **Soft Cream:** `#F5F1E8` - Backgrounds
- **Fresh Green:** `#7CB342` - Success states
- **Warm Orange:** `#FF9800` - Highlights, premium

### Typography
- **Primary:** Inter (UI and body text)
- **Secondary:** Merriweather (marketing headlines)

### Logo Concept
- Stylized nest shape incorporating "NIDO"
- Warm, rounded curves
- "NIDO" emphasized in caps, "note" in lowercase

**Full details:** See [BRAND_IDENTITY_NIDONOTE.md](BRAND_IDENTITY_NIDONOTE.md)

---

## 💰 Pricing Strategy

### Free Tier
- 1 shared space
- Unlimited notes, calendar events
- 1 free guest
- Google Drive sync
- Mobile apps (Android + iOS)
- Voice-to-text (Android app only, using device)

### Essential Tier - $1.99/month
- 3 shared spaces
- 1 free guest
- Web voice-to-text (5 min/month)
- AI summaries (5/month)
- Priority support

### Premium Tier - $6.99/month
- 6 shared spaces
- 5 free guests
- Web voice-to-text (15 min/month)
- AI summaries (20/month)
- Smart suggestions
- Custom themes

### Family Tier - $9.99/month
- Unlimited shared spaces
- Unlimited free guests
- Web voice-to-text (30 min/month)
- AI summaries (50/month)
- All premium features
- Family admin controls

**Competitive Advantage:** Other family apps cost $30-40/month for similar features.

---

## 📈 Development Roadmap

### ✅ Phase 0: Planning & Design (Completed)
- [x] Product strategy document
- [x] Brand identity guidelines
- [x] Technical architecture
- [x] Implementation guide
- [x] Trademark filing checklist

### 🚧 Phase 1: Web MVP (Month 1 - Current)
**Weeks 1-4 (75-95 hours)**

- [ ] Week 1: Authentication & Environment Setup
  - [ ] Google OAuth login
  - [ ] Supabase integration
  - [ ] Basic dashboard layout

- [ ] Week 2: Notes & Google Drive Sync
  - [ ] Note editor with auto-save
  - [ ] IndexedDB local storage
  - [ ] Google Drive sync engine
  - [ ] Background sync (30s interval)

- [ ] Week 3: Calendar & Events
  - [ ] Calendar views (month/week/day)
  - [ ] Event creation with RSVP
  - [ ] Event sync to Drive

- [ ] Week 4: Shared Spaces & Polish
  - [ ] Multiple shared spaces
  - [ ] Yjs conflict-free sync
  - [ ] Loading states & error handling
  - [ ] Mobile responsive design
  - [ ] End-to-end testing

**Deliverable:** Working web application with core features

### 📱 Phase 2: Android App (Month 2)
**Weeks 5-8 (60-80 hours)**

- [ ] Flutter setup and project initialization
- [ ] UI implementation (notes, calendar)
- [ ] Google Drive integration
- [ ] Native voice-to-text (FREE!)
- [ ] Sync with web app
- [ ] Beta release on Google Play

**Deliverable:** Android app with feature parity to web

### 🍎 Phase 3: iOS + AI Features (Month 3)
**Weeks 9-12 (80-100 hours)**

- [ ] Subcontract iOS development
- [ ] Implement web voice-to-text (Whisper API)
- [ ] Add AI summaries (GPT-4o-mini)
- [ ] Stripe subscription integration
- [ ] Marketing website
- [ ] Public beta launch

**Deliverable:** Full platform launch (Web + Android + iOS)

### 🚀 Phase 4: Growth & Advanced Features (Months 4-6)
- [ ] Event planning: Signup sheets
- [ ] Meal planning AI
- [ ] Photo attachments
- [ ] OneDrive support (in addition to Google Drive)
- [ ] Custom templates
- [ ] Advanced permissions

---

## 🧪 Testing Strategy

### Manual Testing (Dan)
- End-to-end user flows
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsive testing (DevTools)
- Multi-device sync testing (incognito windows)
- Google Drive integration verification

### Automated Testing (Future)
- Unit tests: Vitest
- Integration tests: React Testing Library
- E2E tests: Playwright
- Target: 80% code coverage

---

## 💸 Cost Breakdown

### Development Phase (Months 1-3)
```
Domain (nidonote.com):        $12/year (already purchased)
Google Play Developer:        $25 one-time (Month 2)
Supabase:                     $0 (free tier)
Cloudflare:                   $0 (free tier)
OpenAI API testing:           $10-20 (Month 3)

TOTAL: $47-57 for first 3 months
```

### Operating Costs (After Launch)
```
0-1,000 users:
  - Supabase:                 $0 (free tier)
  - Cloudflare:               $0 (free tier)
  - OpenAI API:               $5-20/month
  - Domain:                   $1/month
  Total:                      $6-21/month

1,000-5,000 users:
  - Supabase Pro:             $25/month
  - Cloudflare:               $0
  - OpenAI API:               $20-50/month
  - Email (Resend):           $0 (free tier)
  Total:                      $46-76/month
  Revenue (10% conversion):   $600-700/month
  Profit:                     $550-650/month ✅

5,000-10,000 users:
  - Total costs:              $172-272/month
  - Revenue (10% conversion): $6,000-7,000/month
  - Profit:                   $5,700-6,800/month ✅
```

**Break-even:** ~50 users (5 paid subscribers at $4.99 avg)

---

## 🎯 Success Metrics

### Month 1 Goals (Web MVP)
- [ ] Authentication working
- [ ] Can create/edit/delete notes
- [ ] Calendar with events functional
- [ ] RSVP tracking works
- [ ] Google Drive sync reliable
- [ ] Multiple shared spaces work
- [ ] Mobile responsive
- [ ] No critical bugs
- [ ] Deployed to Cloudflare Pages

### Month 2 Goals (Android)
- [ ] Android app on Google Play (beta)
- [ ] Feature parity with web
- [ ] Native voice-to-text working
- [ ] 10 beta testers using the app

### Month 3 Goals (Launch)
- [ ] iOS app (via subcontractor)
- [ ] AI features live (voice, summaries)
- [ ] Stripe subscriptions working
- [ ] 100 total users (all platforms)
- [ ] 10 paid subscribers
- [ ] $50/month revenue

### 6 Month Goals (Growth)
- [ ] 1,000 users
- [ ] 100 paid subscribers (10% conversion)
- [ ] $500-700/month revenue
- [ ] Break-even on costs
- [ ] 4.5+ star app store rating
- [ ] Trademark registered

---

## 🔒 Security & Privacy

### User Data Protection
- **Zero-knowledge architecture:** Backend never sees user content
- **User-controlled storage:** All data in user's Google Drive/iCloud
- **No data retention:** If user deletes Drive files, data is gone
- **OAuth 2.0:** Secure authentication via Google/Apple/Microsoft
- **HTTPS only:** All traffic encrypted in transit
- **GDPR compliant:** User owns their data, full portability

### What We Store (Backend)
- Email address (for login)
- Subscription tier and status
- Payment information (via Stripe, we never see card details)
- AI usage logs (for rate limiting)

**We do NOT store:**
- Note content
- Calendar events
- Family member data
- Any user-generated content

---

## 📝 Trademark Status

**Mark:** NIDOnote™
**Domain:** nidonote.com ✅ SECURED
**Status:** Pre-filing (filing planned for Month 2-3)
**Classes:** 9 (Software) + 42 (SaaS)
**Cost:** $700 (DIY) to $4,500 (with attorney)

**Social Media:**
- [ ] Instagram: @nidonote
- [ ] Twitter/X: @nidonote
- [ ] Facebook: /nidonote
- [ ] TikTok: @nidonote
- [ ] LinkedIn: /company/nidonote

**Action Item:** Reserve all handles before public launch.

**Full details:** See [TRADEMARK_FILING_CHECKLIST_NIDONOTE.md](TRADEMARK_FILING_CHECKLIST_NIDONOTE.md)

---

## 🤝 Development Workflow

### Dan's Responsibilities
- Account creation (Supabase, Google Cloud, GitHub)
- Testing and verification
- Manual user testing
- Git commits and pushes
- Deployment
- Bug reporting
- UI/UX decisions

### Claude's Responsibilities
- Code generation
- Component creation
- Configuration file setup
- Documentation updates
- Debug assistance
- Architecture guidance
- Code review

### Communication Best Practices

**Good Requests to Claude:**
- ✅ "Create a note editor component with auto-save"
- ✅ "I'm getting error 'Cannot read property of undefined' when clicking sync"
- ✅ "Update the calendar to filter events by the current space"

**Less Effective:**
- ❌ "Make it work" (too vague)
- ❌ "Fix the bug" (which bug?)
- ❌ "Do the next thing" (specify task number)

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module '@supabase/supabase-js'"**
- Solution: Run `npm install` in `web-frontend` folder

**"OAuth error: redirect_uri_mismatch"**
- Solution: Check Google Cloud Console → Credentials → Authorized redirect URIs
- Ensure `http://localhost:5173/auth/callback` is added

**"Failed to sync to Google Drive"**
- Solution: Check Google Drive API is enabled in Google Cloud Console
- Verify OAuth scope includes `https://www.googleapis.com/auth/drive.file`
- Re-authenticate (log out and log back in)

**Notes not syncing between devices:**
- Solution: Click manual sync button
- Check network connection
- Verify both devices are logged in with same Google account
- Check Google Drive permissions

**More troubleshooting:** See [IMPLEMENTATION_GUIDE_PHASE1.md](IMPLEMENTATION_GUIDE_PHASE1.md) → Troubleshooting section

---

## 📞 Support & Resources

### Documentation
- Implementation Guide: [IMPLEMENTATION_GUIDE_PHASE1.md](IMPLEMENTATION_GUIDE_PHASE1.md)
- Technical Architecture: [TECHNICAL_ARCHITECTURE_NIDONOTE.md](TECHNICAL_ARCHITECTURE_NIDONOTE.md)
- Brand Guidelines: [BRAND_IDENTITY_NIDONOTE.md](BRAND_IDENTITY_NIDONOTE.md)

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Google Drive API Reference](https://developers.google.com/drive/api/v3/reference)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Yjs Documentation](https://docs.yjs.dev/)

### Getting Help
- **Claude (AI Assistant):** Ask specific questions about code or setup
- **GitHub Issues:** Track bugs and feature requests
- **Stack Overflow:** General programming questions
- **Supabase Discord:** Supabase-specific questions

---

## 📜 License

**Proprietary** - All rights reserved.

NIDOnote™ is a trademark of Dan (pending registration).

This software and documentation are confidential and proprietary. Not for public distribution without permission.

---

## 🎉 Getting Started

**Ready to build NIDOnote?**

1. **Read this README** to understand the project ✅
2. **Open [IMPLEMENTATION_GUIDE_PHASE1.md](IMPLEMENTATION_GUIDE_PHASE1.md)** 📖
3. **Start with Week 1, Day 1, Task 1.1** 🚀
4. **Work with Claude** to execute each task 🤖
5. **Test as you go** to catch issues early 🧪
6. **Commit frequently** to save your progress 💾

**Estimated Time to MVP:** 3-4 weeks (side project) or 2-3 weeks (full-time)

---

## 🌟 Vision

NIDOnote will become the go-to organization app for families who:
- Value privacy and data ownership
- Want powerful features without complexity
- Need to coordinate with family members
- Plan events and gatherings regularly
- Prefer modern, beautiful software

By keeping user data in their own cloud, we differentiate from competitors and align with growing privacy concerns. By focusing on families (not businesses), we create features that actually solve their problems.

**Let's build something families will love!** 🏡❤️

---

**Project Started:** January 2025
**Current Phase:** Month 1 - Web MVP
**Last Updated:** January 2025
**Next Milestone:** Android App (Month 2)

---

**Happy Coding! 🚀**

*Built with ❤️ by Dan + Claude*
