'use client'

import { useEffect } from 'react'

const counterTargets = [
  { selector: '.counter-1997', final: 1997 },
  { selector: '.counter-2449', final: 2449 },
  { selector: '.counter-3997', final: 3997 },
  { selector: '.counter-247', final: 24, suffix: '/7' },
  { selector: '.counter-24h', final: 24, suffix: 'h' },
  { selector: '.counter-72h', final: 72, suffix: 'h' },
  { selector: '.counter-96', final: 96 },
  { selector: '.counter-97', final: 97 },
  { selector: '.counter-100', final: 100 },
  { selector: '.counter-93', final: 93 },
]

const REVEAL_SELECTOR =
  '[data-fade-in], [data-stat-block], [data-stagger-group] > *, .section-title, [data-motion-title], .section-copy, [data-motion-copy], [data-img-reveal], .section-kicker, .section-divider'

export default function GSAPAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null

    /* ── Injected reveal states not covered by the pre-hydration globals block ── */
    const style = document.createElement('style')
    style.textContent = `
      html.motion-ready .section-kicker { opacity: 0; transform: translateX(-8px); transition: opacity 460ms cubic-bezier(0.16,1,0.3,1), transform 460ms cubic-bezier(0.16,1,0.3,1); }
      html.motion-ready .section-kicker.io-visible { opacity: 1; transform: none; }
      html.motion-ready .section-divider { opacity: 0; transform: scaleX(0); transform-origin: left; transition: opacity 700ms ease, transform 900ms cubic-bezier(0.16,1,0.3,1); }
      html.motion-ready .section-divider.io-visible { opacity: 1; transform: scaleX(1); }
      @media (prefers-reduced-motion: reduce) {
        html.motion-ready .section-kicker, html.motion-ready .section-divider { transform: none !important; transition: opacity 200ms ease !important; }
      }
    `
    document.head.appendChild(style)

    /* ── SCROLL REVEALS — resilient to lazily-mounted (InView/dynamic) sections ── */
    const processed = new WeakSet<Element>()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          // Clear the inline directional start so the .io-visible CSS resets it.
          el.style.transform = ''
          el.classList.add('io-visible')
          io.unobserve(el)
        })
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    )

    const assignStagger = (group: HTMLElement) => {
      const gr = group.getBoundingClientRect()
      const gcx = gr.left + gr.width / 2
      const half = gr.width / 2 || 1
      const pattern = group.dataset.revealPattern
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement
        if (processed.has(el)) return
        const r = el.getBoundingClientRect()
        const rel = (r.left + r.width / 2 - gcx) / half
        let tx = 0
        let ty = isMobile ? 34 : 78
        let scale = isMobile ? 0.985 : 0.93
        if (!isMobile && pattern === 'split') {
          tx = i % 2 === 0 ? -84 : 84
          ty = 22
          scale = 0.97
        } else if (!isMobile && pattern === 'portfolio') {
          tx = i === 0 ? -46 : i === 1 ? 46 : 0
          ty = i === 2 ? 54 : 24
          scale = 0.975
        } else if (!isMobile && pattern === 'rise') {
          tx = 0
          ty = 52 + (i % 2) * 14
          scale = 0.975
        } else if (!isMobile && pattern === 'fan') {
          tx = (i - 1) * 48
          ty = i === 1 ? 58 : 38
          scale = 0.975
        } else if (!isMobile && pattern === 'soft') {
          tx = 0
          ty = 18 + i * 4
          scale = 0.992
        } else if (!isMobile && rel < -0.33) { tx = -96; ty = 40 }
        else if (!isMobile && rel > 0.33) { tx = 96; ty = 40 }
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
        el.style.transitionDelay = i ? `${Math.min(i, 7) * 0.1}s` : ''
      })
    }

    const observeEl = (el: HTMLElement) => {
      if (processed.has(el)) return
      processed.add(el)
      io.observe(el)
    }

    const scan = () => {
      // Directional start for grouped cards (computed from their column position).
      document.querySelectorAll<HTMLElement>('[data-stagger-group]').forEach(assignStagger)
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeEl)
    }

    // Late-mounting sections (InView + next/dynamic) append after first paint;
    // rescan on DOM mutations so nothing is left permanently hidden.
    let scanScheduled = 0
    const scheduleScan = () => {
      if (scanScheduled) return
      scanScheduled = requestAnimationFrame(() => {
        scanScheduled = 0
        scan()
      })
    }
    const mo = new MutationObserver(scheduleScan)

    // Safety net: reveal only elements actually IN the viewport that the
    // observer somehow missed — never off-screen content (that would defeat
    // the scroll animation). Off-screen elements stay hidden for the IO to
    // animate in as they are scrolled to.
    const revealInView = () => {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.classList.contains('io-visible')) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92 && r.bottom > 0) {
          el.style.transform = ''
          el.classList.add('io-visible')
        }
      })
    }
    const safety1 = window.setTimeout(revealInView, 500)
    const safety2 = window.setTimeout(revealInView, 1500)
    const safety3 = window.setTimeout(revealInView, 3000)

    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        scan()
        mo.observe(document.body, { childList: true, subtree: true })
      })
    })
    // Belt-and-suspenders passes for dynamic import chunks that resolve later.
    const t1 = window.setTimeout(scan, 350)
    const t2 = window.setTimeout(scan, 1200)

    /* ── LIGHTWEIGHT PARALLAX (desktop, transform-only, single rAF loop) ── */
    let parallaxItems: { el: HTMLElement; speed: number }[] = []
    let parallaxRaf = 0
    const runParallax = () => {
      parallaxRaf = 0
      const vh = window.innerHeight
      for (const { el, speed } of parallaxItems) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const progress = (r.top + r.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${(progress * speed).toFixed(2)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!parallaxRaf) parallaxRaf = requestAnimationFrame(runParallax)
    }

    const initParallax = () => {
      const seen = new Set<HTMLElement>()
      const push = (sel: string, speed: number) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (seen.has(el)) return
          seen.add(el)
          el.style.willChange = 'transform'
          parallaxItems.push({ el, speed })
        })
      }
      // Decorative depth only — never reveal targets, never elements that
      // carry a hover/zoom transform (would be clobbered). Big faint section
      // numbers drifting against their cards reads as real parallax depth.
      push('.overview-num', 60)
      push('.step-number', 54)
      push('[data-parallax-slow]', -30)
      push('[data-parallax-media]', 18)
      if (parallaxItems.length) {
        runParallax()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
      }
    }

    /* ── COUNTERS ── */
    const runCounters = () => {
      const counterIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target as HTMLElement
            counterIo.unobserve(el)
            const final = Number(el.dataset.cf)
            const suffix = el.dataset.cs || ''
            const start = performance.now()
            const step = (now: number) => {
              const p = Math.min((now - start) / 1400, 1)
              const eased = 1 - Math.pow(1 - p, 2)
              el.textContent = Math.round(final * eased) + suffix
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        },
        { threshold: 0, rootMargin: '0px 0px -12% 0px' },
      )
      const register = (el: HTMLElement, final: number, suffix: string) => {
        el.dataset.cf = String(final)
        el.dataset.cs = suffix
        counterIo.observe(el)
      }
      counterTargets.forEach(({ selector, final, suffix = '' }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => register(el, final, suffix))
      })
      document.querySelectorAll<HTMLElement>('[data-counter-final]').forEach((el) =>
        register(el, Number(el.dataset.counterFinal), el.dataset.counterSuffix || ''),
      )
      return counterIo
    }
    let counterIo: IntersectionObserver | undefined

    /* ── DESKTOP: GSAP tilt + magnetic so cards react to the pointer ── */
    const initGsap = async () => {
      const { gsap } = await import('gsap')

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 769px) and (hover: hover) and (pointer: fine)', () => {
          const tiltCards = document.querySelectorAll(
            '.premium-card, .value-card, .realizacja-card, .ai-card, .pkg-card, .overview-card, [data-tilt-card]',
          )
          const cleanups: Array<() => void> = []
          tiltCards.forEach((card) => {
            const el = card as HTMLElement
            let glare = el.querySelector<HTMLElement>('.tilt-glare')
            if (!glare) {
              glare = document.createElement('div')
              glare.className = 'tilt-glare'
              glare.style.cssText =
                'position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;z-index:1;transition:opacity 220ms ease;'
              if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
              el.appendChild(glare)
            }
            const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' })
            const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' })
            const onMove = (e: MouseEvent) => {
              const rect = el.getBoundingClientRect()
              const px = (e.clientX - rect.left) / rect.width
              const py = (e.clientY - rect.top) / rect.height
              rotX(-(py - 0.5) * 5)
              rotY((px - 0.5) * 5)
              if (glare) {
                glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(140,216,255,0.10) 0%, transparent 58%)`
                glare.style.opacity = '1'
              }
            }
            const onLeave = () => {
              gsap.to(el, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.55,
                ease: 'power3.out',
                onComplete: () => gsap.set(el, { clearProps: 'rotationX,rotationY' }),
              })
              if (glare) glare.style.opacity = '0'
            }
            el.style.transformStyle = 'preserve-3d'
            el.addEventListener('mousemove', onMove)
            el.addEventListener('mouseleave', onLeave)
            cleanups.push(() => {
              el.removeEventListener('mousemove', onMove)
              el.removeEventListener('mouseleave', onLeave)
            })
          })
          return () => cleanups.forEach((fn) => fn())
        })

        mm.add('(min-width: 769px) and (hover: hover) and (pointer: fine)', () => {
          const cleanups: Array<() => void> = []
          document.querySelectorAll<HTMLElement>('.btn-primary, [data-magnetic]').forEach((btn) => {
            const moveX = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power2.out' })
            const moveY = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power2.out' })
            const onMove = (e: MouseEvent) => {
              const rect = btn.getBoundingClientRect()
              moveX(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5)
              moveY(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5)
            }
            const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' })
            btn.addEventListener('mousemove', onMove)
            btn.addEventListener('mouseleave', onLeave)
            cleanups.push(() => {
              btn.removeEventListener('mousemove', onMove)
              btn.removeEventListener('mouseleave', onLeave)
            })
          })
          return () => cleanups.forEach((fn) => fn())
        })
      })
    }

    /* ── boot ── */
    const boot = () => {
      counterIo = runCounters()
      if (!reduce && !isMobile) {
        initParallax()
        initGsap()
      }
    }

    let idle = 0
    let bootT = 0
    if (typeof requestIdleCallback !== 'undefined') {
      idle = requestIdleCallback(() => boot(), { timeout: 1800 })
    } else {
      bootT = window.setTimeout(boot, 400)
    }

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      if (scanScheduled) cancelAnimationFrame(scanScheduled)
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(safety1)
      clearTimeout(safety2)
      clearTimeout(safety3)
      clearTimeout(bootT)
      if (typeof cancelIdleCallback !== 'undefined' && idle) cancelIdleCallback(idle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mo.disconnect()
      io.disconnect()
      counterIo?.disconnect()
      ctx?.revert()
      parallaxItems = []
      style.remove()
    }
  }, [])

  return null
}
