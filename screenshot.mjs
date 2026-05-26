import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1400 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll to services
  page.evaluate(() => window.scrollBy(0, 1500));
  await new Promise(r => setTimeout(r, 600));
  
  // Open folder - click the folder/button element
  const btn = await page.$('[role="button"]');
  if (btn) {
    await btn.click();
    await new Promise(r => setTimeout(r, 1100));
  }
  
  // Click the middle card (Automatyzacja AI)
  const tiles = await page.$$('.rounded-2xl.border');
  if (tiles.length > 1) {
    await tiles[1].click();
    await new Promise(r => setTimeout(r, 800));
  }
  
  await page.screenshot({ path: './temporary screenshots/services-clicked.png', fullPage: false });
  await browser.close();
})();
