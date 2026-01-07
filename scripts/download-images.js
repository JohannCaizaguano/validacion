
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { name: 'frutas.jpg', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600' },
    { name: 'verduras.jpg', url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bef?auto=format&fit=crop&q=80&w=600' },
    { name: 'lacteos.jpg', url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600' },
    { name: 'snacks.jpg', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=600' },
    { name: 'panaderia.jpg', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' },
    { name: 'tecnologia.jpg', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }
];

const downloadDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

(async () => {
    console.log('⬇️ Downloading images...');
    for (const img of images) {
        try {
            await downloadImage(img.url, path.join(downloadDir, img.name));
            console.log(`✅ Downloaded ${img.name}`);
        } catch (e) {
            console.error(`❌ Failed to download ${img.name}:`, e.message);
        }
    }
    console.log('🎉 Done!');
})();
