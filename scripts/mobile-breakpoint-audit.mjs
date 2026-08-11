import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:3000'
const outDir = path.resolve('temporary screenshots')
fs.mkdirSync(outDir, { recursive: true })

const requestedViewport = process.argv[3]
const viewports = [
  { name: '320x568', width: 320, height: 568 },
  { name: '360x640', width: 360, height: 640 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
].filter(viewport => !requestedViewport || viewport.name === requestedViewport)

const browser = await puppeteer.launch({ headless: true, timeout: 120000, protocolTimeout: 120000 })
const report = []

for (const viewport of viewports) {
  const page = await browser.newPage()
  page.setDefaultTimeout(120000)
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
    const style = document.createElement('style')
    style.textContent = 'html{scroll-behavior:auto!important}'
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style))
  })
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 })
  await page.waitForSelector('#hero', { timeout: 120000 })
  await new Promise(resolve => setTimeout(resolve, 1800))

  await page.screenshot({ path: path.join(outDir, `mobile-polish-hero-${viewport.name}.png`) })

  await page.evaluate(async () => {
    let y = 0
    while (y < document.documentElement.scrollHeight) {
      y += 520
      window.scrollTo(0, y)
      await new Promise(resolve => setTimeout(resolve, 45))
    }
  })
  await new Promise(resolve => setTimeout(resolve, 900))
  await page.evaluate(() => document.querySelector('#przewagi')?.scrollIntoView({ block: 'start' }))
  await new Promise(resolve => setTimeout(resolve, 650))

  const comparison = await page.$('#przewagi')
  await comparison?.screenshot({ path: path.join(outDir, `mobile-polish-compare-${viewport.name}.png`) })

  const metrics = await page.evaluate(() => {
    const width = window.innerWidth
    const visibleTextHidden = []
    const overflow = []
    document.querySelectorAll('h1,h2,h3,p,a,button,span').forEach(element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      if (rect.bottom > 0 && rect.top < window.innerHeight && element.textContent?.trim() && Number(style.opacity) < 0.05) {
        visibleTextHidden.push(element.textContent.trim().slice(0, 70))
      }
    })
    document.querySelectorAll('body *').forEach(element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      if (style.position === 'fixed' || rect.width === 0) return
      if (rect.left < -1 || rect.right > width + 1) {
        let parent = element.parentElement
        let intentionallyClipped = false
        while (parent && parent !== document.body) {
          const parentStyle = getComputedStyle(parent)
          if (/hidden|clip|auto|scroll/.test(parentStyle.overflowX)) {
            intentionallyClipped = true
            break
          }
          parent = parent.parentElement
        }
        if (!intentionallyClipped) overflow.push(`${element.tagName}.${String(element.className).slice(0, 42)}`)
      }
    })
    const hero = document.querySelector('.hero-copy')?.getBoundingClientRect()
    const nav = document.querySelector('.site-nav')?.getBoundingClientRect()
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      heroTop: hero ? Math.round(hero.top) : null,
      navBottom: nav ? Math.round(nav.bottom) : null,
      hiddenText: [...new Set(visibleTextHidden)],
      overflow: [...new Set(overflow)].slice(0, 12),
    }
  })
  report.push({ viewport: viewport.name, ...metrics })
  await page.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 2))
