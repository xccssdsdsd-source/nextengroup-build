// Kills any process already listening on PORT (default 3000) before `next dev`
// starts. Prevents a leftover/zombie dev server from a previous session
// silently answering requests with stale compiled JS while a new one starts
// on the next free port instead — the exact cause of repeated
// "hydration mismatch with class names that don't exist in the source"
// reports on this project.
const { execSync } = require('node:child_process')

const port = process.env.PORT || 3000

if (process.platform !== 'win32') {
  process.exit(0)
}

try {
  const output = execSync(`netstat -ano | findstr LISTENING | findstr :${port}`, {
    encoding: 'utf8',
  })
  const pids = new Set(
    output
      .split('\n')
      .map((line) => line.trim().split(/\s+/).pop())
      .filter(Boolean)
  )
  for (const pid of pids) {
    try {
      execSync(`taskkill /F /PID ${pid} /T`, { stdio: 'ignore' })
      console.log(`[free-dev-port] killed stale process ${pid} on port ${port}`)
    } catch {
      // already gone
    }
  }
} catch {
  // nothing listening on the port — nothing to do
}
