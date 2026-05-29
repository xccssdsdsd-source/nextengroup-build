import puppeteer from 'puppeteer'

const [, , url = 'http://localhost:3006'] = process.argv

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1600 })
await page.goto(url, { waitUntil: 'networkidle2' })

// Scroll to kontakt section and wait
const scrollResult = await page.evaluate(() => {
  const kontakt = document.getElementById('kontakt')
  if (kontakt) {
    kontakt.scrollIntoView({ behavior: 'instant', block: 'center' })
    return true
  }
  return false
})

// Wait longer for Calendly to load
await new Promise(r => setTimeout(r, 4000))

const screenshotPath = './temporary screenshots/screenshot-contact-actual.png'
await page.screenshot({ path: screenshotPath })

console.log('Saved contact screenshot')
await browser.close()
