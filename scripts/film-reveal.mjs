import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const url = process.argv[2] || 'http://localhost:3000'
const target = process.argv[3] || '#przewagi'
const tag = process.argv[4] || 'reveal'
const stop = Number(process.argv[5] ?? 0.42)
const dir = './temporary screenshots'
fs.mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true, args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
  const s = document.createElement('style')
  s.textContent = 'html{scroll-behavior:auto !important}'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
})

await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })

// Park just above the section so its reveal has not been spent, then let the
// deferred subtree render before the run starts.
await page.evaluate((sel) => {
  const el = document.querySelector(sel)
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 1.35)
}, target)
await new Promise((r) => setTimeout(r, 1400))

const before = await page.evaluate((sel) => {
  const els = [...document.querySelectorAll(`${sel} [data-stagger-group] > *, ${sel} .section-title`)]
  return els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.05).length + '/' + els.length
}, target)
console.log('hidden before scroll:', before)

await page.evaluate(
  ([sel, at]) => {
    const el = document.querySelector(sel)
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * at)
  },
  [target, stop],
)

const start = Date.now()
for (const ms of [0, 90, 200, 340, 500, 700, 950, 1300]) {
  const wait = ms - (Date.now() - start)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  await page.screenshot({ path: path.join(dir, `${tag}-f${String(ms).padStart(4, '0')}.png`) })
}

console.log(
  'still hidden after 1.3s:',
  await page.evaluate((sel) => {
    const els = [...document.querySelectorAll(`${sel} [data-stagger-group] > *, ${sel} .section-title`)]
    return els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.05).length + '/' + els.length
  }, target),
)
await browser.close()
