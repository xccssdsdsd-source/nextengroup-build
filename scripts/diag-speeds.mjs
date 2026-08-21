import puppeteer from 'puppeteer'
const url = process.argv[2] || 'https://getbuild.pl'
const profiles = [
  ['normal', 400, 70], ['fling', 900, 40], ['teleport', 4000, 20], ['slow', 250, 120],
]
const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--use-gl=angle'] })
for (const [name, step, delay] of profiles) {
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.evaluate(() => { const s=document.createElement('style'); s.textContent='html{scroll-behavior:auto !important}'; document.head.appendChild(s) })
  await new Promise(r=>setTimeout(r,600))
  let y = 0, h = await page.evaluate(()=>document.body.scrollHeight)
  while (y < h) { await page.evaluate(s=>scrollBy(0,s), step); y += step; await new Promise(r=>setTimeout(r,delay)); h = await page.evaluate(()=>document.body.scrollHeight) }
  await new Promise(r=>setTimeout(r,1500))
  const res = await page.evaluate(() => {
    const all=[...document.querySelectorAll('[data-fade-in],[data-stagger-group] > *,.section-title,.section-copy,[data-img-reveal],[data-motion-title],[data-motion-copy]')]
    const stuck = all.filter(el=>parseFloat(getComputedStyle(el).opacity)<0.05 && el.getBoundingClientRect().height>0)
    const pending = [...document.querySelectorAll('[data-deferred-section="pending"]')]
    return { total: all.length, stuck: stuck.length, stuckWithIoVisible: stuck.filter(e=>e.classList.contains('io-visible')).length, pendingSections: pending.length }
  })
  console.log(name.padEnd(10), JSON.stringify(res))
  await ctx.close()
}
await browser.close()
