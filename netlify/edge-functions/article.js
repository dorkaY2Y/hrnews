function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async (request) => {
  const reqUrl = new URL(request.url);
  const articleUrl = reqUrl.searchParams.get('u') || '';

  let article = null;
  try {
    const newsUrl = new URL('/data/news.json', request.url);
    const res = await fetch(newsUrl.toString());
    const data = await res.json();
    const articles = data.articles || [];
    if (articleUrl) {
      article = articles.find(a => a.url === articleUrl);
    }
    if (!article && articles.length) article = articles[0];
  } catch (_) { /* fallback */ }

  const title      = article ? (article.title_hu || article.title || 'up2date by Y2Y') : 'up2date by Y2Y';
  const titleEn    = article ? (article.title || title) : title;
  const summary    = article ? (article.summary_hu || '') : '';
  const desc       = summary.length > 220 ? summary.slice(0, 217) + '…' : summary;
  const ogDesc     = desc || 'Globális HR-trendek naponta, magyar összefoglalóval.';
  const rawImage   = (article && article.image) ? article.image : '';
  const image      = rawImage
    ? 'https://up2date.hu/.netlify/functions/og-img?img=' + encodeURIComponent(rawImage)
    : 'https://up2date.hu/og-image.png';
  const pageUrl    = reqUrl.toString();
  const published  = article ? (article.published || '') : '';
  const source     = article ? (article.source || 'up2date by Y2Y') : 'up2date by Y2Y';
  const category   = article ? (article.category || 'HR') : 'HR';
  const geo        = article ? (article.geo || '') : '';
  const srcUrl     = article ? (article.url || '') : '';

  const pubDate = published ? new Date(published) : null;
  const pubStr  = pubDate && !isNaN(pubDate)
    ? pubDate.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const jsonLd = article ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': title,
    'name': title,
    'description': ogDesc,
    'image': image,
    'datePublished': published,
    'dateModified': published,
    'url': pageUrl,
    'isPartOf': { '@id': 'https://up2date.hu/#website' },
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://up2date.hu/#organization',
      'name': 'up2date by Y2Y',
      'logo': { '@type': 'ImageObject', 'url': 'https://up2date.hu/og-image.png' }
    },
    'author': {
      '@type': 'Organization',
      'name': source
    },
    'articleSection': category,
    'inLanguage': 'hu-HU',
    'mainEntityOfPage': pageUrl
  }) : 'null';

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} – up2date by Y2Y</title>

  <meta property="og:type"               content="article">
  <meta property="og:site_name"          content="up2date by Y2Y – maradj képben.">
  <meta property="og:title"             content="${escapeHtml(title)}">
  <meta property="og:description"       content="${escapeHtml(ogDesc)}">
  <meta property="og:image"             content="${escapeHtml(image)}">
  <meta property="og:image:width"       content="1200">
  <meta property="og:image:height"      content="630">
  <meta property="og:url"               content="${escapeHtml(pageUrl)}">
  <meta property="og:locale"            content="hu_HU">
  ${published ? `<meta property="article:published_time" content="${escapeHtml(published)}">` : ''}
  ${published ? `<meta property="article:modified_time"  content="${escapeHtml(published)}">` : ''}
  <meta property="article:author"       content="${escapeHtml(source)}">
  <meta property="article:section"      content="${escapeHtml(category)}">
  <meta property="article:tag"          content="HR">
  <meta property="article:tag"          content="${escapeHtml(category)}">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(ogDesc)}">
  <meta name="twitter:image"       content="${escapeHtml(image)}">

  <link rel="canonical" href="https://up2date.hu">

  <!-- Auto-redirect after 4 seconds -->
  <meta http-equiv="refresh" content="4;url=https://up2date.hu">

  ${jsonLd !== 'null' ? `<script type="application/ld+json">${jsonLd}</script>` : ''}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Exo+2:wght@700;800&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #0d0d12;
      color: #eae5db;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      max-width: 560px;
      width: 100%;
      background: #faf8f4;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 32px rgba(0,0,0,.5);
      border-left: 5px solid #DED114;
    }
    .card-cover {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .card-cover::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, rgba(0,0,0,.1), rgba(0,0,0,.55));
    }
    .card-cover-fallback {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 72px;
      background: linear-gradient(135deg, #DED114 0%, #b8a900 100%);
      opacity: .85;
    }
    .card-body {
      padding: 24px;
      color: #19162a;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .source-badge {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .6px;
      background: rgba(222,209,20,.15);
      color: #6b6600;
      border: 1px solid rgba(222,209,20,.35);
      padding: 3px 9px;
      border-radius: 4px;
    }
    .cat-badge {
      font-size: 11px;
      color: #8a8498;
      background: #f0ebe2;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #e4ddd4;
    }
    .pub-date {
      font-size: 11px;
      color: #8a8498;
      margin-left: auto;
    }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.35;
      color: #19162a;
      margin-bottom: 12px;
    }
    .summary-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .9px;
      color: #DED114;
      margin-bottom: 6px;
    }
    .summary-label::before { content: '🇭🇺 '; font-size: 11px; }
    .card-summary {
      font-size: 14px;
      line-height: 1.7;
      color: #4c4862;
    }
    .card-actions {
      padding: 16px 24px;
      border-top: 1px solid #e4ddd4;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: transform .15s, opacity .15s;
      white-space: nowrap;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn-primary {
      background: #DED114;
      color: #0d0d12;
      flex: 1;
      justify-content: center;
    }
    .btn-secondary {
      background: #f0ebe2;
      color: #4c4862;
      border: 1px solid #e4ddd4;
      flex: 1;
      justify-content: center;
    }
    .brand-bar {
      margin-top: 24px;
      text-align: center;
    }
    .brand-name {
      font-family: 'Exo 2', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #eae5db;
      text-transform: uppercase;
      letter-spacing: -1px;
      text-decoration: none;
    }
    .brand-sub {
      font-size: 11px;
      color: rgba(234,229,219,.45);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .redirect-note {
      margin-top: 16px;
      font-size: 12px;
      color: rgba(234,229,219,.35);
    }
    .redirect-note a { color: #DED114; text-decoration: none; }
    @media (max-width: 480px) {
      .card-cover, .card-cover-fallback { height: 140px; }
      .card-body { padding: 18px; }
      .card-title { font-size: 17px; }
      .card-actions { padding: 14px 18px; }
    }
  </style>
</head>
<body>

  <article class="card">
    ${rawImage
      ? `<div class="card-cover" style="background-image:url('${escapeHtml(rawImage)}')"></div>`
      : `<div class="card-cover-fallback">${escapeHtml(geo ? geo.split(' ')[0] : '📰')}</div>`
    }
    <div class="card-body">
      <div class="card-meta">
        ${geo ? `<span style="font-size:16px">${escapeHtml(geo.split(' ')[0])}</span>` : ''}
        <span class="source-badge">${escapeHtml(source)}</span>
        <span class="cat-badge">${escapeHtml(category)}</span>
        ${pubStr ? `<span class="pub-date">${escapeHtml(pubStr)}</span>` : ''}
      </div>
      <h1 class="card-title">${escapeHtml(title)}</h1>
      ${summary ? `
        <p class="summary-label">Magyar összefoglaló</p>
        <p class="card-summary">${escapeHtml(summary)}</p>
      ` : ''}
    </div>
    <div class="card-actions">
      ${srcUrl ? `<a class="btn btn-primary" href="${escapeHtml(srcUrl)}" target="_blank" rel="noopener">Eredeti cikk ↗</a>` : ''}
      <a class="btn btn-secondary" href="https://up2date.hu">up2date.hu – több cikk →</a>
    </div>
  </article>

  <div class="brand-bar">
    <a class="brand-name" href="https://up2date.hu">up2date</a>
    <p class="brand-sub">by Y2Y · maradj képben.</p>
    <p class="redirect-note">Átirányítás az <a href="https://up2date.hu">up2date.hu</a>-ra…</p>
  </div>

</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public,max-age=300,s-maxage=300',
    },
  });
};

export const config = { path: '/article' };
