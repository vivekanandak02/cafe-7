const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Standalone menu target URL
const targetUrl = 'https://cafe--7.vercel.app/';
const outputDir = 'C:\\Users\\Vivekanandan\\.gemini\\antigravity\\scratch\\cafe7\\public';
const brainDir = 'C:\\Users\\Vivekanandan\\.gemini\\antigravity\\brain\\f71a7a2d-c95d-4a23-bb32-142dad2b5c28';

async function generateDownloads() {
  console.log('Generating QR code assets for:', targetUrl);

  const rawSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 3,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#1B1513',
      light: '#FFFFFF'
    }
  });

  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
  let vbWidth = 100;
  let vbHeight = 100;
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].split(/\s+/).map(Number);
    if (parts.length === 4) {
      vbWidth = parts[2];
      vbHeight = parts[3];
    }
  }

  const logoW = vbWidth * 0.24;
  const logoH = vbHeight * 0.24;
  const lx = (vbWidth - logoW) / 2;
  const ly = (vbHeight - logoH) / 2;
  const rx = logoW * 0.2;

  const logoBadgeSvg = `
  <!-- Café 7 Centered Badge -->
  <g id="cafe7-center-logo">
    <rect x="${lx - 1}" y="${ly - 1}" width="${logoW + 2}" height="${logoH + 2}" rx="${rx + 1}" fill="#FFFFFF" />
    <rect x="${lx}" y="${ly}" width="${logoW}" height="${logoH}" rx="${rx}" fill="#2F2622" stroke="#D2B08A" stroke-width="${Math.max(1, vbWidth * 0.008)}" />
    <text x="${vbWidth / 2}" y="${ly + logoH * 0.4}" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="${logoH * 0.26}" fill="#FFFFFF" letter-spacing="1">CAFÉ</text>
    <text x="${vbWidth / 2}" y="${ly + logoH * 0.8}" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="${logoH * 0.4}" fill="#D2B08A">7</text>
  </g>
</svg>`;

  const finalSvg = rawSvg.replace('</svg>', logoBadgeSvg);

  const svgPath1 = path.join(outputDir, 'cafe7-menu-qr-vector.svg');
  const svgPath2 = path.join(brainDir, 'cafe7-menu-qr-vector.svg');
  fs.writeFileSync(svgPath1, finalSvg);
  fs.writeFileSync(svgPath2, finalSvg);
  console.log('Saved SVG to:', svgPath1);

  const pngPath1 = path.join(outputDir, 'cafe7-menu-qr-highres.png');
  const pngPath2 = path.join(brainDir, 'cafe7-menu-qr-highres.png');

  await QRCode.toFile(pngPath1, targetUrl, {
    width: 2048,
    margin: 3,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#1B1513',
      light: '#FFFFFF'
    }
  });

  fs.copyFileSync(pngPath1, pngPath2);
  console.log('Saved High-Res PNG to:', pngPath1);

  console.log('All downloadable QR assets generated successfully for', targetUrl);
}

generateDownloads();
