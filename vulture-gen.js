const fs = require('fs');
const path = require('path');

const AFFILIATE_ID = "2013017799";
const SITE_URL = "https://brightlane.github.io/MothersDayFlowers/";

// Load your 10,000 cities
const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const outDir = path.resolve(__dirname, 'delivery');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

cities.forEach(item => {
    const slug = `${item.city.toLowerCase().replace(/ /g, '-')}-mothers-day-delivery.html`;
    const filePath = path.join(outDir, slug);
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mother's Day Flower Delivery in ${item.city}, ${item.state} | Sunday May 10, 2026</title>
    <style>
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #443; margin: 0; background: #fffaf0; }
        .header { background: #fce4ec; padding: 20px; text-align: center; border-bottom: 4px solid #f06292; }
        .hero { max-width: 900px; margin: 40px auto; padding: 20px; text-align: center; background: white; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .sunday-badge { background: #f06292; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
        .cta-btn { background: #880e4f; color: white; padding: 20px 40px; font-size: 22px; text-decoration: none; border-radius: 50px; display: inline-block; transition: 0.3s; }
        .cta-btn:hover { background: #ad1457; transform: translateY(-3px); }
    </style>
</head>
<body>
    <div class="header"><h1>BrightLane Mothers: ${item.city} Edition</h1></div>
    <div class="hero">
        <div class="sunday-badge">SUNDAY MAY 10 DELIVERY AVAILABLE</div>
        <h1>Celebrate Mom in ${item.city}</h1>
        <p>Don't settle for "boxed" flowers. In ${item.city}, our local artisan network prepares hand-arranged bouquets delivered directly to her door this Sunday morning.</p>
        <br>
        <a href="https://www.floristone.com/main.cfm?occ=md&source_id=aff&AffiliateID=${AFFILIATE_ID}" class="cta-btn">SEND MOM FLOWERS TODAY</a>
        <p style="margin-top: 20px; font-size: 0.9rem;">Verified Local Delivery via FloristOne ID: ${AFFILIATE_ID}</p>
    </div>
</body>
</html>`;

    fs.writeFileSync(filePath, html);
});
console.log("Mother's Day 10K Matrix Generated.");
