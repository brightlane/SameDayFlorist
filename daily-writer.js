const fs = require('fs');
const path = require('path');

const SITE_NAME = "SameDayFlorist";
const AFFILIATE_LINK = "https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=2013017799";
const blogDir = path.resolve(__dirname, 'blog');

if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

// 2026 Content Matrix
const topics = [
    {
        title: "Why Sunday Delivery is the Secret to Mother's Day 2026",
        content: "With May 10th approaching, the biggest mistake shoppers make is choosing a Monday delivery. Local artisans in our network prioritize Sunday morning slots...",
        tags: "Mother's Day, Delivery Tips"
    },
    {
        title: "Top 5 Anniversary Blooms for Same-Day Surprise",
        content: "Long-stemmed roses are a classic, but the 2026 trend is shifting toward 'Wildflower Elegance.' Our local city florists are currently stocking premium peonies...",
        tags: "Anniversary, Gift Trends"
    },
    {
        title: "Avoiding the 'Boxed Flower' Trap: Why Artisan Delivery Wins",
        content: "Cardboard boxes kill flowers. When you order through a local dispatch, the arrangement stays hydrated in a van, not a shipping hub. Here is why it matters...",
        tags: "Consumer Guide, Quality"
    }
];

const post = topics[Math.floor(Math.random() * topics.length)];
const slug = post.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '.html';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${post.title} | ${SITE_NAME} Blog</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.8; color: #444; max-width: 750px; margin: 0 auto; padding: 60px 20px; }
        .meta { color: #888; font-size: 14px; margin-bottom: 20px; }
        .cta-box { background: #fff5f5; border-radius: 10px; padding: 30px; border: 1px solid #ffebeb; margin: 40px 0; text-align: center; }
        .cta-btn { background: #e63946; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        a.back { color: #e63946; text-decoration: none; font-size: 14px; }
    </style>
</head>
<body>
    <a href="../blog.html" class="back">← Back to Insights</a>
    <h1>${post.title}</h1>
    <div class="meta">Published April 2026 • Tags: ${post.tags}</div>
    
    <div class="content">
        <p>${post.content}</p>
        <p>Whether you're sending a 'Get Well' wish or celebrating a milestone, the difference lies in the hand-delivery. Our network ensures that every stem is checked by a pro before it leaves the shop.</p>
    </div>

    <div class="cta-box">
        <h3>Ready to Send Fresh Blooms?</h3>
        <p>Support a local florist in your city by ordering through our verified artisan portal.</p>
        <br>
        <a href="${AFFILIATE_LINK}" class="cta-btn">SHOP LOCAL FLOWERS NOW</a>
    </div>

    <p style="font-size: 12px; color: #aaa; text-align: center;">ID: 2013017799 Dispatch Verified</p>
</body>
</html>`;

fs.writeFileSync(path.join(blogDir, slug), html);
console.log(`NEW POST: ${slug}`);
