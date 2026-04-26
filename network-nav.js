const networkLinks = [
    { name: "Same-Day Flowers", url: "https://brightlane.github.io/SameDayFlorist/" },
    { name: "Mother's Day Hub", url: "https://brightlane.github.io/MothersDayFlowers/" },
    { name: "Flight Hub", url: "https://brightlane.github.io/skyscannerflighthub/" },
    { name: "TaxEase Portal", url: "https://brightlane.github.io/TaxEase/" },
    { name: "Valentine's Hub", url: "https://brightlane.github.io/ValentinesDayFlowers/" },
    { name: "Christmas Flowers", url: "https://brightlane.github.io/ChristmasFlowers/" },
    { name: "BrightLane Deals", url: "https://brightlane.github.io/BrightLaneDeals2026/" },
    { name: "ManyChat Automation", url: "https://brightlane.github.io/ManyChatHub/" }
];

function injectNetworkNav() {
    const nav = document.createElement('div');
    nav.style = "background:#1a1a1a; color:#fff; padding:10px; font-size:12px; text-align:center; font-family:sans-serif;";
    
    let html = '<span style="opacity:0.6; margin-right:10px;">BRIGHTLANE NETWORK:</span>';
    networkLinks.forEach((link, index) => {
        html += `<a href="${link.url}" style="color:#4db8ff; text-decoration:none; margin:0 8px;">${link.name}</a>`;
        if (index < networkLinks.length - 1) html += ' | ';
    });

    nav.innerHTML = html;
    document.body.prepend(nav);
}

injectNetworkNav();
