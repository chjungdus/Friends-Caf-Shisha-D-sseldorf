# Friends Cafe Shisha Duesseldorf

Statische Website (reines HTML, CSS, JavaScript) fuer die Shisha Lounge
Friends Cafe Shisha in Duesseldorf. Kompatibel mit GitHub Pages, kein Build-Schritt.

## Dateien

- `index.html` Startseite mit allen Sektionen
- `impressum.html`, `datenschutz.html` Rechtstexte
- `css/style.css` gesamtes Design
- `js/main.js` Navigation und Scroll-Verhalten
- `CNAME`, `sitemap.xml`, `robots.txt` Konfiguration
- `img/` Bilder (siehe unten)

## Vor dem Livegang ersetzen

Diese Website ist ein Geruest mit klar markierten Platzhaltern. Bitte per
Suchen und Ersetzen ueber alle Dateien anpassen:

| Platzhalter | Bedeutung |
| --- | --- |
| `DEINE-DOMAIN.de` | echte Domain (auch in CNAME, sitemap.xml, robots.txt) |
| `Musterstrasse 12` | echte Strasse und Hausnummer |
| `40210` | echte Postleitzahl |
| `+49 211 1234567` und `+492111234567` | echte Telefonnummer |
| `kontakt@deine-domain.de` | echte E-Mail-Adresse |
| `friends.shisha.duesseldorf` | echter Instagram-Benutzername |
| `51.2217` / `6.7762` | echte GPS-Koordinaten aus Google Maps |
| `Vorname Nachname` | Inhaber im Impressum und Datenschutz |
| `DE000000000` | Umsatzsteuer-Identifikationsnummer im Impressum |

Die Oeffnungszeiten stehen in `index.html` (Sektion Oeffnungszeiten) und im
JSON-LD im `<head>`. Bei Aenderung beide Stellen anpassen.

## Benoetigte Bilder

Alle Bilder als JPG im Ordner `img/` ablegen:

- `img/logo/logo.jpg` Logo, quadratisch
- `img/hero/hero.jpg` Hero Hintergrund, Querformat
- `img/shisha/` doppelapfel.jpg, traube-minze.jpg, blaubeere.jpg, zitrone-minze.jpg, wassermelone.jpg, hausmischung.jpg
- `img/galerie/` atmosphaere.jpg, galerie-1.jpg, galerie-2.jpg, galerie-3.jpg, galerie-4.jpg

## Veroeffentlichung ueber GitHub Pages

1. Repository Einstellungen, Bereich Pages
2. Quelle auf den Branch mit diesen Dateien setzen
3. Eigene Domain in der `CNAME` Datei hinterlegen und im DNS auf GitHub Pages zeigen
