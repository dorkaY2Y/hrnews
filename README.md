# HR World News Portal

Globalis HR hirek rovid magyar osszefoglaloval. Automatikusan frissul naponta Claude Code segitsegevel.

## Architektura

- **Frontend:** Statikus HTML/CSS/JS - Netlify-on hoszt
- **Adatok:** `public/data/news.json` - GitHub repo-ban
- **Frissites:** Claude Code scheduled task (minden reggel 7:00)
- **AI:** Claude Code irja a magyar osszefoglalokat (nem kulso API, subscription terhelo)

## Setup (egyszer kell elvegezni)

### 1. Node.js fuggosegek

```bash
cd scripts
npm install
```

### 2. Git repo letrehozasa

```bash
cd /c/Users/dorka/OneDrive/Desktop/HRNEWS
git init
git add .
git commit -m "Initial commit"
```

### 3. GitHub repo

1. Hozz letre egy uj repot: github.com/new (pl. `hrnews`)
2. ```bash
   git remote add origin https://github.com/FELHASZNALONEV/hrnews.git
   git push -u origin main
   ```

### 4. Netlify

1. netlify.com -> "Add new site" -> "Import an existing project"
2. Valaszd a GitHub repot
3. Build settings:
   - **Publish directory:** `public`
   - Build command: (ures)
4. Deploy!

### 5. Claude Code scheduled task

Mar be van allitva! Minden reggel 7:00-kor automatikusan:
- Letolti az uj HR cikkeket
- Magyar osszefoglalokat ir hozzajuk  
- Pusholja GitHubra
- Netlify auto-deployol

**Fontos:** A Claude Code appnak nyitva kell lennie amikor a task fut.
Ha nem volt nyitva, egyszeruen futtasd kezzel a "Scheduled" szekciobol.

## Forrasok

| Nev | Kategoria | RSS URL |
|-----|-----------|---------|
| SHRM HR Magazine | HR Policy | https://rss.shrm.org/hrmagazine |
| Harvard Business Review | Leadership | http://feeds.hbr.org/harvardbusiness |
| HR Dive | HR News | https://www.hrdive.com/feeds/news/ |
| Flex Index | Flex & Remote Work | https://flexindex.substack.com/feed |
| WorkLife (Digiday) | Future of Work | https://www.worklife.news/feed/ |
| Y2Y | Y2Y Blog | nincs RSS feed; manualis hozzaadas szukseges |

### Uj forrast hozzaadni

A `scripts/fetch-rss.js` fajl `FEEDS` tombjebe kell egy uj objektumot felvenni:

```javascript
{
  name: 'Forras neve',
  url: 'https://pelda.com/rss',
  category: 'Kategoria',
  color: '#hexszin'
}
```

## Manualis frissites

Ha szeretned kezileg futtatni:

1. Claude Code -> Scheduled felulet -> "hrnews-daily-update" -> Run now
2. VAGY terminalbol: `cd scripts && node fetch-rss.js` (csak a raw fetch, osszefoglalo nelkul)

## Projekt struktura

```
HRNEWS/
|-- public/              # Netlify altal kiszolgalt statikus fajlok
|   |-- index.html       # A portal fooldala
|   |-- style.css        # Stilus
|   |-- app.js           # Frontend logika
|   `-- data/
|       `-- news.json    # Osszes cikk + magyar osszefoglalok
|-- scripts/
|   |-- fetch-rss.js     # RSS letolto script
|   `-- package.json
|-- data/                # Ideiglenes fajlok (gitignore-ban)
|   `-- raw-new-articles.json
|-- netlify.toml
`-- .gitignore
```
