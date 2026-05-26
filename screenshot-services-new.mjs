import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll to services section
  await page.evaluate(() => {
    const services = document.getElementById('uslugi');
    if (services) services.scrollIntoView({ behavior: 'instant' });
  });
  
  await new Promise(r => setTimeout(r, 800));
  
  await page.screenshot({ path: './temporary screenshots/screenshot-services-new.png', fullPage: false });
  await browser.close();
})();
