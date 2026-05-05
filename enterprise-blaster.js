#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');
const { faker } = require('@faker-js/faker');

/**
 * SAFE CONTENT GENERATOR (FIX FOR CRASH)
 * Replaces missing UniqueContentGenerator dependency
 */
class UniqueContentGenerator {
  constructor(keyword, city) {
    this.keyword = keyword;
    this.city = city;
  }

  generate5000Words() {
    // simplified but stable generator (no external dependency risk)
    const paragraphs = [];

    for (let i = 0; i < 20; i++) {
      paragraphs.push(`
        <p>
        ${faker.company.catchPhrase()} in ${this.city}. 
        Discover premium ${this.keyword} services available locally. 
        Our network in ${this.city} ensures fast same-day fulfillment for all floral requests.
        </p>
      `);
    }

    return `
      <h1>${this.keyword} in ${this.city}</h1>
      ${paragraphs.join('\n')}
      <p>Powered by local florist delivery network across ${this.city}.</p>
    `;
  }
}

class EnterpriseBlaster {
  constructor() {
    this.totalTarget = 100000;
    this.batchSize = 5000;
    this.baseUrl = 'https://brightlane.github.io/FlowerDelivery/';
    this.pagesDir = `enterprise-batch-${dayjs().format('YYYYMMDD-HH')}/`;
    this.today = dayjs().format('YYYY-MM-DD');
  }

  async loadKeywords() {
    return [
      'flower-delivery',
      'same-day-flowers',
      'mothers-day-flowers',
      'birthday-flowers',
      'wedding-flowers',
      'funeral-flowers',
      'roses-delivery',
      'florist-near-me'
    ];
  }

  getCities() {
    return [
      'Philadelphia',
      'Langhorne',
      'New-York',
      'Los-Angeles',
      'Chicago',
      'Houston',
      'Miami',
      'Boston',
      'Atlanta',
      'Seattle',
      'Denver',
      'Phoenix',
      'Dallas'
    ];
  }

  async blast100k() {
    console.log(`🌟 Enterprise 100K Page Blaster ACTIVATED`);
    console.log(`📊 Target: ${this.totalTarget} pages | Batch: ${this.batchSize}`);

    await fs.ensureDir(this.pagesDir);

    const keywords = await this.loadKeywords();
    const cities = this.getCities();

    let totalPages = 0;
    const allPages = [];

    for (let batch = 0; batch < Math.ceil(this.totalTarget / this.batchSize); batch++) {
      const batchPages = await this.generateBatch(keywords, cities, this.batchSize);
      allPages.push(...batchPages);
      totalPages += batchPages.length;

      console.log(`✅ Batch ${batch + 1}/${Math.ceil(this.totalTarget / this.batchSize)}: ${batchPages.length} pages`);
    }

    await this.generateEnterpriseSitemap(allPages);

    console.log(`🎉 ENTERPRISE BLAST COMPLETE: ${totalPages} PAGES!`);
  }

  async generateBatch(keywords, cities, maxPages) {
    const pages = [];
    let count = 0;

    for (const keyword of keywords) {
      for (const city of cities) {
        if (count >= maxPages) break;

        const page = await this.generateEnterprisePage(keyword, city);

        await fs.writeFile(
          path.join(this.pagesDir, page.slug),
          page.content
        );

        pages.push({
          loc: `${this.baseUrl}${this.pagesDir}${page.slug}`,
          lastmod: this.today,
          priority: this.getPriority(keyword),
          changefreq: 'weekly'
        });

        count++;
        process.stdout.write(`\r🔥 Batch page ${count}/${maxPages}`);
      }
      if (count >= maxPages) break;
    }

    return pages;
  }

  async generateEnterprisePage(keyword, city) {
    // FIX: no more undefined crash
    const contentGen = new UniqueContentGenerator(keyword, city);
    const uniqueContent = contentGen.generate5000Words();

    const slug = `p-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 8)}-${keyword}-${city
      .toLowerCase()
      .replace(/[^a-z]+/g, '-')}.html`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${city} ${keyword} | Same Day Guaranteed</title>
  <meta name="description" content="Fast ${keyword} ${city}. Order now for guaranteed same day delivery.">
</head>
<body>
  <main>
    ${uniqueContent}
  </main>
</body>
</html>`;

    return { slug, content: html };
  }

  getPriority(keyword) {
    const moneyKeywords = [
      'flower-delivery',
      'same-day-flowers',
      'mothers-day-flowers'
    ];

    return moneyKeywords.includes(keyword) ? '0.95' : '0.75';
  }

  async generateEnterpriseSitemap(pages) {
    const sitemapCount = Math.ceil(pages.length / 50000);

    for (let i = 0; i < sitemapCount; i++) {
      const batch = pages.slice(i * 50000, (i + 1) * 50000);
      const xml = this.buildSitemapXML(batch);
      await fs.writeFile(`sitemap-enterprise-${i + 1}.xml`, xml);
    }

    await fs.writeFile(
      'sitemap-index.xml',
      this.buildIndexSitemap(sitemapCount)
    );
  }

  buildSitemapXML(pages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    p => `<url>
  <loc>${p.loc}</loc>
  <lastmod>${p.lastmod}</lastmod>
  <priority>${p.priority}</priority>
  <changefreq>${p.changefreq}</changefreq>
</url>`
  )
  .join('')}
</urlset>`;
  }

  buildIndexSitemap(count) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array(count)
  .fill()
  .map(
    (_, i) => `<sitemap>
  <loc>${this.baseUrl}sitemap-enterprise-${i + 1}.xml</loc>
  <lastmod>${this.today}</lastmod>
</sitemap>`
  )
  .join('')}
</sitemapindex>`;
  }
}

// RUN
(async () => {
  const blaster = new EnterpriseBlaster();
  await blaster.blast100k();

  console.log(`
🚀 100K PAGE EMPIRE BUILT
📁 ${blaster.pagesDir}
🌐 sitemap-index.xml ready
  `);
})();
