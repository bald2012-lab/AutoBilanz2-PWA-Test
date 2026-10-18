# AutoBilanz 1.0 — PWA Installtest 2

**Testbuild, noch nicht auf GitHub veröffentlicht.** Die Haupt-App ist inhaltlich unverändert.

## Ziel
Chrome auf Android zeigt derzeit bei AutoBilanz „Diese App kann nicht installiert werden“, während eine andere PWA installierbar ist. Die Ursache ist damit **noch nicht bewiesen**. Diese Variante gibt Manifest, Service Worker und Icons eindeutige Pfade und enthält eine separate Diagnose-Seite.

## Dateien
- `index.html` — AutoBilanz 1.0, nur die PWA-Einbindung wurde geändert.
- `manifest.webmanifest` — explizite Start-/Scope-Pfade für `bald2012-lab/AutoBilanz2-PWA-Test`.
- `service-worker.js` — neue Cache-Version, Offlinefunktion.
- `pwa-diagnose.html` — Diagnostik im Browser, ohne zusätzliche Apps.
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` — App-Icons.
- `.nojekyll` — GitHub Pages.

## Veröffentlichung (NUR nach separater Freigabe des Besitzers)
Diese Dateien gehören in den **Root von `bald2012-lab/AutoBilanz2-PWA-Test`**. Bestehendes `AutoBilanz` nicht berühren. Nach `Commit changes` und GitHub Pages-Update in Chrome öffnen:

`https://bald2012-lab.github.io/AutoBilanz2-PWA-Test/pwa-diagnose.html`

Wenn die Tests grün sind, bei Chrome im Menü „App installieren“ prüfen. Bei unveränderter Anzeige bitte Diagnose-Screenshot senden. Der genaue Grund für die Android-Installationssperre kann aus der Testumgebung nicht zuverlässig ermittelt werden.

## Datensicherheit
Persönliche JSON-Projekte gehören NICHT ins öffentliche Repository. Bestehende `localStorage`-Projekte werden durch dieses Update nicht absichtlich gelöscht. Sicherheitshalber vor jedem Update „Projekt speichern“ ausführen.
