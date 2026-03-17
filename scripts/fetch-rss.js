#!/usr/bin/env node
/**
 * HR News RSS Fetcher
 * Fetches latest articles from HR sources + Y2Y blog, saves raw data for Claude to summarize.
 *
 * RSS feed URLs – verify these if a source stops working:
 *   SHRM HR Mag:       https://rss.shrm.org/hrmagazine
 *   HBR:               http://feeds.hbr.org/harvardbusiness  (HTTP not HTTPS)
 *   HR Dive:           https://www.hrdive.com/feeds/news/
 *   HR Bartender:      https://www.hrbartender.com/feed/
 *   Talent Management: https://www.talentmgt.com/feed/
 *   HRMorning:         https://www.hrmorning.com/feed/
 *   Flex Index:        https://flexindex.substack.com/feed
 *   WorkLife.news:     https://www.worklife.news/feed/
 *   HR Executive:      https://hrexecutive.com/feed/
 *   Workology:         https://workology.com/feed/
 *   Personnel Today:   https://www.personneltoday.com/feed/
 *   People Management: https://www.peoplemanagement.co.uk/feed
 *   AIHR:              https://www.aihr.com/blog/feed/
 *   Unleash:           https://www.unleash.ai/feed/
 *   Josh Bersin:       https://joshbersin.com/feed/
 *   MIT Sloan:         https://sloanreview.mit.edu/feed/
 *   HRM Asia:          https://hrmasia.com/feed/
 *   People Matters:    https://www.peoplematters.in/rss.xml
 *   Portfolio.hu:      https://www.portfolio.hu/rss/all.xml
 *   G7.hu:             https://g7.hu/feed
 *   Telex.hu:          https://telex.hu/rss/all-articles
 *   BBJ:               https://bbj.hu/rss
 *   Personalwirtschaft:https://www.personalwirtschaft.de/feed/
 *   HR Manager DE:     https://www.humanresourcesmanager.de/feed/
 *   HRweb.at:          https://www.hrweb.at/feed/
 *   Parlons RH:        https://www.parlonsrh.com/feed/
 *   CHRO.nl:           https://chro.nl/feed/
 *
 * Y2Y: no RSS – scrapes OG meta tags from y2y.hu/blog post pages
 */

const Parser = require('rss-parser');
const fs     = require('fs');
const path   = require('path');
const https  = require('https');
const http   = require('http');

const FEEDS = [
  // ──────────────────── 🇺🇸 USA ────────────────────
  {
    name: 'SHRM',
    url: 'https://rss.shrm.org/hrmagazine',
    category: 'HR Policy',
    color: '#b91c1c',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Harvard Business Review',
    url: 'http://feeds.hbr.org/harvardbusiness',
    category: 'Leadership',
    color: '#991b1b',
    geo: '🇺🇸 USA'
  },
  {
    name: 'HR Dive',
    url: 'https://www.hrdive.com/feeds/news/',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA'
  },
  {
    name: 'HR Bartender',
    url: 'https://www.hrbartender.com/feed/',
    category: 'HR & Management',
    color: '#c2410c',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Talent Management',
    url: 'https://www.talentmgt.com/feed/',
    category: 'Talent Management',
    color: '#7c3aed',
    geo: '🇺🇸 USA'
  },
  {
    name: 'HRMorning',
    url: 'https://www.hrmorning.com/feed/',
    category: 'HR News',
    color: '#0284c7',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Flex Index',
    url: 'https://flexindex.substack.com/feed',
    category: 'Flex & Remote Work',
    color: '#6d28d9',
    geo: '🇺🇸 USA'
  },
  {
    name: 'WorkLife',
    url: 'https://www.worklife.news/feed/',
    category: 'Future of Work',
    color: '#047857',
    geo: '🇺🇸 USA'
  },
  {
    name: 'HR Executive',
    url: 'https://hrexecutive.com/feed/',
    category: 'HR Strategy',
    color: '#7c3aed',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Workology',
    url: 'https://workology.com/feed/',
    category: 'HR & Recruiting',
    color: '#b45309',
    geo: '🇺🇸 USA'
  },
  // ──────────────────── 🇬🇧 UK ────────────────────
  {
    name: 'Personnel Today',
    url: 'https://www.personneltoday.com/feed/',
    category: 'HR News',
    color: '#1e40af',
    geo: '🇬🇧 UK'
  },
  {
    name: 'People Management',
    url: 'https://www.peoplemanagement.co.uk/feed',
    category: 'HR Policy',
    color: '#0c4a6e',
    geo: '🇬🇧 UK'
  },
  // ──────────────────── 🌍 Globális ────────────────
  {
    name: 'AIHR',
    url: 'https://www.aihr.com/blog/feed/',
    category: 'HR Fejlesztés',
    color: '#0891b2',
    geo: '🌍 Global'
  },
  {
    name: 'Unleash',
    url: 'https://www.unleash.ai/feed/',
    category: 'HR Tech',
    color: '#db2777',
    geo: '🌍 Global'
  },
  {
    name: 'Josh Bersin',
    url: 'https://joshbersin.com/feed/',
    category: 'HR Strategy',
    color: '#92400e',
    geo: '🌍 Global'
  },
  {
    name: 'MIT Sloan',
    url: 'https://sloanreview.mit.edu/feed/',
    category: 'Leadership & Strategy',
    color: '#9f1239',
    geo: '🌍 Global'
  },
  // ──────────────────── 🌏 Ázsia ────────────────────
  {
    name: 'HRM Asia',
    url: 'https://hrmasia.com/feed/',
    category: 'HR News',
    color: '#065f46',
    geo: '🌏 Ázsia'
  },
  {
    name: 'People Matters',
    url: 'https://www.peoplematters.in/rss.xml',
    category: 'HR & People',
    color: '#0f766e',
    geo: '🌏 Ázsia'
  },
  {
    name: 'HR in Asia',
    url: 'https://www.hrinasia.com/feed/',
    category: 'HR News',
    color: '#0d9488',
    geo: '🌏 Ázsia'
  },
  {
    name: 'Human Resources Online',
    url: 'https://www.humanresourcesonline.net/feed/',
    category: 'HR News',
    color: '#0e7490',
    geo: '🌏 Ázsia'
  },
  // ──────────────────── 🇺🇸 USA – extra ────────────────────
  {
    name: 'ERE',
    url: 'https://www.ere.net/feed/',
    category: 'Recruiting',
    color: '#1d4ed8',
    geo: '🇺🇸 USA'
  },
  {
    name: 'TLNT',
    url: 'https://www.tlnt.com/feed/',
    category: 'Talent & HR',
    color: '#2563eb',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Employee Benefit News',
    url: 'https://www.benefitnews.com/feed/',
    category: 'Benefits',
    color: '#0369a1',
    geo: '🇺🇸 USA'
  },
  {
    name: 'Workforce',
    url: 'https://workforce.com/feed/',
    category: 'Workforce Management',
    color: '#0f172a',
    geo: '🇺🇸 USA'
  },
  {
    name: 'HR Brew',
    url: 'https://www.hrbrew.com/feed/',
    category: 'HR News',
    color: '#854d0e',
    geo: '🇺🇸 USA'
  },
  // ──────────────────── 🇪🇺 EU – extra ────────────────────
  {
    name: 'HR Magazine UK',
    url: 'https://www.hrmagazine.co.uk/feed/',
    category: 'HR News',
    color: '#1e3a5f',
    geo: '🇪🇺 EU'
  },
  {
    name: 'HRZone',
    url: 'https://www.hrzone.com/feed/',
    category: 'HR Strategy',
    color: '#6b21a8',
    geo: '🇬🇧 UK'
  },
  // ──────────────────── 🌍 Global – extra ────────────────────
  {
    name: 'HR Technologist',
    url: 'https://www.hrtechnologist.com/feed/',
    category: 'HR Tech',
    color: '#0f766e',
    geo: '🌍 Global'
  },
  // ──────────────────── 🇩🇪 Németország ────────────────────
  {
    name: 'Personalwirtschaft',
    url: 'https://www.personalwirtschaft.de/feed/',
    category: 'HR News',
    color: '#1d4ed8',
    geo: '🇩🇪 Németország'
  },
  {
    name: 'Human Resources Manager',
    url: 'https://www.humanresourcesmanager.de/feed/',
    category: 'HR Strategy',
    color: '#1e40af',
    geo: '🇩🇪 Németország'
  },
  // ──────────────────── 🇦🇹 Ausztria ────────────────────
  {
    name: 'HRweb.at',
    url: 'https://www.hrweb.at/feed/',
    category: 'HR News',
    color: '#dc2626',
    geo: '🇦🇹 Ausztria'
  },
  // ──────────────────── 🇫🇷 Franciaország ────────────────────
  {
    name: 'Parlons RH',
    url: 'https://www.parlonsrh.com/feed/',
    category: 'HR News',
    color: '#2563eb',
    geo: '🇫🇷 Franciaország'
  },
  // ──────────────────── 🇳🇱 Hollandia ────────────────────
  {
    name: 'CHRO.nl',
    url: 'https://chro.nl/feed/',
    category: 'HR Strategy',
    color: '#f97316',
    geo: '🇳🇱 Hollandia'
  },
  // 🇭🇺 Magyar: csak Y2Y (scraper, lásd lent)
  // ─────────────────────────────────────────────────────────
  // Nincs RSS (kézi figyelés szükséges):
  //   CIPD (cipd.co.uk) – csak members area
  //   AHRI (ahri.com.au) – 403 blokkolja
  //   RH Info (rh-info.fr) – nincs feed
  //   McKinsey People & Org – nincs section RSS
  //   Gallup Workplace – nincs feed
  //   China HR Development – nincs feed
  //   Haufe.de/personal – nincs publikus RSS
  //   Personalmagazin.de – RSS scriptek nem érhetők el
  //   HR Grapevine – 403 blokkolja
  //   Equipos y Talento – nincs feed
  //   RRHH Digital – JS-alapú (nem RSS)
  //   Kadry.infor.pl – nincs RSS
  //   HRstandard.pl – connection timeout
  //   Consultancy.eu – 403 blokkolja
  //   Editions Tissot – connection timeout
];

const PROJECT_ROOT = path.join(__dirname, '..');
const RAW_OUTPUT   = path.join(PROJECT_ROOT, 'data', 'raw-new-articles.json');
const NEWS_JSON    = path.join(PROJECT_ROOT, 'public', 'data', 'news.json');

// ─── HTTP GET helper with redirect support ───────────────────────────────────
function httpGet(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 HRNews-Aggregator/1.0 (y2y.hu)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        const next = new URL(res.headers.location, url).href;
        resolve(httpGet(next, maxRedirects - 1));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ─── Extract <meta> content from raw HTML ────────────────────────────────────
function extractMeta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']{1,800})["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']{1,800})["'][^>]+(?:property|name)=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
  }
  return '';
}


// ─── Extract image URL from RSS item ─────────────────────────────────────────
// Sablon/brand OG kepek kizarasa (nem cikk-specifikus kepek)
const TEMPLATE_IMAGE_PATTERNS = [
  'emd_soc_meta_og',  // Gallup template OG
];
function isTemplateImage(url) {
  return url && TEMPLATE_IMAGE_PATTERNS.some(p => url.includes(p));
}
function extractImage(item) {
  const mc = item.media;
  if (mc) {
    const obj = Array.isArray(mc) ? mc[0] : mc;
    const u = obj?.$?.url || obj?.$?.URL;
    if (u && !isTemplateImage(u)) return u;
  }
  const mt = item.mediaThumbnail;
  if (mt) {
    const obj = Array.isArray(mt) ? mt[0] : mt;
    const u = obj?.$?.url;
    if (u && !isTemplateImage(u)) return u;
  }
  if (item.enclosure?.url && (item.enclosure.type || '').startsWith('image/') && !isTemplateImage(item.enclosure.url)) return item.enclosure.url;
  return '';
}

// ─── Scraper config: non-RSS sources ─────────────────────────────────────────
const SCRAPERS = [
  {
    name: 'CIPD',
    category: 'HR Policy',
    color: '#1e3a5f',
    geo: '🇪🇺 EU',
    listingUrl: 'https://www.cipd.org/uk/about/press-releases/',
    urlPattern: /["']((?:https:\/\/www\.cipd\.org)?\/uk\/(?:about\/press-releases|knowledge)\/[a-z0-9][^"'?#\s]{10,})/g,
    baseUrl: 'https://www.cipd.org'
  },
  {
    name: 'McKinsey',
    category: 'HR Strategy',
    color: '#1a365d',
    geo: '🌍 Global',
    listingUrl: 'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights',
    urlPattern: /["']((?:https:\/\/www\.mckinsey\.com)?\/capabilities\/people-and-organizational-performance\/our-insights\/[^"'?#\s]{10,})/g,
    baseUrl: 'https://www.mckinsey.com'
  },
  // Gallup eltávolítva: nincs RSS, template képek, fake timestampok
];

// ─── Generic OG-meta scraper (for non-RSS sources) ───────────────────────────
async function scrapeSource(cfg, existingUrls, twoDaysAgo) {
  const articles = [];
  try {
    process.stdout.write(`Scraping ${cfg.name}... `);
    const html = await httpGet(cfg.listingUrl);

    const urlSet = new Set();
    for (const m of html.matchAll(cfg.urlPattern)) {
      const raw = m[1].split('?')[0].split('#')[0];
      const full = raw.startsWith('http') ? raw : cfg.baseUrl + raw;
      urlSet.add(full);
    }

    const candidates = [...urlSet].filter(u => !existingUrls.has(u)).slice(0, 8);
    process.stdout.write(`(${candidates.length} URL) `);

    for (const url of candidates) {
      try {
        const pageHtml = await httpGet(url);
        const title   = (extractMeta(pageHtml, 'og:title') || extractMeta(pageHtml, 'twitter:title'))
                          .replace(/\s*[|–-]\s*(CIPD|McKinsey|Gallup).*$/i, '').trim();
        const excerpt = (extractMeta(pageHtml, 'og:description') || extractMeta(pageHtml, 'twitter:description'))
                          .substring(0, 600);
        const rawImg  = extractMeta(pageHtml, 'og:image') || extractMeta(pageHtml, 'twitter:image') || '';
        const image   = isTemplateImage(rawImg) ? '' : rawImg;
        const pubStr  = extractMeta(pageHtml, 'article:published_time')
                     || extractMeta(pageHtml, 'og:updated_time') || '';
        if (!title) continue;

        const pubDate = pubStr ? new Date(pubStr) : new Date();
        if (!isNaN(pubDate.getTime()) && pubDate < twoDaysAgo) continue;

        articles.push({
          source:    cfg.name,
          category:  cfg.category,
          color:     cfg.color,
          geo:       cfg.geo,
          title,
          url,
          published: isNaN(pubDate.getTime()) ? new Date().toISOString() : pubDate.toISOString(),
          excerpt,
          image
        });
      } catch { /* skip */ }
    }

    console.log(`✓ (${articles.length} új cikk)`);
  } catch (err) {
    console.log(`✗ hiba: ${err.message}`);
  }
  return articles;
}

// ─── Y2Y blog scraper (mindig megjelenik a legfrissebb 2 cikk) ───────────────
async function scrapeY2Y(existingUrls) {
  const articles = [];
  try {
    process.stdout.write('Scraping Y2Y blog... ');

    const blogHtml = await httpGet('https://www.y2y.hu/blog');

    // y2y.hu uses /blog/<slug> URLs (server-side PHP, not Wix)
    const urlSet = new Set();
    for (const m of blogHtml.matchAll(/href="(https?:\/\/(?:www\.)?y2y\.hu\/blog\/[^"?#\s]{3,})"/g))
      urlSet.add(m[1].split('?')[0].split('#')[0]);

    const foundUrls = [...urlSet];
    process.stdout.write(`(${foundUrls.length} URL) `);

    // Fetch OG meta from each post, sort by date, always include the 2 newest
    const candidates = [];
    for (const postUrl of foundUrls.slice(0, 12)) {
      try {
        const postHtml  = await httpGet(postUrl);
        const title     = (extractMeta(postHtml, 'og:title') || extractMeta(postHtml, 'twitter:title'))
                            .replace(/\s*[|–-]\s*Y2Y.*$/i, '').trim();
        const excerpt   = (extractMeta(postHtml, 'og:description') || extractMeta(postHtml, 'twitter:description'))
                            .substring(0, 600);
        const image     = extractMeta(postHtml, 'og:image') || extractMeta(postHtml, 'twitter:image') || '';
        const published = extractMeta(postHtml, 'article:published_time')
                       || extractMeta(postHtml, 'og:updated_time')
                       || new Date().toISOString();
        if (!title) continue;
        candidates.push({ postUrl, title, excerpt, image, published });
      } catch { /* skip */ }
    }

    // Sort newest first
    candidates.sort((a, b) => new Date(b.published) - new Date(a.published));

    // Always include the newest 1 Y2Y article
    for (let i = 0; i < candidates.length; i++) {
      const { postUrl, title, excerpt, image, published } = candidates[i];
      if (i >= 1) break;
      articles.push({
        source: 'Y2Y',
        category: 'Y2Y Blog',
        color: '#DED114',
        geo: '🇭🇺 Magyar',
        title,
        url: postUrl,
        published: new Date(published).toISOString(),
        excerpt,
        image
      });
    }

    console.log(`✓ (${articles.length} Y2Y cikk)`);
  } catch (err) {
    console.log(`✗ Y2Y hiba: ${err.message}`);
  }
  return articles;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function fetchRSSFeeds() {
  const parser = new Parser({
    timeout: 15000,
    headers: { 'User-Agent': 'HRNews-Aggregator/1.0 (y2y.hu)' },
    customFields: {
      item: [
        ['media:content', 'media'],
        ['media:thumbnail', 'mediaThumbnail'],
        ['content:encoded', 'contentEncoded']
      ]
    }
  });

  // Load existing article URLs to avoid duplicates
  let existingUrls = new Set();
  try {
    const existing = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
    existingUrls = new Set((existing.articles || []).map(a => a.url));
  } catch { /* first run */ }

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const allFetched  = [];
  const newArticles = [];

  // ── RSS feeds ──────────────────────────────────────────────────────────────
  for (const feed of FEEDS) {
    try {
      process.stdout.write(`Fetching ${feed.name}... `);
      const parsed = await parser.parseURL(feed.url);

      for (const item of (parsed.items || []).slice(0, 15)) {
        const pubDate = new Date(item.isoDate || item.pubDate || Date.now());
        if (pubDate < twoDaysAgo) continue;

        const url = item.link || item.guid || '';
        if (!url) continue;

        const excerpt = (
          item.contentSnippet ||
          item.contentEncoded ||
          item.content ||
          item.summary ||
          ''
        )
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 600);

        const article = {
          source:    feed.name,
          category:  feed.category,
          color:     feed.color,
          geo:       feed.geo,
          title:     item.title?.trim(),
          url,
          published: item.isoDate || item.pubDate,
          excerpt,
          image: extractImage(item)
        };

        allFetched.push(article);
        if (!existingUrls.has(url)) newArticles.push(article);
      }

      console.log(`✓ (${allFetched.filter(a => a.source === feed.name).length} found)`);
    } catch (err) {
      console.log(`✗ HIBA: ${err.message}`);
    }
  }

  // ── OG image backfill for new RSS articles without images ─────────────────
  const needImg = newArticles.filter(a => !a.image && a.url && a.url.startsWith('http'));
  if (needImg.length) {
    process.stdout.write(`\nFetching OG images for ${needImg.length} new articles... `);
    let imgFound = 0;
    async function fetchOgImage(article) {
      try {
        const html = await httpGet(article.url);
        const rawImg = extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image') || '';
        const img = isTemplateImage(rawImg) ? '' : rawImg;
        if (img) {
          // Fix relative URLs (e.g. HBR)
          article.image = img.startsWith('/') ? new URL(img, article.url).href : img;
          imgFound++;
        }
      } catch { /* skip */ }
    }
    // Concurrency limit: 5
    let idx = 0;
    async function worker() {
      while (idx < needImg.length) { await fetchOgImage(needImg[idx++]); }
    }
    await Promise.all(Array.from({ length: Math.min(5, needImg.length) }, worker));
    console.log(`✓ (${imgFound} kép)`);
  }

  // ── Non-RSS scrapers (CIPD, McKinsey, Gallup…) ────────────────────────────
  for (const cfg of SCRAPERS) {
    const scraped = await scrapeSource(cfg, existingUrls, twoDaysAgo);
    newArticles.push(...scraped);
  }

  // ── Y2Y scraper (always shows 2 newest regardless of age) ─────────────────
  const y2yArticles = await scrapeY2Y(existingUrls);
  newArticles.push(...y2yArticles);

  fs.writeFileSync(RAW_OUTPUT, JSON.stringify({
    fetchedAt:    new Date().toISOString(),
    totalFetched: allFetched.length,
    newCount:     newArticles.length,
    articles:     newArticles
  }, null, 2));

  // Mindig frissítjük a lastUpdated-et news.json-ban, még ha nincs is új cikk
  try {
    const newsData = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
    newsData.lastUpdated = new Date().toISOString();
    fs.writeFileSync(NEWS_JSON, JSON.stringify(newsData, null, 2));
    console.log(`🕐 lastUpdated frissítve: ${newsData.lastUpdated}`);
  } catch (e) {
    console.warn('lastUpdated frissítés sikertelen:', e.message);
  }

  console.log(`\n✅ Kész. ${newArticles.length} új cikk (${allFetched.length} összesen).`);
  console.log(`📄 Mentve: ${RAW_OUTPUT}`);
  return newArticles.length;
}

fetchRSSFeeds().catch(err => {
  console.error('Fetch hiba:', err);
  process.exit(1);
});
