const fs = require('fs');
const path = require('path');

// TARGET BASE URL FOR THIS REPO
const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";
const deliveryDir = path.join(__dirname, 'delivery');

// 1. Start the Sitemap Structure
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <priority>1.0</priority>
  </url>`;

// 2. Add City Pages from the /delivery/ folder
if (fs.existsSync(deliveryDir)) {
    const files = fs.readdirSync(deliveryDir).filter(file => file.endsWith('.html'));
    files.forEach(file => {
        sitemap += `
  <url>
    <loc>${BASE_URL}delivery/${file}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
}

// 3. Add Blog Pages
const blogDir = path.join(__dirname, 'blog');
if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));
    blogFiles.forEach(file => {
        sitemap += `
  <url>
    <loc>${BASE_URL}blog/${file}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
}

sitemap += `\n</urlset>`;

// 4. Save the file
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`Sitemap for SameDayFlorist generated successfully.`);
