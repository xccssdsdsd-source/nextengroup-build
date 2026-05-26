import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3006', { waitUntil: 'networkidle0' });
  
  // Scroll to process section
  await page.evaluate(() => {
    const proces = document.getElementById('proces');
    if (proces) proces.scrollIntoView({ behavior: 'instant' });
  });
  
  await new Promise(r => setTimeout(r, 800));
  
  await page.screenshot({ path: './temporary screenshots/screenshot-process.png', fullPage: false });
  await browser.close();
})();
