import puppeteer from 'puppeteer'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'
const dir = './temporary screenshots'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
await new Promise(r => setTimeout(r, 1200))

const stage = await page.evaluate(() => {
  const el = document.getElementById('hero')
  return { height: el.offsetHeight, vh: window.innerHeight }
})
const range = stage.height - stage.vh
console.log('pin range (px):', range)

for (const p of [0, 0.25, 0.5, 0.75, 1]) {
  await page.evaluate(y => window.scrollTo(0, y), Math.round(range * p))
  await new Promise(r => setTimeout(r, 450))
  const t = await page.evaluate(() => {
    const el = document.querySelector('[data-scrub-track]')
    return el ? getComputedStyle(el).transform : 'none'
  })
  console.log(`p=${p}  transform=${t}`)
  await page.screenshot({ path: path.join(dir, `scrub-${String(p).replace('.', '')}.png`) })
}

await browser.close()
