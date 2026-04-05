# MyWebsite

Diese Website wird aus einer Template-Datei und HTML-Partials gebaut.

## Projektstruktur

- `src/index.template.html`: Haupttemplate mit Include-Markern.
- `src/partials/*.html`: Inhaltliche Bereiche (Header, Hero, Projekte, Kontakt, ...).
- `scripts/build-html.sh`: Baut aus Template + Partials die finale `index.html`.
- `assets/css/`: Styles aufgeteilt in `base.css`, `layout.css`, `components.css`.
- `assets/js/`: JavaScript aufgeteilt in `config.js`, `modules/*.js`, Einstieg über `main.js`.

## Workflow

1. Inhalte in `src/partials/*.html` oder `src/index.template.html` ändern.
2. Build ausführen:

```bash
./scripts/build-html.sh
```

3. Änderungen in der generierten `index.html` prüfen und committen.

## Hinweise

- `index.html` ist das Build-Artefakt für Deployment (z. B. GitHub Pages).
- Platzhalter-Links in `assets/js/config.js` werden automatisch ausgeblendet, bis echte URLs gesetzt sind.
- Primärer Git-Remote ist `origin` (`hswalcnepoBot/hschneemannWebsite`), der alte Account bleibt als `legacy` hinterlegt.

## Contributing

Für den vollständigen Git-Workflow und Contribution-Prozess siehe [CONTRIBUTING.md](CONTRIBUTING.md).

**Kurzfassung:**
1. Feature-Branch erstellen
2. Änderungen vornehmen und builden
3. Pull Request erstellen
4. Nach erfolgreichem Review wird automatisch in `main` gemerged
