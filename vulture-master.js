const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const SITE_NAME = "SameDayFlorist";
const AFFILIATE_ID = "2013017799";
const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";
const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const outDir = path.resolve(__dirname, 'delivery');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// --- THE MASTER TEMPLATE ---
const generateHTML = (item) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Same Day Flower Delivery in ${item.city}, ${item.state} | 2026 Local Artisan</title>
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; color: #333; line-height: 1.6; }
        .network-nav { background: #2c3e50; color: white; padding: 10px; text-align: center; font-size: 13px; }
        .network-nav a { color: #4db8ff; text-decoration: none; margin: 0 10px; }
        .hero { padding: 60px 20px; text-align: center; background: #fff5f5; border-bottom: 2px solid #fee2e2; }
        .cta-btn { background: #e63946; color: white; padding: 18px 35px; font-size: 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(230,57,70,0.3); }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        footer { background: #1a1a1a; color: #999; padding: 40px; font-size: 13px; text-align: center; }
        footer a { color: #666; margin: 0 10px; }
    </style>
</head>
<body>
    <nav class="network-nav">
        BRIGHTLANE NETWORK: 
        <a href="https://brightlane.github.io/SameDayFlorist/">Same-Day</a> | 
        <a href="https://brightlane.github.io/ValentinesDayFlowers/">Valentine's</a> | 
        <a href="https://brightlane.github.io/MothersDayFlowers/">Mother's Day</a>
    </nav>

    <div class="hero">
        <p style="color: #e63946; font-weight: bold; margin-bottom: 10px;">🕒 Order for ${item.city} Delivery Today!</p>
        <h1>Hand-Arranged Flowers in ${item.city}, ${item.state}</h1>
        <p>Your order is sent directly to a local ${item.city} florist shop for same-day artisan delivery.</p>
        <br>
        <a href="https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=${AFFILIATE_ID}" class="cta-btn">SHOP LOCAL FLOWERS NOW</a>
    </div>

    <div class="container">
        <h2>Why Order Direct in ${item.city}?</h2>
        <p>National "Boxed" flower companies ship arrangements in cardboard boxes. Our ${item.city} network (ID: ${AFFILIATE_ID}) ensures your flowers arrive hand-delivered in a vase, hydrated and fresh from a local florist's van.</p>
    </div>

    <footer>
        <p>&copy; 2026 BrightLane Floral Network. Affiliate ID: ${AFFILIATE_ID}</p>
        <a href="${BASE_URL}about.html">About</a> | 
        <a href="${BASE_URL}privacy.html">Privacy</a> | 
        <a href="${BASE_URL}terms.html">Terms</a>
        <p style="margin-top: 20px; font-size: 11px;">Disclosure: We receive commission for orders placed through our links to FloristOne.</p>
    </footer>
</body>
</html>`;

// --- EXECUTION ---
cities.forEach(item => {
    const slug = `${item.city.toLowerCase().replace(/ /g, '-')}-${item.state.toLowerCase()}-delivery.html`;
    fs.writeFileSync(path.join(outDir, slug), generateHTML(item));
});

console.log(`SUCCESS: Generated ${cities.length} city pages in /delivery/ folder.`);
