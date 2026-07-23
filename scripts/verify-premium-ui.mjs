import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })

try {
  for (const viewport of [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 390, height: 844, name: 'mobile' },
  ]) {
    const page = await browser.newPage()
    const errors = []

    await page.setViewport({ width: viewport.width, height: viewport.height })
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
    })
    await page.goto('http://localhost:3111', { waitUntil: 'networkidle0' })
    await new Promise((resolve) => setTimeout(resolve, 2200))

    const result = await page.evaluate(() => ({
      prices: [...document.querySelectorAll('.package-price')].map((element) => element.textContent?.trim()),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      animeCards: document.querySelectorAll('[data-anime-card]').length,
      activeGlareLayers: document.querySelectorAll('[data-anime-card] .tilt-glare').length,
      serviceHeadingAlignment: [...document.querySelectorAll('#uslugi h2')].map(
        (element) => getComputedStyle(element).textAlign,
      ),
    }))

    if (viewport.name === 'desktop') {
      await page.$eval('.service-package-card', (element) => {
        document.documentElement.style.scrollBehavior = 'auto'
        element.scrollIntoView({ block: 'center' })
      })
      await new Promise((resolve) => setTimeout(resolve, 100))
      const box = await page.$eval('.service-package-card', (element) => {
        const rect = element.getBoundingClientRect()
        return { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      })
      result.finePointer = await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
      await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.24)
      await page.$eval('.service-package-card', (element) => {
        element.dispatchEvent(new MouseEvent('mouseenter'))
      })
      await new Promise((resolve) => setTimeout(resolve, 250))
      result.hoverTransform = await page.$eval('.service-package-card', (element) => getComputedStyle(element).transform)
      result.glareOpacity = await page.$eval('.service-package-card .tilt-glare', (element) => getComputedStyle(element).opacity)
    }

    console.log(viewport.name, JSON.stringify(result), 'errors', JSON.stringify(errors))
    await page.close()
  }
} finally {
  await browser.close()
}
