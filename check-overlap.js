const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Scroll to the automatyzacje section
  await page.evaluate(() => {
    document.getElementById('automatyzacje')?.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Wait a bit for smooth scroll to settle
  await page.waitForTimeout(800);
  await page.screenshot({ path: './section-issue.png', fullPage: false });
  
  // Check navbar and heading positions
  const info = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    const section = document.getElementById('automatyzacje');
    const heading = section?.querySelector('.section-title');
    
    return {
      navHeight: nav?.getBoundingClientRect().height || 0,
      navBottom: nav?.getBoundingClientRect().bottom || 0,
      sectionTop: section?.getBoundingClientRect().top || 0,
      headingTop: heading?.getBoundingClientRect().top || 0,
      headingText: heading?.textContent || 'not found'
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
