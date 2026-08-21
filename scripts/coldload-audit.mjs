import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:3000'
const runs = Number(process.argv[3] || 6)
const mobile = process.argv.includes('--mobile')
const throttle = process.argv.includes('--throttle')

const browser = await puppeteer.launch({
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--use-gl=angle', '--no-sandbox'],
})

let bad = 0
for (let i = 0; i < runs; i++) {
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 200)) })
  page.on('requestfailed', r => errors.push('REQFAIL: ' + r.url().slice(0, 120) + ' ' + (r.failure()?.errorText || '')))
  page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ': ' + r.url().slice(0, 120)) })

  const cdp = await page.createCDPSession()
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
  if (throttle) {
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 })
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  }

  const t0 = Date.now()
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 })

  // sample the above-the-fold state early — this is what "first load" looks like to a human
  const samples = []
  for (const at of [400, 1200, 2500, 4000]) {
    await new Promise(r => setTimeout(r, Math.max(0, at - (Date.now() - t0))))
    samples.push(await page.evaluate(() => {
      const vh = innerHeight
      const inView = el => { const r = el.getBoundingClientRect(); return r.top < vh * 0.92 && r.bottom > 0 && r.width > 0 && r.height > 0 }
      const all = [...document.querySelectorAll('[data-fade-in],[data-stagger-group] > *,.section-title,.section-copy,[data-reveal]')]
      const hiddenInView = all.filter(el => inView(el) && parseFloat(getComputedStyle(el).opacity) < 0.05)
      const h1 = document.querySelector('h1')
      return {
        htmlClass: document.documentElement.className,
        h1Visible: h1 ? parseFloat(getComputedStyle(h1).opacity) > 0.5 && h1.getBoundingClientRect().height > 0 : null,
        h1Text: h1 ? h1.innerText.slice(0, 60) : null,
        revealTotal: all.length,
        hiddenInView: hiddenInView.length,
        hiddenSample: hiddenInView.slice(0, 4).map(e => (e.tagName + '.' + String(e.className).slice(0, 60))),
        bodyLen: document.body.innerText.length,
      }
    }))
  }

  // then scroll through and count anything permanently stuck
  await page.evaluate(() => { const s = document.createElement('style'); s.textContent = 'html{scroll-behavior:auto !important}'; document.head.appendChild(s) })
  for (let y = 0; y < 12; y++) { await page.evaluate(() => scrollBy(0, 900)); await new Promise(r => setTimeout(r, 90)) }
  await new Promise(r => setTimeout(r, 1200))
  const stuck = await page.evaluate(() => {
    const all = [...document.querySelectorAll('[data-fade-in],[data-stagger-group] > *,.section-title,.section-copy,[data-reveal]')]
    return all.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.05 && el.getBoundingClientRect().height > 0)
      .map(e => e.tagName + '.' + String(e.className).slice(0, 70))
  })

  const s = samples
  const flag = errors.length || stuck.length || s[1].hiddenInView > 0 || !s[1].h1Visible
  if (flag) bad++
  console.log(`\n=== RUN ${i + 1}${flag ? '  ***PROBLEM***' : '  ok'} ===`)
  console.log('  html class:', s[3].htmlClass)
  s.forEach((x, k) => console.log(`  @${[400, 1200, 2500, 4000][k]}ms h1Visible=${x.h1Visible} hiddenInView=${x.hiddenInView}/${x.revealTotal} bodyLen=${x.bodyLen}` + (x.hiddenInView ? ' ' + JSON.stringify(x.hiddenSample) : '')))
  console.log('  stuck after scroll:', stuck.length, stuck.slice(0, 6))
  console.log('  errors:', errors.length ? errors.slice(0, 8) : 'none')
  await ctx.close()
}
console.log(`\nSUMMARY: ${bad}/${runs} runs had problems`)
await browser.close()
