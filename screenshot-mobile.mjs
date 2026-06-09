import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 667 })
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const files = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-mobile-'))
const num = files.length + 1
const filename = path.join(dir, `screenshot-mobile-${num}.png`)

await page.screenshot({ path: filename })
console.log(`Mobile screenshot saved to ${filename}`)

await browser.close()
