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

    /* ── HEADING WORD CASCADE ──────────────────────────────────────────
       Each word gets a mask span it rises out of, so a heading assembles
       itself instead of sliding in as one block. Element children (the
       italic serif accents) are wrapped whole rather than descended into,
       which keeps their markup and styling intact. Titles that ship with
       .io-visible already applied lose it here: that class is the no-JS
       guarantee that the heading is visible, and once the split has run
       the observer below takes over that job. */
    const splitHeading = (el: HTMLElement) => {
      if (el.dataset.split || el.dataset.noSplit !== undefined) return
      const words: HTMLElement[] = []
      const frag = document.createDocumentFragment()
      let bail = false

      const wrap = (content: Node) => {
        const outer = document.createElement('span')
        outer.className = 'rv-w'
        const inner = document.createElement('span')
        inner.className = 'rv-w-i'
        inner.appendChild(content)
        outer.appendChild(inner)
        words.push(inner)
        return outer
      }

      Array.from(el.childNodes).forEach((node) => {
        if (bail) return
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = (node.textContent || '').split(/(\s+)/)
          parts.forEach((part) => {
            if (!part) return
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part))
            else frag.appendChild(wrap(document.createTextNode(part)))
          })
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          frag.appendChild(wrap(node.cloneNode(true)))
        } else {
          // Comments and anything else: leave the heading alone rather than
          // risk dropping content we do not understand.
          bail = true
        }
      })

      // Long headings would cascade for well over a second; they read better
      // as a single reveal, which is what the untouched element already does.
      if (bail || !words.length || words.length > 14) return

      words.forEach((word, i) => word.style.setProperty('--wi', String(i)))
      el.replaceChildren(frag)
      el.dataset.split = '1'
      el.classList.remove('io-visible')
    }

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
          // Drop the promoted layer once the reveal is done. Leaving elements
          // permanently composited let Chrome keep a stale pre-webfont paint
          // around, which showed up as ghosted/doubled headings and prices.
          window.setTimeout(() => {
            el.style.willChange = 'auto'
          }, 1200)
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
          // The bloom is keyed off the group, not its children, so it swells
          // once behind the whole grid rather than per card.
          if (group.dataset.revealBloom !== undefined) group.classList.add('is-bloom')
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
      if (!reduce) {
        document
          .querySelectorAll<HTMLElement>('.section-title, [data-motion-title]')
          .forEach(splitHeading)
      }
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.parentElement?.matches('[data-stagger-group]')) return
        observeEl(el)
      })
    }

    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        scan()
      })
    })

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
          cardMotion?.revert()
          glareMotion?.revert()
          cardMotion = animate(el, { y: -2, duration: 220, ease: 'outQuart' })
          glareMotion = animate(glare, { opacity: 1, duration: 180, ease: 'outQuart' })
        }
        const onLeave = () => {
          cardMotion?.revert()
          glareMotion?.revert()
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

    /* ── POINTER-TRACKED CARD LIGHT ────────────────────────────────────
       A soft highlight under the cursor on every card surface. Kept off
       transform on purpose: most of these cards are stagger-group children
       carrying a long transform transition for their entrance, and writing
       transform on mousemove would retarget that transition every frame.
       Only two custom properties and one class are touched, on a dedicated
       overlay span that owns its own opacity transition. */
    const glowCleanups: Array<() => void> = []
    const initCardGlow = () => {
      const cards = document.querySelectorAll<HTMLElement>(
        // FAQ rows are left out on purpose: they already carry their own
        // open/hover border treatment, which the lit-state edge would fight.
        '.premium-card, .testimonial-card, .service-question, .pkg-card, .realizacja-card',
      )
      cards.forEach((el) => {
        if (el.querySelector(':scope > .tilt-glare')) return
        const glare = document.createElement('span')
        glare.className = 'tilt-glare'
        glare.setAttribute('aria-hidden', 'true')
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
        el.appendChild(glare)

        let raf = 0
        let px = 50
        let py = 0
        const apply = () => {
          raf = 0
          glare.style.setProperty('--gx', `${px.toFixed(1)}%`)
          glare.style.setProperty('--gy', `${py.toFixed(1)}%`)
        }
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          if (!rect.width || !rect.height) return
          px = ((event.clientX - rect.left) / rect.width) * 100
          py = ((event.clientY - rect.top) / rect.height) * 100
          if (!raf) raf = requestAnimationFrame(apply)
        }
        const onEnter = () => el.classList.add('is-lit')
        const onLeave = () => el.classList.remove('is-lit')

        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        el.addEventListener('mousemove', onMove, { passive: true })
        glowCleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
          el.removeEventListener('mousemove', onMove)
          if (raf) cancelAnimationFrame(raf)
          el.classList.remove('is-lit')
          glare.remove()
        })
      })
    }

    /* ── boot ── */
    const boot = () => {
      counterIo = runCounters()
    }

    // Pointer effects and parallax are enhancements for real interaction.
    // Loading anime.js and measuring the full page during initial hydration
    // creates avoidable long tasks, so it's deferred past first paint — but
    // gating it behind the user's first scroll/pointermove meant the dynamic
    // import (network fetch + parse + eval of the anime.js chunk) landed
    // exactly on the frame the user started scrolling, showing up as a
    // multi-hundred-ms freeze on the very first gesture (measured: dropped
    // to ~12fps with 1900ms+ stalls on a cold first scroll, vs ~24fps once
    // warm). Warming it on idle instead keeps the same "don't block first
    // paint" benefit without janking the user's first interaction.
    let desktopMotionStarted = false
    const startDesktopMotion = () => {
      if (desktopMotionStarted || reduce || isMobile || !finePointer) return
      desktopMotionStarted = true
      initParallax()
      initCardGlow()
      initAnime()
    }

    let idle = 0
    let motionIdle = 0
    let bootT = 0
    if (typeof requestIdleCallback !== 'undefined') {
      idle = requestIdleCallback(() => boot(), { timeout: 1800 })
      motionIdle = requestIdleCallback(() => startDesktopMotion(), { timeout: 2500 })
    } else {
      bootT = window.setTimeout(boot, 400)
      window.setTimeout(startDesktopMotion, 1200)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
      clearTimeout(bootT)
      if (typeof cancelIdleCallback !== 'undefined' && idle) cancelIdleCallback(idle)
      if (typeof cancelIdleCallback !== 'undefined' && motionIdle) cancelIdleCallback(motionIdle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io.disconnect()
      staggerIo.disconnect()
      counterIo?.disconnect()
      animeCleanups.forEach((cleanup) => cleanup())
      glowCleanups.forEach((cleanup) => cleanup())
      parallaxItems = []
      style.remove()
    }
  }, [])

  return null
}
