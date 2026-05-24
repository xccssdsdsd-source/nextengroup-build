import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Desktop screenshot
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3003#portfolio', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: './temporary screenshots/carousel-desktop.png' });
  
  // Mobile screenshot
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3003#portfolio', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: './temporary screenshots/carousel-mobile.png' });
  
  // Nav screenshot
  await page.setViewport({ width: 1280, height: 100 });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: './temporary screenshots/nav-check.png' });
  
  await browser.close();
  console.log('Screenshots taken');
})();
