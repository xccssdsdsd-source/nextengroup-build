import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

const sel = '#uslugi [class*="story"]'
await page.waitForSelector(sel, { timeout: 60000 })
await page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, sel)
await new Promise(r => setTimeout(r, 1600))

const state = await page.evaluate(() => {
  const node = document.querySelector('[data-step]')
  const cursor = document.querySelector('[class*="cursor"]')
  return {
    step: node?.dataset.step,
    scene: node?.dataset.scene,
    cursorOpacity: cursor ? getComputedStyle(cursor).opacity : 'missing',
  }
})
console.log(JSON.stringify(state))

const el = await page.$(sel)
await el.screenshot({ path: './temporary screenshots/reduced-showcase.png' })
await browser.close()
