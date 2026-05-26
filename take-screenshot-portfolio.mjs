import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({headless: 'new'})
const page = await browser.newPage()
await page.setViewport({width: 1280, height: 900})
await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'})
await page.evaluate(() => document.querySelector('#portfolio').scrollIntoView({behavior: 'instant'}))
await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)))
await page.screenshot({path: 'temporary screenshots/portfolio.png'})
console.log('Screenshot taken')
await browser.close()
