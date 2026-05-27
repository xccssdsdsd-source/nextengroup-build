import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

console.log('Running Lighthouse audit...')
const metrics = await page.metrics()
console.log('Page metrics:', metrics)

await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

const perfData = await page.evaluate(() => {
  const navigation = performance.getEntriesByType('navigation')[0]
  const paints = performance.getEntriesByType('paint')
  const resources = performance.getEntriesByType('resource')
  
  return {
    navigationTiming: {
      domInteractive: navigation.domInteractive,
      domContentLoaded: navigation.domContentLoadedEventEnd,
      loadEventEnd: navigation.loadEventEnd,
      domainLookupTime: navigation.domainLookupEnd - navigation.domainLookupStart,
      connectTime: navigation.connectEnd - navigation.connectStart,
      requestTime: navigation.responseStart - navigation.requestStart,
      responseTime: navigation.responseEnd - navigation.responseStart,
      renderTime: navigation.domInteractive - navigation.responseEnd,
      domInteractiveTime: navigation.domContentLoadedEventEnd - navigation.domInteractive,
    },
    paintTiming: paints.map(p => ({ name: p.name, time: p.startTime })),
    resourceCount: resources.length,
    totalResourceSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    largestResources: resources
      .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
      .slice(0, 10)
      .map(r => ({ name: r.name, size: r.transferSize, duration: r.duration }))
  }
})

console.log('\n=== Page Performance Data ===')
console.log('Navigation Timing (ms):')
console.log(perfData.navigationTiming)
console.log('\nPaint Timing (ms):')
console.log(perfData.paintTiming)
console.log(`\nTotal resources: ${perfData.resourceCount}`)
console.log(`Total resource size: ${(perfData.totalResourceSize / 1024).toFixed(2)} KB`)
console.log('\nLargest Resources:')
perfData.largestResources.forEach((r, i) => {
  console.log(`${i+1}. ${r.name} - ${(r.size / 1024).toFixed(2)} KB (${r.duration.toFixed(2)}ms)`)
})

fs.writeFileSync('perf-audit.json', JSON.stringify(perfData, null, 2))
await browser.close()
