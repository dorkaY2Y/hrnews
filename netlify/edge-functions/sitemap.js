export default async (request) => {
  let articles = [];
  try {
    const newsUrl = new URL('/data/news.json', request.url);
    const res = await fetch(newsUrl.toString());
    const data = await res.json();
    articles = data.articles || [];
  } catch (_) {}

  const base = 'https://up2date.hu';
  const now  = new Date().toISOString().slice(0, 10);

  const articleUrls = articles
    .filter(a => a.url && a.addedAt)
    .slice(0, 200)
    .map(a => {
      const loc      = `${base}/article?u=${encodeURIComponent(a.url)}`;
      const lastmod  = (a.addedAt || a.published || '').slice(0, 10) || now;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>never</changefreq>\n    <priority>0.6</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${articleUrls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};

export const config = { path: '/sitemap.xml' };
