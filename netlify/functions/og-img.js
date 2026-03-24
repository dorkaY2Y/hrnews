const sharp   = require('sharp');
const https   = require('https');
const http    = require('http');

// Fetch any image (follows redirects, supports JPEG + WebP + PNG + GIF + AVIF)
function fetchBuffer(url, depth = 0) {
  if (depth > 4) return Promise.reject(new Error('too many redirects'));
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; up2date-og/2.0)',
        'Accept': 'image/webp,image/avif,image/*,*/*',
      },
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
    const path = require('path');
    const brandingBarPath = path.join(__dirname, 'branding-bar.png');
    const fs = require('fs');

    // Resize source image to 1200x630 (cover mode = crop to fill)
    let image = sharp(imgBuffer)
      .resize(1200, 630, { fit: 'cover', position: 'top' });

    // Composite branding bar if it exists
    if (fs.existsSync(brandingBarPath)) {
      const brandingBar = await sharp(brandingBarPath)
        .resize(1200, 76)
        .toBuffer();
      image = image.composite([{
        input: brandingBar,
        left: 0,
        top: 630 - 76,
        blend: 'over',
      }]);
    }

    const output = await image
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
