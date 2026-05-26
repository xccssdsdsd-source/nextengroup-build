import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  
  // Scroll down to find the services section
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight * 4);
  });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: './temporary screenshots/services-section.png' });
  console.log('Saved screenshot');
  await browser.close();
})();
