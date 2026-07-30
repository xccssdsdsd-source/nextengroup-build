import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:3000'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1500))

await page.evaluate(() => {
  window.__frames = []
  let last = performance.now()
  function tick(t) {
    window.__frames.push(t - last)
    last = t
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})

const client = await page.target().createCDPSession()
await client.send('Performance.enable')

const height = await page.evaluate(() => document.body.scrollHeight)
const steps = 40
for (let i = 0; i <= steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round((height / steps) * i))
  await new Promise((r) => setTimeout(r, 60))
}
await new Promise((r) => setTimeout(r, 500))

const frames = await page.evaluate(() => window.__frames)
const longFrames = frames.filter((f) => f > 33.3)
const worst = [...frames].sort((a, b) => b - a).slice(0, 10)

console.log('total frames sampled:', frames.length)
console.log('frames > 33ms (sub-30fps):', longFrames.length, `(${((longFrames.length / frames.length) * 100).toFixed(1)}%)`)
console.log('frames > 50ms (sub-20fps):', frames.filter((f) => f > 50).length)
console.log('worst 10 frame times (ms):', worst.map((f) => f.toFixed(1)))
console.log('avg frame time (ms):', (frames.reduce((a, b) => a + b, 0) / frames.length).toFixed(2))

const metrics = await client.send('Performance.getMetrics')
console.log('TaskDuration (s):', metrics.metrics.find((m) => m.name === 'TaskDuration')?.value.toFixed(2))

await browser.close()
