import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

await page.evaluate(() => {
  const serviceSection = document.getElementById('uslugi')
  if (serviceSection) serviceSection.scrollIntoView({ behavior: 'instant' })
})
await new Promise(r => setTimeout(r, 1000))

await page.screenshot({ path: './temporary screenshots/test-services-1-closed.png', fullPage: false })
console.log('1. Services section with folder closed')

const folder = await page.$('[role="button"][aria-label*="folder"]')
if (folder) {
  await folder.click()
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: './temporary screenshots/test-services-2-open.png', fullPage: false })
  console.log('2. Services section with folder open and cards visible')
  
  const firstCard = await page.evaluate(() => {
    const cards = document.querySelectorAll('.grid > div[style*="borderTop"]')
    return cards.length > 0
  })
  
  if (firstCard) {
    const card = await page.$('.grid > div:nth-child(1)')
    if (card) {
      await card.click()
      await new Promise(r => setTimeout(r, 600))
      await page.screenshot({ path: './temporary screenshots/test-services-3-expanded.png', fullPage: false })
      console.log('3. First service card expanded')
    }
  }
}

await browser.close()
