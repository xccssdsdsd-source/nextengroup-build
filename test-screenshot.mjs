import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1000 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
await page.evaluate(() => {
  window.scrollBy(0, 6000);
});
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: 'screenshots/kontakt-section.png', fullPage: false });
await browser.close();
