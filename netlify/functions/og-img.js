const sharp  = require('sharp');
const https  = require('https');
const http   = require('http');

// Fetch any image (follows redirects, supports JPEG + WebP + PNG + GIF)
function fetchBuffer(url, depth = 0) {
  if (depth > 4) return Promise.reject(new Error('too many redirects'));
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; up2date-og/1.0)' },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchBuffer(next, depth + 1).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

exports.handler = async (event) => {
  const imgUrl = event.queryStringParameters && event.queryStringParameters.img;

  if (!imgUrl) {
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }

  try {
    const imgBuffer = await fetchBuffer(imgUrl);

    // Dark branding bar + up2date.hu logo text as SVG overlay
    const svg = Buffer.from(
      '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">' +
      '  <rect x="0" y="554" width="1200" height="76" fill="#0d0d12" fill-opacity="0.90"/>' +
      '  <text x="28" y="601" font-family="\'Helvetica Neue\',Arial,sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="0.3">up2date.hu</text>' +
      '  <text x="192" y="601" font-family="\'Helvetica Neue\',Arial,sans-serif" font-size="22" fill="#999999">· by Y2Y – HR hírek naponta, magyarul</text>' +
      '</svg>'
    );

    const output = await sharp(imgBuffer)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .composite([{ input: svg, top: 0, left: 0 }])
      .jpeg({ quality: 88, progressive: true })
      .toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type':  'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
      body: output.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('og-img error:', err.message);
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }
};
