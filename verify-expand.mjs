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
  
  // Find and click the first expand button
  const expandButton = await page.locator("button").filter({ hasText: "Pokaż więcej przykładów" }).first();
  
  if (await expandButton.isVisible()) {
    console.log("✓ Expand button found and visible");
    
    // Check initial state - should show only first example
    const examplesBeforeClick = await page.locator("div[style*='background: var(--bg-soft)']").count();
    console.log(`Examples visible before expand: ${examplesBeforeClick}`);
    
    // Click to expand
    await expandButton.click();
    console.log("✓ Clicked expand button");
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Check examples after click
    const examplesAfterClick = await page.locator("div[style*='background: var(--bg-soft)']").count();
    console.log(`Examples visible after expand: ${examplesAfterClick}`);
    
    // Check button text changed
    const buttonText = await expandButton.textContent();
    console.log(`Button text after click: "${buttonText}"`);
    
    // Take screenshot
    await page.screenshot({ path: "expanded-card.png", fullPage: true });
    console.log("Screenshot saved");
  } else {
    console.log("✗ Expand button not found");
  }
  
  await browser.close();
})();
