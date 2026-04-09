# MyWebsite

Persoenliche Website auf Basis von Astro.

## Workflow

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm install` installiert die Abhaengigkeiten.
- `npm run dev` startet den lokalen Astro-Entwicklungsserver.
- `npm run build` erstellt das Produktions-Build.
- `npm run preview` prueft das Build lokal.

## Projektstruktur

- `src/pages/` fuer Routen und Seiten wie `index.astro` und `404.astro`.
- `src/layouts/` fuer wiederverwendbare Seitenlayouts.
- `src/components/` fuer wiederverwendbare UI-Bausteine.
- `src/styles/` fuer globale Styles und Design-Tokens.
- `public/` fuer statische Dateien wie `CNAME`.

## Deployment

Das Deployment laeuft ueber GitHub Actions und nutzt das Astro-Build als Grundlage fuer das Hosting.
