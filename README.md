# Friends Café &amp; Shisha Düsseldorf

Statische Website (reines HTML, CSS, JavaScript) für die Shisha Lounge
Friends Café &amp; Shisha in Düsseldorf Holthausen. Kompatibel mit GitHub Pages,
kein Build-Schritt.

## Dateien

- `index.html` Startseite mit allen Sektionen (Hero-Video, Sorten, Cocktails, Galerie ...)
- `impressum.html`, `datenschutz.html` Rechtstexte
- `css/style.css` gesamtes Design
- `js/main.js` Navigation und Scroll-Verhalten
- `sitemap.xml`, `robots.txt` Konfiguration
- `img/` Bilder und Hero-Video

Die Seite läuft ohne eigene Domain direkt über GitHub Pages unter
`https://chjungdus.github.io/Friends-Caf-Shisha-D-sseldorf/`. Alle absoluten
URLs (canonical, Open Graph, sitemap, robots, JSON-LD) zeigen bereits dorthin.

## Bereits eingebaute echte Daten

- Adresse: Kölner Landstraße 117, 40591 Düsseldorf
- Shisha Sortenverzeichnis (18 Sorten) und Preise (14/17 Euro, Eisschlauch 3,50, neuer Kopf 7)
- Cocktailkarte (12 Cocktails, je 10 Euro) mit Zutaten
- Echte Fotos der Lounge sowie das Hero-Video (`img/hero/hero.mp4`, aus dem
  Original in browserfreundliches H.264 umgewandelt, ohne Ton)

## Noch offen (bitte vor dem Livegang ergänzen)

| Platzhalter | Bedeutung |
| --- | --- |
| `+49 177 0000000` | echte Telefonnummer. Öffentlich gelistet ist 0177 7829747, bitte bestätigen |
| `kontakt@deine-domain.de` | echte E-Mail-Adresse |
| `friends.cafe.shisha` | echter Instagram-Benutzername |
| `Vorname Nachname` | Inhaber im Impressum und Datenschutz |
| `DE000000000` | Umsatzsteuer-Identifikationsnummer im Impressum |
| geo `51.1705 / 6.8730` | nur ungefähr. Exakte Koordinaten aus Google Maps eintragen (index.html: geo-Tags und JSON-LD) |

Bitte außerdem die **Öffnungszeiten prüfen**. Aktuell hinterlegt: Mo bis Do 15 bis 01 Uhr,
Fr und Sa 15 bis 02 Uhr, So 14 bis 24 Uhr. Manche Online-Verzeichnisse nennen 18 Uhr als Beginn.
Die Zeiten stehen in `index.html` (Sektion Öffnungszeiten) und im JSON-LD im `<head>`.

## Hero-Video austauschen

Neues Video als H.264 mp4 ohne Ton unter `img/hero/hero.mp4` ablegen und ein
Standbild als `img/hero/hero-poster.jpg`. Umwandlung mit ffmpeg zum Beispiel:

```
ffmpeg -i original.mp4 -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart img/hero/hero.mp4
```

## Veröffentlichung über GitHub Pages

1. Repository Einstellungen, Bereich Pages
2. Quelle auf den Branch mit diesen Dateien setzen
3. Die Seite ist dann unter `https://chjungdus.github.io/Friends-Caf-Shisha-D-sseldorf/` erreichbar

Eine eigene Domain ist bewusst nicht eingerichtet. Falls später doch gewünscht,
kann sie über eine `CNAME` Datei und die absoluten URLs nachgezogen werden.
