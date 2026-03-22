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
  const image      = rawImage
    ? 'https://up2date.hu/.netlify/functions/og-img?img=' + encodeURIComponent(rawImage)
    : 'https://up2date.hu/og-image.png';
  const pageUrl    = reqUrl.toString();
  const published  = article ? (article.published || '') : '';
  const source     = article ? (article.source || 'up2date by Y2Y') : 'up2date by Y2Y';
  const category   = article ? (article.category || 'HR') : 'HR';
  const geo        = article ? (article.geo || '') : '';
  const summaryFull = article ? (article.summary_hu || '') : '';

  const jsonLd = article ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': title,
    'name': title,
    'alternativeHeadline': titleEn !== title ? titleEn : undefined,
    'description': desc,
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
    'mainEntityOfPage': pageUrl,
    'keywords': ['HR', category, 'munkaerőpiac', 'HR trendek', source].filter(Boolean).join(', '),
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Főoldal', 'item': 'https://up2date.hu/' },
        { '@type': 'ListItem', 'position': 2, 'name': category, 'item': 'https://up2date.hu/' },
        { '@type': 'ListItem', 'position': 3, 'name': title }
      ]
    }
  }) : 'null';

  // Build a richer HTML page for AI crawlers with actual content
  const articleContent = summaryFull
    ? `<article><h1>${escapeHtml(title)}</h1><p><strong>Forrás:</strong> ${escapeHtml(source)} | <strong>Kategória:</strong> ${escapeHtml(category)}${geo ? ' | <strong>Régió:</strong> ' + escapeHtml(geo) : ''}${published ? ' | <strong>Megjelent:</strong> ' + escapeHtml(published.slice(0, 10)) : ''}</p><h2>Magyar összefoglaló</h2><p>${escapeHtml(summaryFull)}</p>${titleEn !== title ? '<p><strong>Eredeti cím:</strong> ' + escapeHtml(titleEn) + '</p>' : ''}<p><a href="https://up2date.hu">← Vissza az up2date-ra</a></p></article>`
    : `<p>Átirányítás… <a href="https://up2date.hu">up2date.hu</a></p>`;

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} – up2date by Y2Y</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="keywords" content="HR, ${escapeHtml(category)}, munkaerőpiac, ${escapeHtml(source)}, HR trendek, up2date">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">

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

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image"       content="${escapeHtml(image)}">
  <meta name="twitter:image:alt"   content="${escapeHtml(title)}">

  ${jsonLd !== 'null' ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
  <meta http-equiv="refresh" content="0;url=https://up2date.hu">
</head>
<body>
  ${articleContent}
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
