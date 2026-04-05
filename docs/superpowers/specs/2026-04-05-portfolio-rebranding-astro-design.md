# Design-Spezifikation: Portfolio-Rebranding mit Astro

**Datum:** 2026-04-05
**Projekt:** MyWebsite - Portfolio Rebranding
**Entscheidung:** Astro 4.x Framework
**Status:** Genehmigt

## Übersicht

Dieses Dokument beschreibt das vollständige Design für die Neugestaltung der Portfolio-Website von Hendrik Schneemann. Die Migration erfolgt vom aktuellen Template+Partials-Build-System zu einem modernen Astro-basierten Setup mit verbessertem Design, besserer Performance und automatisiertem Deployment.

## Ziele

### Primäre Ziele
1. **Git-Repository aufräumen** - Nur noch `main` Branch, alle Feature-Branches gemerged oder gelöscht
2. **Modernes Portfolio-Design** - Hellere, freundlichere Optik mit besserer Typografie und Spacing
3. **Framework-Migration** - Wechsel zu Astro für bessere Developer Experience und Performance
4. **Automatisiertes Deployment** - GitHub Actions für fehlerfreie Deployments

### Sekundäre Ziele
- Inhalte beibehalten (Portfolio-Charakter bleibt)
- SEO-Optimierung beibehalten und verbessern
- Domain und Hosting beibehalten (hendrikschneemann.tech via GitHub Pages)
- Erweiterbarkeit für zukünftige Features (Blog, Projekt-Details)

### Nicht-Ziele (vorerst)
- Tests und absichernde Workflows (können bis nach Migration ignoriert werden)
- Blog-Funktionalität
- Backend/API-Integration
- CMS-Integration

## Technologie-Stack

### Framework & Build
- **Framework:** Astro 4.x
- **UI-Komponenten:** Astro-Komponenten (HTML-ähnliche Syntax, kein zusätzliches Framework)
- **Styling:** CSS mit CSS Custom Properties (Design Tokens)
- **Build-Tool:** Vite (eingebaut in Astro)
- **Package Manager:** npm

### Deployment
- **Hosting:** GitHub Pages (statischer Export)
- **CI/CD:** GitHub Actions
- **Domain:** hendrikschneemann.tech (bestehend)

## Architektur

### Verzeichnis-Struktur

```
MyWebsite/
├── src/
│   ├── pages/                    # Route-basierte Seiten
│   │   ├── index.astro           # Hauptseite
│   │   └── 404.astro             # 404-Fehlerseite
│   ├── layouts/                  # Wiederverwendbare Layouts
│   │   └── BaseLayout.astro      # Basis-Layout mit HTML-Struktur, Meta-Tags
│   ├── components/               # UI-Komponenten
│   │   ├── Header.astro          # Navigation (sticky, responsive)
│   │   ├── Hero.astro            # Hero-Bereich
│   │   ├── AboutSection.astro    # Über mich / Skills
│   │   ├── ProjectCard.astro     # Einzelne Projekt-Karte
│   │   ├── ProjectsSection.astro # Projekte-Grid
│   │   ├── ContactSection.astro  # Kontakt-Bereich
│   │   ├── Footer.astro          # Footer
│   │   └── SkillTag.astro        # Tech-Stack-Tag
│   ├── styles/                   # Globale Styles
│   │   ├── global.css            # Reset, Basis-Styles
│   │   └── design-tokens.css     # CSS Custom Properties
│   └── content/                  # Inhalts-Dateien (für zukünftige Erweiterung)
│       └── config.ts             # Content Collections Config (optional)
├── public/                       # Statische Assets
│   ├── images/                   # Bilder
│   ├── fonts/                    # Web-Fonts (falls lokal gehostet)
│   ├── favicon.ico               # Favicon
│   └── CNAME                     # Domain für GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions Workflow
├── astro.config.mjs              # Astro-Konfiguration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript-Konfiguration (optional)
└── README.md                     # Projekt-Dokumentation
```

### Routing-Strategie

- **Single-Page-Portfolio:** Vorerst nur `index.astro`
- **In-Page-Navigation:** Smooth-Scroll zu Abschnitten (#hero, #about, #projects, #contact)
- **Erweiterbarkeit:** Später einfach um `/projects/[slug]`, `/blog/[slug]` etc. erweiterbar

## Design-System

### Farben

```css
:root {
  /* Hintergrund */
  --color-bg-primary: #0f1419;      /* Haupt-Hintergrund */
  --color-bg-secondary: #1a1f26;    /* Karten, Abschnitte */
  --color-bg-accent: #232931;       /* Hover-States, Akzente */

  /* Text */
  --color-text-primary: #e6edf3;    /* Haupt-Text */
  --color-text-secondary: #9198a1;  /* Sekundär-Text, Meta-Infos */

  /* Akzentfarben */
  --color-accent: #58a6ff;          /* Links, CTAs, Highlights */
  --color-accent-hover: #79c0ff;    /* Hover-State */

  /* Borders */
  --color-border: #30363d;          /* Rahmen, Trennlinien */
}
```

**Design-Philosophie:**
- Dunkles Farbschema mit helleren, freundlicheren Tönen als aktuell
- Blau als Akzentfarbe (professionell, vertrauenswürdig)
- Hohe Kontraste für gute Lesbarkeit

### Typografie

**Schriftarten:**
```css
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-heading: 'Space Grotesk', var(--font-primary);
--font-code: 'JetBrains Mono', 'Courier New', monospace;
```

**Typografie-Skala:**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 2rem;      /* 32px */
--text-4xl: 3rem;      /* 48px */
```

**Font-Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Spacing-System

**8px-Grid:**
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

### Shadows

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.5);
```

### Layout-Prinzipien

- **Container-Breite:** max-width: 1200px
- **Responsive Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Grid-System:** CSS Grid für Layouts, Flexbox für Komponenten
- **Spacing:** Konsistentes 8px-Grid für alle Abstände

## Inhalts-Struktur

### Seiten-Aufbau (Single-Page)

#### 1. Header (Navigation)
- **Sticky Navigation** bleibt beim Scrollen sichtbar
- Logo/Name (links)
- Navigation-Links (rechts): Über mich, Projekte, Kontakt
- Mobile: Hamburger-Menü
- Smooth-Scroll zu Abschnitten bei Klick

#### 2. Hero-Bereich
- **Große, klare Überschrift** mit Name und Titel
- **Elevator Pitch:** 2-3 Sätze über Expertise und Fokus
- **CTA-Buttons:**
  - Primär: "Projekte ansehen" (scroll zu #projects)
  - Sekundär: "Kontakt aufnehmen" (scroll zu #contact)
- **Visuelles Element:** Optional Profil-Bild oder abstraktes Grafik-Element
- **Moderne, luftige Gestaltung** mit viel Weißraum

#### 3. Über mich / Skills
- **Persönliche Vorstellung:** 2-3 Absätze über Hintergrund, Expertise, Arbeitsweise
- **Technologie-Stack:**
  - Visuelle Tags/Pills für Technologies (iOS, Swift, PHP, Symfony, etc.)
  - Gruppiert nach Kategorie (Frontend, Backend, Tools)
- **Werdegang/Highlights:** Wichtige Stationen oder Achievements
- **Scanbare Formatierung:** Überschriften, Bullet-Points, klare Hierarchie

#### 4. Projekte-Bereich
- **Grid-Layout:**
  - Desktop: 2-3 Spalten
  - Tablet: 2 Spalten
  - Mobile: 1 Spalte
- **Projekt-Karten (ProjectCard):**
  - Projekt-Titel (Überschrift)
  - Kurzbeschreibung (2-3 Sätze)
  - Tech-Stack-Tags (visuelle Pills)
  - Optional: Thumbnail/Screenshot
  - Links: GitHub, Live-Demo (falls vorhanden)
  - Hover-Effekt: Leichtes Anheben + Shadow
- **Interaktion:** Klickbare Karten für mehr Details (später)

#### 5. Kontakt-Bereich
- **Kontakt-Informationen:**
  - E-Mail (hendrik.schneemann@icloud.com)
  - LinkedIn-Link
  - GitHub-Link
- **Social-Links als Icons** (mit Hover-Effekten)
- **Optional (später):** Einfaches Kontaktformular
- **CTA:** "Lass uns zusammenarbeiten" oder ähnlich

#### 6. Footer
- **Copyright-Hinweis:** © 2026 Hendrik Schneemann
- **Links:** Impressum, Datenschutz (falls erforderlich)
- **Back-to-Top Button** für bessere UX
- **Minimalistisch gehalten**

## Komponenten-Übersicht

### BaseLayout.astro
**Zweck:** Basis-Layout für alle Seiten

**Inhalt:**
- HTML-Grundstruktur (`<html>`, `<head>`, `<body>`)
- Meta-Tags (SEO, Open Graph, Twitter Cards)
- Font-Preloads
- Strukturierte Daten (JSON-LD)
- Global CSS-Imports

**Props:**
- `title: string` - Seiten-Titel
- `description: string` - Meta-Description

### Header.astro
**Zweck:** Sticky Navigation

**Features:**
- Sticky Positioning
- Smooth-Scroll-Links
- Mobile-Responsive (Hamburger-Menü)
- Active-State für aktuellen Abschnitt

### Hero.astro
**Zweck:** Hero-Bereich

**Inhalt:**
- Name + Titel (H1)
- Elevator Pitch
- CTA-Buttons
- Optional: Profil-Bild

### AboutSection.astro
**Zweck:** Über mich / Skills

**Inhalt:**
- Persönliche Vorstellung
- Skill-Tags (verwendet SkillTag.astro)
- Werdegang

### SkillTag.astro
**Zweck:** Wiederverwendbarer Tech-Stack-Tag

**Props:**
- `skill: string` - Name der Technologie
- `category?: string` - Kategorie (optional)

### ProjectsSection.astro
**Zweck:** Projekte-Grid-Container

**Inhalt:**
- Grid-Layout
- Verwendet ProjectCard.astro für jedes Projekt

### ProjectCard.astro
**Zweck:** Einzelne Projekt-Karte

**Props:**
- `title: string` - Projekt-Titel
- `description: string` - Kurzbeschreibung
- `techStack: string[]` - Array von Technologien
- `imageUrl?: string` - Optional: Thumbnail
- `githubUrl?: string` - Optional: GitHub-Link
- `liveUrl?: string` - Optional: Live-Demo-Link

### ContactSection.astro
**Zweck:** Kontakt-Bereich

**Inhalt:**
- Kontakt-Informationen
- Social-Links (mit Icons)

### Footer.astro
**Zweck:** Seiten-Footer

**Inhalt:**
- Copyright
- Links (Impressum, Datenschutz)
- Back-to-Top Button

## Build & Deployment

### Astro-Konfiguration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hendrikschneemann.tech',
  base: '/',
  build: {
    format: 'file' // Für GitHub Pages: index.html statt /
  }
});
```

### Build-Befehle

```bash
npm run dev      # Entwicklungsserver (localhost:4321)
npm run build    # Produktions-Build → dist/
npm run preview  # Vorschau des Production-Builds
```

### GitHub Actions Deployment

**Workflow-Datei:** `.github/workflows/deploy.yml`

**Trigger:**
- Push auf `main` Branch
- Manueller Trigger (workflow_dispatch)

**Schritte:**
1. Repository auschecken
2. Node.js 20 installieren
3. Dependencies installieren (`npm ci`)
4. Build ausführen (`npm run build`)
5. Build-Artefakte hochladen
6. Auf GitHub Pages deployen

**Vollständiger Workflow:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Domain-Setup

- **CNAME-Datei:** `public/CNAME` mit Inhalt `hendrikschneemann.tech`
- **GitHub Pages Settings:** Custom Domain auf `hendrikschneemann.tech` gesetzt
- **DNS:** Bleibt unverändert (bereits konfiguriert)

### Performance-Optimierungen

- **Minimales JavaScript:** Astro lädt nur, was wirklich gebraucht wird
- **Image-Optimierung:** Astro Image für automatische Optimierung
- **CSS-Minification:** Automatisch im Build-Prozess
- **Lazy-Loading:** Für Bilder außerhalb des Viewports
- **Font-Preloading:** Kritische Fonts werden vorgeladen

## Migrations-Strategie

### Phase 1: Git-Repository aufräumen

**Ziel:** Nur noch `main` Branch

**Schritte:**

1. **Aktuellen Stand sichern**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Feature-Branches mergen**
   ```bash
   # feature/homepage-best-practices (aktuell ausgecheckt)
   git checkout main
   git merge feature/homepage-best-practices

   # fix/seo-sitemap-robots
   git merge fix/seo-sitemap-robots
   ```

3. **Veraltete Branches löschen**
   ```bash
   # Lokal
   git branch -d feature/homepage-best-practices
   git branch -d fix/seo-sitemap-robots
   git branch -D paperclip-access-proof-20260331-122641

   # Remote
   git push origin --delete feature/homepage-best-practices
   git push origin --delete fix/seo-sitemap-robots
   git push origin --delete paperclip-access-proof-20260331-122641
   ```

4. **Verifizierung**
   ```bash
   git branch -a  # Sollte nur main zeigen
   ```

**Ergebnis:** Sauberer `main` Branch als Ausgangspunkt

### Phase 2: Astro-Migration

**Ansatz:** Fresh Start (empfohlen)

**Schritte:**

1. **Astro-Projekt initialisieren**
   ```bash
   npm create astro@latest -- --template minimal
   # Name: MyWebsite
   # TypeScript: Optional
   ```

2. **Projekt-Struktur erstellen**
   - Ordner anlegen: `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/`, `public/`
   - `astro.config.mjs` konfigurieren

3. **Content-Migration**
   - **Texte:** Aus `src/partials/*.html` extrahieren → in Astro-Komponenten übertragen
   - **Projekte:** Aus aktueller `index.html` extrahieren → als Daten-Array oder JSON
   - **Meta-Tags:** SEO-Informationen übertragen → BaseLayout.astro
   - **Structured Data:** JSON-LD übertragen → BaseLayout.astro

4. **Assets kopieren**
   ```bash
   cp -r assets/images public/images
   cp -r assets/fonts public/fonts
   cp CNAME public/CNAME
   cp assets/images/favicon.ico public/favicon.ico
   ```

5. **Design-System implementieren**
   - `src/styles/design-tokens.css` erstellen
   - `src/styles/global.css` erstellen
   - In BaseLayout.astro importieren

6. **Komponenten entwickeln**
   - In Reihenfolge: BaseLayout → Header → Hero → About → Projects → Contact → Footer
   - Jede Komponente einzeln testen

7. **Haupt-Seite zusammenbauen**
   - `src/pages/index.astro` mit allen Abschnitten
   - Smooth-Scroll-Navigation implementieren

8. **GitHub Actions einrichten**
   - `.github/workflows/deploy.yml` erstellen
   - GitHub Pages Settings konfigurieren

9. **Alte Dateien aufräumen**
   - Alte Build-Struktur löschen: `src/partials/`, `src/index.template.html`, `scripts/build-html.sh`
   - Alte Styles löschen: `styles.css`, `assets/css/` (falls nicht mehr gebraucht)
   - `README.md` aktualisieren

10. **Testing & Deployment**
    - Lokal testen: `npm run dev`
    - Build testen: `npm run build && npm run preview`
    - Push auf main → automatisches Deployment via GitHub Actions

**Was bleibt erhalten:**
- Domain (hendrikschneemann.tech)
- Inhalte (Texte, Projekte, Über-mich)
- Assets (Bilder, Favicon)
- SEO-Setup (Meta-Tags, Structured Data)
- GitHub Pages Hosting

**Was sich ändert:**
- Build-System (Template+Partials → Astro)
- Design (modernere Optik)
- Datei-Struktur (Astro-Konventionen)
- Deployment (GitHub Actions statt manuell)

## Content-Daten

### Projekt-Daten (Beispiel-Struktur)

```typescript
// src/data/projects.ts oder direkt in ProjectsSection.astro
interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Projekt 1",
    description: "Beschreibung des ersten Projekts...",
    techStack: ["Swift", "SwiftUI", "iOS"],
    githubUrl: "https://github.com/...",
  },
  // weitere Projekte...
];
```

### Skills-Daten (Beispiel-Struktur)

```typescript
// src/data/skills.ts oder direkt in AboutSection.astro
interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["Swift", "SwiftUI", "UIKit", "HTML", "CSS", "JavaScript"]
  },
  {
    category: "Backend",
    skills: ["PHP", "Symfony", "MySQL", "REST APIs"]
  },
  {
    category: "Tools",
    skills: ["Git", "Xcode", "Docker", "GitHub Actions"]
  }
];
```

## SEO & Performance

### Meta-Tags (in BaseLayout.astro)

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content={description}>
  <meta name="author" content="Hendrik Schneemann">
  <meta name="theme-color" content="#0f1419">
  <link rel="canonical" href="https://hendrikschneemann.tech/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://hendrikschneemann.tech/">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content="https://hendrikschneemann.tech/images/social-preview.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content="https://hendrikschneemann.tech/images/social-preview.png">

  <title>{title}</title>
</head>
```

### Strukturierte Daten (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Hendrik Schneemann",
      "url": "https://hendrikschneemann.tech/",
      "jobTitle": "Fachinformatiker für Anwendungsentwicklung",
      "sameAs": [
        "https://github.com/hsnowmansch",
        "https://www.linkedin.com/in/hschneemann/"
      ],
      "email": "mailto:hendrik.schneemann@icloud.com"
    },
    {
      "@type": "ProfessionalService",
      "name": "Hendrik Schneemann Development Services",
      "url": "https://hendrikschneemann.tech/",
      "description": "iOS- und Backend-Entwicklung mit Fokus auf modulare, wartbare und produktionsnahe Software.",
      "areaServed": "DE",
      "provider": {
        "@type": "Person",
        "name": "Hendrik Schneemann"
      }
    }
  ]
}
</script>
```

### Sitemap & Robots.txt

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hendrikschneemann.tech/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://hendrikschneemann.tech/sitemap.xml
```

## Zukünftige Erweiterungen

### Mögliche Features (nach Initial-Launch)

1. **Blog-Funktionalität**
   - Astro Content Collections für Blog-Posts
   - Markdown/MDX-Support
   - Tags/Kategorien

2. **Projekt-Detail-Seiten**
   - Dynamische Routes: `/projects/[slug]`
   - Ausführliche Projekt-Beschreibungen
   - Screenshots/Demos

3. **Kontaktformular**
   - Formspree oder ähnlicher Service
   - Spam-Schutz

4. **Dunkel/Hell-Modus-Toggle**
   - Theme-Switcher
   - Preference-Speicherung

5. **Animationen**
   - Scroll-basierte Animationen
   - Page-Transitions

6. **Mehrsprachigkeit**
   - Deutsch/Englisch
   - i18n-Routing

## Risiken & Mitigationen

### Identifizierte Risiken

1. **Content-Migration-Fehler**
   - **Risiko:** Inhalte gehen verloren oder werden falsch übertragen
   - **Mitigation:** Systematische Migration mit Checkliste, manuelles Review

2. **SEO-Ranking-Verlust**
   - **Risiko:** Durch URL-Änderungen oder fehlende Meta-Tags
   - **Mitigation:** Alle Meta-Tags übertragen, Redirects falls nötig, Sitemap aktualisieren

3. **Deployment-Probleme**
   - **Risiko:** GitHub Actions schlägt fehl oder Pages-Konfiguration falsch
   - **Mitigation:** Workflow lokal testen, Dokumentation folgen, Rollback-Plan

4. **Design-Inkonsistenzen**
   - **Risiko:** Design wirkt uneinheitlich oder nicht professionell
   - **Mitigation:** Design-System konsequent nutzen, regelmäßige Reviews

## Erfolgskriterien

### Launch-Kriterien

- [x] Git-Repository hat nur noch `main` Branch
- [ ] Astro-Projekt läuft lokal ohne Fehler
- [ ] Alle Inhalte wurden korrekt migriert
- [ ] Design ist responsiv (Mobile, Tablet, Desktop)
- [ ] SEO-Meta-Tags sind vollständig
- [ ] GitHub Actions Deployment funktioniert
- [ ] Website ist unter hendrikschneemann.tech erreichbar
- [ ] Alle Links funktionieren
- [ ] Performance ist gut (Lighthouse Score > 90)

### Qualitätskriterien

- **Performance:** Lighthouse Score > 90 in allen Kategorien
- **Accessibility:** WCAG 2.1 Level AA
- **SEO:** Alle Meta-Tags, Structured Data, Sitemap
- **Browser-Support:** Moderne Browser (Chrome, Firefox, Safari, Edge - letzte 2 Versionen)
- **Mobile-First:** Optimiert für mobile Geräte

## Zeitplan

**Geschätzte Dauer:** 6-8 Stunden Entwicklungszeit

1. **Git-Aufräumung:** ~30 Minuten
2. **Astro-Setup & Konfiguration:** ~1 Stunde
3. **Design-System & Basis-Styles:** ~1 Stunde
4. **Komponenten-Entwicklung:** ~2-3 Stunden
5. **Content-Migration:** ~1 Stunde
6. **GitHub Actions Setup:** ~30 Minuten
7. **Testing & Bug-Fixes:** ~1 Stunde
8. **Alte Dateien aufräumen:** ~30 Minuten
9. **Deployment & Verifizierung:** ~30 Minuten

**Hinweis:** Tests und absichernde Workflows können bis nach der Migration ignoriert werden (User-Vorgabe).

## Anhang

### Nützliche Links

- [Astro Dokumentation](https://docs.astro.build/)
- [Astro GitHub Pages Guide](https://docs.astro.build/en/guides/deploy/github/)
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Space Grotesk Font](https://fonts.google.com/specimen/Space+Grotesk)
- [GitHub Actions Dokumentation](https://docs.github.com/en/actions)

### Referenzen

- Aktuelle Website: https://hendrikschneemann.tech
- GitHub Repository: https://github.com/hswalcnepoBot/hschneemannWebsite

---

**Genehmigt:** 2026-04-05
**Nächster Schritt:** Implementierungsplan erstellen
