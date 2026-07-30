import puppeteer from 'puppeteer'
import fs from 'fs'

const url = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || 'trace.json'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1500))

await page.tracing.start({ path: out, screenshots: false, categories: ['devtools.timeline', 'blink.user_timing'] })

const height = await page.evaluate(() => document.body.scrollHeight)
const steps = 40
for (let i = 0; i <= steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round((height / steps) * i))
  await new Promise((r) => setTimeout(r, 60))
}
await new Promise((r) => setTimeout(r, 300))

await page.tracing.stop()
await browser.close()

const trace = JSON.parse(fs.readFileSync(out, 'utf8'))
const events = trace.traceEvents

const byName = {}
for (const e of events) {
  if (e.ph === 'X' && e.dur) {
    byName[e.name] = (byName[e.name] || 0) + e.dur
  }
}
const sorted = Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 20)
console.log('top event types by total self+children duration (us):')
for (const [name, dur] of sorted) console.log(name, (dur / 1000).toFixed(1), 'ms')

const funcCalls = {}
for (const e of events) {
  if (e.name === 'FunctionCall' && e.args?.data) {
    const key = `${e.args.data.functionName || '(anon)'} @ ${(e.args.data.url || '').split('/').pop()}`
    funcCalls[key] = (funcCalls[key] || 0) + (e.dur || 0)
  }
}
console.log('\ntop FunctionCall by time (ms):')
for (const [name, dur] of Object.entries(funcCalls).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
  console.log((dur / 1000).toFixed(1), 'ms', name)
}
