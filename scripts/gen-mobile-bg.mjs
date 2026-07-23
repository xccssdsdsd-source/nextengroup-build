// Captures the live AnimatedBackground (blur+mix-blend-mode layers) at a
// mobile viewport and saves it as a static image so mobile can swap the
// expensive live filter/blend stack for a pixel-matching pre-rendered image.
// Usage: node scripts/gen-mobile-bg.mjs [url]
import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3111/'
const out = path.join(__dirname, '..', 'public', 'bg-mobile.webp')

const browser = await puppeteer.launch({ headless: 'new' })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.evaluate(() => {
    const bg = document.querySelector('[data-bg-root]') || document.querySelector('body > div[aria-hidden="true"]')
    if (!bg) throw new Error('AnimatedBackground root not found')
    Array.from(bg.children).forEach((layer, index) => {
      layer.style.setProperty('display', index === 0 ? 'none' : 'block', 'important')
      layer.style.setProperty('animation', 'none', 'important')
    })
    Array.from(document.body.children).forEach((el) => {
      if (el !== bg) el.style.setProperty('display', 'none', 'important')
    })
    document.documentElement.style.setProperty('background', '#02040a', 'important')
  })

  await new Promise((r) => setTimeout(r, 300))

  const el = (await page.$('[data-bg-root]')) || (await page.$('body > div[aria-hidden="true"]'))
  console.log('box', await el.boundingBox())
  await page.screenshot({ path: out, type: 'webp', quality: 90, clip: { x: 0, y: 0, width: 390, height: 844 } })
  console.log('Saved', out)
} finally {
  await browser.close()
}
