const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const portfolio = await page.$('[id="portfolio"]');
  if (portfolio) {
    await portfolio.scrollIntoView();
    await page.screenshot({ path: 'temporary screenshots/screenshot-portfolio.png', fullPage: false });
  }
  await browser.close();
})();
