import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  
  // Scroll to services section
  await page.evaluate(() => {
    window.scrollBy(0, 1300);
  });
  await new Promise(r => setTimeout(r, 500));
  
  // Click the folder to open it
  await page.click('[role="button"]');
  await new Promise(r => setTimeout(r, 800));
  
  // Scroll down a bit to see all tiles
  await page.evaluate(() => {
    window.scrollBy(0, 200);
  });
  await new Promise(r => setTimeout(r, 300));
  
  // Click first tile to expand
  const tiles = await page.$$('div[style*="border"]');
  if (tiles.length > 0) {
    await tiles[0].click();
    await new Promise(r => setTimeout(r, 500));
  }
  
  await page.screenshot({ path: './temporary screenshots/services-expanded.png', fullPage: false });
  console.log('Saved expanded screenshot');
  await browser.close();
})();
