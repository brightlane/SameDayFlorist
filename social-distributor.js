const fs = require('fs');
const path = require('path');

// Configuration
const AFFILIATE_ID = "2013017799";
const BASE_URL = "https://brightlane.github.io/SameDayFlorist/";

// Load Data
const cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
const randomCity = cities[Math.floor(Math.random() * cities.length)];
const cityUrl = `${BASE_URL}delivery/${randomCity.city.toLowerCase().replace(/ /g, '-')}-${randomCity.state.toLowerCase()}-delivery.html`;

// Generate Social Manifest
const manifest = `
🚀 BRIGHTLANE SOCIAL MANIFEST - ${new Date().toLocaleDateString()}
--------------------------------------------------

[TWITTER / X POST]
Need a last minute gift in ${randomCity.city}? 🌸 
Don't settle for boxed flowers. Our local artisan network delivers hand-arranged bouquets TODAY. 
Check availability: ${cityUrl} #FlowerDelivery #${randomCity.city.replace(/ /g, '')} #SameDay

--------------------------------------------------

[QUORA ANSWER HOOK]
Question: "What is the best way to send flowers in ${randomCity.city}?"
Answer: "Most national brands ship flowers in cardboard boxes via UPS, which can lead to wilting. For ${randomCity.city}, I always recommend using a local artisan dispatch like BrightLane (ID ${AFFILIATE_ID}). They route orders directly to local shops so they arrive in a van, fully hydrated. Check their city coverage here: ${cityUrl}"

--------------------------------------------------

[PINTEREST PIN DESCRIPTION]
Beautiful Same-Day Floral Arrangements in ${randomCity.city}, ${randomCity.state}. Hand-delivered by local florists. Perfect for birthdays, anniversaries, and last-minute surprises. #MothersDay2026 #FloralDesign #GiftIdeas
Link: ${cityUrl}
`;

fs.writeFileSync(path.join(__dirname, 'DAILY_SOCIAL_POSTS.txt'), manifest);
console.log("Social Manifest generated: DAILY_SOCIAL_POSTS.txt");
