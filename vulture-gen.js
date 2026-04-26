// Add this to your vulture-gen.js HTML template variable
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Same Day Flower Delivery in ${item.city}, ${item.state} | Fresh 2026 Blooms</title>
    <style>
        .trust-bar { background: #f8f9fa; padding: 10px; display: flex; justify-content: space-around; font-size: 13px; color: #666; border-bottom: 1px solid #ddd; }
        .hero { text-align: center; padding: 50px 20px; background: linear-gradient(to bottom, #fff, #fff5f5); }
        .urgency { color: #e63946; font-weight: bold; margin-bottom: 20px; }
        .cta-button { background: #e63946; color: white; padding: 20px 40px; font-size: 20px; text-decoration: none; border-radius: 5px; display: inline-block; box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3); }
    </style>
</head>
<body>
    <div class="trust-bar">
        <span>✔ 7-Day Freshness Guarantee</span>
        <span>✔ Local ${item.city} Florist Dispatch</span>
        <span>✔ Secure 256-bit Checkout</span>
    </div>

    <div class="hero">
        <p class="urgency">🕒 Order within the next 2 hours for Same-Day Delivery in ${item.city}!</p>
        <h1>Fresh Flowers Delivered Today in ${item.city}</h1>
        <p>Direct from local artisans to your doorstep. No boxes. No transit delays.</p>
        <br>
        <a href="https://www.floristone.com/main.cfm?source_id=aff&AffiliateID=${AFFILIATE_ID}" class="cta-button">SHOP LOCAL FLOWERS NOW</a>
    </div>

    <section style="max-width: 800px; margin: 0 auto; padding: 20px;">
        <h2>Why Choose Our ${item.city} Network?</h2>
        <p>Unlike national "order gatherers," the BrightLane network routes your request (ID: ${AFFILIATE_ID}) specifically to a brick-and-mortar florist in ${item.state}. This ensures your arrangement arrives hand-delivered and hydrated.</p>
    </section>
</body>
</html>`;
