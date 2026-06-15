const getNavOffset = () => {
  if (typeof window === 'undefined') return 0
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 80
}

const smoothTo = (el: HTMLElement) => {
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset()
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
}

export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return

  const existing = document.getElementById(id)
  if (existing) {
    smoothTo(existing)
    return
  }

  const maxSteps = 60
  let step = 0

  const tick = () => {
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => smoothTo(el))
      return
    }
    if (step >= maxSteps || window.scrollY + window.innerHeight >= document.body.scrollHeight - 1) {
      const fallback = document.getElementById(id)
      if (fallback) smoothTo(fallback)
      return
    }
    step += 1
    window.scrollTo({ top: window.scrollY + window.innerHeight * 0.85, behavior: 'auto' })
    setTimeout(tick, 70)
  }

  tick()
}
