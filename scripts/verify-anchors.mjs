import puppeteer from 'puppeteer'
const url = process.argv[2] || 'http://localhost:3000'
const runs = Number(process.argv[3]||6)
const cpu = Number(process.argv[4]||1)
const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--use-gl=angle'] })
let fails=0,total=0
for (let run=0; run<runs; run++){
  for (const href of ['#uslugi','#kontakt','#pakiety']) {
    const ctx=await browser.createBrowserContext(); const page=await ctx.newPage()
    await page.setViewport({width:1440,height:900})
    const cdp=await page.createCDPSession(); await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
    if(cpu>1) await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpu})
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:90000})
    await new Promise(r=>setTimeout(r, 400 + run*120))   // vary how impatient the click is
    const h=await page.evaluateHandle(x=>[...document.querySelectorAll(`nav a[href="${x}"]`)].find(a=>a.getBoundingClientRect().width>0), href)
    const box=await h.asElement().boundingBox()
    if(!box){ await ctx.close(); continue }
    await page.mouse.click(box.x+box.width/2, box.y+box.height/2)
    await new Promise(r=>setTimeout(r,Number(process.env.SETTLE||3500)))
    const top=await page.evaluate(x=>Math.round(document.querySelector(x).getBoundingClientRect().top), href)
    total++; const bad=Math.abs(top)>140; if(bad)fails++
    console.log(`run${run} ${href.padEnd(10)} top=${String(top).padStart(6)} ${bad?'FAIL':'ok'}`)
    await ctx.close()
  }
}
console.log(`\nFAILURES: ${fails}/${total}  (cpu x${cpu})`)
await browser.close()
