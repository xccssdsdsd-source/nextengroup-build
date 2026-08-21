import puppeteer from 'puppeteer'
import fs from 'fs'
const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'states'
const dir = './temporary screenshots'
fs.mkdirSync(dir, { recursive: true })
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
  const s = document.createElement('style')
  s.textContent = 'html{scroll-behavior:auto !important}'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
})
await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
  window.scrollTo(0, 0)
})
await new Promise(r => setTimeout(r, 1500))

const targets = JSON.parse(process.argv[4] || '[]')
for (const [name, sel, hoverSel] of targets) {
  const ok = await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return false
    el.scrollIntoView({ block: 'center' })
    return true
  }, sel)
  if (!ok) { console.log('MISSING', name, sel); continue }
  await new Promise(r => setTimeout(r, 400))
  const hv = await page.$(hoverSel || sel)
  if (hv) { await hv.hover().catch(() => {}) }
  await new Promise(r => setTimeout(r, 700))
  const el = await page.$(sel)
  await el.screenshot({ path: `${dir}/${tag}-${name}.png` }).catch(e => console.log('ERR', name, e.message))
  console.log('shot', name)
}
await browser.close()
