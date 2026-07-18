const fs = require('fs'), path = require('path')
const p = path.join(process.cwd(), '.next', 'react-loadable-manifest.json')
console.log('exists:', fs.existsSync(p))
try {
  const m = JSON.parse(fs.readFileSync(p, 'utf8'))
  const e = Object.entries(m).find(([k]) => k.includes('HeroGradientCanvas'))
  console.log('entry key:', e && e[0])
  console.log('files:', e && e[1].files)
} catch (err) { console.log('THREW:', String(err).slice(0,200)) }
