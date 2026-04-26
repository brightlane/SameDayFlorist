const fs = require('fs');
const path = require('path');

const AFFILIATE_ID = "2013017799";
const outDir = path.resolve(__dirname, 'delivery');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

const generateDadHTML = (item) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Father's Day Flower Delivery in ${item.city}, ${item.state} | Sunday June 21, 2026</title>
    <style>
        body { font-family: 'Inter', sans-serif; background: #f4f7f6; color: #2c3e50; margin: 0; }
        .hero { background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d); color: white; padding: 60px 20px; text-align: center; }
        .badge { background: #ffeb3b; color: #333; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; }
        .cta-btn { background: #2c3e50; color: white; padding: 20px 40px; font-size: 22px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 25px; border: 2px solid #fff; }
    </style>
</head>
<body>
    <div class="hero">
        <span class="badge">SUNDAY JUNE 21 DELIVERY</span>
        <h1>Robust Father's Day Displays in ${item.city}</h1>
        <p>From architectural succulents to deep gem-toned roses. Hand-delivered by ${item.city} artisans.</p>
        <a href="https://www.floristone.com/main.cfm?occ=fd&source_id=aff&AffiliateID=${AFFILIATE_ID}" class="cta-btn">SEND DAD FLOWERS TODAY</a>
    </div>
    <div style="max-width: 800px; margin: 40px auto; padding: 0 20px;">
        <h2>The 2026 Father's Day Trend: Living Gifts</h2>
        <p>Why ${item.city} dads prefer our network: We don't use cardboard boxes. Every "Mossy Moment" or "Saturated Sunset" arrangement is delivered in a local florist van, fully hydrated and ready for his desk or patio.</p>
    </div>
</body>
</html>`;

cities.forEach(item => {
    const slug = `${item.city.toLowerCase().replace(/ /g, '-')}-fathers-day.html`;
    fs.writeFileSync(path.join(outDir, slug), generateDadHTML(item));
});
console.log("Father's Day 10K Matrix: DEPLOYED.");
