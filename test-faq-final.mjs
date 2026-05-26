import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 2000 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

await new Promise(r => setTimeout(r, 2000))

// Scroll to FAQ
await page.evaluate(() => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await new Promise(r => setTimeout(r, 800))

await page.screenshot({ path: './temporary screenshots/faq-final.png', fullPage: true })
console.log('FAQ full screenshot taken')

await browser.close()
