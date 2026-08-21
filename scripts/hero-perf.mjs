import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
await new Promise(r => setTimeout(r, 1200))
await page.mouse.move(720, 450)

const collect = async (deltaY, steps) => {
  await page.evaluate(() => {
    window.__f = []
    let last = performance.now()
    window.__stop = false
    const tick = (t) => { window.__f.push(t - last); last = t; if (!window.__stop) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  })
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel({ deltaY })
    await new Promise(r => setTimeout(r, 16))
  }
  return page.evaluate(() => {
    window.__stop = true
    const f = window.__f.slice(5).sort((a, b) => a - b)
    return {
      frames: f.length,
      p50: +f[Math.floor(f.length * 0.5)].toFixed(2),
      p95: +f[Math.floor(f.length * 0.95)].toFixed(2),
      max: +f[f.length - 1].toFixed(2),
      over20ms: f.filter(x => x > 20).length,
    }
  })
}

await page.evaluate(() => window.scrollTo(0, 0))
await collect(160, 60); await page.evaluate(() => window.scrollTo(0, 0)); await new Promise(r => setTimeout(r, 800));
 console.log('down fast', JSON.stringify(await collect(160, 60)))
console.log('up fast  ', JSON.stringify(await collect(-160, 60)))
await page.evaluate(() => window.scrollTo(0, 0))
console.log('down slow', JSON.stringify(await collect(40, 90)))

const sample = async (p, from) => page.evaluate(async (p, from) => {
  const stage = document.getElementById('hero')
  const span = stage.offsetHeight - window.innerHeight
  window.scrollTo(0, from)
  await new Promise(r => setTimeout(r, 500))
  window.scrollTo(0, Math.round(p * span))
  await new Promise(r => setTimeout(r, 2200))
  const r = stage.querySelector('.hero-device').getBoundingClientRect()
  return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]
}, p, from)

for (const p of [0.2, 0.5, 0.8]) {
  const span = await page.evaluate(() => document.getElementById('hero').offsetHeight - window.innerHeight)
  const down = await sample(p, 0)
  const up = await sample(p, span)
  console.log('hysteresis', p, JSON.stringify(down), JSON.stringify(up), down.join() === up.join() ? 'MATCH' : 'DIFF')
}

await browser.close()
