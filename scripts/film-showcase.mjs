import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'

const offsets = (process.argv[2] || '1500,3400,5200,7000,9500,11800,13600,15300,17200,19600')
  .split(',')
  .map(Number)
const dir = './temporary screenshots/showcase'
mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3456', { waitUntil: 'networkidle0', timeout: 90000 })

const sel = '#uslugi [class*="story"]'
await page.waitForSelector(sel, { timeout: 60000 })
await page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, sel)
await new Promise(r => setTimeout(r, 4000))

const el = await page.$(sel)
await el.screenshot({ path: `${dir}/settled.png` })

const replay = () => page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Odtwórz'))
  btn?.click()
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, sel)

for (const offset of offsets) {
  await replay()
  await new Promise(r => setTimeout(r, 1500))
  await replay()
  await new Promise(r => setTimeout(r, offset))
  const state = await page.evaluate(() => {
    const n = document.querySelector('[data-step]')
    return `s${n?.dataset.step}-sc${n?.dataset.scene}`
  })
  await el.screenshot({ path: `${dir}/t${String(offset).padStart(5, '0')}-${state}.png` })
  console.log(offset, state)
}
await browser.close()
