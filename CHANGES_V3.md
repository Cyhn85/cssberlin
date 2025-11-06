# CSS Berlin - Version 3 Änderungen

## 🎯 Hauptänderungen

### 1. ❌ Banner ENTFERNT
- Kein Hero-Banner mehr
- Direkt zu den Produkten nach dem Header
- Mehr Platz für Produkte auf erster Ansicht

### 2. 📍 Header Neu-Design

#### Logo + Slogan (Links)
```
CSS Berlin
Climate Smart Solutions
```
- Logo prominent und groß
- Slogan direkt darunter
- Viel Weißraum danach

#### Navigation (Mitte)
```
Alle | Damen | Herren | Kinder
```
- Kategorie-Button ENTFERNT
- Direkte Links statt Dropdown
- "Alle" ist Standard aktiv

#### Actions (Rechts)
```
Sale | Neu | [Icons: Bell, Chat, Heart, Cart] | Anmelden
```
- Sale + Neu als Text-Links
- Dann Icons
- Dann Anmelden-Button

### 3. 🛍️ Neue Produktkarten-Layout

```
┌─────────────────────────────┐
│                             │
│        Produktbild          │
│      [Wishlist ♥]           │
│      [-18.5kg CO₂]          │
│                             │
├─────────────────────────────┤
│ ZARA                        │
│ Elegante Blazer Jacke       │
│ Größe M | Sehr gut          │
│                             │
│ 45.00€  Neupreis: 89.95€    │
│                             │
│ ┌────────┐  ┌────────────┐ │
│ │ Kaufen │  │ Verhandeln │ │
│ └────────┘  └────────────┘ │
└─────────────────────────────┘
```

**2-Button-Layout:**
- **"Kaufen"** (links, grün, primary)
- **"Verhandeln"** (rechts, weiß border, secondary)
- Beide Buttons nebeneinander in einer Zeile

### 4. 📊 CO₂ zum Footer verschoben

**Footer Sliding News Banner:**
```
🌍 248.5 Tonnen CO₂ gespart | 📦 2 kaufen, 3. Versand GRATIS | 🏆 CO₂ Rangliste | 🌳 8,234 Bäume gepflanzt | 🔥 Sale: 780 Produkte
```

- Automatisch scrollend
- Klickbar → führt zu jeweiliger Seite
- Grüner Hintergrund
- 5 rotierende Nachrichten

**Footer Struktur:**
1. **Sliding News** (oben)
2. **4 Spalten:** Shop | Nachhaltigkeit | Hilfe | Newsletter
3. **Nachhaltigkeit-Spalte:**
   - CO₂ Impact
   - CO₂ Rangliste
   - Baumpflanz-Programm
   - Unsere Mission
   - Blog

### 5. 🎁 Kampagnen-Seite Design

**URL:** `/campaign/3for2-shipping`

```
┌──────────────────────────────────────┐
│                                      │
│     📦 2 KAUFEN, 3. VERSAND GRATIS   │
│                                      │
│  [Große visuelle Darstellung]        │
│  Produkt 1 + Produkt 2 = Versand 3! │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  WIE FUNKTIONIERT ES?                │
│  1. Wähle 2 beliebige Produkte       │
│  2. Füge ein 3. Produkt hinzu        │
│  3. Versand für das 3. Produkt: 0€!  │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  TEILNEHMENDE PRODUKTE               │
│  [Grid mit Produkten]                │
│                                      │
└──────────────────────────────────────┘
```

**Features:**
- Visuell ansprechend mit Icons
- Step-by-Step Anleitung
- Countdown-Timer
- Teilnehmende Produkte Grid
- CO₂-Einsparung auch hier prominent

---

## 📐 Detaillierte Spezifikationen

### Header Layout (Desktop)
```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  CSS Berlin              Alle Damen Herren Kinder         Sale Neu│
│  Climate Smart                                         [Icons] [A] │
│  Solutions                                                         │
│                                                                    │
│  [🔍] [Kategorien ▼]  [____________________________] [Suchen]     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**Proportionen:**
- Logo + Slogan: 25%
- Weißraum: 15%
- Navigation: 30%
- Actions: 30%

### Produktkarte Button-Details

**Kaufen Button:**
- Breite: 48%
- Farbe: #2D5016 (Primary Green)
- Icon: Shopping Cart
- Hover: Dunkler + Shadow

**Verhandeln Button:**
- Breite: 48%
- Farbe: White mit Border
- Border: 2px solid #2D5016
- Icon: Chat bubbles
- Hover: Light Green Background

**Layout:**
```css
.product-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}
```

### Footer News Banner Specs

**Animation:**
- Duration: 40s für kompletten Durchlauf
- 5 Nachrichten × 100vw = 500vw
- Linear infinite scroll
- Pause on hover

**Nachrichten-Typen:**
1. **CO₂ Impact** → `/co2-impact`
2. **Kampagne** → `/campaign/3for2-shipping`
3. **Rangliste** → `/leaderboard`
4. **Bäume** → `/trees`
5. **Sale** → `/sale`

**Click-Handling:**
```javascript
footerNewsItem.addEventListener('click', () => {
    const link = item.dataset.link;
    window.location.href = link;
});
```

---

## 🎨 Neue Farben & Styles

### Logo Prominence
```css
.logo-css {
    font-size: 36px;  /* Größer! */
    font-weight: 900;
    color: #2D5016;
}

.slogan {
    font-size: 13px;
    color: #757575;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-top: 4px;
}
```

### Button States
```css
.buy-btn {
    background: #2D5016;
    color: white;
}

.buy-btn:hover {
    background: #4A7C2C;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(45, 80, 22, 0.3);
}

.negotiate-btn {
    background: white;
    color: #2D5016;
    border: 2px solid #2D5016;
}

.negotiate-btn:hover {
    background: #E8F5E9;
    transform: translateY(-1px);
}
```

---

## 📱 Responsive Anpassungen

### Mobile (<768px)
- Logo + Slogan: Zentriert
- Navigation: Burger-Menu
- Sale + Neu: Icon-only
- Buttons: Stapeln (100% width each)

### Tablet (768px - 1024px)
- Logo + Slogan: Links
- Navigation: Sichtbar
- Buttons: Side by side

---

## 🔄 Navigation Flow

### Alte Struktur (V2):
```
Header → Banner → News Slider → Products → Footer
```

### Neue Struktur (V3):
```
Header → Products → Footer (mit News Slider)
```

**Vorteil:**
- Mehr Produkte "above the fold"
- Schnellerer Zugriff
- Cleaner Look

---

## 🎯 Kampagnen-Seite Template

### URL-Struktur:
- `/campaign/3for2-shipping` → 2 kaufen, 3. Versand gratis
- `/campaign/bogo` → Buy One Get One
- `/campaign/carbon-challenge` → CO₂ Challenge

### Page Components:
1. **Hero Section** (mit Kampagnen-Banner)
2. **Wie funktioniert es?** (Step-by-Step)
3. **Teilnehmende Produkte** (Filtered Grid)
4. **Timer** (Countdown bis Ende)
5. **CTA** ("Jetzt shoppen")

---

## ✅ Was bleibt gleich?

- Suchleiste mit Kategorie-Filter
- Wishlist-Funktion
- Carbon Badges
- Load More Button
- Footer Struktur (nur + News Slider)
- Social Links
- Newsletter-Form

---

## 🚀 Nächste Schritte

1. **CSS-Datei erstellen** (styles-v3.css)
2. **JavaScript aktualisieren** (script-v3.js)
   - Produkte mit 2-Button-Layout generieren
   - Footer News Slider
   - Kampagnen-Navigation
3. **Kampagnen-Seite erstellen** (campaign.html)
4. **Testing**
   - Desktop
   - Tablet
   - Mobile
5. **Ön izleme göster!**

---

**Fragen zur Diskussion:**

1. Sollen "Sale" und "Neu" Text-Links oder Buttons sein?
2. Welche Farbe für "Neu"-Link? (Aktuell: Standard grün)
3. Soll der Footer News Banner pausierbar sein oder nur on hover?
4. Wie viele Kampagnen-Nachrichten maximal im Slider?

**Bist du mit diesem Konzept einverstanden?** Dann mache ich weiter mit der vollständigen Implementierung! 🎨
