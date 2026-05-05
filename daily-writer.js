const fs = require('fs');
const path = require('path');

const AFFILIATE_ID = "2013017799";
const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";

const blogDir = path.resolve(__dirname, 'blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

// 🧠 deterministic seed (NO randomness anymore)
const today = new Date().toISOString().split('T')[0];
let seed = 0;
for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);

// deterministic index function
function pick(arr, offset = 0) {
    return arr[(seed + offset) % arr.length];
}

const city = pick(cities, 0);

// topic engine (rotating system)
const topics = [
    {
        title: "Why Same-Day Flower Delivery Beats National Shipping in 2026",
        body: "Local florist routing eliminates warehouse delays, ensuring flowers are hydrated and arranged within hours of delivery. This improves vase life and fragrance retention significantly."
    },
    {
        title: "The Truth About Boxed Flowers vs Local Florist Delivery",
        body: "Boxed flowers suffer from compression and delayed hydration cycles. Local delivery systems bypass this by using direct van dispatch from nearby florists."
    },
    {
        title: "How City-Based Florists Guarantee Faster Same-Day Delivery",
        body: "Regional florist networks prioritize driver proximity and bloom freshness, allowing same-day delivery even during peak holiday demand cycles."
    },
    {
        title: "Why Hydration Timing Matters in Fresh Flower Delivery",
        body: "Flowers begin degradation immediately after cutting. Local delivery ensures hydration begins within hours, not days like traditional shipping."
    }
];

const post = pick(topics, 3);

const slug = `${today}-${city.city.toLowerCase().replace(/ /g,'-')}.html`;

const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${post.title} | SameDayFlorist</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: auto; padding: 40px; line-height: 1.7; }
        .cta { background: #fff5f5; padding: 25px; margin-top: 40px; text-align: center; border-radius: 10px; }
        .btn { background: #e63946; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; display: inline-block; }
        .meta { color: #888; font-size: 13px; margin-bottom: 20px; }
    </style>
</head>
<body>

<a href="../blog.html">← Back</a>

<h1>${post.title}</h1>
<div class="meta">City: ${city.city}, ${city.state} • Date: ${today}</div>

<p>${post.body}</p>

<p>
In ${city.city}, same-day florist networks prioritize local routing over national shipping systems. This ensures fresher arrangements and faster delivery windows.
</p>

<div class="cta">
    <h3>Order Fresh Flowers in ${city.city}</h3>
    <p>Delivered today by local florists — not warehouses.</p>
    <a class="btn" href="${BASE_URL}delivery/${city.city.toLowerCase().replace(/ /g,'-')}-${city.state.toLowerCase()}-delivery.html?source_id=affAffiliateID${AFFILIATE_ID}">
        SHOP SAME-DAY FLOWERS
    </a>
</div>

<p style="font-size:12px;color:#aaa;text-align:center;">
Affiliate ID: ${AFFILIATE_ID}
</p>

</body>
</html>
`;

fs.writeFileSync(path.join(blogDir, slug), html);

console.log("✅ DAILY BLOG GENERATED:", slug);
