import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })

const shoot = async (label, viewport, reduce, points) => {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  if (reduce) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
  await new Promise(r => setTimeout(r, 1500))
  for (const p of points) {
    await page.evaluate(async (p) => {
      const stage = document.getElementById('hero')
      const span = Math.max(stage.offsetHeight - window.innerHeight, 1)
      window.scrollTo(0, Math.round(p * span))
      await new Promise(r => setTimeout(r, 1200))
    }, p)
    await page.screenshot({ path: `./temporary screenshots/hero-${label}-${String(p).replace('.', '_')}.png` })
  }
  const cls = await page.evaluate(() => document.getElementById('hero').offsetHeight)
  console.log(label, 'stage height', cls)
  await page.close()
}

await shoot('m', { width: 390, height: 844, deviceScaleFactor: 2 }, false, [0, 0.25, 0.55, 0.9])
await shoot('rm', { width: 1440, height: 900 }, true, [0])
await browser.close()
