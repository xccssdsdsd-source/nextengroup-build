import puppeteer from 'puppeteer'
const url = process.argv[2] || 'https://getbuild.pl'
const mobile = process.argv.includes('--mobile')
const throttle = process.argv.includes('--throttle')
const tag = process.argv[3] || 'fl'
const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--use-gl=angle'] })
const page = await browser.newPage()
await page.setViewport(mobile?{width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true}:{width:1440,height:900})
const cdp = await page.createCDPSession()
await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
if (throttle) { await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8}); await cdp.send('Emulation.setCPUThrottlingRate',{rate:4}) }
await page.evaluateOnNewDocument(() => {
  window.__cls = 0; window.__shifts = []
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({v:+e.value.toFixed(4), t:Math.round(e.startTime), src:(e.sources||[]).map(s=>s.node?(s.node.nodeName+'.'+String(s.node.className||'').slice(0,40)):'?')}) } }).observe({type:'layout-shift',buffered:true})
  window.__lcp = null
  new PerformanceObserver(l => { const es=l.getEntries(); const e=es[es.length-1]; window.__lcp={t:Math.round(e.startTime), el:e.element?(e.element.nodeName+'.'+String(e.element.className||'').slice(0,40)):'?', url:e.url} }).observe({type:'largest-contentful-paint',buffered:true})
})
const errs=[]
page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message))
page.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text().slice(0,160))})
page.on('requestfailed',r=>errs.push('REQFAIL: '+r.url().slice(0,110)))
page.on('response',r=>{if(r.status()>=400)errs.push('HTTP '+r.status()+': '+r.url().slice(0,110))})
const t0=Date.now()
await page.goto(url,{waitUntil:'domcontentloaded',timeout:90000})
for (const at of [200,500,900,1500,2500,4000]) {
  await new Promise(r=>setTimeout(r,Math.max(0,at-(Date.now()-t0))))
  await page.screenshot({path:`./temporary screenshots/${tag}-${at}.png`})
}
await new Promise(r=>setTimeout(r,1500))
const m = await page.evaluate(()=>({cls:+window.__cls.toFixed(4), shifts:window.__shifts.slice(0,10), lcp:window.__lcp}))
console.log('CLS:', m.cls); console.log('LCP:', JSON.stringify(m.lcp))
console.log('SHIFTS:'); m.shifts.forEach(s=>console.log('  ', JSON.stringify(s)))
console.log('ERRORS:', errs.length?errs.slice(0,10):'none')
await browser.close()
