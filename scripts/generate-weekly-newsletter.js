#!/usr/bin/env node
/**
 * up2date Heti Hírlevel Generátor
 *
 * Használat:
 *   node scripts/generate-weekly-newsletter.js
 *
 * Kimenet: weekly-newsletter-YYYY-MM-DD.html a /public/newsletters/ mappában
 *
 * A generált HTML-t elküldheted:
 *   - Resend API-val (ha van API key)
 *   - MailChimp import-tal
 *   - Bármely email kliensből copy-paste-tel
 */

const fs   = require('fs');
const path = require('path');

const NEWS_JSON   = path.join(__dirname, '../public/data/news.json');
const OUT_DIR     = path.join(__dirname, '../public/newsletters');
const BRAND_COLOR = '#00C8FF';
const BRAND_BG    = '#04080F';

// ─── Konfiguráció ─────────────────────────────────────────────────────────
const TOP_N  = 6;    // hány cikket vegyen be
const DAYS   = 7;    // hány napos időablak

// ─── Cikkek betöltése ─────────────────────────────────────────────────────
if (!fs.existsSync(NEWS_JSON)) {
  console.error('news.json nem található:', NEWS_JSON);
  process.exit(1);
}

const data    = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
const now     = Date.now();
const cutoff  = now - DAYS * 24 * 3600 * 1000;

const recent = (data.articles || [])
  .filter(a => {
    const d = new Date(a.published || a.addedAt || 0).getTime();
    return d >= cutoff && a.source && !a.isQA;
  })
  .sort((a, b) => new Date(b.published) - new Date(a.published));

// Diverzitás: max 1 cikk ugyanabból a forrásból
const seen  = new Set();
const top   = [];
for (const a of recent) {
  if (top.length >= TOP_N) break;
  const src = (a.source || '').toLowerCase();
  if (!seen.has(src)) {
    seen.add(src);
    top.push(a);
  }
}

if (!top.length) {
  console.log('Nincs elég friss cikk az elmúlt', DAYS, 'napból.');
  process.exit(0);
}

// ─── HTML template ─────────────────────────────────────────────────────────
const dateStr  = new Date().toLocaleDateString('hu-HU', { year:'numeric', month:'long', day:'numeric' });
const weekNum  = Math.ceil((new Date().getDate() + new Date(new Date().setDate(1)).getDay()) / 7);

function articleBlock(a) {
  const title   = a.title_hu || a.title || '';
  const summary = a.summary_hu || a.excerpt || '';
  const img     = a.image ? `<img src="${a.image}" alt="${title}" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;display:block;margin-bottom:14px;">` : '';
  const flag    = (a.geo || '').split(' ')[0] || '';

  return `
    <div style="background:#0d1520;border-radius:12px;padding:20px 22px;margin-bottom:20px;border-left:4px solid ${BRAND_COLOR};">
      ${img}
      <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">
        ${flag} ${a.source || ''} &nbsp;·&nbsp; ${a.category || ''} &nbsp;·&nbsp; ${a.geo ? a.geo.replace(/^\S+\s/, '') : ''}
      </div>
      <h2 style="font-size:17px;font-weight:700;color:#f4f1ec;margin:0 0 10px;line-height:1.4;">
        <a href="${a.url}" style="color:#f4f1ec;text-decoration:none;">${title}</a>
      </h2>
      <p style="font-size:14px;color:#aaa;line-height:1.7;margin:0 0 14px;">${summary}</p>
      <a href="${a.url}" style="display:inline-block;font-size:12px;font-weight:700;color:${BRAND_COLOR};text-decoration:none;border:1px solid rgba(0,200,255,0.4);border-radius:6px;padding:5px 12px;">
        Teljes cikk →
      </a>
    </div>`;
}

const html = `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>up2date Heti Összefoglaló – ${dateStr}</title>
</head>
<body style="margin:0;padding:0;background:#1a2332;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:${BRAND_BG};">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0d1520 0%,#162236 100%);padding:36px 32px 28px;border-bottom:1px solid rgba(0,200,255,0.15);">
      <div style="font-size:24px;font-weight:900;color:${BRAND_COLOR};letter-spacing:-0.5px;margin-bottom:4px;">
        up2date
      </div>
      <div style="font-size:12px;color:#888;letter-spacing:0.1em;text-transform:uppercase;">by Y2Y Ltd.</div>
      <h1 style="font-size:20px;font-weight:700;color:#f4f1ec;margin:20px 0 6px;line-height:1.3;">
        🗞 Heti HR Összefoglaló
      </h1>
      <p style="font-size:14px;color:#888;margin:0;">${dateStr} · Top ${TOP_N} cikk az elmúlt ${DAYS} napból</p>
    </div>

    <!-- Articles -->
    <div style="padding:28px 32px;">
      ${top.map(articleBlock).join('')}
    </div>

    <!-- Footer -->
    <div style="background:#0d1520;padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
      <p style="font-size:13px;color:#888;margin:0 0 10px;">
        <a href="https://up2date.hu" style="color:${BRAND_COLOR};text-decoration:none;font-weight:700;">up2date.hu</a>
        &nbsp;·&nbsp; Napi HR hírek 20+ forrásból &nbsp;·&nbsp; Magyar összefoglalókkal
      </p>
      <p style="font-size:11px;color:#555;margin:0;">
        Leiratkozás: válaszolj erre az emailre „leiratkozás" szóval
        &nbsp;·&nbsp; Y2Y Ltd., Budapest
      </p>
    </div>

  </div>
</body>
</html>`;

// ─── Mentés ────────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const today    = new Date().toISOString().slice(0, 10);
const outFile  = path.join(OUT_DIR, `weekly-newsletter-${today}.html`);
fs.writeFileSync(outFile, html);

console.log(`✅ Hírlevel generálva: ${outFile}`);
console.log(`📧 ${top.length} cikk benne (${DAYS} napos ablak, max ${TOP_N} forrás)`);
console.log('');
console.log('Következő lépések:');
console.log('  1. Nyisd meg a fájlt böngészőben: file://' + outFile);
console.log('  2. Ellenőrizd + szerkeszd ha kell');
console.log('  3. Küld el Resend-del: RESEND_API_KEY szükséges');
console.log('     node scripts/send-newsletter.js ' + outFile);
