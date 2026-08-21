import puppeteer from 'puppeteer'
const base = process.argv[2] || 'https://getbuild.pl'
const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--use-gl=angle'] })
// pull routes from sitemap
const p0 = await browser.newPage()
const xml = await (await p0.goto(base+'/sitemap.xml')).text()
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname).map(p=>base.replace(/\/$/,'')+p)
await p0.close()
console.log('routes:', routes.length)
let problems = 0
for (const url of routes) {
  const ctx = await browser.createBrowserContext(); const page = await ctx.newPage()
  await page.setViewport({width:1440,height:900})
  const cdp = await page.createCDPSession(); await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
  const errs=[]
  page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message.slice(0,160)))
  page.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text().slice(0,160))})
  page.on('requestfailed',r=>errs.push('REQFAIL: '+r.url().slice(0,110)))
  page.on('response',r=>{if(r.status()>=400)errs.push('HTTP '+r.status()+': '+r.url().slice(0,110))})
  let status = 0
  try { const resp = await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); status = resp.status() } catch(e){ errs.push('NAV: '+e.message.slice(0,120)) }
  await new Promise(r=>setTimeout(r,1800))
  const info = await page.evaluate(()=>({
    title: document.title, h1: document.querySelectorAll('h1').length,
    h1text: document.querySelector('h1')?.innerText.slice(0,50)||null,
    bodyLen: document.body.innerText.length,
    canonical: document.querySelector('link[rel=canonical]')?.href||null,
    desc: document.querySelector('meta[name=description]')?.content?.length||0,
    jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
  })).catch(()=>({}))
  const bad = errs.length || status!==200 || info.h1!==1 || info.bodyLen<400
  if (bad) problems++
  console.log(`${bad?'✗':'✓'} ${status} ${url.replace(base,'')||'/'}  h1=${info.h1} body=${info.bodyLen} ld=${info.jsonld} desc=${info.desc}`)
  if (errs.length) errs.slice(0,5).forEach(e=>console.log('     ', e))
  await ctx.close()
}
console.log('\nROUTES WITH PROBLEMS:', problems, '/', routes.length)
await browser.close()
