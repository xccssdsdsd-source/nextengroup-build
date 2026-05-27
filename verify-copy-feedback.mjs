import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })

// Scroll to contact section
const contactBox = await page.evaluate(() => {
  const contact = document.getElementById('kontakt')
  if (!contact) return null
  const rect = contact.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height
  }
})

if (contactBox) {
  await page.evaluate((box) => {
    window.scrollTo(0, box.top + 150)
  }, contactBox)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Take screenshot before clicking copy
  await page.screenshot({
    path: 'temporary screenshots/contact-before-copy.png',
    fullPage: false
  })
  
  // Click copy button
  const copyButton = await page.$('button[title*="Skopiuj"]')
  if (copyButton) {
    await copyButton.click()
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Take screenshot after clicking
    await page.screenshot({
      path: 'temporary screenshots/contact-after-copy.png',
      fullPage: false
    })
  }
}

await browser.close()
