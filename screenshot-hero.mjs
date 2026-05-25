import puppeteer from 'puppeteer'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise(r => setTimeout(r, 3000))

const outPath = join(__dirname, 'temporary screenshots', 'hero-current.png')
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()
console.log('Saved:', outPath)
