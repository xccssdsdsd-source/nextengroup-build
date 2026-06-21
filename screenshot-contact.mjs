import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise(r => setTimeout(r, 2000))

for (let i = 0; i < 30; i++) {
  await page.evaluate((n) => window.scrollTo(0, n * 500), i)
  await new Promise(r => setTimeout(r, 100))
}
await new Promise(r => setTimeout(r, 2000))

const totalH = await page.evaluate(() => document.body.scrollHeight)
const contactTop = await page.evaluate(() => {
  const el = document.getElementById('kontakt')
  return el ? el.getBoundingClientRect().top + window.scrollY : null
})
console.log('totalH', totalH, 'contactTop', contactTop)

const dir = './temporary screenshots'
const files = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'))
const filename = path.join(dir, `screenshot-${files.length + 1}.png`)

await page.evaluate((y) => window.scrollTo(0, y), contactTop - 50)
await new Promise(r => setTimeout(r, 500))
await page.screenshot({ path: filename })
console.log(`Screenshot saved to ${filename}`)
await browser.close()
