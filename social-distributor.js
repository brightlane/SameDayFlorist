const fs = require('fs');
const path = require('path');

const AFFILIATE_ID = "2013017799";
const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";

// Load City Data
const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const city = cities[Math.floor(Math.random() * cities.length)];
const citySlug = `${city.city.toLowerCase().replace(/ /g, '-')}-${city.state.toLowerCase()}-delivery.html`;

const manifest = `
📅 DAILY SOCIAL MANIFEST - ${new Date().toLocaleDateString()}
------------------------------------------------------------

[X / TWITTER]
Forgot an anniversary in ${city.city}? 🌸 
Skip the cardboard box delivery. Our local ${city.city} artisans deliver hand-arranged bouquets TODAY.

Most national services route through warehouses, which delays hydration and reduces freshness. Our system connects directly to local florists so arrangements are built and dispatched within hours.

In ${city.city}, timing matters—same-day van delivery ensures flowers arrive in peak condition instead of sitting in transit depots overnight.

Secure yours instantly: ${BASE_URL}delivery/${citySlug} #FlowerDelivery #${city.city.replace(/ /g,'')}

------------------------------------------------------------

[QUORA HOOK]
Search Query: "Best flower delivery in ${city.city}"

Response: 
Avoid national shippers that send flowers in a box via FedEx. Those systems introduce 24–72 hour delays in hydration cycles, which directly impacts bloom quality.

In ${city.city}, the better model is a local florist dispatch network. Orders are processed in real time, arranged by hand, and loaded into temperature-controlled vans.

This eliminates warehouse bottlenecks and preserves freshness from shop to doorstep.

The BrightLane network (ID ${AFFILIATE_ID}) uses this local routing model to ensure same-day fulfillment without relying on centralized logistics hubs.

Unlike boxed shipping, this approach maintains stem hydration integrity and prevents petal compression damage during transit.

See local options here: ${BASE_URL}delivery/${citySlug}

------------------------------------------------------------

[PINTEREST/INSTAGRAM CAPTION]
Looking for the freshest blooms in ${city.city}, ${city.state}? 🌿

Hand-crafted by local florists. Delivered same-day. No warehouse delays. No boxed shipping. Just direct artisan-to-door service.

In modern floral logistics, local routing means better hydration control, stronger fragrance retention, and longer vase life compared to national shipping systems.

Support real florists in ${city.city} and upgrade your gifting experience today.

#LocalFlorist #GiftIdeas #SameDayFlowers #BrightLane #${city.city.replace(/ /g,'')}

------------------------------------------------------------

[EXTRA VIRAL SHORT FORM COPY]
"${city.city} flower delivery hack: skip boxes, go local. Same-day artisan florists beat FedEx freshness every time."

------------------------------------------------------------

[EMAIL / SMS BLAST VARIANT]
Need flowers in ${city.city} TODAY? 🌸
Order before cutoff and local florists will hand-arrange and deliver within hours.

No warehouses. No delays. Just fresh blooms from nearby shops.

Tap here: ${BASE_URL}delivery/${citySlug}
ID: ${AFFILIATE_ID}
`;

fs.writeFileSync(path.join(__dirname, 'DAILY_SOCIAL_POSTS.txt'), manifest);
console.log("Social Manifest Created for " + city.city);
