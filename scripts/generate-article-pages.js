#!/usr/bin/env node
/**
 * generate-article-pages.js
 * Minden cikkhez:
 *   1. Composite OG kép: cikk képe (1200x630) + up2date branding sáv alul
 *      → public/og/[slug].jpg
 *   2. /article/[slug]/index.html  saját OG tag-ekkel
 *      → Facebook ezt scrapeeli, látogató a főoldalra kerül
 *
 * Futtatás: node scripts/generate-article-pages.js
 */

const fs   = require('fs');
const path = require('path');
const http  = require('http');
const https = require('https');
const Jimp  = require('jimp');

const SITE_URL      = 'https://up2date.hu';
const DEFAULT_IMAGE = path.join(__dirname, '../public/og-image.png');
const NEWS_PATH     = path.join(__dirname, '../public/data/news.json');
const ARTICLE_DIR   = path.join(__dirname, '../public/article');
const OG_DIR        = path.join(__dirname, '../public/og');
const LOGO_PATH     = path.join(__dirname, '../public/y2y_logo.png');

const OG_W = 1200, OG_H = 630;
const BAR_H = 110; // branding sáv magassága (pixel)

// Ugyanaz a hash-függvény mint az app.js-ben
function articleSlug(url) {
  let h = 5381;
  for (let i = 0; i < url.length; i++) {
    h = (((h << 5) + h) ^ url.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

function esc(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Kép letöltése bufferbe (redirectet követ, custom UA)
function downloadBuffer(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (!url || redirects === 0) return reject(new Error('no url or too many redirects'));
    let parsedUrl;
    try { parsedUrl = new URL(url); } catch(e) { return reject(e); }
    const proto = parsedUrl.protocol === 'https:' ? https : http;
    const req = proto.get({
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || undefined,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; up2date-og/1.0)',
        'Accept': 'image/*,*/*'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : parsedUrl.origin + res.headers.location;
        res.resume();
        return downloadBuffer(next, redirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// Composite OG kép generálása
async function generateOgImage(article, slug) {
  const outPath = path.join(OG_DIR, slug + '.jpg');
  if (fs.existsSync(outPath)) return '/og/' + slug + '.jpg'; // már kész

  let img;
  try {
    if (article.image) {
      const buf = await downloadBuffer(article.image);
      img = await Jimp.read(buf);
    }
  } catch (e) {
    // fallback: default og-image
  }
  if (!img) {
    try { img = await Jimp.read(DEFAULT_IMAGE); } catch(e) { return null; }
  }

  // Cover crop 1200x630
  img.cover(OG_W, OG_H);

  // Sötét gradient sáv az alsó BAR_H pixelben
  const barTop = OG_H - BAR_H;
  img.scan(0, barTop, OG_W, BAR_H, function(x, y, idx) {
    const t = (y - barTop) / BAR_H; // 0 = teteje, 1 = alja
    const opacity = 0.35 + t * 0.60; // 0.35 → 0.95
    this.bitmap.data[idx]   = Math.round(this.bitmap.data[idx]   * (1 - opacity));
    this.bitmap.data[idx+1] = Math.round(this.bitmap.data[idx+1] * (1 - opacity));
    this.bitmap.data[idx+2] = Math.round(this.bitmap.data[idx+2] * (1 - opacity));
  });

  // Y2Y logó
  try {
    const logo = await Jimp.read(LOGO_PATH);
    logo.resize(72, 72);
    img.composite(logo, 28, barTop + 19);
  } catch(e) { /* logó nélkül is ok */ }

  // "up2date by Y2Y" szöveg
  try {
    const f32 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    img.print(f32, 116, barTop + 22, 'up2date by Y2Y');
    const f16 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    img.print(f16, 116, barTop + 64, 'Globális HR hírek magyarul · up2date.hu');
  } catch(e) { /* font hiba esetén szöveg nélkül */ }

  await img.quality(88).writeAsync(outPath);
  return '/og/' + slug + '.jpg';
}

// Article HTML oldal
function generatePageHtml(article, slug, ogImagePath) {
  const title   = esc(article.title_hu || article.title || 'HR hír');
  const desc    = esc((article.summary_hu || article.excerpt || '').slice(0, 300));
  const image   = ogImagePath ? esc(SITE_URL + ogImagePath) : esc(SITE_URL + '/og-image.png');
  const pageUrl = SITE_URL + '/article/' + slug;
  const srcUrl  = esc(article.url || SITE_URL);

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <title>${title} — up2date by Y2Y</title>

  <!-- Open Graph (Facebook, Messenger, LinkedIn) -->
  <meta property="og:type"         content="article">
  <meta property="og:site_name"    content="up2date by Y2Y">
  <meta property="og:title"        content="${title}">
  <meta property="og:description"  content="${desc}">
  <meta property="og:image"        content="${image}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url"          content="${pageUrl}">
  <meta property="og:locale"       content="hu_HU">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image"       content="${image}">

  <meta http-equiv="refresh" content="0; url=${SITE_URL}/">
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <script>window.location.replace('${SITE_URL}/');</script>
  <p>Átirányítás... <a href="${SITE_URL}/">up2date by Y2Y</a></p>
</body>
</html>`;
}

// --- Main ---
async function main() {
  const data     = JSON.parse(fs.readFileSync(NEWS_PATH, 'utf8'));
  const articles = data.articles || [];

  // Mappák
  if (fs.existsSync(ARTICLE_DIR)) fs.rmSync(ARTICLE_DIR, { recursive: true });
  fs.mkdirSync(ARTICLE_DIR, { recursive: true });
  fs.mkdirSync(OG_DIR, { recursive: true });

  console.log(`Generálás: ${articles.length} cikk...`);

  // OG képek párhuzamosan (max 4 egyszerre)
  const CONCURRENCY = 4;
  const slugs = articles.map(a => articleSlug(a.url || ''));
  const ogPaths = new Array(articles.length).fill(null);

  for (let i = 0; i < articles.length; i += CONCURRENCY) {
    const batch = articles.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((a, j) => generateOgImage(a, slugs[i + j]).catch(() => null))
    );
    results.forEach((r, j) => { ogPaths[i + j] = r; });
    process.stdout.write(`  ${Math.min(i + CONCURRENCY, articles.length)}/${articles.length} kép\r`);
  }
  console.log(`\n✓ OG képek: public/og/`);

  // HTML oldalak
  for (let i = 0; i < articles.length; i++) {
    const slug = slugs[i];
    const dir  = path.join(ARTICLE_DIR, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), generatePageHtml(articles[i], slug, ogPaths[i]), 'utf8');
  }
  console.log(`✓ Article oldalak: public/article/`);
  console.log(`✅ Kész — ${articles.length} cikk`);
}

main().catch(err => { console.error(err); process.exit(1); });
