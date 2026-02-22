import sharp from 'sharp'

const svg = `<svg width="512" height="512" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" fill="#3B2314"/>
  <circle cx="60" cy="60" r="54" fill="#5C3A1E"/>
  <defs>
    <linearGradient id="beanGrad" x1="40" y1="35" x2="80" y2="95">
      <stop offset="0%" stop-color="#D4956B"/>
      <stop offset="50%" stop-color="#C17D4F"/>
      <stop offset="100%" stop-color="#8B5E3C"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="68" rx="22" ry="30" fill="url(#beanGrad)" transform="rotate(-15 60 68)"/>
  <path d="M54 45 Q58 58 62 68 Q66 78 58 92" stroke="#6B4226" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  <ellipse cx="52" cy="58" rx="6" ry="12" fill="#E8B78E" opacity="0.25" transform="rotate(-20 52 58)"/>
</svg>`

const buffer = Buffer.from(svg)

await sharp(buffer).resize(192, 192).png().toFile('public/icon-192.png')
await sharp(buffer).resize(512, 512).png().toFile('public/icon-512.png')

console.log('Icons generated!')
