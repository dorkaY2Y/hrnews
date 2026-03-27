#!/usr/bin/env node
/**
 * generate-article-pages.js
 * Minden cikkhez generál egy /article/[slug]/index.html oldalt
 * saját OG tag-ekkel (cikk képe, title_hu, summary_hu).
 * A Facebook ezt scrapeeli, a látogató átirányítódik a főoldalra.
 *
 * Futtatás: node scripts/generate-article-pages.js
 */

const fs   = require('fs');
const path = require('path');

const SITE_URL      = 'https://up2date.hu';
const DEFAULT_IMAGE = SITE_URL + '/og-image.png';
const NEWS_PATH     = path.join(__dirname, '../public/data/news.json');
const OUT_DIR       = path.join(__dirname, '../public/article');

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

function generatePage(article) {
  const slug    = articleSlug(article.url || '');
  const title   = esc(article.title_hu || article.title || 'HR hír');
  const desc    = esc((article.summary_hu || article.excerpt || '').slice(0, 300));
  const image   = esc(article.image || DEFAULT_IMAGE);
  const pageUrl = SITE_URL + '/article/' + slug;
  const srcUrl  = esc(article.url || SITE_URL);

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <title>${title} — up2date by Y2Y</title>

  <!-- Open Graph (Facebook, Messenger) -->
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

  <!-- Redirect to main site after Facebook scraping -->
  <meta http-equiv="refresh" content="0; url=${SITE_URL}/">
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <script>window.location.replace('${SITE_URL}/');</script>
  <p>Átirányítás az up2date főoldalára... <a href="${SITE_URL}/">Kattints ide</a></p>
  <p>Forrás: <a href="${srcUrl}">${srcUrl}</a></p>
</body>
</html>`;
}

// --- Main ---
const data     = JSON.parse(fs.readFileSync(NEWS_PATH, 'utf8'));
const articles = data.articles || [];

// Töröljük a régi article oldalakat
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const article of articles) {
  if (!article.url) continue;
  const slug    = articleSlug(article.url);
  const dir     = path.join(OUT_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generatePage(article), 'utf8');
  count++;
}

console.log(`✓ ${count} article oldal generálva -> public/article/`);
