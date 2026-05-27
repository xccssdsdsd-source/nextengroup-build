import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1200 })
await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })

// Scroll to FAQ section (before contact)
await page.evaluate(() => {
  const faq = document.getElementById('faq')
  if (faq) {
    faq.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
})

await new Promise(resolve => setTimeout(resolve, 500))

await page.screenshot({ 
  path: 'temporary screenshots/faq-section.png',
  fullPage: false
})

console.log('Screenshot saved - FAQ section')
await browser.close()
