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
    .slice(0, 500)
    .map(a => {
      const loc      = `${base}/article?u=${encodeURIComponent(a.url)}`;
      const lastmod  = (a.addedAt || a.published || '').slice(0, 10) || now;
      const ageMs    = Date.now() - new Date(a.addedAt || a.published).getTime();
      const isRecent = ageMs < 3 * 24 * 3600 * 1000; // 3 days
      const priority = isRecent ? '0.8' : '0.6';
      const freq     = isRecent ? 'daily' : 'weekly';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
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
  <url>
    <loc>${base}/impresszum.html</loc>
    <lastmod>2026-03-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
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
