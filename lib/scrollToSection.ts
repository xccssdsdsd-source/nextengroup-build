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

  // A glide only reads as movement while the frames keep coming. If the main
  // thread stalls mid-flight — a slow phone, a late chunk — the animation
  // becomes a freeze followed by a snap, and the fixed duration runs out while
  // the page is still far from the target. Two long frames in a row is enough
  // evidence: stop pretending and hand the rest to the jump, which the pin
  // then holds. Cheaper for the reader than a stutter that ends in the wrong
  // place.
  let prev = start
  let stalls = 0

  const step = (now: number) => {
    if (cancelled()) return
    stalls = now - prev > 64 ? stalls + 1 : 0
    prev = now
    const p = Math.min(1, (now - start) / duration)
    if (stalls >= 2) {
      jumpTo(el)
      done()
      return
    }
    const to = Math.max(targetTop(el), 0)
    window.scrollTo({ top: from + (to - from) * easeInOutCubic(p), behavior: 'instant' })
    if (p < 1) requestAnimationFrame(step)
    else done()
  }
  requestAnimationFrame(step)
}

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  // Read coldness BEFORE the reveal, not after. `getbuild:reveal` flips every
  // InView section to visible synchronously, so by the time `attempt` runs a
  // frame later the pending flag is always gone — the "cold page jumps, warm
  // page glides" guard below read 0 every single time and every first click
  // glided. That glide then ran straight into the main-thread stall of ten
  // sections mounting at once (measured: ~90ms per frame), so its fixed 820ms
  // budget expired after ~9 frames and the page stopped 1500-3300px short of
  // the target. This one line is the difference.
  const cold = !!document.querySelector('[data-deferred-section="pending"]')

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
      let resize: ResizeObserver | null = null
      const stop = () => {
        cancelled = true
        resize?.disconnect()
        resize = null
        events.forEach((type) => window.removeEventListener(type, stop))
      }
      const events = ['wheel', 'touchstart', 'keydown'] as const
      events.forEach((type) => window.addEventListener(type, stop, { once: true, passive: true }))

      // Six still frames used to count as "landed". On a cold page that is far
      // too eager: the deferred sections flip to mounted, hold position for the
      // ~100ms the counter asks for, and only then do the lazy images inside
      // them decode and push the target down — measured at up to 1974px, which
      // is what made a first-load nav click land in the middle of nowhere while
      // every later click was exact. Settling is now judged on three signals
      // instead of one, and any layout change under way resets the count.
      const SETTLE_FRAMES = 22 // ~360ms of a genuinely still target
      if (typeof ResizeObserver !== 'undefined') {
        resize = new ResizeObserver(() => {
          stable = 0
        })
        resize.observe(document.body)
      }

      const pin = () => {
        if (cancelled) return
        const top = targetTop(el)
        const mounted = !document.querySelector('[data-deferred-section="pending"]')
        // Lazy images are the last thing to move the page, and they are still
        // in flight long after React has committed. readyState is what actually
        // marks the end of that.
        const loaded = document.readyState === 'complete'
        stable = Math.abs(top - last) < 0.5 ? stable + 1 : 0
        last = top
        jumpTo(el)
        if ((!mounted || !loaded || stable < SETTLE_FRAMES) && ticks++ < 420) {
          requestAnimationFrame(pin)
        } else {
          verify()
        }
      }

      // Settling is a judgement call, and on a throttled phone it can be made a
      // beat too early: a late image decode nudged the target ~200px after the
      // pin had already let go. So the pin does not simply end — it checks back
      // twice, and re-aims only if the target actually drifted out of reach.
      // Silent when nothing moved, which is the normal case.
      const verify = () => {
        // A scrollbar drag fires no wheel event, so `cancelled` alone would not
        // notice it. Anchor the check to where the pin left the page: if the
        // reader has moved at all, the correction is theirs to keep and this
        // stays out of it.
        let landed = window.scrollY
        const checks = [500, 1200]
        checks.forEach((delay) => {
          window.setTimeout(() => {
            if (cancelled) return
            if (Math.abs(window.scrollY - landed) > 4) return
            if (Math.abs(targetTop(el) - window.scrollY) > 4) {
              jumpTo(el)
              landed = window.scrollY
            }
          }, delay)
        })
        window.setTimeout(stop, checks[checks.length - 1] + 60)
      }

      // A glide is only worth starting if the browser can actually run it. On
      // the first jump of a session every deferred section mounts at once and
      // the main thread is blocked for a few hundred milliseconds — an
      // animation started into that stall shows as a freeze followed by a snap,
      // which is worse than the honest jump the page did before. So: cold page
      // jumps, warm page glides, and by the second click the page is always
      // warm. (`cold` is captured at call time, above.)
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
