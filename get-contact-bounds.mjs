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
    height: rect.height,
    windowHeight: window.innerHeight,
    scrollHeight: document.body.scrollHeight
  }
})

console.log('Contact section bounds:', JSON.stringify(contactBox, null, 2))

// Scroll to contact
if (contactBox) {
  await page.evaluate((box) => {
    window.scrollTo(0, box.top - 100)
  }, contactBox)
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  await page.screenshot({
    path: 'temporary screenshots/contact-view.png',
    fullPage: false
  })
}

await browser.close()
