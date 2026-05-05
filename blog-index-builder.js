const fs = require('fs');
const path = require('path');

const blogDir = path.resolve(__dirname, 'blog');
const outputFile = path.resolve(__dirname, 'blog.html');

const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html'))
    .sort()
    .reverse(); // newest first

const posts = files.slice(0, 20).map(file => {
    const slug = file;
    const title = file
        .replace('.html', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    return `
    <div class="post-card">
        <span class="tag">AUTO POST</span>
        <h2>${title}</h2>
        <a href="blog/${slug}" style="color:#e63946;font-weight:bold;">Read More →</a>
    </div>`;
}).join('\n');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SameDayFlorist Blog</title>
<style>
body { font-family: Arial; background:#fffafa; margin:0; }
.nav { background:#2c3e50; color:#fff; padding:15px; text-align:center; }
.container { max-width:1100px; margin:40px auto; padding:0 20px; }
.post-card { background:#fff; padding:25px; margin-bottom:20px; border-radius:10px; box-shadow:0 3px 10px rgba(0,0,0,0.05); }
.tag { background:#e63946; color:#fff; padding:4px 8px; font-size:12px; border-radius:4px; }
</style>
</head>
<body>

<div class="nav">
    <strong>SameDayFlorist Blog</strong>
</div>

<div class="container">
    ${posts}
</div>

</body>
</html>
`;

fs.writeFileSync(outputFile, html);

console.log("✅ blog.html UPDATED with latest posts");
