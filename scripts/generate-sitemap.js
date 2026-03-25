#!/usr/bin/env node
// generate-sitemap.js — Sitemap generálás news.json alapján
// Futtatás: node generate-sitemap.js
// Kimenet: /public/sitemap.xml

const fs = require('fs');
const path = require('path');

const NEWS_JSON = path.join(__dirname, '../public/data/news.json');
const SITEMAP_OUT = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://up2date.hu';

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const data = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
const articles = data.articles || [];
const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: `${BASE_URL}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
  { loc: `${BASE_URL}/impresszum.html`, lastmod: '2026-03-01', changefreq: 'yearly', priority: '0.3' },
];

const articleUrls = articles.map(a => {
  const articleDate = (a.addedAt || a.published || today).slice(0, 10);
  return {
    loc: `${BASE_URL}/article?u=${encodeURIComponent(a.url)}`,
    lastmod: articleDate,
    changefreq: 'never',
    priority: '0.7',
  };
});

const allUrls = [...staticUrls, ...articleUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP_OUT, xml, 'utf8');
console.log(`✅ sitemap.xml generálva: ${allUrls.length} URL (${articleUrls.length} cikk)`);
