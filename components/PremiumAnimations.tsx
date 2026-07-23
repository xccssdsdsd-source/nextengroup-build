'use client'

import { useEffect } from 'react'

const counterTargets = [
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

export default function PremiumAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let disposed = false
    const animeCleanups: Array<() => void> = []

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
    const processedGroups = new WeakSet<Element>()

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
      const children = Array.from(group.children) as HTMLElement[]
      // Read phase: batch every getBoundingClientRect() before any style write
      // below, otherwise each write forces the next read to trigger a fresh
      // synchronous layout (layout thrashing) across the whole group.
      const rects = children.map((el) => (processed.has(el) ? null : el.getBoundingClientRect()))
      children.forEach((el, i) => {
        if (processed.has(el)) return
        const r = rects[i]!
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

    const staggerIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const group = entry.target as HTMLElement
          assignStagger(group)
          Array.from(group.children).forEach((child) => observeEl(child as HTMLElement))
          staggerIo.unobserve(group)
        })
      },
      { threshold: 0, rootMargin: '280px 0px 280px 0px' },
    )

    const observeStaggerGroup = (group: HTMLElement) => {
      if (processedGroups.has(group)) return
      processedGroups.add(group)
      staggerIo.observe(group)
    }

    const scan = () => {
      // Directional starts require layout reads. Prepare each group shortly
      // before it reaches the viewport instead of measuring the full page at boot.
      document.querySelectorAll<HTMLElement>('[data-stagger-group]').forEach(observeStaggerGroup)
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.parentElement?.matches('[data-stagger-group]')) return
        observeEl(el)
      })
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
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
        (el) => !el.classList.contains('io-visible') && !el.closest('[data-deferred-section="pending"]'),
      )
      // Read phase, then write phase — same layout-thrashing fix as assignStagger.
      const rects = candidates.map((el) => el.getBoundingClientRect())
      candidates.forEach((el, i) => {
        const r = rects[i]
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
      // Read phase, then write phase — avoids forced layout on every item.
      const rects = parallaxItems.map(({ el }) => el.getBoundingClientRect())
      parallaxItems.forEach(({ el, speed }, i) => {
        const r = rects[i]
        if (r.bottom < -200 || r.top > vh + 200) return
        const progress = (r.top + r.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${(progress * speed).toFixed(2)}px, 0)`
      })
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

    /* ── DESKTOP: Anime.js pointer response, loaded only when the browser is idle ── */
    const initAnime = async () => {
      const { animate } = await import('animejs')
      if (disposed) return

      const tiltCards = document.querySelectorAll<HTMLElement>(
        '[data-anime-card]',
      )

      tiltCards.forEach((el) => {
        let glare = el.querySelector<HTMLElement>('.tilt-glare')
        if (!glare) {
          glare = document.createElement('span')
          glare.className = 'tilt-glare'
          glare.setAttribute('aria-hidden', 'true')
          if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
          el.appendChild(glare)
        }

        let cardMotion: ReturnType<typeof animate> | null = null
        let glareMotion: ReturnType<typeof animate> | null = null
        const onEnter = () => {
          cardMotion = animate(el, { y: -2, duration: 220, ease: 'outQuart' })
          glareMotion = animate(glare, { opacity: 1, duration: 180, ease: 'outQuart' })
        }
        const onLeave = () => {
          cardMotion = animate(el, { y: 0, duration: 180, ease: 'outQuart' })
          glareMotion = animate(glare, { opacity: 0, duration: 140, ease: 'outQuart' })
        }

        el.style.transformStyle = 'preserve-3d'
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        animeCleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
          cardMotion?.revert()
          glareMotion?.revert()
          glare.remove()
        })
      })
    }

    /* ── boot ── */
    const boot = () => {
      counterIo = runCounters()
      if (!reduce && !isMobile && finePointer) {
        initParallax()
        initAnime()
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
      disposed = true
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
      staggerIo.disconnect()
      counterIo?.disconnect()
      animeCleanups.forEach((cleanup) => cleanup())
      parallaxItems = []
      style.remove()
    }
  }, [])

  return null
}
