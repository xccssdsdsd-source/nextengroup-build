const puppeteer = require('puppeteer')

const NET = {
  'Fast 4G  (9 Mbps, 60ms)':  { d: 9000, u: 1500, l: 60 },
  'Slow 4G  (4 Mbps, 150ms)': { d: 4000, u: 900,  l: 150 },
}

const once = async (net, cpu, url) => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-dev-shm-usage'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900 })
  await p.setCacheEnabled(false)
  const c = await p.target().createCDPSession()
  await c.send('Network.enable')
  await c.send('Network.emulateNetworkConditions', {
    offline: false, latency: net.l,
    downloadThroughput: net.d * 1024 / 8, uploadThroughput: net.u * 1024 / 8,
  })
  if (cpu > 1) await c.send('Emulation.setCPUThrottlingRate', { rate: cpu })

  let bytes = 0
  p.on('response', r => { bytes += Number(r.headers()['content-length'] || 0) })

  await p.evaluateOnNewDocument(() => {
    window.__t0 = performance.now()
    window.__shader = null
    const scan = () => {
      const cv = document.querySelector('[data-hero-canvas] canvas')
      if (cv && cv.width > 0) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          window.__shader = Math.round(performance.now())
        }))
        return
      }
      requestAnimationFrame(scan)
    }
    requestAnimationFrame(scan)
  })

  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  try {
    await p.waitForFunction(() => window.__shader !== null, { timeout: 45000, polling: 50 })
  } catch {}

  const m = await p.evaluate(() => new Promise(res => {
    let lcp = 0
    try { new PerformanceObserver(l => { for (const e of l.getEntries()) lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true }) } catch {}
    setTimeout(() => res({
      fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0),
      lcp: Math.round(lcp),
      shader: window.__shader,
    }), 1000)
  }))
  await b.close()
  return { ...m, kb: Math.round(bytes / 1024) }
}

const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }

;(async () => {
  const url = process.argv[2] || 'http://localhost:3111/'
  const N = 5
  for (const [label, net] of Object.entries(NET)) {
    for (const cpu of [1, 4]) {
      const runs = []
      await once(net, cpu, url)            // warmup, discarded
      for (let i = 0; i < N; i++) {
        runs.push(await once(net, cpu, url))
        await new Promise(r => setTimeout(r, 3000))   // cooldown
      }
      const ok = runs.filter(r => r.shader !== null)
      const tag = `${label}  CPU ${cpu}x`
      console.log(`\n${tag}`)
      console.log(`  runs shader: ${runs.map(r => r.shader === null ? 'X' : r.shader + 'ms').join('  ')}`)
      console.log(`  FCP    median ${med(runs.map(r => r.fcp))} ms`)
      console.log(`  LCP    median ${med(runs.map(r => r.lcp))} ms`)
      console.log(`  SHADER median ${ok.length ? med(ok.map(r => r.shader)) + ' ms' : 'never'}   (${ok.length}/${N} ok)`)
      console.log(`  transfer ${med(runs.map(r => r.kb))} KB`)
    }
  }
})()
