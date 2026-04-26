const fs = require('fs');
const path = require('path');

const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";
const deliveryDir = path.join(__dirname, 'delivery');

if (!fs.existsSync(deliveryDir)) {
    console.log("No delivery folder found. Run vulture-gen.js first.");
    process.exit(1);
}

const files = fs.readdirSync(deliveryDir).filter(f => f.endsWith('.html'));

// Group files by state (assuming slug format: city-state-delivery.html)
const stateMap = {};
files.forEach(file => {
    const parts = file.split('-');
    const state = parts[parts.length - 2]; // Grabs the 'ny' or 'ca' part
    if (!stateMap[state]) stateMap[state] = [];
    stateMap[state].push(file);
});

// 1. Generate Individual State Sitemaps
const sitemapFiles = [];
for (const state in stateMap) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    stateMap[state].forEach(file => {
        xml += `<url><loc>${BASE_URL}delivery/${file}</loc><priority>0.8</priority></url>`;
    });
    xml += `</urlset>`;
    
    const filename = `sitemap-${state}.xml`;
    fs.writeFileSync(path.join(__dirname, filename), xml);
    sitemapFiles.push(filename);
}

// 2. Generate the MASTER SITEMAP INDEX
let indexXml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
sitemapFiles.forEach(s => {
    indexXml += `<sitemap><loc>${BASE_URL}${s}</loc></sitemap>`;
});
indexXml += `</sitemapindex>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), indexXml);
console.log(`Generated Sitemap Index and ${sitemapFiles.length} state sitemaps.`);
