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
  
  // Find the first card
  const firstCard = await page.locator("div").filter({ hasText: "Automatyzacja" }).first();
  
  if (await firstCard.isVisible()) {
    console.log("✓ First card (Automatyzacja) found");
    
    // Get the expand button within the card
    const expandBtn = firstCard.locator("button").filter({ hasText: "Pokaż więcej przykładów" });
    
    if (await expandBtn.isVisible()) {
      console.log("✓ Expand button visible in card");
      
      // Click it
      await expandBtn.click();
      console.log("✓ Clicked expand");
      
      // Wait for animation
      await page.waitForTimeout(800);
      
      // Check if button text changed by waiting for button with new text
      const hideBtn = firstCard.locator("button").filter({ hasText: "Ukryj przykłady" });
      const isHideVisible = await hideBtn.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isHideVisible) {
        console.log("✓ Button changed to 'Ukryj przykłady'");
      } else {
        console.log("⚠ Button text did not change to 'Ukryj przykłady'");
      }
      
      // Count examples in the card
      const exampleDivs = firstCard.locator("div[style*='background: var(--bg-soft)']");
      const count = await exampleDivs.count();
      console.log(`✓ Found ${count} example boxes in card`);
      
      if (count > 1) {
        console.log("✓ Multiple examples visible after expand");
      }
    }
  }
  
  await browser.close();
})();
