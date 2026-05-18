# API Keys Cheatsheet — Exact Click Paths

## Supabase (3 clicks)
1. https://supabase.com/dashboard → Click your project
2. Left sidebar → **Project Settings** (gear icon) → **API**
3. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## Razorpay (3 clicks)
1. https://dashboard.razorpay.com → Make sure **Test Mode** toggle is ON (top right)
2. Left sidebar → **Account & Settings** → **API Keys**
3. Click **Generate Key** → Copy:
   - `Key ID` → `RAZORPAY_KEY_ID`
   - `Key Secret` → `RAZORPAY_KEY_SECRET` (download this, shown once)

## Cloudflare R2 (4 clicks)
1. https://dash.cloudflare.com → Left sidebar → **R2 Object Storage**
2. **Create Bucket** → Name: `atom-assets` → Create
3. Top of page → **Manage R2 API Tokens** → **Create API Token**
4. Permissions: `Object Read & Write` → Apply to `atom-assets` bucket → Create
5. Copy:
   - `Access Key ID` → `R2_ACCESS_KEY_ID`
   - `Secret Access Key` → `R2_SECRET_ACCESS_KEY` (shown once)
6. Any Cloudflare page → Right sidebar → **Account ID** → `R2_ACCOUNT_ID`
7. Click into `atom-assets` bucket → **Settings** → **Public URL** → `R2_PUBLIC_URL`

## Clerk Webhook (3 clicks)
1. https://dashboard.clerk.com → Your app → **Webhooks** (left sidebar)
2. **Add Endpoint** → URL: `https://YOUR_VERCEL_URL.vercel.app/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted` → Create
4. Copy **Signing Secret** → `CLERK_WEBHOOK_SECRET`

---

## After You Have All Keys

Option A — Paste into `env-template.txt` in this folder, then bulk import:
1. Open `env-template.txt`
2. Replace all `YOUR_..._HERE` placeholders with real values
3. Vercel → Project → Settings → Environment Variables → **Import .env** → Select `env-template.txt`

Option B — Paste one by one into Vercel Environment Variables.

## Then
1. Go to Supabase SQL Editor → New query → Paste everything from `supabase/schema.sql` → Run
2. Redeploy on Vercel
3. Done

## Razorpay Test Card (for testing payments)
- Card: `5267 3181 8797 5449`
- Expiry: Any future date (e.g., `12/30`)
- CVV: Any 3 digits (e.g., `123`)
