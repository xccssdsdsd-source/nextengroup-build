import puppeteer from 'puppeteer'

const [, , url = 'http://localhost:3006'] = process.argv

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 812 })
await page.goto(url, { waitUntil: 'networkidle2' })

// Scroll to kontakt section
await page.evaluate(() => {
  const kontakt = document.getElementById('kontakt')
  if (kontakt) {
    kontakt.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
})

// Wait for Calendly to load
await new Promise(r => setTimeout(r, 4000))

const screenshotPath = './temporary screenshots/screenshot-contact-mobile.png'
await page.screenshot({ path: screenshotPath })

console.log('Saved mobile contact screenshot')
await browser.close()
