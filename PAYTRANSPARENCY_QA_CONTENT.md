# Pay Transparency Q&A → up2date Napi Tartalom

> NTC feladat #2/#3: "a paytransparencyrol egy-egy kerdest kerdes-valasz formajaban vegyunk at minden nap az up2datere, mintha egy hir lenne"

## Koncepció

A paytransparency.hu oldalon lévő ~35 Q&A-t naponta egyenként behozzuk az up2date (HRNEWS) portálra, mintha egy rendes hír lenne. Így:
- Állandó friss tartalom még akkor is, ha nincs RSS cikk
- A pay transparency témában Dorka/Y2Y szakértőként jelenik meg
- Cross-promotion: az olvasók ráklikkelnek → paytransparency.hu-ra kerülnek

## Implementációs terv

### 1. Forrás: pay-transparency-qa.html JSON-LD
A fájlban ~35 kérdés-válasz pár van JSON-LD @FAQPage formátumban:
```json
{ "name": "Mi az a bértranszparencia?", "acceptedAnswer": { "text": "..." } }
```

### 2. Automatikus konverzió cikké
A fetch-rss.js-be beilleszteni egy új "forrás" szekciót:

```javascript
async function fetchPayTransparencyQA() {
  const fs = require('fs');
  const html = fs.readFileSync('../bertranszparencia/pay-transparency-qa.html', 'utf8');
  const match = html.match(/"@type":"FAQPage"[\s\S]*?"mainEntity":\s*(\[[\s\S]*?\])\s*\}/);
  if (!match) return [];

  const faqs = JSON.parse(match[1]);
  const today = new Date().toISOString().slice(0, 10);

  // Napi rotáció: dayOfYear mod 35
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const faq = faqs[dayOfYear % faqs.length];

  return [{
    title: faq.name,
    title_hu: faq.name,
    summary: faq.acceptedAnswer.text.slice(0, 300) + '…',
    summary_hu: faq.acceptedAnswer.text.slice(0, 300) + '…',
    url: `https://paytransparency.hu/pay-transparency-qa.html#q${dayOfYear % faqs.length}`,
    source: 'Y2Y Pay Transparency',
    category: 'HR Compliance',
    geo: '🇪🇺 EU',
    published: new Date().toISOString(),
    addedAt: new Date().toISOString(),
    isQA: true,
    badge: '❓ Bértranszparencia Q&A'
  }];
}
```

### 3. Megjelenítés az up2date-en
A cardHTML() függvénybe: ha `a.isQA === true`, mutasson egy kis "❓ Q&A" badge-et és más háttérszínt.

## Státusz
- [x] Terv elkészült
- [ ] fetch-rss.js-be integrálni
- [ ] cardHTML stílus Q&A kártyához
- [ ] Tesztelni, hogy a rotáció jól működik-e

*NCT automatizálás | 2026-03-19*
