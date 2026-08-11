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

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  window.dispatchEvent(new Event('getbuild:reveal'))

  let frames = 0
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      jumpTo(el)
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
      requestAnimationFrame(pin)
      return
    }
    if (frames >= 40) return
    frames += 1
    requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}
