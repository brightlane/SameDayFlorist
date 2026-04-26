const fs = require('fs');
const path = require('path');

const SITE_NAME = "SameDayFlorist";
const AFFILIATE_ID = "2013017799";
const URL = "https://brightlane.github.io/SameDayFlorist/";

const template = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title} | ${SITE_NAME}</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
        nav { margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        nav a { margin-right: 15px; color: #e63946; text-decoration: none; font-weight: bold; }
        h1 { color: #222; }
        .footer { margin-top: 50px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
    </style>
</head>
<body>
    <nav><a href="${URL}">Home</a> <a href="${URL}about.html">About</a> <a href="${URL}privacy.html">Privacy</a> <a href="${URL}terms.html">Terms</a></nav>
    <h1>${title}</h1>
    ${content}
    <div class="footer">&copy; 2026 ${SITE_NAME} Network. Affiliate ID: ${AFFILIATE_ID}</div>
</body>
</html>`;

const pages = [
    {
        file: 'about.html',
        title: 'About Our Local Network',
        body: `<p>${SITE_NAME} was founded in 2026 to solve the "Boxed Flower" problem. We believe flowers should be hand-delivered by local artisans, not shipped in cardboard boxes.</p><p>By routing orders through the FloristOne portal (ID: ${AFFILIATE_ID}), we support brick-and-mortar florists in over 10,000 cities across the US.</p>`
    },
    {
        file: 'privacy.html',
        title: 'Privacy Policy',
        body: `<p>Your privacy is paramount. ${SITE_NAME} does not collect, store, or sell personal data. All order processing and payment information is handled securely by our partner, FloristOne, using industry-standard SSL encryption.</p>`
    },
    {
        file: 'terms.html',
        title: 'Terms of Service',
        body: `<p>By using this website, you agree that we are a lead-generation service. We do not personally fulfill floral orders; instead, we route your request to local artisans. Delivery times and flower availability are subject to local shop capacity in each specific city.</p>`
    }
];

pages.forEach(p => {
    fs.writeFileSync(path.join(__dirname, p.file), template(p.title, p.body));
});

console.log("Legal Bundle (About, Privacy, Terms) Generated Successfully.");
