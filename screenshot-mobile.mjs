import puppeteer from 'puppeteer'
import { readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 })
await new Promise(r => setTimeout(r, 2000))

const screenshotDir = join(__dirname, 'temporary screenshots')
const files = readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-mobile-'))
const n = files.length + 1
const outPath = join(screenshotDir, `screenshot-mobile-${n}.png`)
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()
console.log('Saved:', outPath)
