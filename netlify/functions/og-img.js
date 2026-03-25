const sharp   = require('sharp');
const https   = require('https');
const http    = require('http');
const path    = require('path');
const fs      = require('fs');

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

// Wrap long title text to fit in SVG lines (~45 chars per line)
function wrapText(text, maxLen = 44) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxLen) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3); // max 3 lines
}

// Generate a branded OG image with article title text (no external image needed)
async function generateTitleOgImage(title, source) {
  const lines = wrapText(title || 'HR hírek naponta');
  const lineH = 62;
  const startY = 260 - ((lines.length - 1) * lineH) / 2;

  const textSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0d0d14"/>
        <stop offset="100%" stop-color="#131320"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>
    <!-- Accent bar top -->
    <rect x="0" y="0" width="1200" height="6" fill="#ded114"/>
    <!-- Brand label -->
    <text x="60" y="80" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700"
          fill="#ded114" letter-spacing="4">UP2DATE by Y2Y</text>
    <text x="60" y="108" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#7a7a9a">
      Globális HR hírek magyarul
    </text>
    <!-- Divider -->
    <line x1="60" y1="130" x2="400" y2="130" stroke="#ded114" stroke-width="1" stroke-opacity="0.3"/>
    <!-- Title lines -->
    ${lines.map((l, i) => `<text x="60" y="${startY + i * lineH}"
        font-family="Arial,Helvetica,sans-serif" font-size="46" font-weight="700"
        fill="#f0f0f8" xml:space="preserve">${l.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>`).join('\n    ')}
    <!-- Source badge -->
    <rect x="60" y="${startY + lines.length * lineH + 20}" width="${Math.min((source||'HR').length * 9 + 32, 400)}" height="36" rx="6" fill="#1e1e2e"/>
    <text x="76" y="${startY + lines.length * lineH + 44}"
          font-family="Arial,Helvetica,sans-serif" font-size="18" fill="#ded114">${(source||'HR').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>
    <!-- Bottom branding -->
    <rect x="0" y="570" width="1200" height="60" fill="#0a0a10"/>
    <text x="60" y="607" font-family="Arial,Helvetica,sans-serif" font-size="18" fill="#ded114" font-weight="700">up2date.hu</text>
    <text x="220" y="607" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#4a4a6a">by Y2Y · HR hírek naponta · AI összefoglalóval</text>
  </svg>`;

  return sharp(Buffer.from(textSvg))
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();
}

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const imgUrl = params.img;
  const title  = params.title ? decodeURIComponent(params.title) : null;
  const source = params.source ? decodeURIComponent(params.source) : null;

  // If title provided (no external image) → generate branded text OG image
  if (!imgUrl && title) {
    try {
      const output = await generateTitleOgImage(title, source);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
        body: output.toString('base64'),
        isBase64Encoded: true,
      };
    } catch (err) {
      console.error('og-img title-gen error:', err.message);
      return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
    }
  }

  if (!imgUrl) {
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }

  try {
    const imgBuffer = await fetchBuffer(imgUrl);
    const brandingBarPath = path.join(__dirname, 'branding-bar.png');

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
    // External image failed → generate title-based image if title given, else fallback
    console.error('og-img fetch error:', err.message);
    if (title) {
      try {
        const output = await generateTitleOgImage(title, source);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
          body: output.toString('base64'),
          isBase64Encoded: true,
        };
      } catch (e2) { /* fall through */ }
    }
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }
};
