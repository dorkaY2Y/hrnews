#!/usr/bin/env node
/**
 * HR News RSS Fetcher
 * Fetches latest articles from HR sources, saves raw data for Claude to summarize.
 *
 * RSS feed URLs - verify these if a source stops working:
 *   SHRM HR Mag:    https://rss.shrm.org/hrmagazine
 *   HBR:            http://feeds.hbr.org/harvardbusiness  (HTTP not HTTPS)
 *   HR Dive:        https://www.hrdive.com/feeds/news/
 *   Flex Index:     https://flexindex.substack.com/feed
 *   WorkLife.news:  https://www.worklife.news/feed/
 *   Y2Y English:    no RSS feed detected; add articles manually if needed
 *
 * Add new feeds: copy any block in FEEDS and fill in name/url/category.
 */

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const FEEDS = [
  {
    name: 'SHRM',
    url: 'https://rss.shrm.org/hrmagazine',
    category: 'HR Policy',
    color: '#b91c1c'
  },
  {
    name: 'Harvard Business Review',
    url: 'http://feeds.hbr.org/harvardbusiness',
    category: 'Leadership',
    color: '#991b1b'
  },
  {
    name: 'HR Dive',
    url: 'https://www.hrdive.com/feeds/news/',
    category: 'HR News',
    color: '#0369a1'
  },
  {
    name: 'Flex Index',
    url: 'https://flexindex.substack.com/feed',
    category: 'Flex & Remote Work',
    color: '#6d28d9'
  },
  {
    name: 'WorkLife',
    url: 'https://www.worklife.news/feed/',
    category: 'Future of Work',
    color: '#047857'
  },
  // Y2Y: no RSS feed detected on y2y.hu/en – add articles manually when needed
  // { name: 'Y2Y', url: 'https://www.y2y.hu/en/feed', category: 'Y2Y Blog', color: '#b45309' }
];

const PROJECT_ROOT = path.join(__dirname, '..');
const RAW_OUTPUT   = path.join(PROJECT_ROOT, 'data', 'raw-new-articles.json');
const NEWS_JSON    = path.join(PROJECT_ROOT, 'public', 'data', 'news.json');

async function fetchRSSFeeds() {
  const parser = new Parser({
    timeout: 15000,
    headers: { 'User-Agent': 'HRNews-Aggregator/1.0 (y2y.hu)' },
    customFields: {
      item: [['media:content', 'media'], ['content:encoded', 'contentEncoded']]
    }
  });

  // Load existing article URLs to avoid duplicates
  let existingUrls = new Set();
  try {
    const existing = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
    existingUrls = new Set((existing.articles || []).map(a => a.url));
  } catch { /* first run */ }

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const allFetched = [];
  const newArticles = [];

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
          .replace(/<[^>]*>/g, '')   // strip HTML tags
          .replace(/\s+/g, ' ')      // normalize whitespace
          .trim()
          .substring(0, 600);

        allFetched.push({ source: feed.name, category: feed.category, color: feed.color, title: item.title?.trim(), url, published: item.isoDate || item.pubDate, excerpt });

        if (!existingUrls.has(url)) {
          newArticles.push({ source: feed.name, category: feed.category, color: feed.color, title: item.title?.trim(), url, published: item.isoDate || item.pubDate, excerpt });
        }
      }

      console.log(`✓ (${allFetched.filter(a => a.source === feed.name).length} found)`);
    } catch (err) {
      console.log(`✗ HIBA: ${err.message}`);
    }
  }

  fs.writeFileSync(RAW_OUTPUT, JSON.stringify({
    fetchedAt: new Date().toISOString(),
    totalFetched: allFetched.length,
    newCount: newArticles.length,
    articles: newArticles
  }, null, 2));

  console.log(`\n✅ Kész. ${newArticles.length} új cikk (${allFetched.length} összesen).`);
  console.log(`📄 Mentve: ${RAW_OUTPUT}`);
  return newArticles.length;
}

fetchRSSFeeds().catch(err => {
  console.error('Fetch hiba:', err);
  process.exit(1);
});
