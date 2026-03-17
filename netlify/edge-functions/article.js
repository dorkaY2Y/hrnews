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
  const desc       = article ? (article.summary_hu || '').slice(0, 250) : 'Globális HR-trendek naponta, magyar összefoglalóval.';
  const rawImage   = (article && article.image) ? article.image : '';
  const image      = rawImage
    ? 'https://up2date.hu/.netlify/functions/og-img?img=' + encodeURIComponent(rawImage)
    : 'https://up2date.hu/og-image.png';
  const pageUrl = reqUrl.toString();

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)} – up2date by Y2Y</title>

  <meta property="og:type"        content="article">
  <meta property="og:site_name"   content="up2date by Y2Y">
  <meta property="og:title"       content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:image"       content="${escapeHtml(image)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url"         content="${escapeHtml(pageUrl)}">
  <meta property="og:locale"      content="hu_HU">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image"       content="${escapeHtml(image)}">

  <link rel="canonical" href="https://up2date.hu">
  <meta http-equiv="refresh" content="0;url=https://up2date.hu">
</head>
<body>
  <p>Átirányítás… <a href="https://up2date.hu">up2date.hu</a></p>
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
