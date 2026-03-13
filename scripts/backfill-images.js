#!/usr/bin/env node
/**
 * Backfill OG images for articles that currently have no image.
 * Fetches each article page and extracts og:image / twitter:image.
 * Concurrency limit: 5 parallel requests.
 */
const fs    = require('fs');
const path  = require('path');
const https = require('https');
const http  = require('http');

const NEWS_JSON = path.join(__dirname, '../public/data/news.json');

// ─── HTTP GET helper ───────────────────────────────────────────────────────────
function httpGet(url, maxRedirects = 4) {
  return new Promise((resolve, reject) => {
    let parsed;
    try { parsed = new URL(url); } catch { return reject(new Error('bad url')); }
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HRNews/1.0; +https://y2y.hu)',
        'Accept': 'text/html,*/*;q=0.8'
      },
      timeout: 12000
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        const next = new URL(res.headers.location, url).href;
        return resolve(httpGet(next, maxRedirects - 1));
      }
      const chunks = [];
      // Only read first 100KB — enough for <head>
      let size = 0;
      res.on('data', chunk => {
        chunks.push(chunk);
        size += chunk.length;
        if (size > 100_000) req.destroy();
      });
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('close', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ─── Extract <meta> content ───────────────────────────────────────────────────
function extractMeta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']{1,800})["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']{1,800})["'][^>]+(?:property|name)=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
  }
  return '';
}

const TEMPLATE_IMAGE_PATTERNS = ['emd_soc_meta_og'];
function isTemplateImage(url) {
  return url && TEMPLATE_IMAGE_PATTERNS.some(p => url.includes(p));
}

// ─── Concurrency limiter ──────────────────────────────────────────────────────
async function withConcurrency(tasks, limit) {
  const results = [];
  let i = 0;
  async function run() {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  }
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, run);
  await Promise.all(workers);
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const data = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
  const articles = data.articles;

  const toFetch = articles.filter(a => !a.image);
  console.log(`Fetching OG images for ${toFetch.length} articles (limit 5 parallel)...\n`);

  let updated = 0;
  const tasks = toFetch.map(article => async () => {
    try {
      const html  = await httpGet(article.url);
      const rawImg = extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image') || '';
      const img    = isTemplateImage(rawImg) ? '' : rawImg;
      if (img) {
        article.image = img;
        updated++;
        console.log(`✓ ${article.source}: ${img.substring(0, 70)}`);
      } else {
        process.stdout.write('.');
      }
    } catch {
      process.stdout.write('x');
    }
  });

  await withConcurrency(tasks, 5);

  console.log(`\n\nUpdated ${updated} / ${toFetch.length} articles with images.`);

  data.articles = articles;
  fs.writeFileSync(NEWS_JSON, JSON.stringify(data, null, 2));
  console.log('✅ news.json saved.');
}

main().catch(err => { console.error(err); process.exit(1); });
