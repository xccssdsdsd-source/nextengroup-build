import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'
const tag = process.argv[2] || 'after'
const dir = './temporary screenshots/viz'
mkdirSync(dir, { recursive: true })
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3456', { waitUntil: 'networkidle0', timeout: 90000 })
await new Promise(r => setTimeout(r, 2500))
const ys = [0, 500, 900, 1300, 1700, 2000]
for (const y of ys) {
  await page.evaluate((v) => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, v) }, y)
  await new Promise(r => setTimeout(r, 1100))
  await page.screenshot({ path: `${dir}/${tag}-y${String(y).padStart(4,'0')}.png` })
}
console.log(await page.evaluate(() => {
  const b = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) } }
  return JSON.stringify({ device: b('.hero-device'), col: b('.hero-device-col'), lid: b('.laptop-lid'), frame: b('.scrub-frame'), stage: Math.round(document.querySelector('.hero-stage').offsetHeight) })
}))
await browser.close()
