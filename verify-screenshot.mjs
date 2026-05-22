import { chromium } from 'playwright'
import { join } from 'path'
import { readdirSync, existsSync, mkdirSync } from 'fs'

const url = 'http://localhost:3000'
const screenshotDir = join(process.cwd(), 'temporary screenshots')

if (!existsSync(screenshotDir)) {
  mkdirSync(screenshotDir, { recursive: true })
}

const files = readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'))
const n = files.length + 1

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

const outPath = join(screenshotDir, `screenshot-${n}.png`)
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()

console.log('Saved:', outPath)
