# 🚀 CSS Berlin - Complete Deployment & Usage Guide

## 📋 Table of Contents

1. [Cleanup (GitHub & Cloudflare)](#1-cleanup)
2. [Cloudflare Pages Deployment](#2-cloudflare-deployment)
3. [Vinted Product Import](#3-vinted-import)
4. [Short Video Generation](#4-video-generation)
5. [SEO & Google AdSense](#5-seo-adsense)
6. [Bot Security](#6-security)
7. [Maintenance](#7-maintenance)

---

## 1️⃣ Cleanup (GitHub & Cloudflare)

### Step 1: Clean up GitHub Repositories

**Delete these repos:**
- `cssberlin-website-` → Settings → Delete
- `Sebastian` → Settings → Delete
- `google-ai-studio-script-tasarim-deneme` → Settings → Delete

**Keep:**
- ✅ `cssberlin` (main project)
- ✅ `pamiundmami` (separate project)

### Step 2: Clean up Cloudflare Pages

**Delete these projects:**
1. `cssberlin` (Worker - empty)
2. `cssberlin` (Pages - old)
3. `cssberlin-website` (remove custom domains first!)
4. `cssberlin-website2`
5. `cssberlin-son`
6. `cssberlinfull`

**Keep:**
- ✅ `cssberlin1` (main site)
- ✅ `pamiundmami` (separate project)

**Result:** 8 projects → 2 projects = FREE tier safe! ✅

---

## 2️⃣ Cloudflare Pages Deployment

### Prerequisites

1. **Neon PostgreSQL** (already created)
   - URL: https://console.neon.tech
   - Project: `cssberlin`
   - Connection string: `postgresql://user:pass@ep-xxx.neon.tech/cssberlin?sslmode=require`

### Deployment Steps

#### 1. Update Environment Variables

**Cloudflare Dashboard:**
- Workers & Pages → `cssberlin1` → Settings → Environment Variables
- Add:
  - `DATABASE_URL` = [Neon connection string] (Secret)
  - `NEXT_PUBLIC_BASE_URL` = `https://cssberlin1.pages.dev` (or custom domain)
  - `GEMINI_API_KEY` = [Your Gemini API key] (Secret) - Optional, for videos

#### 2. Verify Build Settings

**Cloudflare Dashboard:**
- Workers & Pages → `cssberlin1` → Settings → Builds & deployments
- Configuration:
  ```
  Build command:       npm run cf:build
  Output directory:    .worker-next
  Root directory:      /
  Node version:        18
  ```

#### 3. Deploy!

**Option A - Auto Deploy:**
```bash
cd /home/user/cssberlin
git add .
git commit -m "chore: Production deployment" --allow-empty
git push origin claude/greeting-implementation-i49tG
```

**Option B - Manual Deploy:**
- Cloudflare Dashboard → `cssberlin1` → Deployments
- "Create deployment" → Branch: `claude/greeting-implementation-i49tG`

#### 4. Verify Deployment

**Test URLs:**
- Homepage: https://cssberlin1.pages.dev
- API: https://cssberlin1.pages.dev/api/categories
- Category: https://cssberlin1.pages.dev/categories/damen/oberteile
- Sitemap: https://cssberlin1.pages.dev/sitemap.xml
- Robots: https://cssberlin1.pages.dev/robots.txt

#### 5. Custom Domain (Optional)

**Cloudflare Dashboard:**
1. `cssberlin1` → Custom domains → "Set up a custom domain"
2. Domain: `www.cssberlin.de` or `cssberlin.de`
3. DNS auto-configured
4. SSL auto-enabled (5-10 minutes)

---

## 3️⃣ Vinted Product Import

### Step 1: Scrape Vinted Products

```bash
cd /home/user/cssberlin
node scripts/vinted-scraper.js
```

**Expected output:**
```
🚀 CSS Berlin - Vinted Product Scraper

🔍 Fetching products for user ID: 293217988...
📄 Page 1...
✅ Found 96 products on page 1

✅ Total products fetched: 89

💾 Saved to: ./scripts/vinted-products.json

📊 Statistics:
   Total products: 89
   By category:
   - damen/oberteile: 23 products
   - herren/jacken-maentel: 15 products
   ...
   Total value: €2,450.00
   Total CO₂ saved: 498.4 kg
```

### Step 2: Import to Database

**IMPORTANT:** First, update `.env` with Neon connection string:

```bash
# Edit .env file
nano .env

# Change:
DATABASE_URL="postgresql://YOUR_NEON_CONNECTION_STRING"
```

**Then run:**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Import products
node scripts/import-to-database.js
```

**Expected output:**
```
🚀 CSS Berlin - Database Import

📄 Loaded 89 products from JSON

📦 Importing 89 products to database...

   ✅ Created category: Damen
   ✅ Created subcategory: Oberteile
   ✅ Imported: Zara Blazer Jacke Schwarz Gr. M...
   ...

✅ Import completed!

📊 Summary:
   ✅ Imported: 89 new products
   🔄 Updated: 0 existing products
   ❌ Skipped: 0 errors
   📦 Total: 89 products in database

🗄️  Database stats:
   Categories: 4
   Subcategories: 18
   Products: 89

🎉 Done! Your products are now live on cssberlin.de
```

### Step 3: Verify on Website

Visit: https://cssberlin1.pages.dev

- Check homepage for product count
- Browse categories
- Verify images load (from Vinted CDN)

---

## 4️⃣ Short Video Generation

### Prerequisites

1. **Gemini Pro API Key:**
   - Get free key: https://makersuite.google.com/app/apikey
   - Add to `.env`: `GEMINI_API_KEY=your_key_here`

2. **Free Tier Limits:**
   - 60 requests per minute
   - ~50-100 requests per day (estimate)
   - **Strategy:** Generate 5-10 videos per day

### Generate Videos

```bash
node scripts/video-generator.js
```

**Expected output:**
```
🎬 CSS Berlin - Short Video Generator

📦 Processing 5 products...

[1/5] Zara Blazer Jacke Schwarz Gr. M
   🤖 Generating script with Gemini Pro...
   ✅ Script generated:
      Hook: Schau dir das an! 😍
      Hashtags: #SecondHandMode, #Nachhaltigkeit, #Vintage
   💾 Video config saved: ./videos/zara-blazer-jacke-293217988.json

...

✅ Video generation completed!

📝 Next steps:
   1. Review video configs in ./videos/ folder
   2. Render videos using Remotion or Canva
   3. Upload to social media platforms
```

### Video Config Structure

Each `.json` file contains:
- Scene timings (2s hook + 6s body + 2s CTA)
- Text overlays
- Image/video clips
- Voiceover script
- Hashtags & captions

### Rendering Options

**Option 1 - Canva (Recommended for beginners):**
1. Create Canva account
2. Use template: "TikTok Video" or "Instagram Reel"
3. Import product image
4. Add text from video config
5. Export as MP4

**Option 2 - Remotion (Advanced):**
```bash
npm install remotion
npx remotion render
```

**Option 3 - Auto-tools (Paid):**
- Pictory.ai
- InVideo.io
- Lumen5

### Upload to Social Media

**Manual:**
1. YouTube Shorts: Upload via YouTube Studio
2. TikTok: Upload via TikTok app
3. Instagram Reels: Upload via Instagram app
4. Pinterest: Create Pin with video

**Automated (Future):**
- YouTube Data API v3 (requires OAuth)
- TikTok Business API
- Instagram Graph API
- Pinterest API

---

## 5️⃣ SEO & Google AdSense

### SEO Setup (Auto-enabled!)

✅ **Already implemented:**
- Sitemap.xml: https://cssberlin.de/sitemap.xml
- Robots.txt: https://cssberlin.de/robots.txt
- Meta tags (dynamic per page)
- Schema.org structured data (Product)
- Canonical URLs

### Google Search Console

1. **Add Property:**
   - URL: https://console.search.google.com
   - Add property: `cssberlin.de` (or `.pages.dev`)
   - Verification: DNS record or HTML file

2. **Submit Sitemap:**
   - Sitemaps → Add new sitemap
   - URL: `https://cssberlin.de/sitemap.xml`
   - Submit

3. **Monitor:**
   - Coverage report (indexed pages)
   - Performance (search queries)
   - Enhancements (mobile usability)

### Google AdSense

**Requirements:**
- ✅ Minimum 30 pages (89 products + categories = 100+ pages)
- ✅ Original content (Vinted products + descriptions)
- ✅ Privacy Policy page → **TODO: Create**
- ✅ Contact page → **TODO: Create**
- ✅ About Us page → **TODO: Create**

**Steps:**
1. Apply: https://www.google.com/adsense
2. Add AdSense code to `<head>`
3. Wait for approval (1-2 weeks)
4. Place ad units on site

**Expected Revenue (5000 visitors/month):**
- CPM: €1-3 (fashion niche)
- Monthly: €5-15 (realistic for start)

---

## 6️⃣ Bot Security

### Implemented Features

✅ **Prisma ORM:**
- Auto-escapes SQL queries
- Prevents SQL injection

✅ **CORS Policy:**
- API only accessible from cssberlin.de

✅ **Rate Limiting (TODO):**
```typescript
// Middleware to add later
export async function middleware(request: NextRequest) {
  // Check IP rate limit
  // Allow: 100 requests per 15 minutes
}
```

### Bot Whitelist (Admin)

**For your scraper/automation:**

1. Generate API key:
```bash
openssl rand -hex 32
```

2. Add to `.env`:
```
ADMIN_API_KEY=your_generated_key
```

3. Use in scripts:
```javascript
const headers = {
  'X-API-Key': process.env.ADMIN_API_KEY,
};
```

### Cloudflare Security (Built-in)

- ✅ DDoS protection (automatic)
- ✅ SSL/TLS encryption
- ✅ CDN caching
- ✅ Web Application Firewall (WAF) - Optional

**Enable Cloudflare Turnstile (Free CAPTCHA):**
1. Cloudflare Dashboard → Turnstile
2. Add widget to contact forms
3. Prevent spam submissions

---

## 7️⃣ Maintenance

### Daily Tasks (Automated)

**GitHub Actions (Future):**
```yaml
# .github/workflows/sync-vinted.yml
name: Sync Vinted Products
on:
  schedule:
    - cron: '0 3 * * *' # 3 AM daily

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Scrape Vinted
        run: node scripts/vinted-scraper.js
      - name: Import to DB
        run: node scripts/import-to-database.js
```

### Weekly Tasks

**Manual:**
- Check Cloudflare analytics
- Review Neon database usage (0.5GB limit)
- Monitor Gemini API usage

### Monthly Tasks

- Update sitemap (auto-generated)
- Review Google Search Console
- Check AdSense revenue
- Backup database:
  ```bash
  pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
  ```

---

## 📊 Cost Tracking

**Free Tier Status:**

| Service | Free Limit | Current Usage | Status |
|---------|-----------|---------------|--------|
| Cloudflare Pages | 100k req/day | ~1k/day | ✅ Safe |
| Neon PostgreSQL | 0.5GB storage | 0.03GB | ✅ Safe |
| Neon Compute | 100h/month | 8.18h | ✅ Safe |
| Gemini Pro | 50 req/day | 5-10/day | ✅ Safe |
| GitHub Actions | 2000 min/month | 0 min | ✅ Safe |

**Total Monthly Cost:** €0 🎉

---

## 🆘 Troubleshooting

### "Build failed" on Cloudflare

```bash
# Local test:
npm run cf:build

# Check logs
tail -f .next/build-log.txt
```

### "Database connection failed"

```bash
# Verify connection string
npx prisma studio

# Check Neon dashboard
# https://console.neon.tech
```

### "Gemini API quota exceeded"

- Wait 24 hours for quota reset
- Or upgrade to paid plan (€0.05/request)

### "Products not showing on website"

```bash
# Check database
npx prisma studio

# Verify API
curl https://cssberlin.de/api/categories
```

---

## 🎉 Success Checklist

- [ ] GitHub cleaned (2 repos only)
- [ ] Cloudflare cleaned (2 projects only)
- [ ] `cssberlin1` deployed successfully
- [ ] Custom domain configured (optional)
- [ ] Neon database connected
- [ ] 89 Vinted products imported
- [ ] Sitemap submitted to Google
- [ ] First 5 videos generated
- [ ] Analytics tracking enabled

**Next Goals:**
- [ ] 100+ videos created
- [ ] 1000+ visitors/month
- [ ] Google AdSense approved
- [ ] €50/month revenue

---

**Created:** 2026-02-27
**Author:** Claude (Sonnet 4.5)
**Project:** CSS Berlin - Sustainable Fashion E-commerce
