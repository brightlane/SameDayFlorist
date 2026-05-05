const fs = require('fs');
const path = require('path');

const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";
const blogDir = path.resolve(__dirname, 'blog');
const sitemapPath = path.resolve(__dirname, 'sitemap.xml');

const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html'));

const urls = files.map(file => {
    const lastMod = new Date().toISOString().split('T')[0];

    return `
  <url>
    <loc>${BASE_URL}blog/${file}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${BASE_URL}blog.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

${urls}

</urlset>`;

fs.writeFileSync(sitemapPath, sitemap);

console.log("✅ sitemap.xml updated with latest blog posts");
