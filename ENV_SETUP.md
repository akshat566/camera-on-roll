# Environment Variables Setup Guide

## 1. Clerk ✅ (Already Done)
You added these on Vercel:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Also add this webhook secret after Step 3 below:**
```
CLERK_WEBHOOK_SECRET=whsec_...
```

---

## 2. Supabase — How to Get Your Keys

**Step 1:** Go to https://supabase.com/dashboard and sign in

**Step 2:** Click "New Project" → Choose organization → Give it a name (e.g., `camera-on-roll`) → Set region (Mumbai `ap-south-1` for India) → Create

**Step 3:** Once created, go to **Project Settings** (gear icon) → **API** tab

You will see:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Project API keys** → `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Project API keys** → `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

**Step 4:** Run the schema
Go to **SQL Editor** → **New query** → Paste everything from `supabase/schema.sql` → Click **Run**

---

## 3. Razorpay — How to Get Your Keys

**Step 1:** Go to https://dashboard.razorpay.com and sign up / sign in

**Step 2:** Make sure you're in **Test Mode** (toggle at top right)

**Step 3:** Go to **Account & Settings** → **API Keys** (left sidebar)

**Step 4:** Click **Generate Key** 

You will get:
- **Key ID** → `RAZORPAY_KEY_ID` (looks like `rzp_test_...`)
- **Key Secret** → `RAZORPAY_KEY_SECRET`

**Important:** Download and save the secret — Razorpay only shows it once.

---

## 4. Cloudflare R2 — How to Get Your Keys

**Step 1:** Go to https://dash.cloudflare.com and sign in

**Step 2:** Go to **R2 Object Storage** (left sidebar under Storage)

**Step 3:** Click **Create Bucket** → Name it `atom-assets` → Create

**Step 4:** Go to **R2** → **Manage R2 API Tokens** → **Create API Token**

**Step 5:** Set permissions:
- **Permissions:** Object Read & Write
- **Apply to:** Specific buckets only → select `atom-assets`

**Step 6:** Click **Create** — you get:
- **Access Key ID** → `R2_ACCESS_KEY_ID`
- **Secret Access Key** → `R2_SECRET_ACCESS_KEY`

**Important:** Copy both immediately — the secret is shown only once.

**Step 7:** Get your Account ID
- Go to any page in the Cloudflare dashboard
- Look at the right sidebar → **Account ID** → `R2_ACCOUNT_ID`

**Step 8:** Public URL (optional — for direct asset access)
- Go to your bucket → **Settings** → **Public URL**
- If not enabled, enable it → copy the URL → `R2_PUBLIC_URL`
- If you don't want public URLs, you can remove `R2_PUBLIC_URL` and we'll use signed URLs only

---

## 5. Clerk Webhook (for syncing users to Supabase)

**Step 1:** Go to https://dashboard.clerk.com → Your app → **Webhooks** (left sidebar)

**Step 2:** Click **Add Endpoint**

**Step 3:** Set:
- **Endpoint URL:** `https://your-vercel-app.vercel.app/api/webhooks/clerk`
- **Events:** Select `user.created`, `user.updated`, `user.deleted`

**Step 4:** Click **Create** → Copy the **Signing Secret** → `CLERK_WEBHOOK_SECRET`

---

## Final .env.local for Vercel

Add these to your Vercel Environment Variables (Project Settings → Environment Variables):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=atom-assets
R2_PUBLIC_URL=https://pub-....r2.dev
```

**Remember:** Prefix with `NEXT_PUBLIC_` only for values that need to be read by the browser (Clerk publishable key, Supabase URL + anon key). Never expose `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `RAZORPAY_KEY_SECRET` with `NEXT_PUBLIC_`.

---

## Testing After Setup

1. Add all env vars to Vercel
2. Redeploy the project
3. Visit `/atom` → should see Sign In buttons
4. Sign up → creates user in Clerk → webhook syncs to Supabase `users` table
5. Type in chat → pricing gate appears
6. Click a tier → Razorpay test checkout opens
7. Use Razorpay test card: `5267 3181 8797 5449` / any future date / any CVV
8. Payment verified → subscription active in Supabase → chat unlocks

## Need Help?

- **Supabase:** https://supabase.com/dashboard
- **Razorpay Test Cards:** https://razorpay.com/docs/payments/payment-gateway/test-card-details/
- **Cloudflare R2:** https://developers.cloudflare.com/r2/
- **Clerk Webhooks:** https://dashboard.clerk.com
