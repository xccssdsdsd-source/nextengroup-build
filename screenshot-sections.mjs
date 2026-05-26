import puppeteer from 'puppeteer'

const url = 'http://localhost:3000'
const sections = ['uslugi', 'proces', 'portfolio', 'faq', 'kontakt']

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
await page.setViewport({ width: 1200, height: 800 })

for (const section of sections) {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, section)
  
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: `temporary screenshots/section-${section}.png` })
  console.log(`Captured ${section}`)
}

await browser.close()
