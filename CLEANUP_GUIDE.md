# 🧹 CSS Berlin - Temizlik ve Deployment Rehberi

## 📋 Özet

Bu rehber, gereksiz projeleri temizleyip Cloudflare'i ücretsiz kullanmanızı sağlar.

---

## 1️⃣ GitHub Repository Temizliği (5 dakika)

### Silinecek Repo'lar:

1. **cssberlin-website-**
   - URL: https://github.com/Cyhn85/cssberlin-website-
   - Sebep: Eski deneme, 4 Cloudflare projesine bağlı
   - **Nasıl Silinir:**
     - Repo'ya git → Settings (en alta kaydır)
     - "Delete this repository" butonu
     - Repo adını yaz: `Cyhn85/cssberlin-website-`
     - "I understand the consequences, delete this repository" tıkla

2. **Sebastian**
   - URL: https://github.com/Cyhn85/Sebastian
   - Sebep: Fork edilmiş, kullanılmıyor
   - **Nasıl Silinir:** (Aynı adımlar)

3. **google-ai-studio-script-tasarim-deneme**
   - URL: https://github.com/Cyhn85/google-ai-studio-script-tasarim-deneme
   - Sebep: Deneme scripti, artık gereksiz
   - **Nasıl Silinir:** (Aynı adımlar)

### ✅ Kalacak Repo'lar:

- **cssberlin** → Ana proje (bizim çalıştığımız)
- **pamiundmami** → Ayrı proje

---

## 2️⃣ Cloudflare Pages Temizliği (10 dakika)

### Silinecek Projeler:

**Cloudflare Dashboard:** https://dash.cloudflare.com → Workers & Pages

#### SİL #1: `cssberlin` (Worker - boş)
- Type: Worker
- Status: "No active routes"
- **Nasıl Silinir:**
  - Projeye tıkla → Settings tab
  - En alta kaydır → "Delete Worker"
  - Onaylama kutusunu işaretle → Delete

#### SİL #2: `cssberlin` (Pages - eski)
- Type: Pages
- Domain: cssberlin.pages.dev
- Repo: cssberlin-website-
- **Nasıl Silinir:**
  - Projeye tıkla → Settings tab
  - En alta kaydır → "Delete application"
  - "cssberlin" yaz → Delete

#### SİL #3: `cssberlin-website`
- Domain: cssberlin-website.pages.dev + 2 custom domain
- **ÖNEMLİ:** Önce custom domainleri kaldır!
  - Settings → Custom domains → Her biri için "Remove"
  - Sonra projeyi sil

#### SİL #4: `cssberlin-website2`
- Domain: cssberlin-website2.pages.dev
- Sebep: Kopya proje

#### SİL #5: `cssberlin-son`
- Status: "Build failed, No active routes"
- Sebep: Failed build

#### SİL #6: `cssberlinfull`
- Domain: cssberlinfull.pages.dev
- Sebep: Eski deneme

### ✅ Kalacak Projeler:

- **cssberlin1** → Ana site (Cyhn85/cssberlin)
- **pamiundmami** → Ayrı proje

---

## 3️⃣ Cloudflare Pages Yeniden Deployment (15 dakika)

### Adım 1: Neon PostgreSQL Connection String

1. https://neon.tech → Login (GitHub ile)
2. Mevcut proje: `cssberlin` (zaten var)
3. Dashboard → Connection String'i **KOPYA ET:**
   ```
   postgresql://USER:PASSWORD@ep-xxx.neon.tech/cssberlin?sslmode=require
   ```

### Adım 2: `cssberlin1` Projesini Güncelle

**Cloudflare Dashboard:** Workers & Pages → `cssberlin1`

#### Environment Variables Ekle:

1. Settings → Environment Variables → Production
2. **Add variable:**
   - Variable name: `DATABASE_URL`
   - Value: [Neon connection string'i yapıştır]
   - Type: **Secret** (encrypted seç)
3. "Save" tıkla

#### Build Settings Kontrol:

1. Settings → Builds & deployments
2. **Build configuration:**
   ```
   Build command:       npm run cf:build
   Output directory:    .worker-next
   Root directory:      /
   Node version:        18
   ```
3. Eğer farklıysa güncelle → "Save"

### Adım 3: Redeploy Tetikle

**İki seçenek:**

**Seçenek A - Manuel Deploy:**
1. Deployments tab → "Create deployment"
2. Branch seç: `claude/greeting-implementation-i49tG`
3. "Deploy" tıkla

**Seçenek B - Git Push (otomatik):**
```bash
cd /home/user/cssberlin
git add .
git commit -m "feat: Update deployment config" --allow-empty
git push origin claude/greeting-implementation-i49tG
```

### Adım 4: Deployment İzle

1. Cloudflare Dashboard → `cssberlin1` → Deployments
2. Build log'larını izle (2-3 dakika)
3. ✅ Success! → URL: `https://cssberlin1.pages.dev`

### Adım 5: Custom Domain Ekle (Opsiyonel)

1. `cssberlin1` → Custom domains
2. "Set up a custom domain" tıkla
3. Domain gir: `www.cssberlin.de`
4. DNS otomatik configure edilir
5. SSL otomatik aktif (5-10 dakika)

---

## 4️⃣ Test: Site Canlı mı?

### Frontend Test:
```
https://cssberlin1.pages.dev
```
→ Ana sayfa açılıyor mu? ✅

### API Test:
```
https://cssberlin1.pages.dev/api/categories
```
→ JSON response geliyor mu? ✅

### Kategori Sayfası:
```
https://cssberlin1.pages.dev/categories/damen/oberteile
```
→ Ürünler listeleniyor mu? ✅

---

## 5️⃣ Temizlik Sonrası Durum

### GitHub (5 → 2 repo):
- ✅ cssberlin
- ✅ pamiundmami
- ❌ ~cssberlin-website-~ (silindi)
- ❌ ~Sebastian~ (silindi)
- ❌ ~google-ai-studio-script-tasarim-deneme~ (silindi)

### Cloudflare (8 → 2 proje):
- ✅ cssberlin1 (Pages)
- ✅ pamiundmami (Pages)
- ❌ ~6 gereksiz proje~ (silindi)

### Free Tier Kullanımı:
```
Before: 8 proje × build/storage = Limit aşımı riski
After:  2 proje × build/storage = Çok güvenli alan
```

**Limit Durumu:**
- Cloudflare Pages: 100k requests/day → 2 proje rahat kullanır
- Neon PostgreSQL: 0.5GB storage → 89 ürün + resimler sığar
- **Maliyet:** €0/ay 🎉

---

## 6️⃣ Sonraki Adımlar

✅ Temizlik tamamlandı
⏭️ Vinted ürün çekme sistemi kurulacak
⏭️ Video oluşturma sistemi (Gemini Pro) kurulacak
⏭️ SEO + Bot güvenliği eklenecek

---

**Hazırlayan:** Claude (Sonnet 4.5)
**Tarih:** 2026-02-27
**Proje:** CSS Berlin
