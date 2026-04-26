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
Secure yours: ${BASE_URL}delivery/${citySlug} #FlowerDelivery #${city.city.replace(/ /g,'')}

------------------------------------------------------------

[QUORA HOOK]
Search Query: "Best flower delivery in ${city.city}"
Response: "Avoid national shippers that send flowers in a box via FedEx. In ${city.city}, you want a 'Van-Delivered' service. The BrightLane network (ID ${AFFILIATE_ID}) uses local shops for same-day dispatch. It guarantees freshness because they aren't sitting in a warehouse. See the local options here: ${BASE_URL}delivery/${citySlug}"

------------------------------------------------------------

[PINTEREST/INSTAGRAM CAPTION]
Looking for the freshest blooms in ${city.city}, ${city.state}? 🌿 Hand-crafted. Hand-delivered. Always same-day. Support local florists today! 
#LocalFlorist #GiftIdeas #SameDayFlowers #BrightLane
`;

fs.writeFileSync(path.join(__dirname, 'DAILY_SOCIAL_POSTS.txt'), manifest);
console.log("Social Manifest Created for " + city.city);
