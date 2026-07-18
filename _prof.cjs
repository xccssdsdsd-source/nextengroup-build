const puppeteer = require('puppeteer')
;(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900 })
  await p.setCacheEnabled(false)
  const c = await p.target().createCDPSession()
  await c.send('Network.enable')
  await c.send('Network.emulateNetworkConditions', { offline:false, latency:60, downloadThroughput:9000*1024/8, uploadThroughput:1500*1024/8 })

  const t0 = Date.now()
  const ev = []
  p.on('request', r => { const u=r.url(); if (u.endsWith('.hdr')||u.includes('/chunks/')) ev.push([Date.now()-t0,'REQ ',u.split('/').pop().slice(0,42)]) })
  p.on('response', r => { const u=r.url(); if (u.endsWith('.hdr')||u.includes('/chunks/')) ev.push([Date.now()-t0,'RESP',u.split('/').pop().slice(0,42)]) })

  await p.evaluateOnNewDocument(() => {
    window.__m = {}
    const mark = k => { if (!window.__m[k]) window.__m[k] = Math.round(performance.now()) }
    const scan = () => {
      if (document.querySelector('[data-hero-backdrop]')) mark('backdropMounted')
      const cv = document.querySelector('[data-hero-canvas] canvas')
      if (cv) { mark('canvasEl'); if (cv.width>0) { mark('canvasSized'); requestAnimationFrame(()=>requestAnimationFrame(()=>mark('firstFrame'))); return } }
      requestAnimationFrame(scan)
    }
    requestAnimationFrame(scan)
  })

  await p.goto('http://localhost:3111/', { waitUntil:'domcontentloaded' })
  await p.waitForFunction(() => window.__m.firstFrame, { timeout:45000, polling:50 })
  const m = await p.evaluate(() => ({ ...window.__m,
    fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{}).startTime||0),
    res: performance.getEntriesByType('resource').filter(r=>r.name.endsWith('.hdr')||r.name.includes('/chunks/')).map(r=>({n:r.name.split('/').pop().slice(0,42),s:Math.round(r.startTime),e:Math.round(r.responseEnd),kb:Math.round((r.transferSize||0)/1024)})).sort((a,b)=>a.s-b.s)
  }))
  console.log('--- resource timeline (start -> end, size) ---')
  m.res.forEach(r=>console.log(`  ${String(r.s).padStart(5)} -> ${String(r.e).padStart(5)} ms  ${String(r.kb).padStart(4)}KB  ${r.n}`))
  console.log('--- milestones ---')
  console.log(`  FCP              ${m.fcp} ms`)
  console.log(`  backdrop mounted ${m.backdropMounted} ms`)
  console.log(`  canvas element   ${m.canvasEl} ms`)
  console.log(`  canvas sized     ${m.canvasSized} ms`)
  console.log(`  FIRST FRAME      ${m.firstFrame} ms`)
  await b.close()
})()
