import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const errors = []
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()) })
page.on('requestfailed', r => errors.push('REQFAIL: ' + r.url() + ' ' + (r.failure()?.errorText || '')))
page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ': ' + r.url()) })

await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: './temporary screenshots/error-check.png', fullPage: false })

const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500))
const title = await page.title()

console.log('TITLE:', title)
console.log('BODY START:', bodyText)
console.log('ERRORS:', errors.length ? errors.slice(0, 20) : 'none')
await browser.close()
