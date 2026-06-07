import puppeteer from 'puppeteer'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({headless: 'new'})
const p = await b.newPage()
await p.setViewport({width:1440,height:900})
await p.goto('http://localhost:3000',{waitUntil:'networkidle2',timeout:60000})
await sleep(2000)

const h1Info = await p.evaluate(() => {
  const h1 = document.querySelector('h1')
  const computed = window.getComputedStyle(h1)
  return {
    text: h1.textContent,
    fontSize: computed.fontSize,
    fontWeight: computed.fontWeight
  }
})

const subtitleInfo = await p.evaluate(() => {
  const paras = Array.from(document.querySelectorAll('p')).filter(el =>
    el.textContent.includes('Budujemy Twój biznes przez')
  )
  const p = paras[0]

  return {
    fullText: p.textContent,
    spans: Array.from(p.querySelectorAll('span')).map(span => ({
      text: span.textContent,
      color: window.getComputedStyle(span).color,
      fontWeight: window.getComputedStyle(span).fontWeight
    }))
  }
})

console.log('=== H1 Title ===')
console.log('Text:', h1Info.text)
console.log('Font size:', h1Info.fontSize)
console.log('Font weight:', h1Info.fontWeight)

console.log('\n=== Subtitle ===')
console.log('Full text:', subtitleInfo.fullText)
console.log('Spans:', JSON.stringify(subtitleInfo.spans, null, 2))

await sleep(3000)

const subtitle2 = await p.evaluate(() => {
  const paras = Array.from(document.querySelectorAll('p')).filter(el =>
    el.textContent.includes('Budujemy Twój biznes przez')
  )
  return paras[0].textContent
})

console.log('\n=== After 3s rotation ===')
console.log('Subtitle text:', subtitle2)

await b.close()
