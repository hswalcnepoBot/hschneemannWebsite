# Contributing Guide

## Git Workflow

Dieses Projekt folgt einem Feature-Branch-Workflow mit automatischem Merging nach erfolgreichem Review.

### 1. Feature Branch erstellen

```bash
git checkout -b feature/deine-feature-beschreibung
# oder
git checkout -b fix/bug-beschreibung
```

### 2. Änderungen vornehmen

1. Inhalte in `src/partials/*.html` oder `src/index.template.html` ändern
2. Build ausführen: `./scripts/build-html.sh`
3. Generierte `index.html` prüfen
4. Änderungen committen:

```bash
git add .
git commit -m "feat: beschreibung der änderung"
```

**Commit Message Conventions:**
- `feat:` - Neue Features
- `fix:` - Bugfixes
- `chore:` - Wartungsarbeiten (Build, Dependencies)
- `docs:` - Dokumentationsänderungen
- `style:` - Code-Formatierung

### 3. Push und Pull Request

```bash
git push -u origin feature/deine-feature-beschreibung
```

Erstelle einen Pull Request auf GitHub:
- **Base:** `main`
- **Compare:** dein Feature-Branch
- Füge eine aussagekräftige Beschreibung hinzu

### 4. Review-Prozess

1. **CI-Checks:** GitHub Actions führt automatisch Tests aus:
   - `Website CI`: Baut und validiert die HTML-Struktur
   - Prüft, dass `index.html` aktuell und committed ist

2. **Code Review:** Mindestens eine Approval von einem Reviewer

3. **Automatisches Merging:**
   - ✅ Wenn alle CI-Checks grün sind
   - ✅ Und mindestens eine Approval vorliegt
   - 🤖 Merged der `Auto Merge on Approval` Workflow automatisch in `main`

### 5. Nach dem Merge

- Der `Stamp homepage version` Workflow läuft automatisch
- Erstellt eine versionierte `index.html` mit `main.{BUILD_NUMBER}-{SHORT_SHA}`
- Committed den Stamp zurück auf `main`

### Branch Protection (empfohlen)

Für optimalen Schutz sollten folgende Regeln auf dem `main` Branch aktiviert werden:

1. **Require pull request reviews before merging**
   - Mindestens 1 Approval erforderlich

2. **Require status checks to pass before merging**
   - `validate` (Website CI) muss grün sein

3. **Require branches to be up to date before merging**
   - Stellt sicher, dass der Branch mit `main` synchron ist

4. **Do not allow bypassing the above settings**
   - Auch Admins müssen den Prozess befolgen

## Lokale Entwicklung

```bash
# Build ausführen
./scripts/build-html.sh

# Mit Version-Stamp
APP_VERSION="dev-local" ./scripts/build-html.sh

# Änderungen lokal testen
# Öffne index.html im Browser oder nutze einen lokalen Server:
python3 -m http.server 8000
```

## Troubleshooting

### "index.html is out of date"

Falls der CI-Check fehlschlägt mit dieser Meldung:

```bash
./scripts/build-html.sh
git add index.html
git commit -m "chore: rebuild index.html"
git push
```

### Merge Conflicts

1. Aktualisiere deinen Branch:
```bash
git fetch origin
git rebase origin/main
```

2. Löse Konflikte und force-push:
```bash
git push --force-with-lease
```

## Fragen?

Bei Fragen oder Problemen, erstelle ein Issue auf GitHub.
