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
    geo: '🇪🇺 EU'
  },
  {
    name: 'People Management',
    url: 'https://www.peoplemanagement.co.uk/feed',
    category: 'HR Policy',
    color: '#0c4a6e',
    geo: '🇪🇺 EU'
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
  // 🇭🇺 Magyar: csak Y2Y (scraper, lásd lent)
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
function extractImage(item) {
  const mc = item.media;
  if (mc) {
    const obj = Array.isArray(mc) ? mc[0] : mc;
    const u = obj?.$?.url || obj?.$?.URL;
    if (u) return u;
  }
  const mt = item.mediaThumbnail;
  if (mt) {
    const obj = Array.isArray(mt) ? mt[0] : mt;
    const u = obj?.$?.url;
    if (u) return u;
  }
  if (item.enclosure?.url && (item.enclosure.type || '').startsWith('image/')) return item.enclosure.url;
  return '';
}

// ─── Y2Y blog scraper ─────────────────────────────────────────────────────────
async function scrapeY2Y(existingUrls, twoDaysAgo) {
  const articles = [];
  try {
    process.stdout.write('Scraping Y2Y blog... ');

    // Fetch blog page and look for /post/ URLs embedded in the HTML
    const blogHtml = await httpGet('https://www.y2y.hu/blog');

    // Match absolute URLs with /post/ path
    const urlSet = new Set();
    for (const m of blogHtml.matchAll(/["'](https?:\/\/(?:www\.)?y2y\.hu\/post\/[^"'?#\s]+)/g)) {
      urlSet.add(m[1].split('?')[0].split('#')[0]);
    }
    // Also try relative /post/ paths
    for (const m of blogHtml.matchAll(/["'](\/post\/[^"'?#\s]+)/g)) {
      urlSet.add('https://www.y2y.hu' + m[1].split('?')[0].split('#')[0]);
    }

    const foundUrls = [...urlSet];
    process.stdout.write(`(${foundUrls.length} URL) `);

    // For each post page, extract OG meta tags
    for (const postUrl of foundUrls.slice(0, 12)) {
      try {
        if (existingUrls.has(postUrl)) continue;

        const postHtml = await httpGet(postUrl);

        const title     = (extractMeta(postHtml, 'og:title') || extractMeta(postHtml, 'twitter:title'))
                            .replace(/\s*[|–-]\s*Y2Y.*$/i, '').trim();
        const excerpt   = (extractMeta(postHtml, 'og:description') || extractMeta(postHtml, 'twitter:description'))
                            .substring(0, 600);
        const image     = extractMeta(postHtml, 'og:image') || extractMeta(postHtml, 'twitter:image') || '';
        const published = extractMeta(postHtml, 'article:published_time')
                       || extractMeta(postHtml, 'og:updated_time')
                       || new Date().toISOString();

        if (!title) continue;

        const pubDate = new Date(published);
        if (isNaN(pubDate) || pubDate < twoDaysAgo) continue;

        articles.push({
          source: 'Y2Y',
          category: 'Y2Y Blog',
          color: '#b45309',
          geo: '🇪🇺 EU',
          title,
          url: postUrl,
          published: pubDate.toISOString(),
          excerpt,
          image
        });
      } catch { /* skip this post */ }
    }

    console.log(`✓ (${articles.length} új Y2Y cikk)`);
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

  // ── Y2Y scraper ────────────────────────────────────────────────────────────
  const y2yArticles = await scrapeY2Y(existingUrls, twoDaysAgo);
  newArticles.push(...y2yArticles);

  fs.writeFileSync(RAW_OUTPUT, JSON.stringify({
    fetchedAt:    new Date().toISOString(),
    totalFetched: allFetched.length,
    newCount:     newArticles.length,
    articles:     newArticles
  }, null, 2));

  console.log(`\n✅ Kész. ${newArticles.length} új cikk (${allFetched.length} összesen).`);
  console.log(`📄 Mentve: ${RAW_OUTPUT}`);
  return newArticles.length;
}

fetchRSSFeeds().catch(err => {
  console.error('Fetch hiba:', err);
  process.exit(1);
});
