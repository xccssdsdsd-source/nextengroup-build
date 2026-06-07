const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: './navbar-height.png', fullPage: false });
  
  // Measure navbar height
  const navHeight = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    if (!nav) return 'nav not found';
    return nav.getBoundingClientRect().height;
  });
  
  console.log('Navbar height:', navHeight + 'px');
  await browser.close();
})();
