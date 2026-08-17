# Offene Inhalte, vom Kunden zu liefern

> Stand: laufend gepflegt. Diese Liste bündelt alles, was **noch von ABATON
> geliefert werden muss**, damit die Website vollständig und startklar ist.
> Rein technische/entwicklerseitige Punkte stehen nicht hier, sondern in
> [GAP-ANALYSIS.md](./GAP-ANALYSIS.md) und [OPEN-DECISIONS.md](./OPEN-DECISIONS.md).
>
> Die Website läuft aktuell als **reine Dev-Umgebung** (nicht indexiert,
> `NEXT_PUBLIC_NOINDEX=1`), getrennt von der späteren Live-Domain. Kein Go-Live,
> bis die mit **[Launch]** markierten Punkte geliefert sind.

Legende: **[Launch]** blockiert die Veröffentlichung · **[Qualität]** verbessert
das Erscheinungsbild, blockiert aber nicht · **[Entscheidung]** braucht eine
Festlegung von euch.

---

## 1. Rechtliche Angaben (Impressum, AGB, Datenschutz)

Diese Werte fehlen im Code und sind auf den Seiten Impressum/Datenschutz
**gelb markiert**, damit euer Anwalt sie sofort sieht. Eintragung erfolgt zentral
in `src/lib/site.ts`.

| # | Was wird gebraucht | Wohin | Status |
|---|---|---|---|
| 1.1 | **Registergericht** (zuständiges Amtsgericht zur HRB 204597) | `company.registerCourt` | **[Launch]** offen |
| 1.2 | **USt-IdNr.** (Umsatzsteuer-Identifikationsnummer nach § 27a UStG) | `company.vatId` | **[Launch]** offen |
| 1.3 | **Insolvenz-/Kundengeldabsicherer** (Name des Versicherers für den Sicherungsschein, § 651r BGB) | `company.insolvencyInsurer` | **[Launch]** offen |
| 1.4 | **Geschäftsanschrift bestätigen**: aktuell Gehrenstraße 7, die frühere Datenschutzerklärung nannte Gehrenstr. 11 | `company.street` | **[Launch]** offen |
| 1.5 | **AGB-Gerichtsstands-/Rechtswahlklausel** (fehlt im gelieferten AGB-Text) durch eine reiserechtliche Kanzlei ergänzen lassen | AGB-Seite | **[Launch]** offen |
| 1.6 | **Gästezahl in den AGB**: Marketing sagt „6 bis 8", die AGB sagen „6 bis 10". Verbindliche Fassung festlegen und rechtlich prüfen | AGB-Seite | **[Entscheidung]** offen |

> Sobald 1.1 bis 1.4 vorliegen, trage ich die Werte ein und **entferne die
> gelben Review-Markierungen** auf Impressum/Datenschutz.

---

## 2. Bilder und Grafik

Aktuell laufen die Seiten auf generischen Platzhalter-/Stockbildern. Für den
bespoke, redaktionellen Look aus dem Briefing braucht es eigenes Material.

| # | Was wird gebraucht | Wohin | Status |
|---|---|---|---|
| 2.1 | **Destinations-/Editorial-Fotografie** pro Journey (z. B. Elegant Islands: Mayfair, Killarney, Ashford Castle, Highlands, Edinburgh, dezente Aviation) | `public/images/journeys/…`, `public/images/experiences/…` | **[Qualität]** offen |
| 2.2 | **Journey-Highlights als Bildkarten**: je Highlight ein Bild (Briefing: „five visual cards with one image each") | Highlight-Bereich der Detailseite | **[Qualität]** offen |
| 2.3 | **Reise-Karten (illustrierte Maps)** pro Journey in ABATON-Farben, dazu die einfache Textroute darunter | „The Route"-Element der Detailseite | **[Qualität]** offen |
| 2.4 | **Founder-Porträt** von Isabell Buchner (warm, kein Stock), optional ein authentisches Aviation-Bild | About-Seite, Founder-Bereich | **[Qualität]** offen |
| 2.5 | **Open-Graph-/Share-Bild** (mind. ein Marken-Motiv 1200x630) für Vorschau in Social Media und Suchmaschinen | `og:image` (Layout/Metadaten) | **[Qualität]** offen |

---

## 3. Partner und Social Media

| # | Was wird gebraucht | Wohin | Status |
|---|---|---|---|
| 3.1 | **Partnerliste + Logodateien** (Fluggesellschaften/Operator, Hotels, sonstige Partner), sofern öffentlich nennbar | Home-Sektion „ABATON Partners" (aktuell Platzhalter) | **[Qualität]** offen |
| 3.2 | **Social-Media-Profile** (Instagram, LinkedIn, ggf. weitere): finale URLs | Footer (aktuell nicht verlinkt) | **[Qualität]** offen |

---

## 4. Preise und Portfolio

| # | Was wird gebraucht | Wohin | Status |
|---|---|---|---|
| 4.1 | **Eine verbindliche Preisliste** je Journey (aktuell existieren mehrere widersprüchliche Quellen). Vor Indexierung festlegen | `priceFrom` / `priceFromSingle` je Journey | **[Launch]** offen |
| 4.2 | **Elegant Islands, Preisfrage**: das 2027-Briefing nennt bewusst keinen Preis; aktuell 30.220 EUR / 34.420 EUR aus dem Katalog. Bestätigen, ob und welcher Preis öffentlich steht | `elegant-islands` in `collection.ts` | **[Entscheidung]** offen |
| 4.3 | **Abreisedaten der Interest-List-Journeys**: sobald eine Journey buchbar wird, Datum + Status auf `open` setzen (dann erscheinen Preis, Datum und Währungswähler automatisch) | `status` / `nextDeparture` je Journey | **[Entscheidung]** offen |
| 4.4 | **Portfolio-Bestätigung**: Finest of Europe und Secrets of Europe wurden entfernt, Mediterranean Essence neu aufgenommen, Balkan/Scandinavia-Routen überarbeitet. Bitte final bestätigen | `collection.ts` | erledigt, Bestätigung offen |

---

## 5. Mitgliederbereich (ABATON Circle)

| # | Was wird gebraucht | Wohin | Status |
|---|---|---|---|
| 5.1 | **Entscheidung + Freigabe zum Aufbau** des Circle (Login-Portal). Aktuell sind nur die öffentlichen Teaser live; das Portal selbst ist Greenfield-Arbeit | siehe [CIRCLE-BACKLOG.md](./CIRCLE-BACKLOG.md) | **[Entscheidung]** zurückgestellt |
| 5.2 | **Datenschutz-Freigabe für Passwort-/Passdaten-Upload** (schriftliche Bestätigung des Datenschutzberaters) vor Bau von Abschnitt 12.5 | Circle, Dokumente | **[Launch der Funktion]** offen |

---

## 6. Go-Live-Voraussetzungen (Infrastruktur)

Diese Punkte betreffen die spätere Live-Domain und werden von euch bzw. im
Cloudflare-Dashboard erledigt, sobald es so weit ist.

| # | Was wird gebraucht | Status |
|---|---|---|
| 6.1 | **Produktions-Domain** in denselben Cloudflare-Account, DNS umstellen | offen |
| 6.2 | **Echte Turnstile-Keys** (Site- und Secret-Key) für den Spam-Schutz der Formulare | offen |
| 6.3 | **Cloudflare Transformations** auf der Zone aktivieren, dann `NEXT_PUBLIC_CF_IMAGES=1` (Edge-optimierte Bilder) | offen |
| 6.4 | **Resend-Absender** verifizieren (Domain/From-Adresse), damit Anfragen per E-Mail zugestellt werden | offen |
| 6.5 | **`NEXT_PUBLIC_NOINDEX` auf 0** setzen zum Zeitpunkt des Go-Live (macht die Seite indexierbar) | offen |

Details zur Reihenfolge stehen in [DEPLOYMENT.md](../DEPLOYMENT.md).

---

## 7. Optional / später

| # | Was wird gebraucht | Status |
|---|---|---|
| 7.1 | **Broschüren-PDF** zum Download (falls gewünscht; aktuell wird die Broschüre auf Anfrage per E-Mail zugesagt) | offen |
| 7.2 | **Analytics-Entscheidung**: aktuell bewusst kein Tracking. Falls Analytics gewünscht, braucht es Tool-Wahl, Consent-Banner und eine angepasste Datenschutzerklärung | **[Entscheidung]** offen |
| 7.3 | **Eigene Übersetzungen prüfen**: die deutschen Marketingtexte wurden von uns übersetzt; ein Korrektorat durch euch ist empfehlenswert | offen |
