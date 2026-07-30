import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:3000'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.setCacheEnabled(false)

const client = await page.target().createCDPSession()
await client.send('Network.enable')
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 40,
  downloadThroughput: (10 * 1024 * 1024) / 8,
  uploadThroughput: (5 * 1024 * 1024) / 8,
})

await page.evaluateOnNewDocument(() => {
  window.__marks = {}
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__marks[entry.name] = entry.startTime
    }
  })
  po.observe({ type: 'largest-contentful-paint', buffered: true })
  po.observe({ type: 'paint', buffered: true })
})

const t0 = Date.now()
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
const loadTime = Date.now() - t0

const metrics = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0]
  return {
    marks: window.__marks,
    domContentLoaded: nav.domContentLoadedEventEnd,
    loadEvent: nav.loadEventEnd,
    ttfb: nav.responseStart,
    transferSize: nav.transferSize,
  }
})

const resources = await page.evaluate(() =>
  performance.getEntriesByType('resource').map((r) => ({
    name: r.name.split('/').pop().split('?')[0],
    type: r.initiatorType,
    size: Math.round(r.transferSize / 1024),
    dur: Math.round(r.duration),
  })).sort((a, b) => b.size - a.size).slice(0, 15)
)

console.log('wall clock load (networkidle0):', loadTime, 'ms')
console.log(JSON.stringify(metrics, null, 2))
console.log('top resources by size (KB):')
console.table(resources)

await browser.close()
