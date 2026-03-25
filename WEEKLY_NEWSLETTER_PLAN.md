# up2date Heti Hírlevél

> NTC feladat #8: "Az up2date-nek tokjo lenne ha lenne egy heti hirlevele, amikor a heti legfontosabb hireket (dontse el o hogy melyi kszamit fontosnak, osszerakja egy gyonyoru hirlevelbe, cska a kepek, osszefoglalok es a linkek)"

## Koncepció

Minden héten (pl. péntek reggel) az up2date automatikusan:
1. Kiválasztja a 5-7 legjobb cikket az elmúlt 7 napból
2. Gyönyörű HTML emailt összerak (képek, összefoglalók, linkek)
3. Elküldi a feliratkozott olvasóknak

## Implementációs terv

### Lépés 1: Email lista kezelése
A HRNEWS-hoz hozzáadni egy feliratkozó formulát a főoldalra:
```html
<form id="newsletter-signup">
  <input type="email" placeholder="email@cimed.hu">
  <button type="submit">Feliratkozás</button>
</form>
```
Email cím mentése: Supabase `newsletter_subscribers` táblába, vagy egyszerűen Netlify Forms.

### Lépés 2: Automatikus tartalom kiválasztás
Minden péntek reggel a scheduled task:
1. Olvassa a news.json-t
2. Szűri az elmúlt 7 nap cikkeit
3. Rangsorolja (pl. legtöbb forrásból megosztott + kategória diverzitás)
4. Kiválasztja a top 6 cikket

### Lépés 3: Email összeállítása (Resend API)
```javascript
const emailHtml = `
  <h1>up2date — Heti HR Összefoglaló</h1>
  <p>A legjobb HR hírek az elmúlt hétből</p>
  ${topArticles.map(a => `
    <div style="border-left:4px solid #00C8FF;padding:12px;margin:16px 0">
      <h2><a href="${a.url}">${a.title_hu}</a></h2>
      <p>${a.summary_hu}</p>
      <small>${a.source} · ${a.category}</small>
    </div>
  `).join('')}
`;
```

### Eszközök
- **Email küldés:** Resend.com (free: 3000 email/hó) vagy Mailchimp API
- **Feliratkozók:** Netlify Forms (free tier) vagy Supabase
- **Scheduled task:** Meglévő hrnews-daily-update + heti futás pénteken

## Státusz
- [x] Terv elkészült
- [ ] Feliratkozó form a főoldalra
- [ ] Supabase/Netlify Forms setup
- [ ] Tartalom-kiválasztó logika
- [ ] Email template elkészítése
- [ ] Resend API integráció

*NCT automatizálás | 2026-03-19*
