import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'
const dir = './temporary screenshots/viz'
mkdirSync(dir, { recursive: true })
const tag = process.argv[2] || 'now'
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3456', { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto'
  let y = 0
  while (y < document.body.scrollHeight) { y += 600; window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
  window.scrollTo(0, 0)
})
await new Promise(r => setTimeout(r, 600))
await page.evaluate(() => document.querySelector('#uslugi')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 1200))
await page.screenshot({ path: `${dir}/${tag}-viewport-top.png` })
const sec = await page.$('#uslugi')
await sec.screenshot({ path: `${dir}/${tag}-section.png` })
const m = await page.evaluate(() => {
  const q = (s) => document.querySelector(s)
  const box = (s) => { const e = q(s); if (!e) return null; const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) } }
  return { section: box('#uslugi'), story: box('#uslugi [class*="story"]'), stage: box('#uslugi [class*="stage"]'), vw: innerWidth, vh: innerHeight }
})
console.log(JSON.stringify(m, null, 2))
await browser.close()
