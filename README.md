# CSS Berlin - Interactive Preview Mockup

## 🎨 Übersicht

Dies ist eine **interaktive HTML/CSS/JavaScript Vorschau** der CSS Berlin Website, erstellt **ohne Backend-Code** für schnelles visuelles Feedback.

**Status:** ✅ Bereit zur Überprüfung
**Erstellt:** 2025-11-03
**Version:** 1.0 Preview

---

## 📁 Dateien

```
preview/
├── index.html              # Homepage mit Banner + 4 Produkten
├── product-detail.html     # Produktdetailseite
├── styles.css              # Haupt-Stylesheet
├── product-detail.css      # Produktdetail-Styles
├── script.js               # Homepage-Interaktionen
├── product-detail.js       # Produktdetail-Interaktionen
└── README.md              # Diese Datei
```

---

## 🚀 Wie du die Preview öffnest

### Methode 1: Direkt im Browser
1. Öffne `index.html` mit Doppelklick
2. Oder: Rechtsklick → "Öffnen mit" → Dein Browser (Chrome, Firefox, Edge)

### Methode 2: Live Server (empfohlen)
1. In VSCode: Rechtsklick auf `index.html`
2. Wähle "Open with Live Server"
3. Browser öffnet automatisch

---

## 🎯 Was ist implementiert?

### ✅ Homepage (index.html)

#### Header
- Logo "CSS Berlin"
- Navigation: Kategorien, Sale, Neu, CO₂ Rangliste
- Icons: Benachrichtigungen (mit Badge: 3), Wunschliste, Warenkorb
- User Button: "Anmelden"
- Suchleiste mit Placeholder

#### Banner (Hero Section)
- **Mars→Earth Transformation:**
  - Hover: Mars (rot/tot) → Earth (grün/lebendig)
  - Auto: Wechselt alle 3 Sekunden automatisch
- Slogan: "Zweite Hand Waren, Erste Wahl für die Welt!"
- Live-Statistiken: 248.5t CO₂, 12,847 Artikel, 8,234 Bäume
- CTA Button: "Jetzt entdecken"

#### Produkt-Grid
- **4 Produkte** in einer Reihe (5 bei >1600px Bildschirmbreite)
- Jede Produktkarte zeigt:
  - Produktbild (Unsplash Placeholder)
  - Wishlist Button (Herz-Icon)
  - Carbon Badge mit CO₂-Einsparung
  - 5 Tier-System: Champion (Gold), Profi (Blau), Fortgeschritten (Lila), Einsteiger (Türkis)
  - BOGO Badge (bei Produkt 2)
  - Marke, Titel, Größe, Zustand
  - Preis + Neupreis-Vergleich (klickbarer Link)
  - "In den Warenkorb" Button

#### Interaktionen
- **Banner Hover:** Mars↔Earth Wechsel
- **Banner Auto:** 3-Sekunden Animation
- **Wishlist:** Klick fügt hinzu/entfernt (mit Notification)
- **Add to Cart:** Button-Feedback + Notification
- **Product Card:** Hover-Effekt (hebt sich)
- **Notification Icon:** Zeigt Panel mit 3 Beispiel-Nachrichten

---

### ✅ Produktdetailseite (product-detail.html)

#### Layout: Links Galerie, Rechts Details

#### Linke Seite: Bild-Galerie
- Große Hauptansicht (4:5 Ratio)
- 4 Thumbnails unten (klickbar)
- Wishlist Button (groß)
- Carbon Badge (groß)
- Bild-Wechsel-Animation

#### Rechte Seite: Produkt-Details
1. **Header:**
   - Marke (ZARA)
   - Titel
   - Bewertungen (5 Sterne, 47 Bewertungen)

2. **Preis-Sektion:**
   - Aktueller Preis: 45.00€
   - Original: 89.95€ (durchgestrichen)
   - Rabatt Badge: -50%
   - Neupreis-Vergleich: Links zu Zara.com, Zalando

3. **Carbon Impact:**
   - 18.5 kg CO₂ gespart
   - 2.3 Bäume gepflanzt
   - Datengenauigkeit: 85% (Fortschrittsbalken)

4. **Produkt-Spezifikationen:**
   - Größenauswahl: S, M (aktiv), L, XL (disabled)
   - Zustand: Sehr gut (grüner Badge)
   - Material: 65% Polyester, 35% Baumwolle
   - Farbe: Beige
   - Verkäufer: Anna M. (Champion Badge)

5. **Action Buttons:**
   - "In den Warenkorb" (grün, Hauptaktion)
   - "Preis verhandeln" (weiß mit grünem Rand)

6. **Verhandlungs-Info:**
   - Bis zu 15% Rabatt möglich
   - 5 kostenlose Verhandlungen/Tag

7. **Versand & Käuferschutz:**
   - Versandkosten: ca. 4.99€ (Käufer zahlt)
   - 14 Tage Rückgaberecht

8. **Produktbeschreibung:**
   - Text + Bullet Points

#### Verhandlungs-Modal
- **Öffnet beim Klick auf "Preis verhandeln"**
- Zeigt:
  - Aktueller Preis: 45.00€
  - Max. Rabatt: 15%
  - Min. Preis: 38.25€
- Input + Slider für Angebot
- Verhandlungen-Counter: 4/5 verbleibend
- "Angebot senden" Button

#### Outfit-Vorschläge
- 3 KI-generierte Kombinationen
- Match-Prozentsatz (95%, 92%, 88%)
- "Komplettes Outfit ansehen" Button
- Gesamt-CO₂-Einsparung: -42.3kg

#### Ähnliche Produkte
- Produkt-Grid (wie Homepage)

---

## 🎨 Design-Features

### Farbschema
```css
--primary-green: #2D5016      /* Haupt-Grün */
--secondary-green: #4A7C2C    /* Hover-Grün */
--accent-green: #6BA83E       /* Akzent-Grün */
--light-green: #E8F5E9        /* Hintergrund-Grün */

/* Carbon Badges */
--champion-gold: #FFD700      /* Gold */
--profi-blue: #4169E1         /* Blau */
--fortgeschritten-purple: #9370DB /* Lila */
--einsteiger-teal: #20B2AA    /* Türkis */

/* Sale */
--sale-red: #D32F2F           /* Rot */
```

### Typografie
- Font: System-Font-Stack (Arial, Helvetica, Segoe UI)
- Banner-Titel: 56px, 800 weight
- Produkt-Titel: 16px, 600 weight
- Produktdetail-Titel: 32px, 700 weight

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

### Border Radius
- sm: 4px, md: 8px, lg: 12px, xl: 16px

---

## 📱 Responsive Design

### Desktop (Standard)
- Max-Width: 1400px
- Produkt-Grid: 4 Spalten
- Banner: Full Height (500px)

### Large Desktop (>1600px)
- Produkt-Grid: 5 Spalten

### Tablet (768px - 1024px)
- Produkt-Grid: 3 Spalten
- Banner: 500px
- Navigation versteckt (später: Burger Menu)

### Mobile (<768px)
- Produkt-Grid: 2 Spalten
- Banner: 400px
- Stats: Vertikal
- Produktdetail: 1 Spalte (Galerie über Details)

### Small Mobile (<480px)
- Produkt-Grid: 1 Spalte
- Banner: 350px
- Kompaktere Buttons

---

## ⚡ Interaktionen & Animationen

### Banner
- **Hover:** Mars→Earth sofort
- **Auto:** Alle 3 Sekunden wechseln (startet nach 3 Sek)
- **Transition:** 0.8s ease-in-out

### Produkt-Karten
- **Hover:** translateY(-4px) + Shadow
- **Image Hover:** scale(1.05)
- **Wishlist Hover:** scale(1.1) + Grüner Hintergrund

### Buttons
- **Primary Hover:** Dunkleres Grün + translateY(-2px)
- **Add to Cart:** Zeigt "✓ Hinzugefügt" für 2 Sekunden

### Notifications
- **Position:** Top-Right (80px von oben)
- **Animation:** slideInRight → slideOutRight
- **Duration:** 3 Sekunden
- **Types:** Success (grün), Info (dunkelgrün), Error (rot)

### Modals
- **Overlay:** fadeIn/fadeOut
- **Content:** slideUp/slideDown
- **Close:** Klick außerhalb oder X-Button

---

## 🔧 Technische Details

### Keine Dependencies
- Pure HTML5, CSS3, Vanilla JavaScript
- Keine Frameworks (React, Vue, etc.)
- Keine Libraries (jQuery, Bootstrap, etc.)
- Funktioniert offline

### Browser-Kompatibilität
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance
- Keine API-Calls (statisch)
- Bilder: Unsplash Placeholders (später ersetzt)
- CSS: ~40KB
- JavaScript: ~8KB
- Load Time: <1 Sekunde

---

## 🎯 Was NICHT implementiert ist

Diese Preview ist **nur visuell**. Folgendes fehlt absichtlich:

### Backend-Funktionen
- ❌ Datenbank-Anbindung
- ❌ User Authentication
- ❌ Echte Produkt-Daten
- ❌ Warenkorb-Logik
- ❌ Checkout-Prozess
- ❌ Zahlungs-Integration

### Advanced Features
- ❌ Profit-Calculation-Terminal
- ❌ CO₂-Tracking-System
- ❌ Negotiation-Backend
- ❌ Clothing-Set-AI-Algorithm
- ❌ Real-Time-Benachrichtigungen

### Content
- ❌ Echte Produktbilder
- ❌ Vollständige Produktbeschreibungen
- ❌ Footer
- ❌ Impressum/Datenschutz
- ❌ Mobile Burger-Menu

---

## 📋 Nächste Schritte

### Phase 1: Feedback & Iteration
1. ✅ **Du prüfst die Preview**
2. ✅ **Du teilst Architektur-Bilder** aus deinen genutzten Systemen
3. ✅ **Wir iterieren das Design** basierend auf deinem Feedback

### Phase 2: WordPress Removal
1. ✅ **Folge der Anleitung:** `WORDPRESS_REMOVAL_GUIDE.md`
2. ✅ **Screenshots teilen** bei jedem Schritt
3. ✅ **IONOS Hosting vorbereiten**

### Phase 3: Backend Development
1. Django/Flask Setup
2. PostgreSQL Datenbank
3. JWT Authentication
4. Profit-Calculation-Terminal (extern, mit Approval)
5. API Endpoints

### Phase 4: Frontend-Backend Integration
1. React oder Vue.js Frontend
2. API-Anbindung
3. State Management
4. Real Product Data

### Phase 5: Deployment
1. Frontend Build
2. Backend Deployment (IONOS + Cloudflare)
3. DNS-Konfiguration
4. SSL-Aktivierung

### Phase 6: Testing
1. Close Circle Testing
2. Bug Fixes
3. Performance-Optimierung
4. Launch! 🚀

---

## 🐛 Bekannte Einschränkungen

1. **Bilder:** Unsplash Placeholders (müssen ersetzt werden)
2. **Navigation:** Keine echten Links (nur #)
3. **Mobile Menu:** Noch kein Burger-Menu
4. **Footer:** Fehlt komplett
5. **Responsive:** Optimiert, aber nicht pixel-perfekt
6. **Browser:** Nicht getestet in IE11 (kein Support nötig)

---

## 💡 Tipps zur Überprüfung

### Was du testen solltest:

1. **Banner-Transformation:**
   - Hover über Banner → Wechselt zu grün?
   - Warte 3 Sekunden → Auto-Wechsel?

2. **Produkt-Interaktionen:**
   - Klick auf Herz → Notification?
   - Klick auf "In den Warenkorb" → Feedback?
   - Hover über Produkt → Hebt sich?

3. **Produktdetailseite:**
   - Klick auf Thumbnail → Bild wechselt?
   - Klick auf "Preis verhandeln" → Modal öffnet?
   - Slider im Modal → Preis ändert sich?

4. **Responsive:**
   - Fenster kleiner machen → Layout passt sich an?
   - Mobile-Größe → 2 Spalten, dann 1 Spalte?

5. **Notifications:**
   - Klick auf Bell-Icon → Panel öffnet?
   - Klick außerhalb → Panel schließt?

---

## 📞 Feedback

Nach der Überprüfung, teile bitte:

1. **Was gefällt dir?** ✅
2. **Was soll geändert werden?** 🔄
3. **Was fehlt?** ❓
4. **Architektur-Bilder** deiner genutzten Systeme 🖼️

---

## 🎨 Design-Philosophie

### "Zweite Hand Waren, Erste Wahl für die Welt!"

- **Grün = Nachhaltigkeit** (nicht zu hell, nicht zu dunkel)
- **Mars→Earth** = Transformation (negative→positive Botschaft)
- **Carbon Badges** = Gamification (Fortschritt sichtbar machen)
- **Clean & Modern** = Second-Hand ≠ Billig
- **Performance** = Fast = Gut für CO₂

---

**Bereit für dein Feedback!** 🚀

Wenn die Preview genehmigt ist, geht's weiter mit WordPress-Removal und Backend-Development!
