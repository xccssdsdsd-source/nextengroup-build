import puppeteer from 'puppeteer'

const routes = [
  '/', '/strony-www', '/strony-internetowe-dla-firm', '/agenci-ai', '/wiedza-ai',
  '/realizacje', '/realizacje/pm-apartments', '/blog', '/seo-dla-firm', '/audyt-seo',
  '/polityka-prywatnosci', '/regulamin', '/dziekujemy', '/does-not-exist-404-check',
]

const browser = await puppeteer.launch({ headless: true })

for (const mobile of [false, true]) {
  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport(mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 })
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
      const s = document.createElement('style')
      s.textContent = 'html{scroll-behavior:auto !important}'
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
    })
    const errors = []
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.slice(0, 160)))
    page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 160)) })
    page.on('requestfailed', r => { if (!r.url().includes('chrome-extension')) errors.push('REQFAIL: ' + r.url().slice(0, 140)) })
    page.on('response', r => { if (r.status() >= 400 && r.status() !== 404) errors.push('HTTP ' + r.status() + ': ' + r.url().slice(0, 140)) })

    let status = 'OK'
    try {
      const resp = await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle0', timeout: 60000 })
      status = resp ? resp.status() : 'no-response'
    } catch (e) {
      status = 'NAV-ERROR: ' + e.message.slice(0, 100)
    }
    await new Promise(r => setTimeout(r, 800))

    let overflow = { bad: false }
    try {
      await page.evaluate(async () => { let y = 0; while (y < document.body.scrollHeight) { y += 1200; window.scrollTo(0, y); await new Promise(r => setTimeout(r, 30)) } })
      await new Promise(r => setTimeout(r, 500))
      overflow = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
        bad: document.documentElement.scrollWidth > window.innerWidth + 1,
      }))
    } catch {}

    console.log(`${mobile ? 'MOB' : 'DSK'} ${route} :: status=${status} hOverflow=${overflow.bad}(${overflow.sw}/${overflow.iw}) errors=${errors.length ? [...new Set(errors)].slice(0, 6) : 'none'}`)
    await page.close()
  }
}
await browser.close()
