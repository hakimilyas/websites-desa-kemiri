const fs = require('fs');
const path = require('path');

const srcImage = `C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\b693eb4f-8c94-4cc6-b795-2833985103db\\hero_kemiri_1786014868785.png`;
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToCopy = [
  'hero-kemiri.jpg',
  'profil-carousel-1.jpg',
  'profil-carousel-2.jpg',
  'profil-carousel-3.jpg',
  'umkm-keripik.jpg',
  'umkm-kopi.jpg',
  'umkm-batik.jpg',
  'umkm-madu.jpg',
  'galeri-sawah.jpg',
  'galeri-gotong-royong.jpg',
  'galeri-perbukitan.jpg',
  'galeri-musyawarah.jpg',
  'galeri-sungai.jpg',
  'galeri-festival.jpg'
];

imagesToCopy.forEach(imgName => {
  const dest = path.join(targetDir, imgName);
  fs.copyFileSync(srcImage, dest);
  console.log(`Copied image to ${dest}`);
});

console.log('All dummy images successfully prepared!');
