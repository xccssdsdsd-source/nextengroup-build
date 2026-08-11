import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage()
  await page.setViewport(vp)
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
    const s = document.createElement('style')
    s.textContent = 'html{scroll-behavior:auto !important}'
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
  })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 120000 })
  await page.evaluate(async () => { let y=0; while (y<document.body.scrollHeight){y+=900;window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))} window.scrollTo(0,0) })
  await new Promise(r => setTimeout(r, 900))
  const out = await page.evaluate(() => {
    const w = window.innerWidth
    const clipped = (el) => {
      let p = el.parentElement
      while (p && p !== document.body) {
        const cs = getComputedStyle(p)
        if (/hidden|clip|auto|scroll/.test(cs.overflowX)) return true
        p = p.parentElement
      }
      return false
    }
    const bad = []
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || getComputedStyle(el).position === 'fixed') return
      if ((r.right > w + 1 || r.left < -1) && !clipped(el)) {
        bad.push(`${el.tagName}.${el.className.toString().slice(0, 48)} [${Math.round(r.left)}→${Math.round(r.right)}]`)
      }
    })
    return { w, sw: document.documentElement.scrollWidth, bad: [...new Set(bad)].slice(0, 10) }
  })
  console.log(JSON.stringify(out, null, 1))
  await page.close()
}
await browser.close()
