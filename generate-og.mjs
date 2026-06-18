import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()

await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2 })
await page.goto('https://getbuild.pl', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise(r => setTimeout(r, 4000))

const box = await page.evaluate(() => {
  const divs = [...document.querySelectorAll('div')]
  for (const el of divs) {
    if (el.querySelector('svg') && el.children.length <= 3) {
      const rect = el.getBoundingClientRect()
      if (rect.width > 500 && rect.width < 1100 && rect.height > 350 && rect.top > 50 && rect.top < 400) {
        return { x: rect.left, y: rect.top, w: rect.width, h: rect.height }
      }
    }
  }
  return null
})

console.log('box:', box)
const outPath = path.join(__dirname, 'public', 'getbuild-logo-og.png')

const padTop = 60, padRight = 60, padBottom = 60, padLeft = 20
await page.screenshot({
  path: outPath,
  type: 'png',
  clip: {
    x: Math.max(0, (box?.x ?? 600) - padLeft),
    y: Math.max(0, (box?.y ?? 70) - padTop),
    width: (box?.w ?? 700) + padLeft + padRight,
    height: (box?.h ?? 500) + padTop + padBottom
  }
})

await browser.close()
console.log('Done:', outPath)
