# Camera On Roll Production

Cinematic, premium, minimal production studio website — AI-powered with ATOM.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Clerk** — Authentication (Sign In / Sign Up / User Management)
- **Supabase** — PostgreSQL database, user profiles, generations, subscriptions
- **Razorpay** — Payment processing for ATOM Agent Plans
- **Cloudflare R2** — Asset storage for generated content

## Environment Variables

Create a `.env.local` file with the following:

```bash
# Clerk (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Razorpay (https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Cloudflare R2 (https://dash.cloudflare.com)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=atom-assets
R2_PUBLIC_URL=https://pub-....r2.dev
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ATOM Flow

1. User lands on `/atom` → Hero with "Talk to ATOM" CTA
2. Clicks CTA → Chat section (gated by Clerk auth)
3. Not signed in → "Unlock ATOM" gate with Sign In / Sign Up buttons
4. Signed in → Chat interface opens
5. User types a prompt → ATOM simulates processing
6. After first message → Pricing gate appears (subscribe to generate)
7. User selects tier → Razorpay checkout
8. Payment success → Generation unlocked, content stored in R2 + Supabase

## Database Schema (Supabase)

Run the SQL in `supabase/schema.sql` to create tables.
