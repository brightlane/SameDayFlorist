const fs = require('fs');
const path = require('path');

const blogDir = path.resolve(__dirname, 'blog');

// read all posts
let files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html'));

// helper: pick random internal links
function pickLinks(arr, current, count = 3) {
    const filtered = arr.filter(f => f !== current);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    const links = pickLinks(files, file);

    const linkHtml = `
    <div style="margin-top:40px;padding:20px;background:#fff5f5;border-radius:10px;">
        <h3>Related Flower Delivery Guides</h3>
        <ul>
            ${links.map(l => {
                const title = l.replace('.html','').replace(/-/g,' ');
                return `<li><a href="${l}" style="color:#e63946;">${title}</a></li>`;
            }).join('\n')}
        </ul>
    </div>`;

    // avoid double injection
    if (!html.includes("Related Flower Delivery Guides")) {
        html = html.replace("</body>", `${linkHtml}</body>`);
        fs.writeFileSync(filePath, html);
    }
});

console.log("✅ Internal link mesh injected across blog posts");
