import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'

const act = process.argv[2] || 'first'
const offsets = (process.argv[3] || '700,1150,1600,2500,3450,4100,5100')
  .split(',')
  .map(Number)
const dir = `./temporary screenshots/showcase-${act}`
mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

const first = '[class*="firstAct"]'
const second = '[class*="secondAct"]'
const sel = act === 'first' ? first : second
const phaseNow = () => page.evaluate(() => Number(document.querySelector('[data-phase]')?.dataset.phase))
const scrollTo = (s) => page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, s)

await page.waitForSelector(sel, { timeout: 60000 })
await scrollTo(first)
await new Promise(r => setTimeout(r, 4000))

if (act === 'second') {
  for (let i = 0; i < 30 && (await phaseNow()) < 5; i++) await new Promise(r => setTimeout(r, 300))
  await scrollTo(second)
}

const el = await page.$(sel)
await el.screenshot({ path: `${dir}/settled.png` })

const replay = () => page.evaluate((t) => {
  document.documentElement.style.scrollBehavior = 'auto'
  const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Odtwórz'))
  btn?.click()
  document.querySelector(t)?.scrollIntoView({ block: 'center' })
}, first)

if (act === 'first') {
  for (const offset of offsets) {
    await replay()
    await new Promise(r => setTimeout(r, 1400))
    await replay()
    await new Promise(r => setTimeout(r, offset))
    const phase = await phaseNow()
    await el.screenshot({ path: `${dir}/t${String(offset).padStart(4, '0')}-p${phase}.png` })
    console.log(offset, 'phase', phase)
  }
} else {
  const t0 = Date.now()
  for (const offset of offsets) {
    const wait = offset - (Date.now() - t0)
    if (wait > 0) await new Promise(r => setTimeout(r, wait))
    const phase = await phaseNow()
    await el.screenshot({ path: `${dir}/t${String(offset).padStart(4, '0')}-p${phase}.png` })
    console.log(offset, 'phase', phase, 'at', Date.now() - t0)
  }
}
await browser.close()
