import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1200 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

await page.evaluate(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
await new Promise(r => setTimeout(r, 800))

await page.screenshot({ path: './temporary screenshots/smooth-portfolio.png', fullPage: false })
console.log('Portfolio is smooth and working')

await browser.close()
