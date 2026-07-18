const puppeteer = require('puppeteer')
const test = async (label, args, headless) => {
  try {
    const b = await puppeteer.launch({ headless, args })
    const p = await b.newPage()
    const info = await p.evaluate(() => {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2') || c.getContext('webgl')
      if (!gl) return 'NO WEBGL'
      const d = gl.getExtension('WEBGL_debug_renderer_info')
      return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)
    })
    console.log(`${label.padEnd(34)} -> ${info}`)
    await b.close()
  } catch (e) { console.log(`${label.padEnd(34)} -> FAIL ${String(e).slice(0,80)}`) }
}
;(async () => {
  await test('headless new, default', [], 'new')
  await test('headless new, d3d11', ['--use-gl=angle','--use-angle=d3d11','--enable-gpu'], 'new')
  await test('headful, d3d11', ['--use-gl=angle','--use-angle=d3d11'], false)
  await test('headful, default', [], false)
})()
