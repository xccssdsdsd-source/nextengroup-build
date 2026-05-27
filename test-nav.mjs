import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const browser = await puppeteer.launch({
  headless: 'shell',
  args: ['--disable-gpu', '--no-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 200 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

await page.screenshot({ path: 'screenshots/nav-test.png' })
console.log('Screenshot taken: screenshots/nav-test.png')

await browser.close()
