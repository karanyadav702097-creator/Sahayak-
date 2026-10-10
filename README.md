# SAHAYAK AI (सहायक एआई)
## Production-Ready Indian Citizen Super App | Supabase + Vercel

**SAHAYAK AI** is an open, citizen-first civic assistance platform built to simplify access to verified Indian government welfare schemes, streamline public grievance redressal with AI-assisted drafting, provide 1-tap emergency helpline dialing, and deliver multilingual civic intelligence across 8 Indian languages.

---

## 🏛️ System Features & Capabilities

1. **Government Scheme Discovery**
   - Verified Central & State initiatives (PMAY-U, Ayushman Bharat PM-JAY, PM-KISAN, PM Surya Ghar Muft Bijli, PM SVANidhi, Atal Pension Yojana, National Scholarship Portal).
   - Detailed eligibility breakdown tables with non-sensitive criteria.
   - Interactive required document preparation checklist.
   - Interactive Eligibility Advisor Quiz (matches households without sensitive data).
   - Bookmark & save schemes for later reference.
   - Direct redirection to official `.gov.in` application portals.

2. **Citizen Grievance Management System**
   - Lodge complaints for Roads & Potholes, Water Supply, Electricity, Sanitation, Drainage, Public Transport, and Public Infrastructure.
   - Department identification and categorization.
   - Browser geolocation GPS tagging with explicit permission handling.
   - **AI-Assisted Formal Petition Drafting**: Automatically formats raw complaint notes into structured representations addressed to the Municipal Executive Officer.
   - Immutable Reference ID generation (`SHK-2025-XXXXX`).
   - Audit Status History timeline tracking each review change.
   - Direct links to official apex portals (CPGRAMS `pgportal.gov.in`).

3. **General Emergency SOS & Helpline Directory**
   - High-contrast, accessible 1-tap SOS protocol.
   - Official national emergency directory:
     - **112**: Unified National Emergency (Police, Fire, Ambulance, Disaster)
     - **100**: Police Control Room
     - **101**: Fire & Rescue
     - **108**: National Emergency Ambulance
     - **1930**: National Cyber Financial Fraud Helpline
     - **1098**: Childline (Child Welfare & Rescue)
     - **14567**: Elderline (Senior Citizens)
     - **1077**: Disaster Operations (NDMA)
     - **1906**: LPG Gas Leak Helpline
     - **1915**: National Consumer Helpline
     - **139**: RailMadad (Railway Assistance)
   - Configurable personal emergency contacts with quick-dialing.
   - Live GPS coordinate display with accuracy estimation.
   - Honest delivery status: clearly notes whether an SMS gateway is configured or if direct device phone carrier dialer is utilized.

4. **Multilingual AI Civic Assistant (SahayakBot)**
   - Plain-language civic advice, scheme explanations, and petition drafting.
   - Full regional language support:
     - English
     - Hindi (हिन्दी)
     - Marathi (मराठी)
     - Bengali (বাংলা)
     - Tamil (தமிழ்)
     - Telugu (తెలుగు)
     - Gujarati (ગુજરાતી)
     - Punjabi (ਪੰਜਾਬੀ)
   - Official `.gov.in` source citations and safety disclaimers.

5. **Administrative Oversight Console**
   - Separately protected admin dashboard (`/admin`).
   - Role-Based Access Control (`admin` vs `citizen`).
   - Real database KPIs (Total Grievances, Under Review, In Progress, Resolved).
   - Interactive complaint triage: update status, record officer review notes, and trigger citizen notifications with immutable audit logs.
   - Verified scheme and helpline directory management.

6. **Strict Non-Negotiable Compliance**
   - **EXCLUDED**: Dedicated Women Safety module and DigiLocker module are strictly absent.
   - **PRESERVED**: General Emergency SOS, personal emergency contacts, public helplines, evidence uploads, and document guidance are preserved.
   - **HONEST CONFIGURATION**: Clear indicators showing whether Supabase and AI provider credentials are live or running in local verified preview.

---

## 📁 Project Architecture

```
├── .env.example                       # Documented environment variables
├── vercel.json                        # Vercel SPA routing and security headers
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql     # PostgreSQL tables, RLS policies & triggers
│   │   └── 002_seed_data.sql          # Verified schemes and helplines seed data
│   └── functions/
│       ├── ai-assistant/              # Edge function for SahayakBot AI queries
│       ├── draft-complaint/           # Edge function for AI petition drafting
│       ├── admin-actions/             # Privileged status changes with audit trail
│       └── sos-alert/                 # SOS dispatcher with honest delivery state
├── src/
│   ├── types/                         # Strongly typed TypeScript interfaces
│   ├── lib/
│   │   └── supabase.ts                # Supabase client & fallback verified repository
│   ├── context/
│   │   └── AuthContext.tsx            # Supabase Auth, RBAC & profile management
│   ├── locales/
│   │   ├── translations.ts            # Dictionaries for all 8 Indian languages
│   │   └── i18nContext.tsx            # React i18n context & language switcher
│   ├── components/
│   │   └── common/
│   │       ├── Header.tsx             # Responsive header with multilingual menu
│   │       ├── Footer.tsx             # Official resources & emergency quick bar
│   │       ├── StatusBadge.tsx        # Styled complaint status badges
│   │       └── SupabaseBanner.tsx     # Connection state & setup guide
│   └── features/
│       ├── landing/LandingPage.tsx    # Civic landing page
│       ├── auth/                      # Login & Registration (privacy-compliant)
│       ├── dashboard/DashboardPage.tsx# Citizen dashboard
│       ├── schemes/                   # Schemes directory, detail & eligibility quiz
│       ├── complaints/                # Grievance list, creation & audit detail
│       ├── chatbot/ChatbotPage.tsx    # SahayakBot interactive assistant
│       ├── emergency/EmergencyPage.tsx# Verified helplines & SOS protocol
│       ├── notifications/             # Civic alert center
│       ├── profile/ProfilePage.tsx    # Preferences & district settings
│       └── admin/AdminPage.tsx        # Protected municipal admin console
└── tests/
    └── sahayak.test.ts                # Automated domain & multilingual tests
```

---

## 🚀 Setup & Deployment Instructions

### 1. Supabase Database Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Run `supabase/migrations/001_initial_schema.sql` to create all tables, indexes, Row Level Security (RLS) policies, and profile trigger.
4. Run `supabase/migrations/002_seed_data.sql` to populate verified Indian welfare schemes and national emergency helplines.

### 2. Configure Supabase Storage
- Bucket named `complaint-evidence` is created private by the SQL migration.
- RLS policies restrict file uploads and reads to the owning authenticated citizen and authorized administrators.

### 3. Deploy Supabase Edge Functions (Optional)
```bash
supabase functions deploy ai-assistant
supabase functions deploy draft-complaint
supabase functions deploy admin-actions
supabase functions deploy sos-alert

# Set server-side secrets:
supabase secrets set GEMINI_API_KEY="AIzaSy..."
# Or optional alternative provider:
# supabase secrets set GROQ_API_KEY="gsk_..."
```

### 4. Frontend Environment Variables
Copy `.env.example` to `.env` (or configure in Vercel Project Settings):
```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 5. Vercel Deployment
1. Push repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Environment Variables.
7. Click **Deploy**.
8. In Supabase Dashboard -> **Authentication** -> **URL Configuration**, add your Vercel URL to **Redirect URLs**.

---

## 🔒 Security & Privacy Practices
- **No Aadhaar Storage**: Sensitive identifiers and biometric data are never collected or stored.
- **Strict Row Level Security (RLS)**: Citizens can only query and mutate their own profile, saved schemes, emergency contacts, and filed complaints.
- **Server-Side Administrative Enforcement**: Admin status is validated against database role records, preventing client-side spoofing.
- **Anti-Hallucination Design**: The application clearly marks AI advice as guidance only and routes all official applications to verified `.gov.in` domains.
