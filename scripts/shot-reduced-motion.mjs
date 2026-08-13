import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelector('[class*="firstAct"]')?.scrollIntoView({ block: 'center' })
})
await new Promise(r => setTimeout(r, 1500))

const state = await page.evaluate(() => ({
  phase: document.querySelector('[data-phase]')?.dataset.phase,
  cursorVisible: getComputedStyle(document.querySelector('[class*="cursor"]')).opacity,
}))
console.log(JSON.stringify(state))

let el = await page.$('[class*="firstAct"]')
await el.screenshot({ path: './temporary screenshots/reduced-first.png' })
await page.evaluate(() => document.querySelector('[class*="secondAct"]')?.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 900))
el = await page.$('[class*="secondAct"]')
await el.screenshot({ path: './temporary screenshots/reduced-second.png' })
await browser.close()
