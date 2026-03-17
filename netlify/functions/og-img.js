const Jimp = require('jimp');

exports.handler = async (event) => {
  const imgUrl = event.queryStringParameters && event.queryStringParameters.img;

  if (!imgUrl) {
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }

  try {
    const image = await Jimp.read(imgUrl);
    image.cover(1200, 630);

    // Sötét sáv alul
    const barH = 72;
    const bar = new Jimp(1200, barH);
    bar.scan(0, 0, 1200, barH, function (x, y, idx) {
      this.bitmap.data[idx]     = 13;   // R
      this.bitmap.data[idx + 1] = 13;   // G
      this.bitmap.data[idx + 2] = 18;   // B
      this.bitmap.data[idx + 3] = 220;  // A - szinte teljesen átlátszatlan
    });
    image.composite(bar, 0, 630 - barH);

    // Szöveg: "up2date.hu · by Y2Y"
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    image.print(font, 24, 630 - barH + 18, 'up2date.hu  \xB7  by Y2Y');

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('og-img error:', err.message);
    return { statusCode: 302, headers: { Location: 'https://up2date.hu/og-image.png' }, body: '' };
  }
};
