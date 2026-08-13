import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'

const dir = './temporary screenshots/stepper'
mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

const sel = '#uslugi [class*="story"]'
await page.waitForSelector(sel, { timeout: 60000 })
await page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, sel)
await new Promise(r => setTimeout(r, 3000))

const el = await page.$(sel)
for (let i = 0; i < 5; i++) {
  await page.evaluate((index) => {
    const items = document.querySelectorAll('#uslugi ol li button')
    items[index]?.click()
  }, i)
  await new Promise(r => setTimeout(r, 900))
  const state = await page.evaluate(() => {
    const n = document.querySelector('[data-step]')
    return `s${n?.dataset.step}-sc${n?.dataset.scene}`
  })
  await el.screenshot({ path: `${dir}/jump${i}-${state}.png` })
  console.log('jump', i, state)
}
await browser.close()
