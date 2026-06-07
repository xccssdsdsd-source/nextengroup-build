const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Scroll to automatyzacje section
  await page.evaluate(() => {
    document.getElementById('automatyzacje')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: './diagrams-check.png', fullPage: false });
  
  console.log('Screenshot saved');
  await browser.close();
})();
