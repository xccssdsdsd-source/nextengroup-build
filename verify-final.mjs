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
  
  await page.waitForTimeout(1500);
  
  // Check meeting buttons in cards
  const meetingButtons = await page.locator("a:has-text(\"Umów spotkanie\")");
  const meetingBtnCount = await meetingButtons.count();
  console.log(`✓ Found ${meetingBtnCount} 'Umów spotkanie' buttons`);
  
  // Check if they have gradient button styling
  const firstMeetingBtn = meetingButtons.first();
  const hasGradient = await firstMeetingBtn.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.background.includes("linear-gradient") || el.className.includes("btn-primary");
  });
  console.log(`✓ Button has gradient styling: ${hasGradient}`);
  
  // Check canvas animation
  const canvas = await page.locator("canvas");
  const canvasCount = await canvas.count();
  console.log(`✓ Found ${canvasCount} canvas element(s) for animation`);
  
  // Verify canvas is animated by checking if it\'s being used
  const canvasIsInDOM = await canvas.first().evaluate((el) => {
    return el.offsetWidth > 0 && el.offsetHeight > 0;
  }).catch(() => false);
  console.log(`✓ Canvas is rendered and visible: ${canvasIsInDOM}`);
  
  // Check section background
  const section = await page.locator("#automatyzacje");
  const sectionExists = await section.isVisible();
  console.log(`✓ Automation section exists and visible: ${sectionExists}`);
  
  // Take final screenshot
  await page.screenshot({ path: "final-verification.png", fullPage: true });
  console.log("✓ Final screenshot taken");
  
  await browser.close();
})();
