import puppeteer from 'puppeteer'
const url = process.argv[2]
const out = process.argv[3] || 'temporary screenshots/shot.png'
const w = +(process.argv[4]||1440), h = +(process.argv[5]||900)
const b = await puppeteer.launch()
const p = await b.newPage()
await p.setViewport({width:w,height:h})
await p.goto(url,{waitUntil:'networkidle0',timeout:60000})
await new Promise(r=>setTimeout(r,1200))
await p.screenshot({path:out})
await b.close()
console.log('saved',out)
