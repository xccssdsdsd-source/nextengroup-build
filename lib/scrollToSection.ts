const getNavOffset = () => {
  if (typeof window === 'undefined') return 0
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 80
}

const targetTop = (el: HTMLElement) =>
  el.getBoundingClientRect().top + window.scrollY - getNavOffset()

// 'instant', not 'auto': html carries scroll-behavior: smooth, and 'auto' defers
// to that, so every "jump" here animated — and the per-frame pin below kept
// restarting the animation, landing progressively shorter the further the target.
const jumpTo = (el: HTMLElement) => {
  window.scrollTo({ top: Math.max(targetTop(el), 0), behavior: 'instant' })
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Every nav pill used to teleport the page. The reason was real — deferred
// sections mount and grow *while* the scroll runs, so a browser-owned smooth
// scroll aims at a position that no longer exists and lands short — but the
// answer is to re-aim every frame rather than to give up the movement: the
// reader keeps the thread between where they were and where they now are.
// The destination is recomputed on each tick, so a section growing mid-flight
// bends the path instead of breaking it.
const glide = (el: HTMLElement, done: () => void, cancelled: () => boolean) => {
  const from = window.scrollY
  const distance = Math.abs(targetTop(el) - from)
  if (distance < 8) {
    done()
    return
  }
  // Short hops stay quick, a jump to the foot of a 13 000px page is allowed a
  // little more time — but never so much that the reader waits for the page.
  const duration = Math.min(820, Math.max(380, distance * 0.32))
  const start = performance.now()

  const step = (now: number) => {
    if (cancelled()) return
    const p = Math.min(1, (now - start) / duration)
    const to = Math.max(targetTop(el), 0)
    window.scrollTo({ top: from + (to - from) * easeInOutCubic(p), behavior: 'instant' })
    if (p < 1) requestAnimationFrame(step)
    else done()
  }
  requestAnimationFrame(step)
}

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  window.dispatchEvent(new Event('getbuild:reveal'))

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let frames = 0
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      // Deferred sections above the target mount and expand past the height they
      // reserved, which pushes the target down after the jump — the further away
      // it is, the more it drifts. Hold the pin until its position stops moving
      // rather than for a fixed number of frames, and let any real user input win.
      let last = Number.NaN
      let stable = 0
      let ticks = 0
      let cancelled = false
      const stop = () => {
        cancelled = true
        events.forEach((type) => window.removeEventListener(type, stop))
      }
      const events = ['wheel', 'touchstart', 'keydown'] as const
      events.forEach((type) => window.addEventListener(type, stop, { once: true, passive: true }))

      const pin = () => {
        if (cancelled) return
        const top = targetTop(el)
        // Position alone is not enough to call it settled: right after the jump
        // it sits still for a few frames before React commits the reveal and the
        // sections start growing. Wait for every deferred section to mount too.
        const mounted = !document.querySelector('[data-deferred-section="pending"]')
        stable = Math.abs(top - last) < 0.5 ? stable + 1 : 0
        last = top
        jumpTo(el)
        if ((!mounted || stable < 6) && ticks++ < 240) requestAnimationFrame(pin)
        else stop()
      }

      // A glide is only worth starting if the browser can actually run it. On
      // the first jump of a session every deferred section mounts at once and
      // the main thread is blocked for a few hundred milliseconds — an
      // animation started into that stall shows as a freeze followed by a snap,
      // which is worse than the honest jump the page did before. So: cold page
      // jumps, warm page glides, and by the second click the page is always
      // warm.
      const cold = !!document.querySelector('[data-deferred-section="pending"]')
      if (reduce || cold) {
        jumpTo(el)
        requestAnimationFrame(pin)
        return
      }
      glide(el, () => requestAnimationFrame(pin), () => cancelled)
      return
    }
    if (frames >= 40) return
    frames += 1
    requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}
