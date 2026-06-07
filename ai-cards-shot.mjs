import puppeteer from 'puppeteer'
const url = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || 'temporary screenshots/ai-cards.png'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:1800})
try {
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 1500))

  await p.evaluate(() => {
    const el = document.querySelector('#automatyzacje')
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
  })

  await new Promise(r => setTimeout(r, 1000))
  await p.screenshot({path: out, fullPage: false})
  console.log('saved', out)
} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
