import puppeteer from 'puppeteer'
import { join } from 'path'
import { readdirSync, existsSync, mkdirSync } from 'fs'
import { homedir } from 'os'

const url = 'http://localhost:3000'
const screenshotDir = join(process.cwd(), 'temporary screenshots')

if (!existsSync(screenshotDir)) {
  mkdirSync(screenshotDir, { recursive: true })
}

const files = readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'))
const n = files.length + 1

const executablePath = join(homedir(), '.cache/puppeteer/chrome-headless-shell/win64-147.0.7727.56/chrome-headless-shell-win64/chrome-headless-shell.exe')

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 })
await new Promise(r => setTimeout(r, 2000))

const outPath = join(screenshotDir, `screenshot-${n}.png`)
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()

console.log('Saved:', outPath)
