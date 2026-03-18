const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'up2date-article/1.0' } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(e); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

exports.handler = async (event) => {
  const srcUrl = event.queryStringParameters && event.queryStringParameters.u;

  // No ?u= param → redirect to homepage
  if (!srcUrl) {
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/' }, body: '' };
  }

  // Fetch news.json from the site itself
  let article = null;
  try {
    const data = await fetchJson('https://up2date.hu/data/news.json');
    article = data.articles.find(a => a.url === srcUrl);
  } catch (e) { /* ignore – fallback to generic OG */ }

  // Fallback values
  const title   = article ? (article.title_hu || article.title) : 'up2date by Y2Y';
  const desc    = article ? (article.summary_hu || article.excerpt || '') : 'Globális HR-trendek, rövid magyar összefoglalóval.';
  const ogImage = article && article.image
    ? 'https://up2date.hu/.netlify/functions/og-img?img=' + encodeURIComponent(article.image)
    : 'https://up2date.hu/og-image.png';
  const category = article ? (article.category || '') : '';
  const source   = article ? (article.source || '') : '';
  const tagline  = [source, category].filter(Boolean).join(' · ');

  // Escape for safe HTML attribute embedding
  const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} – up2date by Y2Y</title>
<meta name="description" content="${esc(desc)}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="up2date by Y2Y">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="https://up2date.hu/article?u=${encodeURIComponent(srcUrl)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="hu_HU">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(ogImage)}">

<meta name="theme-color" content="#0d0d14">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0d0d14;
  color: #faf8f4;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}
.card {
  max-width: 640px;
  width: 100%;
  background: #16161e;
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(222,209,20,.15);
}
.tagline { font-size: 13px; color: #DED114; font-weight: 600; letter-spacing: 1px; margin-bottom: 16px; text-transform: uppercase; }
h1 { font-size: 26px; line-height: 1.3; margin-bottom: 20px; }
.desc { font-size: 16px; line-height: 1.6; color: #b8b2a8; margin-bottom: 28px; }
.btn {
  display: inline-block;
  background: #DED114;
  color: #0d0d14;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  transition: opacity .2s;
}
.btn:hover { opacity: .85; }
.footer { margin-top: 24px; font-size: 13px; color: #555; }
.footer a { color: #DED114; text-decoration: none; }
</style>
</head>
<body>
<div class="card">
  ${tagline ? `<div class="tagline">${esc(tagline)}</div>` : ''}
  <h1>${esc(title)}</h1>
  <div class="desc">${esc(desc)}</div>
  <a class="btn" href="${esc(srcUrl)}" target="_blank" rel="noopener">Eredeti cikk megtekintése &rarr;</a>
  <div class="footer">Összefoglalót készítette: <a href="https://up2date.hu">up2date by Y2Y</a></div>
</div>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
    body: html,
  };
};
