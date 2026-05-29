import puppeteer from 'puppeteer'

const [, , url = 'http://localhost:3006'] = process.argv

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 2000 })
await page.goto(url, { waitUntil: 'networkidle2' })

// Scroll to kontakt section
await page.evaluate(() => {
  const kontakt = document.getElementById('kontakt')
  if (kontakt) {
    kontakt.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
})

// Wait for Calendly to load
await new Promise(r => setTimeout(r, 3000))

const screenshotPath = './temporary screenshots/screenshot-contact-full.png'
await page.screenshot({ path: screenshotPath, fullPage: true })

console.log('Saved full contact screenshot')
await browser.close()
