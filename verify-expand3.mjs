import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  // Scroll to automation section
  await page.evaluate(() => {
    const el = document.getElementById("automatyzacje");
    if (el) el.scrollIntoView({ behavior: "auto" });
  });
  
  await page.waitForTimeout(1000);
  
  // Click first expand button directly
  const buttons = await page.locator("button:has-text(\"Pokaż więcej przykładów\")");
  const count = await buttons.count();
  console.log(`Found ${count} expand buttons`);
  
  // Get first one and click it
  const firstBtn = buttons.first();
  
  if (await firstBtn.isVisible()) {
    console.log("✓ First expand button visible");
    
    // Get parent card to count examples
    const card = firstBtn.locator("../..");
    let examplesBefore = await card.locator("div[style*=\"background: var(--bg-soft)\"]").count();
    console.log(`Examples before expand: ${examplesBefore}`);
    
    // Click
    await firstBtn.click();
    console.log("✓ Clicked expand button");
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Count examples after
    let examplesAfter = await card.locator("div[style*=\"background: var(--bg-soft)\"]").count();
    console.log(`Examples after expand: ${examplesAfter}`);
    
    if (examplesAfter > examplesBefore) {
      console.log("✓ More examples visible after click");
    }
  }
  
  await browser.close();
})();
