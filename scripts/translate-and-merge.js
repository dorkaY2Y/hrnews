#!/usr/bin/env node
/**
 * translate-and-merge.js
 * Reads raw-new-articles.json, generates Hungarian titles + summaries via Claude API,
 * and merges them into public/data/news.json.
 *
 * Requires: ANTHROPIC_API_KEY env var
 * Usage:    node scripts/translate-and-merge.js
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

const RAW_PATH  = path.join(__dirname, '..', 'data', 'raw-new-articles.json');
const NEWS_PATH = path.join(__dirname, '..', 'public', 'data', 'news.json');
const API_KEY   = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY env var is required');
  process.exit(1);
}

// ── Claude API call ──────────────────────────────────────────────────────────

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    });

    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content?.[0]?.text || '');
        } catch (e) { reject(e); }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Translate a batch of articles ────────────────────────────────────────────

async function translateBatch(articles) {
  const list = articles.map((a, i) =>
    `${i + 1}. "${a.title}" (${a.source}) — ${a.excerpt?.slice(0, 200) || 'no excerpt'}`
  ).join('\n');

  const prompt = `Te egy magyar HR-szakértő vagy. Az alábbi angol nyelvű HR/üzleti cikkekhez adj magyar címet (title_hu) és egy 2-3 mondatos magyar összefoglalót (summary_hu). Az összefoglaló legyen informatív, szakmai és tömör.

Cikkek:
${list}

Válaszolj KIZÁRÓLAG valid JSON array formátumban, más szöveget NE írj. Minden elem: {"index": <szám>, "title_hu": "...", "summary_hu": "..."}
A szám az 1-től induló sorszám.`;

  const response = await callClaude(prompt);

  // Extract JSON from response (might be wrapped in markdown code block)
  const jsonMatch = response.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error('⚠️  Could not parse translation response');
    return [];
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('⚠️  JSON parse error:', e.message);
    return [];
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Read raw articles
  if (!fs.existsSync(RAW_PATH)) {
    console.log('ℹ️  No raw-new-articles.json found, nothing to do.');
    process.exit(0);
  }

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  if (!raw.articles || raw.articles.length === 0) {
    console.log('ℹ️  No new articles to process.');
    process.exit(0);
  }

  // Read existing news
  const existing = JSON.parse(fs.readFileSync(NEWS_PATH, 'utf8'));
  const existingUrls = new Set(existing.articles.map(a => a.url));

  // Filter out duplicates
  const newArticles = raw.articles.filter(a => !existingUrls.has(a.url));
  if (newArticles.length === 0) {
    console.log('ℹ️  All articles already exist in news.json.');
    existing.lastUpdated = new Date().toISOString();
    fs.writeFileSync(NEWS_PATH, JSON.stringify(existing, null, 2));
    process.exit(0);
  }

  console.log(`📝 Translating ${newArticles.length} new articles...`);

  // Process in batches of 10 (to stay within token limits)
  const BATCH_SIZE = 10;
  const translations = [];

  for (let i = 0; i < newArticles.length; i += BATCH_SIZE) {
    const batch = newArticles.slice(i, i + BATCH_SIZE);
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(newArticles.length / BATCH_SIZE)} (${batch.length} articles)...`);

    const result = await translateBatch(batch);

    // Map translations back to articles
    for (const t of result) {
      const idx = (i + t.index - 1);  // Convert 1-based batch index to global index
      if (idx >= 0 && idx < newArticles.length) {
        translations[idx] = t;
      }
    }
  }

  // Build final articles
  const now = Date.now();
  const addedAt = new Date().toISOString();
  const finalArticles = newArticles.map((a, i) => {
    const t = translations[i] || {};
    return {
      source:     a.source,
      category:   a.category,
      color:      a.color || '#c9a84c',
      geo:        a.geo,
      title:      a.title,
      title_hu:   t.title_hu || a.title,
      url:        a.url,
      published:  a.published,
      excerpt:    a.excerpt || '',
      image:      a.image || '',
      summary_hu: t.summary_hu || '',
      id:         `${Date.parse(a.published) || now}_${Math.floor(Math.random() * 9000 + 1000)}`,
      addedAt
    };
  });

  // Merge: new articles first, then existing, filter to 30-day window
  const cutoff = new Date(Date.now() - 30 * 24 * 3600 * 1000);
  const merged = [...finalArticles, ...existing.articles]
    .filter(a => !a.published || new Date(a.published) > cutoff);

  const output = {
    lastUpdated: new Date().toISOString(),
    articles: merged
  };

  fs.writeFileSync(NEWS_PATH, JSON.stringify(output, null, 2));
  console.log(`✅ news.json frissítve: ${merged.length} cikk (${finalArticles.length} új)`);
}

main().catch(err => {
  console.error('❌ Hiba:', err);
  process.exit(1);
});
