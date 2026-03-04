# 🌿 CSS Berlin - Sustainable Second-Hand Fashion E-commerce

![CSS Berlin](https://img.shields.io/badge/Platform-Cloudflare%20Pages-orange)
![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-blue)
![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

**Motto:** *"Zweite Hand Waren, Erste Wahl für die Welt!"*

---

## 📋 Overview

CSS Berlin is a **sustainable second-hand fashion marketplace** built with modern web technologies. The platform automatically imports products from Vinted, generates short-form social media videos using AI, and provides an SEO-optimized shopping experience.

### 🎯 Key Features

- ✅ **89 Products** (auto-synced from Vinted)
- ✅ **4 Categories** + **18 Subcategories**
- ✅ **CO₂ Tracking** (~498kg saved!)
- ✅ **AI Video Generation** (Gemini Pro)
- ✅ **SEO Optimized** (Sitemap, Robots.txt, Schema.org)
- ✅ **Serverless Deployment** (Cloudflare Pages)
- ✅ **Free Tier** (€0/month for 5000 visitors)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Neon PostgreSQL account ([neon.tech](https://neon.tech))
- Cloudflare account ([cloudflare.com](https://cloudflare.com))
- Gemini Pro API key (optional, for videos)

### Installation

```bash
# Clone repository
git clone https://github.com/Cyhn85/cssberlin.git
cd cssberlin

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data (categories + subcategories)
npm run db:seed
```

### Development

```bash
# Start Next.js dev server
npm run dev
# → http://localhost:3000

# Open Prisma Studio (database GUI)
npm run db:studio
# → http://localhost:5555
```

### Cloudflare Deployment

```bash
# Build for Cloudflare
npm run cf:build

# Local preview
npm run cf:dev
# → http://localhost:8788

# Deploy to Cloudflare Pages
npm run cf:deploy
```

---

## 📦 Vinted Product Import

### Step 1: Scrape Products

```bash
node scripts/vinted-scraper.js
```

**Fetches:**
- All products from Vinted user (293217988)
- Product images, titles, descriptions
- Prices, brands, conditions
- Auto-categorizes to CSS Berlin categories

**Output:** `scripts/vinted-products.json`

### Step 2: Import to Database

```bash
node scripts/import-to-database.js
```

**Creates:**
- Categories (Damen, Herren, Kinder, Sonstiges)
- Subcategories (Oberteile, Hosen & Jeans, etc.)
- Products with images and metadata

**Result:** 89 products live on cssberlin.de! ✅

---

## 🎬 AI Video Generation

### Setup

1. Get Gemini Pro API key: https://makersuite.google.com/app/apikey
2. Add to `.env`: `GEMINI_API_KEY=your_key_here`

### Generate Videos

```bash
node scripts/video-generator.js
```

**Creates:**
- 10-second short video scripts
- Hooks, body content, CTAs
- German captions & hashtags
- TikTok/Instagram/YouTube ready

**Output:** `videos/*.json` (video configs)

**Free Tier:** 50-100 videos/day

---

## 🔧 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** CSS Modules + Vanilla CSS
- **Language:** TypeScript

### Backend
- **API:** Next.js API Routes
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)

### Deployment
- **Hosting:** Cloudflare Pages (Free)
- **Adapter:** @opennextjs/cloudflare
- **CDN:** Cloudflare Global Network

### AI & Automation
- **Video Scripts:** Gemini Pro API
- **Product Scraping:** Vinted API (unofficial)
- **Social Media:** Manual upload (automation planned)

---

## 📊 Project Structure

```
cssberlin/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── categories/        # Category pages (dynamic)
│   ├── api/               # API endpoints
│   ├── robots.txt/        # SEO: robots.txt
│   └── sitemap.xml/       # SEO: dynamic sitemap
├── components/            # React components
│   ├── Header.tsx         # Navigation + mega menu
│   └── Footer.tsx         # Footer (TODO)
├── prisma/                # Database schema + seed
│   ├── schema.prisma      # PostgreSQL models
│   └── seed.ts            # Initial data
├── scripts/               # Automation scripts
│   ├── vinted-scraper.js  # Fetch Vinted products
│   ├── import-to-database.js # Import to PostgreSQL
│   └── video-generator.js # Generate AI videos
├── videos/                # Generated video configs
├── public/                # Static assets
├── lib/                   # Utilities (Prisma client)
├── wrangler.toml          # Cloudflare config
├── next.config.js         # Next.js + OpenNext
├── DEPLOYMENT_GUIDE.md    # Full deployment guide
├── CLEANUP_GUIDE.md       # Cloudflare cleanup guide
└── README.md              # This file
```

---

## 🌍 Deployment

### Cloudflare Pages

**Live URL:** https://cssberlin1.pages.dev
**Custom Domain:** www.cssberlin.de (configurable)

**Environment Variables:**
- `DATABASE_URL` = Neon PostgreSQL connection string
- `NEXT_PUBLIC_BASE_URL` = https://cssberlin.de
- `GEMINI_API_KEY` = Gemini Pro API key (optional)

**Build Settings:**
```
Build command:       npm run cf:build
Output directory:    .worker-next
Node version:        18
```

**Auto-deploy:** Every `git push` triggers new deployment ✅

---

## 📈 SEO & Analytics

### SEO Features (Built-in)

- ✅ Dynamic sitemap: `/sitemap.xml`
- ✅ Robots.txt: `/robots.txt`
- ✅ Meta tags (per page)
- ✅ Schema.org structured data
- ✅ Canonical URLs
- ✅ Open Graph tags

### Google Search Console

1. Add property: `cssberlin.de`
2. Submit sitemap: `https://cssberlin.de/sitemap.xml`
3. Monitor indexing

### Google AdSense (Planned)

**Requirements:**
- ✅ 30+ pages (100+ with products + categories)
- ✅ Original content
- ⏳ Privacy Policy page (TODO)
- ⏳ Contact page (TODO)
- ⏳ About Us page (TODO)

**Expected Revenue:** €5-15/month (5000 visitors)

---

## 🔒 Security

### Built-in Protection

- ✅ Prisma ORM (SQL injection prevention)
- ✅ CORS policy (API access control)
- ✅ Cloudflare DDoS protection
- ✅ SSL/TLS encryption (auto)
- ✅ Environment variable secrets

### Bot Whitelist (Admin)

For your automation scripts:

```javascript
const headers = {
  'X-API-Key': process.env.ADMIN_API_KEY,
};
```

Generate API key:
```bash
openssl rand -hex 32
```

---

## 💰 Cost Breakdown (€0/month!)

| Service | Free Tier | Current Usage | Status |
|---------|-----------|---------------|--------|
| **Cloudflare Pages** | 100k req/day | ~1k/day | ✅ Safe |
| **Neon PostgreSQL** | 0.5GB storage | 0.03GB | ✅ Safe |
| **Neon Compute** | 100h/month | 8.18h | ✅ Safe |
| **Gemini Pro** | 50 req/day | 5-10/day | ✅ Safe |
| **GitHub Actions** | 2000 min/month | 0 min | ✅ Safe |

**Total:** €0/month for 5000 visitors 🎉

---

## 📝 Scripts Reference

### Database
```bash
npm run db:push     # Push Prisma schema to database
npm run db:seed     # Seed initial data
npm run db:studio   # Open Prisma Studio GUI
```

### Development
```bash
npm run dev         # Next.js dev server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # ESLint
```

### Cloudflare
```bash
npm run cf:build    # Build for Cloudflare
npm run cf:dev      # Local Cloudflare preview
npm run cf:deploy   # Deploy to Cloudflare Pages
```

### Automation
```bash
node scripts/vinted-scraper.js        # Fetch Vinted products
node scripts/import-to-database.js    # Import to PostgreSQL
node scripts/video-generator.js       # Generate AI videos
```

---

## 🆘 Troubleshooting

### Build Failed

```bash
# Test locally
npm run cf:build

# Check dependencies
npm install --legacy-peer-deps
```

### Database Connection Failed

```bash
# Verify connection
npx prisma studio

# Check DATABASE_URL in .env
echo $DATABASE_URL
```

### Gemini API Quota Exceeded

- Wait 24 hours for reset
- Or upgrade to paid plan (€0.05/request)

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[CLEANUP_GUIDE.md](./CLEANUP_GUIDE.md)** - GitHub/Cloudflare cleanup
- **[Cloudflare Docs](https://developers.cloudflare.com/pages/)**
- **[Neon Docs](https://neon.tech/docs/introduction)**
- **[Prisma Docs](https://www.prisma.io/docs/)**

---

## 🎯 Roadmap

### ✅ Phase 1: MVP (Completed)
- [x] Next.js setup
- [x] Cloudflare deployment
- [x] Vinted scraper
- [x] Database integration
- [x] AI video generator
- [x] SEO optimization

### ⏳ Phase 2: Content (In Progress)
- [x] 89 products imported
- [ ] 100+ videos generated
- [ ] Social media automation
- [ ] Google AdSense approved

### 🔮 Phase 3: Growth
- [ ] Admin panel (NextAuth)
- [ ] User authentication
- [ ] Shopping cart
- [ ] Checkout process
- [ ] Payment integration (Stripe)

### 🚀 Phase 4: Scale
- [ ] 1000+ products
- [ ] Multi-language (EN/DE)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics

---

## 🤝 Contributing

This is a private project. For suggestions:
1. Create an issue
2. Fork the repository
3. Submit pull request

---

## 📄 License

Proprietary - CSS Berlin © 2026

---

## 📞 Contact

**Project:** CSS Berlin
**Website:** https://cssberlin.de
**GitHub:** [@Cyhn85](https://github.com/Cyhn85)

---

**Built with ❤️ for a sustainable future. Every purchase saves CO₂! 🌍**

*Last updated: 2026-02-27*
