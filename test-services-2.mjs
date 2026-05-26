import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 2400 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

await page.screenshot({ path: './temporary screenshots/test-full-page.png', fullPage: true })
console.log('Full page screenshot taken')

await browser.close()
