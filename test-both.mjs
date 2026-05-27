import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()

// Mobile
const mobPage = await browser.newPage()
await mobPage.setViewport({ width: 375, height: 667 })
await mobPage.goto('http://localhost:3009', { waitUntil: 'networkidle2' })
const mobHero = await mobPage.$eval('section', el => el.getBoundingClientRect().height)
console.log('Mobile hero height:', mobHero)

// Desktop
const desPage = await browser.newPage()
await desPage.setViewport({ width: 1920, height: 1080 })
await desPage.goto('http://localhost:3009', { waitUntil: 'networkidle2' })
const desHero = await desPage.$eval('section', el => el.getBoundingClientRect().height)
console.log('Desktop hero height:', desHero)

await mobPage.screenshot({ path: 'screenshots/mob-test.png', fullPage: false })
await desPage.screenshot({ path: 'screenshots/desk-test.png', fullPage: false })

await browser.close()
