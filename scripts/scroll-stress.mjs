import puppeteer from 'puppeteer'

const profiles = [
  { name: 'normal', step: 400, wait: 70 },
  { name: 'fling', step: 900, wait: 40 },
  { name: 'teleport', step: 4000, wait: 20 },
  { name: 'slow', step: 250, wait: 120 },
]

const browser = await puppeteer.launch({ headless: true })
for (const mobile of [false, true]) {
  for (const p of profiles) {
    const page = await browser.newPage()
    await page.setViewport(mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 })
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
      const s = document.createElement('style')
      s.textContent = 'html{scroll-behavior:auto !important}'
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
    })
    const errors = []
    page.on('pageerror', e => errors.push(e.message.slice(0, 120)))
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 120000 })
    await page.evaluate(async ({ step, wait }) => {
      let y = 0
      while (y < document.body.scrollHeight) {
        y += step
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, wait))
      }
    }, p)
    await new Promise(r => setTimeout(r, 2200))
    const res = await page.evaluate(() => {
      const sel = '[data-fade-in], [data-stagger-group] > *, .section-title, .section-copy, .section-kicker, [data-img-reveal]'
      const stuck = [...document.querySelectorAll(sel)].filter(el => {
        const cs = getComputedStyle(el)
        return parseFloat(cs.opacity) < 0.05 && !el.classList.contains('io-visible')
      })
      const overflow = document.documentElement.scrollWidth > window.innerWidth + 1
      return { stuck: stuck.length, sample: stuck.slice(0, 3).map(e => e.className.toString().slice(0, 50)), overflow, sw: document.documentElement.scrollWidth, iw: window.innerWidth }
    })
    console.log(`${mobile ? 'MOB' : 'DSK'} ${p.name}: stuck=${res.stuck} hOverflow=${res.overflow} (${res.sw}/${res.iw}) errors=${errors.length}`, res.stuck ? res.sample : '')
    await page.close()
  }
}
await browser.close()
