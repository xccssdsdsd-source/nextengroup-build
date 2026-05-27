import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })

// Get bounding box of contact section
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
  // Scroll to middle of contact section
  await page.evaluate((box) => {
    window.scrollTo(0, box.top + 150)
  }, contactBox)
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  await page.screenshot({
    path: 'temporary screenshots/contact-full.png',
    fullPage: false
  })
  
  console.log('Contact screenshot taken')
}

await browser.close()
