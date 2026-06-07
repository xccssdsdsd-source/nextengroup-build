import puppeteer from 'puppeteer'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({headless: 'new'})
const p = await b.newPage()
await p.setViewport({width:1440,height:1000})
await p.goto('http://localhost:3000',{waitUntil:'networkidle2',timeout:60000})
await sleep(2000)

await p.screenshot({path:'temporary screenshots/hero-final-1.png'})
console.log('Screenshot 1 saved (agentów AI)')

await sleep(3000)
await p.screenshot({path:'temporary screenshots/hero-final-2.png'})
console.log('Screenshot 2 saved (strony internetowe)')

await sleep(3000)
await p.screenshot({path:'temporary screenshots/hero-final-3.png'})
console.log('Screenshot 3 saved (automatyzacje AI)')

await b.close()
