import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1200 })
await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })

// Scroll to contact section
await page.evaluate(() => {
  const contact = document.getElementById('kontakt')
  if (contact) {
    contact.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
})

// Wait a bit for any animations
await new Promise(resolve => setTimeout(resolve, 800))

await page.screenshot({ 
  path: 'temporary screenshots/contact-updated.png',
  fullPage: false
})

console.log('Screenshot saved to temporary screenshots/contact-updated.png')
await browser.close()
