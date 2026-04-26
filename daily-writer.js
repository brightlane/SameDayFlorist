const fs = require('fs');
const path = require('path');

const blogDir = path.resolve(__dirname, 'blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

const topics = [
    { title: "The Best Same-Day Birthday Flowers", tags: "Birthday, Gifting" },
    { title: "Why Local Florists Outperform Big Box Stores", tags: "Quality, Local" },
    { title: "Last Minute Anniversary Gifts for 2026", tags: "Romance, Anniversary" },
    { title: "How to Keep Your Saturday Delivery Fresh", tags: "Care, Tips" }
];

// Pick a random topic
const topic = topics[Math.floor(Math.random() * topics.length)];
const slug = topic.title.toLowerCase().replace(/ /g, '-') + '.html';

const blogHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${topic.title} | SameDayFlorist Blog</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
        .back { color: #e63946; text-decoration: none; font-weight: bold; }
        .cta { background: #fff5f5; padding: 20px; border-left: 5px solid #e63946; margin-top: 30px; }
    </style>
</head>
<body>
    <a href="../blog.html" class="back">← Back to Blog</a>
    <h1>${topic.title}</h1>
    <p><em>Tags: ${topic.tags}</em></p>
    <p>Finding the perfect bouquet in 2026 is all about timing and local quality. Whether you are in New York or Los Angeles, the key to a successful gift is ensuring it is hand-delivered...</p>
    
    <div class="cta">
        <h3>Need Flowers Today?</h3>
        <p>Our network routes your order (ID: 2013017799) to a local artisan for immediate dispatch.</p>
        <a href="https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=2013017799" style="color:#e63946; font-weight:bold;">Shop Same-Day Now →</a>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(blogDir, slug), blogHTML);
console.log(`Blog post created: ${slug}`);
