import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()

let errors = []
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text())
  if (msg.type() === 'warn') errors.push('WARN: ' + msg.text())
})

await page.setViewport({ width: 1440, height: 1400 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

console.log('Loaded')
if (errors.length > 0) {
  console.log('Errors:', errors.slice(0, 5))
}

await page.screenshot({ path: './temporary screenshots/check-errors.png', fullPage: false })
console.log('Screenshot taken')

await browser.close()
