# up2date Mobil App — Koncepció terv

> Feladat (NTC #1): "az up2datebol csinalhatnank egy applikaciot is mobilra, nem? mint egy telex app"

## Az ötlet

A HR World News Portal (up2date) tartalmát egy dedikált mobil applikációban elérhetővé tenni — a Telex app mintájára. Rövid, magyar összefoglalók, napi frissítés, értesítések.

---

## Javasolt megközelítések

### A. Progressive Web App (PWA) — Ajánlott első lépés
**Előnyök:**
- Nincs App Store jóváhagyás szükséges
- A meglévő web kód 80%-a újrahasználható
- Push notifikációk támogatottak
- Hazatelepíthető (Add to Home Screen)

**Tennivalók:**
1. `manifest.json` hozzáadása a `public/` mappához
2. Service Worker regisztrálása (offline cache)
3. Mobil-optimalizált CSS (touch-friendly cards)
4. Push notification beállítása (pl. OneSignal vagy Web Push API)

### B. React Native / Expo app — Hosszabb táv
**Előnyök:**
- Valódi natív app (App Store + Google Play)
- Jobb teljesítmény, natív UX

**Tennivalók:**
1. Expo projekt inicializálása
2. `news.json` API-ként kiszolgálása (Netlify function)
3. FlatList alapú hírfeed komponens
4. Napi push notification (Expo Notifications)

---

## MVP funkciók (Telex-szerű)

| Funkció | PWA | React Native |
|---------|-----|--------------|
| Hírlista (napi frissítés) | ✅ | ✅ |
| Cikk olvasó | ✅ | ✅ |
| Kategória szűrő | ✅ | ✅ |
| Push értesítés (reggel 7-kor) | ✅ | ✅ |
| Offline olvasás | ✅ (cache) | ✅ |
| Mentett cikkek | ✅ (localStorage) | ✅ |

---

## Ajánlott első lépés: PWA

A leggyorsabb megoldás a meglévő web app PWA-vá alakítása:

```
1. public/manifest.json létrehozása
2. service-worker.js hozzáadása
3. index.html-be: <link rel="manifest"> + SW regisztráció
4. Mobil CSS finomítása
```

---

## Státusz: ⏳ Várakozik Dorka döntésére

**Kérdések:**
- PWA először, vagy rögtön natív app?
- iOS + Android, vagy csak Android?
- Fizetős (premium) tartalom tervezett-e az appban?

*Létrehozva: 2026-03-19 | NCT automatizálás*
