import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto('http://localhost:3004', { waitUntil: 'networkidle2' })

// Get full page height
const fullHeight = await page.evaluate(() => document.body.scrollHeight)

// Take screenshots of different sections
const sections = [
  { name: 'hero', selector: 'main section:first-child', scroll: 0 },
  { name: 'services', selector: '#uslugi', scroll: null },
  { name: 'process', selector: '#proces', scroll: null },
  { name: 'portfolio', selector: '#portfolio', scroll: null },
  { name: 'faq', selector: '#faq', scroll: null },
  { name: 'contact', selector: '#kontakt', scroll: null },
  { name: 'footer', selector: 'footer', scroll: null }
]

for (const section of sections) {
  const element = await page.$(section.selector)
  if (element) {
    const box = await element.boundingBox()
    await page.evaluate((pos) => {
      window.scrollTo(0, pos - 80)
    }, box.y)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await page.screenshot({
      path: `temporary screenshots/${section.name}.png`,
      fullPage: false
    })
    console.log(`Screenshot: ${section.name}`)
  }
}

await browser.close()
