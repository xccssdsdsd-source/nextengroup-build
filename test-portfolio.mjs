import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1600 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

// Scroll to portfolio
await page.evaluate(() => {
  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 1000))

await page.screenshot({ path: './temporary screenshots/portfolio-updated.png', fullPage: false })
console.log('Portfolio screenshot taken')

// Scroll to FAQ
await page.evaluate(() => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 1000))

await page.screenshot({ path: './temporary screenshots/faq-updated.png', fullPage: false })
console.log('FAQ screenshot taken')

await browser.close()
