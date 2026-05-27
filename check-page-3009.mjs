import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3009', { waitUntil: 'networkidle2' })

const title = await page.$eval('h1', el => el.textContent)
console.log('H1 text:', title)

const heroSection = await page.$('section')
if (heroSection) {
  const box = await heroSection.boundingBox()
  console.log('Hero section bounding box:', box)
}

await browser.close()
