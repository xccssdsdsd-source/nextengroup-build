import puppeteer from 'puppeteer'

const url = 'http://localhost:3004'
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
await page.setViewport({ width: 1200, height: 800 })

const sections = [
  { id: 'proces', name: 'Process' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'faq', name: 'FAQ' },
]

for (const section of sections) {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, section.id)
  
  await new Promise(r => setTimeout(r, 2000))
  await page.screenshot({ path: `temporary screenshots/final-${section.name}.png` })
  console.log(`Captured ${section.name}`)
}

await browser.close()
