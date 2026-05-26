import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({headless: 'new'})
const page = await browser.newPage()
await page.setViewport({width: 1280, height: 800})
await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'})
await page.evaluate(() => {
  const elem = document.querySelector('#portfolio')
  if (elem) elem.scrollIntoView({behavior: 'instant'})
})
await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)))
await page.screenshot({path: 'temporary screenshots/portfolio-full.png', fullPage: false})
console.log('Screenshot taken')
await browser.close()
