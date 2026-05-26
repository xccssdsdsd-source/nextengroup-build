import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1400 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

await page.evaluate(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
await new Promise(r => setTimeout(r, 800))

// Screenshot 1: Closed view
await page.screenshot({ path: './temporary screenshots/portfolio-closed.png', fullPage: false })
console.log('1. Portfolio closed (just mockup visible)')

// Click to expand
await page.evaluate(() => {
  const btn = document.querySelector('button[class*="group"]')
  if (btn && !btn.textContent.includes('Poprzednia') && !btn.textContent.includes('Następna')) {
    btn.click()
  }
})
await new Promise(r => setTimeout(r, 1000))

// Screenshot 2: Expanded view
await page.screenshot({ path: './temporary screenshots/portfolio-expanded.png', fullPage: false })
console.log('2. Portfolio expanded (with all details)')

await browser.close()
