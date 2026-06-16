// Custom event that asks every lazy-mounted <InView> section to render
// immediately, so an anchor target can exist in the DOM before we jump.
export const MOUNT_ALL_EVENT = 'getbuild:mount-all'

const getNavOffset = () => {
  if (typeof window === 'undefined') return 0
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 80
}

const jumpTo = (el: HTMLElement) => {
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset()
  // Instant jump — the visitor lands on the section immediately instead of
  // waiting for an animated scroll. 'auto' overrides any CSS scroll-behavior.
  window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' })
}

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  const existing = document.getElementById(id)
  if (existing) {
    jumpTo(existing)
    return
  }

  // The target lives inside a lazy <InView> wrapper that hasn't mounted yet.
  // Ask all sections to mount now, then jump as soon as the element appears.
  // No animated paging — the visitor is taken straight to the section.
  window.dispatchEvent(new Event(MOUNT_ALL_EVENT))

  let frames = 0
  const settle = () => {
    const el = document.getElementById(id)
    if (el) {
      jumpTo(el)
      // Placeholders are swapped for real content this frame, which can shift
      // offsets above the target — re-align once more so we land precisely.
      requestAnimationFrame(() => {
        const again = document.getElementById(id)
        if (again) jumpTo(again)
      })
      return
    }
    if (frames++ > 30) return
    requestAnimationFrame(settle)
  }
  requestAnimationFrame(settle)
}
