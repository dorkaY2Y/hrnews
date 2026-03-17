// Generates netlify/functions/branding-bar.png — run once on dev machine
// Requires: npm install sharp (in scripts/ folder or globally)
const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const W = 1200, H = 76;

const svg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
  `<rect x="0" y="0" width="${W}" height="${H}" fill="#0d0d12" fill-opacity="0.90"/>` +
  `<text x="28" y="47" font-family="'Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="0.3">up2date.hu</text>` +
  `<text x="192" y="47" font-family="'Helvetica Neue',Arial,sans-serif" font-size="22" fill="#999999">· by Y2Y \u2013 HR h\u00edrek naponta, magyarul</text>` +
  `</svg>`
);

const out = path.join(__dirname, '..', 'netlify', 'functions', 'branding-bar.png');

sharp(svg)
  .png()
  .toFile(out)
  .then(() => console.log('OK:', out))
  .catch(err => console.error('FAIL:', err));
