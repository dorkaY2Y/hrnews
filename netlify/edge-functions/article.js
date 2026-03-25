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
  const desc       = article ? (article.summary_hu || '').slice(0, 300) : 'Globális HR-trendek naponta, magyar összefoglalóval.';
  const rawImage   = (article && article.image) ? article.image : '';
  // Use article's raw image directly — FB/LI crawlers can't wait for og-img cold start+processing
  const image      = rawImage || 'https://up2date.hu/og-image.png';
  const pageUrl    = reqUrl.toString();
  const published  = article ? (article.published || '') : '';
  const source     = article ? (article.source || 'up2date by Y2Y') : 'up2date by Y2Y';
  const category   = article ? (article.category || 'HR') : 'HR';
  const geo        = article ? (article.geo || '') : '';
  const summaryFull = article ? (article.summary_hu || '') : '';
  const fullHu     = article ? (article.full_hu || '') : '';

  // Build comprehensive keywords
  const keywordList = ['HR', category, 'munkaerőpiac', 'HR trendek', source, 'HR hírek magyarul', 'up2date'].filter(Boolean);
  const keywords = [...new Set(keywordList)].join(', ');

  // Build JSON-LD graph with multiple entities
  const jsonLdGraph = article ? JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': pageUrl + '#article',
        'headline': title,
        'name': title,
        'alternativeHeadline': titleEn !== title ? titleEn : undefined,
        'description': desc,
        'articleBody': fullHu ? fullHu.slice(0, 500) : undefined,
        'image': image ? {
          '@type': 'ImageObject',
          'url': image,
          'width': 1200,
          'height': 630
        } : undefined,
        'datePublished': published,
        'dateModified': published,
        'url': pageUrl,
        'isPartOf': { '@id': 'https://up2date.hu/#website' },
        'publisher': {
          '@type': 'Organization',
          '@id': 'https://up2date.hu/#organization',
          'name': 'up2date by Y2Y',
          'logo': { '@type': 'ImageObject', 'url': 'https://up2date.hu/og-image.png', 'width': 1200, 'height': 630 }
        },
        'author': {
          '@type': 'Organization',
          'name': source,
        },
        'articleSection': category,
        'inLanguage': 'hu-HU',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': pageUrl
        },
        'keywords': keywords,
        'copyrightHolder': { '@id': 'https://up2date.hu/#organization' },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', '.summary']
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Főoldal', 'item': 'https://up2date.hu/' },
          { '@type': 'ListItem', 'position': 2, 'name': category, 'item': 'https://up2date.hu/' },
          { '@type': 'ListItem', 'position': 3, 'name': title }
        ]
      }
    ]
  }) : 'null';

  // Redirect to cikk.html (Hungarian reading page) instead of original article
  const destUrl = articleUrl
    ? 'https://up2date.hu/cikk#' + encodeURIComponent(articleUrl)
    : 'https://up2date.hu';

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} – up2date by Y2Y</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
  <link rel="alternate" hreflang="hu" href="${escapeHtml(pageUrl)}" />
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl)}" />

  <meta property="og:type"               content="article">
  <meta property="og:site_name"          content="up2date by Y2Y">
  <meta property="og:title"             content="${escapeHtml(title)}">
  <meta property="og:description"       content="${escapeHtml(desc)}">
  <meta property="og:image"             content="${escapeHtml(image)}">
  <meta property="og:image:width"       content="1200">
  <meta property="og:image:height"      content="630">
  <meta property="og:image:alt"         content="${escapeHtml(title)}">
  <meta property="og:url"               content="${escapeHtml(pageUrl)}">
  <meta property="og:locale"            content="hu_HU">
  ${published ? `<meta property="article:published_time" content="${escapeHtml(published)}">` : ''}
  ${published ? `<meta property="article:modified_time"  content="${escapeHtml(published)}">` : ''}
  <meta property="article:author"       content="${escapeHtml(source)}">
  <meta property="article:section"      content="${escapeHtml(category)}">
  <meta property="article:tag"          content="HR">
  <meta property="article:tag"          content="${escapeHtml(category)}">
  <meta property="article:tag"          content="munkaerőpiac">
  <meta property="article:tag"          content="HR hírek magyarul">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image"       content="${escapeHtml(image)}">
  <meta name="twitter:image:alt"   content="${escapeHtml(title)}">

  ${jsonLdGraph !== 'null' ? `<script type="application/ld+json">${jsonLdGraph}</script>` : ''}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#f0f0f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
    .splash{max-width:560px;width:100%;text-align:center}
    .brand{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;margin-bottom:24px}
    h1{font-size:clamp(18px,4vw,26px);font-weight:700;line-height:1.3;margin-bottom:16px;color:#fff}
    .summary{font-size:14px;line-height:1.6;color:#aaa;margin-bottom:28px;max-width:480px;margin-left:auto;margin-right:auto}
    .go-btn{display:inline-flex;align-items:center;gap:8px;background:#c9a84c;color:#0f0f0f;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.3px}
    .go-btn:hover{background:#e0c060}
    .back{display:block;margin-top:16px;font-size:12px;color:#666;text-decoration:none}
    .back:hover{color:#aaa}
    .progress{width:100%;height:2px;background:#333;border-radius:1px;margin-top:32px;overflow:hidden}
    .progress-bar{height:100%;background:#c9a84c;width:0;animation:fill 3s linear forwards}
    @keyframes fill{to{width:100%}}
  </style>
  <script>setTimeout(()=>{window.location.href=${JSON.stringify(destUrl)}},3000)</script>
</head>
<body>
  <div class="splash">
    <div class="brand">up2date by Y2Y · HR hírek naponta</div>
    <h1>${escapeHtml(title)}</h1>
    ${summaryFull ? `<p class="summary">${escapeHtml(summaryFull.slice(0,220))}…</p>` : ''}
    <a class="go-btn" href="${escapeHtml(destUrl)}">Olvasd az eredeti cikket →</a>
    <a class="back" href="https://up2date.hu">← Vissza az up2date-ra</a>
    <div class="progress"><div class="progress-bar"></div></div>
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
