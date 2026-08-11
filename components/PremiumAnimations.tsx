'use client'

import { useEffect } from 'react'
import { subscribeScroll } from '@/lib/scrollTicker'

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
    // Elements observed but not yet revealed. Sections below the fold sit in a
    // `content-visibility: auto` subtree (InView), whose skipped content has no
    // layout boxes — an IntersectionObserver registered against it can miss the
    // crossing entirely and leave the element at opacity 0 for good. Keeping
    // the un-revealed set addressable lets a viewport-scoped sweep recover it.
    const pending = new Set<HTMLElement>()

    const revealed: HTMLElement[] = []
    let settleTimer = 0

    const reveal = (el: HTMLElement) => {
      pending.delete(el)
      // Clear the inline directional start so the .io-visible CSS resets it.
      el.style.transform = ''
      el.classList.add('io-visible')
      revealed.push(el)
      // Debounced from the reveal itself rather than from the scroll handler:
      // an element revealed by the observer after the reader stopped scrolling
      // would otherwise never be checked by the backstop below.
      clearTimeout(settleTimer)
      settleTimer = window.setTimeout(settleRevealed, 1600)
      window.setTimeout(() => {
        el.style.willChange = 'auto'
      }, 1200)
    }

    // Backstop. Anything marked visible is, by definition, meant to be on
    // screen — so if its transition never actually ran (priming and revealing
    // can land in the same frame when the reader flings the page, leaving the
    // browser with no start state to interpolate from) the value is forced.
    // Scoped to already-revealed elements, so no pending scroll animation can
    // be cancelled by it.
    function settleRevealed() {
      for (let i = revealed.length - 1; i >= 0; i -= 1) {
        const el = revealed[i]
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
        revealed.splice(i, 1)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          reveal(el)
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
      pending.add(el)
      io.observe(el)
    }

    const staggerIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          primeGroup(entry.target as HTMLElement)
        })
      },
      { threshold: 0, rootMargin: '280px 0px 280px 0px' },
    )

    const pendingGroups = new Set<HTMLElement>()

    const observeStaggerGroup = (group: HTMLElement) => {
      if (processedGroups.has(group)) return
      processedGroups.add(group)
      pendingGroups.add(group)
      staggerIo.observe(group)
    }

    const primeGroup = (group: HTMLElement) => {
      pendingGroups.delete(group)
      assignStagger(group)
      Array.from(group.children).forEach((child) => observeEl(child as HTMLElement))
      staggerIo.unobserve(group)
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

    // Reduced motion gets no scroll-triggered choreography at all: everything
    // is revealed up front rather than animated more gently.
    const revealAllNow = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        el.style.transform = ''
        el.classList.add('io-visible')
      })
    }

    // Viewport-scoped safety net. Anything already on screen but still hidden
    // is shown; anything below the fold stays hidden so it can still animate in
    // on scroll. A blanket timeout-based reveal would silently disable every
    // below-fold animation for anyone who pauses before scrolling.
    const sweep = () => {
      if (!pending.size && !pendingGroups.size) return
      const vh = window.innerHeight
      // Groups first: a group whose observer never fired has children that were
      // never observed at all, so they are not yet in `pending` to be recovered.
      pendingGroups.forEach((group) => {
        if (group.getBoundingClientRect().top < vh * 1.1) primeGroup(group)
      })
      // A single threshold covers both recoveries: anything at or above the
      // trigger line is shown (including content already scrolled past, which
      // has no animation left to preserve), while anything still below the line
      // stays hidden so it can animate in on the way down. Requiring the element
      // to also be *inside* the viewport stranded everything the reader had
      // flung past before its deferred subtree had rendered.
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.94) {
          io.unobserve(el)
          reveal(el)
        }
      })
    }

    let raf1 = 0
    let raf2 = 0
    let sweepTimers: number[] = []
    let unsubscribeSweep: (() => void) | undefined
    let domObserver: MutationObserver | undefined

    if (reduce) {
      revealAllNow()
    } else {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          scan()
          sweep()
        })
      })
      // Deferred sections render late (content-visibility), so one scan at boot
      // is not enough — rescan when the DOM grows and again after layout settles.
      domObserver = new MutationObserver(() => {
        scan()
      })
      domObserver.observe(document.body, { childList: true, subtree: true })
      sweepTimers = [300, 900, 2000].map((ms) =>
        window.setTimeout(() => {
          scan()
          sweep()
        }, ms),
      )
      unsubscribeSweep = subscribeScroll(sweep)
    }

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
      push('[data-parallax-slow]', isMobile ? -12 : -36)
      push('[data-parallax-media]', isMobile ? 8 : 22)
      push('[data-parallax-fast]', isMobile ? 28 : 96)
      if (parallaxItems.length) {
        runParallax()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
      }
    }

    /* ── SCROLL SCENES ──────────────────────────────────────────────────
       Two places on the page carry an argument that lands harder when it is
       *drawn* rather than shown: the process rail (the sequence is the point)
       and the comparison column (the verdict is the point). Both run off the
       shared ticker rather than a scroll library — the hero scene already
       proved the pattern, and a second engine would cost bytes without
       adding capability. Everything else on the page stays still, which is
       what keeps these two moments worth watching. */
    type Scene = { el: HTMLElement; marks: HTMLElement[]; offsets: number[]; from: number }
    const scenes: Scene[] = []
    let sceneRaf = 0

    // Mark offsets are measured against the scene element itself rather than
    // read from offsetTop — a positioned <td> resolves offsetParent somewhere
    // unrelated, which would put the cascade thresholds in the wrong space.
    const measureScenes = () => {
      scenes.forEach((scene) => {
        const base = scene.el.getBoundingClientRect().top
        scene.offsets = scene.marks.map((m) => m.getBoundingClientRect().top - base)
      })
    }

    const runScenes = () => {
      sceneRaf = 0
      const vh = window.innerHeight
      const rects = scenes.map(({ el }) => el.getBoundingClientRect())
      scenes.forEach(({ el, marks, offsets, from }, i) => {
        const r = rects[i]
        // Below the viewport there is nothing to do yet. Above it the scene
        // must still be settled to its finished state — bailing out on
        // scrolled-past sections left the comparison ticks permanently hidden
        // for anyone who jumped down the page.
        if (r.top > vh + 120) return
        const travelled = vh * from - r.top
        const p = r.bottom < -120 ? 1 : Math.max(0, Math.min(1, travelled / (r.height + vh * 0.32)))
        el.style.setProperty('--scene', p.toFixed(4))
        // A mark lights once the drawn edge has physically reached it, so the
        // cascade is tied to the line's position rather than to a fixed delay.
        const edge = p * r.height
        marks.forEach((m, j) => {
          const want = offsets[j] <= edge + 24 ? 'true' : 'false'
          if (m.dataset.lit !== want) m.dataset.lit = want
        })
      })
    }

    const onSceneResize = () => {
      measureScenes()
      onSceneScroll()
    }
    const onSceneScroll = () => {
      if (!sceneRaf) sceneRaf = requestAnimationFrame(runScenes)
    }
    let unsubscribeScenes: (() => void) | undefined

    const initScenes = () => {
      document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
        const sel = el.dataset.sceneMarks
        scenes.push({
          el,
          marks: sel ? Array.from(el.querySelectorAll<HTMLElement>(sel)) : [],
          offsets: [],
          from: Number(el.dataset.sceneFrom) || 0.82,
        })
      })
      if (!scenes.length) return
      measureScenes()
      // Only now may the CSS hide anything: without this flag a failed or
      // skipped init would leave the comparison marks permanently invisible.
      scenes.forEach(({ el }) => { el.dataset.sceneReady = 'true' })
      runScenes()
      unsubscribeScenes = subscribeScroll(onSceneScroll)
      window.addEventListener('resize', onSceneResize, { passive: true })
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
        let moveRaf = 0
        let px = 0
        let py = 0

        const onEnter = () => {
          cardMotion?.revert()
          glareMotion?.revert()
          cardMotion = animate(el, { y: -2, duration: 220, ease: 'outQuart' })
          glareMotion = animate(glare, { opacity: 1, duration: 180, ease: 'outQuart' })
        }

        // The wash follows the pointer instead of sitting at a fixed 50%/0 —
        // without this the glare element was inert and the card looked the
        // same wherever the cursor was.
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          px = ((e.clientX - r.left) / r.width) * 100
          py = ((e.clientY - r.top) / r.height) * 100
          if (moveRaf) return
          moveRaf = requestAnimationFrame(() => {
            moveRaf = 0
            glare.style.setProperty('--glare-x', `${px.toFixed(1)}%`)
            glare.style.setProperty('--glare-y', `${py.toFixed(1)}%`)
          })
        }

        const onLeave = () => {
          cardMotion?.revert()
          glareMotion?.revert()
          cardMotion = animate(el, { y: 0, duration: 180, ease: 'outQuart' })
          glareMotion = animate(glare, { opacity: 0, duration: 140, ease: 'outQuart' })
        }

        el.style.transformStyle = 'preserve-3d'
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('mouseleave', onLeave)
        animeCleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('mouseleave', onLeave)
          if (moveRaf) cancelAnimationFrame(moveRaf)
          cardMotion?.revert()
          glareMotion?.revert()
          glare.remove()
        })
      })
    }

    /* ── boot ── */
    const boot = () => {
      counterIo = runCounters()
      // Scenes are transform/opacity driven off one shared rAF, so they are
      // cheap enough to keep on phones — that is where the page is mostly read.
      if (!reduce) initScenes()
    }

    // Ambient parallax is deliberately lighter on touch screens; pointer-only
    // glare remains a desktop enhancement.
    // Loading anime.js and measuring the full page during initial hydration
    // creates avoidable long tasks, so it's deferred past first paint — but
    // gating it behind the user's first scroll/pointermove meant the dynamic
    // import (network fetch + parse + eval of the anime.js chunk) landed
    // exactly on the frame the user started scrolling, showing up as a
    // multi-hundred-ms freeze on the very first gesture (measured: dropped
    // to ~12fps with 1900ms+ stalls on a cold first scroll, vs ~24fps once
    // warm). Warming it on idle instead keeps the same "don't block first
    // paint" benefit without janking the user's first interaction.
    let ambientMotionStarted = false
    const startAmbientMotion = () => {
      if (ambientMotionStarted || reduce) return
      ambientMotionStarted = true
      initParallax()
    }

    let pointerMotionStarted = false
    const startPointerMotion = () => {
      if (pointerMotionStarted || reduce || isMobile || !finePointer) return
      pointerMotionStarted = true
      initAnime()
    }

    let idle = 0
    let motionIdle = 0
    let bootT = 0
    let motionT = 0
    if (typeof requestIdleCallback !== 'undefined') {
      idle = requestIdleCallback(() => boot(), { timeout: 1800 })
      motionIdle = requestIdleCallback(() => {
        startAmbientMotion()
        startPointerMotion()
      }, { timeout: 1800 })
    } else {
      bootT = window.setTimeout(boot, 400)
      motionT = window.setTimeout(() => {
        startAmbientMotion()
        startPointerMotion()
      }, 900)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      sweepTimers.forEach(clearTimeout)
      clearTimeout(settleTimer)
      unsubscribeSweep?.()
      domObserver?.disconnect()
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
      clearTimeout(bootT)
      clearTimeout(motionT)
      if (typeof cancelIdleCallback !== 'undefined' && idle) cancelIdleCallback(idle)
      if (typeof cancelIdleCallback !== 'undefined' && motionIdle) cancelIdleCallback(motionIdle)
      if (sceneRaf) cancelAnimationFrame(sceneRaf)
      unsubscribeScenes?.()
      window.removeEventListener('resize', onSceneResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
