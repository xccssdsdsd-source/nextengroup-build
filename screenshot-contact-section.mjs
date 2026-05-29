import puppeteer from 'puppeteer'

const [, , url = 'http://localhost:3006'] = process.argv

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 3000 })
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

// Get the kontakt section bounds
const bounds = await page.evaluate(() => {
  const kontakt = document.getElementById('kontakt')
  if (!kontakt) return null
  const rect = kontakt.getBoundingClientRect()
  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
})

console.log('Bounds:', bounds)

const screenshotPath = './temporary screenshots/screenshot-contact-section.png'
if (bounds) {
  await page.screenshot({ path: screenshotPath, clip: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height } })
} else {
  await page.screenshot({ path: screenshotPath })
}

console.log('Saved contact section screenshot')
await browser.close()
