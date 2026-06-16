const getNavOffset = () => {
  if (typeof window === 'undefined') return 0
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 80
}

const jumpTo = (el: HTMLElement) => {
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset()
  window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' })
}

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  window.dispatchEvent(new Event('getbuild:reveal'))

  let frames = 0
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      jumpTo(el)
      let pins = 0
      const pin = () => {
        jumpTo(el)
        if (pins++ < 24) requestAnimationFrame(pin)
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
