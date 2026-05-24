import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: './temporary screenshots/screenshot-full-27.png' });
  console.log('Saved full screenshot');
  await browser.close();
})();
