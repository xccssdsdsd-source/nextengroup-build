import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const startTime = Date.now()
await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })
const loadTime = Date.now() - startTime

// Take screenshot
const contactBox = await page.evaluate(() => {
  const contact = document.getElementById('kontakt')
  if (!contact) return null
  const rect = contact.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY
  }
})

if (contactBox) {
  await page.evaluate((box) => {
    window.scrollTo(0, box.top + 150)
  }, contactBox)
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  await page.screenshot({
    path: 'temporary screenshots/final-contact.png',
    fullPage: false
  })
}

console.log(`Page load time: ${loadTime}ms`)
await browser.close()
