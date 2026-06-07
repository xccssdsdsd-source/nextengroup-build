import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  // Scroll to the automation section
  await page.evaluate(() => {
    const el = document.getElementById("automatyzacje");
    if (el) el.scrollIntoView({ behavior: "auto" });
  });
  
  // Wait a bit for rendering
  await page.waitForTimeout(1500);
  
  // Take full page screenshot
  await page.screenshot({ path: "automation-section.png", fullPage: true });
  console.log("Screenshot saved");
  
  // Count elements by text content
  const allText = await page.textContent("body");
  const hasExpandText = allText.includes("Pokaż więcej przykładów");
  const hasMeetingText = allText.includes("Umów spotkanie");
  const hasCanvasAnimText = allText.includes("Automatyzacje i Agenci AI");
  
  console.log("Automatyzacje i Agenci AI section found: " + hasCanvasAnimText);
  console.log("Expand button text found: " + hasExpandText);
  console.log("Meeting button text found: " + hasMeetingText);
  
  // Count canvas elements
  const canvasCount = await page.locator("canvas").count();
  console.log("Canvas elements found: " + canvasCount);
  
  await browser.close();
})();
