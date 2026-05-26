import puppeteer from 'puppeteer'

const url = 'http://localhost:3002'
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
const results = { url, links: [], checks: {} }

const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 })
results.rootStatus = resp ? resp.status() : 'no-response'

// basic checks
results.checks.title = await page.title()
results.checks.h1 = await page.evaluate(() => !!document.querySelector('h1'))
results.checks.metaDescription = await page.evaluate(() => !!document.querySelector('meta[name="description"]'))
results.checks.htmlLang = await page.evaluate(() => document.documentElement.lang || null)
results.checks.skipLink = await page.evaluate(() => {
  const sel = 'a[href^="#"], a.skip, a.skip-link'
  return !!document.querySelector(sel)
})

// gather internal links
const anchors = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')))
const unique = Array.from(new Set(anchors.filter(Boolean)))

for (const href of unique) {
  try {
    if (href.startsWith('http')) {
      // external
      results.links.push({ href, external: true })
      continue
    }
    // normalize internal URLs using provided base
    const target = new URL(href, url).href
    const r = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 30000 })
    results.links.push({ href, target, status: r ? r.status() : 'no-response' })
    // go back
    await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  } catch (e) {
    results.links.push({ href, error: e.message })
    await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  }
}

console.log(JSON.stringify(results, null, 2))
await browser.close()
