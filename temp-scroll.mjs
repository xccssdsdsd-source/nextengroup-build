import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 800 })
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' })
await new Promise(resolve => setTimeout(resolve, 2000))

// Scroll to find the consultation section
await page.evaluate(() => {
  const konsultacja = document.querySelector('#konsultacja')
  if (konsultacja) {
    konsultacja.scrollIntoView({ behavior: 'smooth' })
  }
})

await new Promise(resolve => setTimeout(resolve, 1000))
await page.screenshot({ path: 'screenshots/form-section.png' })
console.log('Form section screenshot saved')
await browser.close()
