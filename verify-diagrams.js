const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  
  // Click on "Automatyzacje" menu link
  await page.click('a[href="#automatyzacje"]');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: './diagrams-final.png', fullPage: false });
  console.log('Diagrams screenshot taken');
  await browser.close();
})();
