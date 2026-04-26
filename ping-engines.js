const axios = require('axios');

const SITEMAP_URL = "https://brightlane.github.io/SameDayFlorist/sitemap.xml";

async function ping() {
    console.log("Starting Search Engine Ping...");
    try {
        // Ping Bing (Google's public ping is deprecated, they prefer sitemap in robots.txt)
        await axios.get(`https://www.bing.com/ping?sitemap=${SITEMAP_URL}`);
        console.log("✅ Successfully pinged Bing.");
    } catch (error) {
        console.error("❌ Ping failed. Ensure 'axios' is installed.");
    }
}

ping();
