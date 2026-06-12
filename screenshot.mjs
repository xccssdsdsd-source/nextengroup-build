import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const files = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'))
const num = files.length + 1
const filename = path.join(dir, `screenshot-${num}.png`)

await page.screenshot({ path: filename })
console.log(`Screenshot saved to ${filename}`)

await browser.close()
