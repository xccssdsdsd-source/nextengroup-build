import puppeteer from 'puppeteer'

const points = [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.65, 0.85, 0.92, 1]
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
await new Promise(r => setTimeout(r, 1500))

for (const p of points) {
  const info = await page.evaluate(async (p) => {
    const stage = document.getElementById('hero')
    const span = stage.offsetHeight - window.innerHeight
    window.scrollTo(0, Math.round(p * span))
    await new Promise(r => setTimeout(r, 1400))
    const sticky = stage.querySelector('.pin-sticky')
    const card = stage.querySelector('.device-card')
    const r = card.getBoundingClientRect()
    const cta = document.querySelector('.sticky-cta')
    const c = cta?.getBoundingClientRect()
    return {
      p: getComputedStyle(sticky).getPropertyValue('--p').trim(),
      card: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
      immersive: document.body.classList.contains('hero-immersive'),
      cta: c ? [Math.round(c.left), Math.round(c.top), Math.round(c.width)] : null,
      mark: [...stage.querySelectorAll('.hero-mark > span')].find(s => s.dataset.on === 'true')?.textContent,
    }
  }, p)
  console.log(p, JSON.stringify(info))
  await page.screenshot({ path: `./temporary screenshots/hero-p${String(p).replace('.', '_')}.png` })
}
await browser.close()
