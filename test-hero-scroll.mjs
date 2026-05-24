import puppeteer from 'puppeteer'

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })
  await new Promise(r => setTimeout(r, 1000))

  // Screenshot at 0% scroll
  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: './temporary screenshots/hero-0-percent.png' })
  console.log('Saved hero-0-percent.png')

  // Get document height to calculate 50% scroll
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const scrollTo50 = docHeight * 0.5

  // Screenshot at 50% scroll
  await page.evaluate((scrollY) => {
    window.scrollTo(0, scrollY)
  }, scrollTo50)
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: './temporary screenshots/hero-50-percent.png' })
  console.log('Saved hero-50-percent.png')

  await browser.close()
})()
