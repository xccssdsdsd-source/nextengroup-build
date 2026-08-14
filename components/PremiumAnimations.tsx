'use client'

import { useEffect } from 'react'
import { subscribeScroll } from '@/lib/scrollTicker'

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
      html.motion-ready .section-kicker { opacity: 0; transform: translateX(-8px); transition: opacity 300ms var(--ease-apple), transform 420ms var(--ease-apple); }
      html.motion-ready .section-kicker.io-visible { opacity: 1; transform: none; }
      html.motion-ready .section-divider { opacity: 0; transform: scaleX(0); transform-origin: left; transition: opacity 400ms ease, transform 720ms var(--ease-apple); }
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
      // A stagger group is read as one block, so it must never stop dead at the
      // fold: the FAQ list showed four of its eight rows and left the rest at
      // opacity 0 — still occupying space and still answering clicks, so a tap
      // toggled a row nobody could see. Once a group starts revealing, the rows
      // just past the fold come with it.
      const group = el.parentElement
      if (group?.matches('[data-stagger-group]')) revealGroupNeighbours(group)
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

    // Bounded to ~1.25 viewports: a group that continues well past the fold
    // keeps its own scroll-triggered entrance rather than spending it
    // off-screen, but nothing within reach of the next flick stays blank.
    function revealGroupNeighbours(group: HTMLElement) {
      const limit = window.innerHeight * 1.25
      Array.from(group.children).forEach((child) => {
        const el = child as HTMLElement
        if (!pending.has(el)) return
        if (el.getBoundingClientRect().top > limit) return
        io.unobserve(el)
        reveal(el)
      })
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
        let ty = isMobile ? 20 : 34
        let scale = isMobile ? 0.994 : 0.986
        if (!isMobile && pattern === 'split') {
          tx = i % 2 === 0 ? -30 : 30
          ty = 18
          scale = 0.99
        } else if (!isMobile && pattern === 'portfolio') {
          tx = i === 0 ? -18 : i === 1 ? 18 : 0
          ty = i === 2 ? 28 : 18
          scale = 0.99
        } else if (!isMobile && pattern === 'rise') {
          tx = 0
          ty = 28 + (i % 2) * 8
          scale = 0.99
        } else if (!isMobile && pattern === 'fan') {
          tx = (i - 1) * 18
          ty = i === 1 ? 30 : 22
          scale = 0.99
        } else if (!isMobile && pattern === 'soft') {
          tx = 0
          ty = 14 + i * 3
          scale = 0.995
        } else if (!isMobile && rel < -0.33) { tx = -32; ty = 24 }
        else if (!isMobile && rel > 0.33) { tx = 32; ty = 24 }
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
        // 100ms a card put the last tile of a six-up grid 700ms behind the
        // first — the grid finished assembling long after the reader had
        // arrived. 55ms keeps the cascade legible without making them wait.
        el.style.transitionDelay = i ? `${Math.min(i, 6) * 0.055}s` : ''
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

    /* ── TITLE WORD REVEAL ──────────────────────────────────────────────
       A heading that fades in as one block is the tell of a template. Split
       it into words behind their own masks and the line assembles itself,
       which is the difference the eye actually registers. Done in the effect
       rather than in markup so the SSR HTML a crawler reads stays plain text. */
    const splitTitle = (title: HTMLElement) => {
      let word = 0
      const walk = (el: HTMLElement) => {
        Array.from(el.childNodes).forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            walk(node as HTMLElement)
            return
          }
          if (node.nodeType !== Node.TEXT_NODE) return
          const parts = (node.textContent || '').split(/(\s+)/)
          const frag = document.createDocumentFragment()
          parts.forEach((part) => {
            if (!part) return
            // Whitespace stays a real text node: masked words are inline-block,
            // so a space swallowed into a mask would collapse the word spacing.
            if (!part.trim()) {
              frag.appendChild(document.createTextNode(part))
              return
            }
            const mask = document.createElement('span')
            mask.className = 'w-mask'
            const inner = document.createElement('span')
            inner.className = 'w-in'
            inner.style.transitionDelay = `${Math.min(word, 12) * 30}ms`
            inner.textContent = part
            mask.appendChild(inner)
            frag.appendChild(mask)
            word += 1
          })
          node.parentNode?.replaceChild(frag, node)
        })
      }
      walk(title)
      if (word) title.dataset.split = 'true'
    }

    const splitTitles = () => {
      document
        .querySelectorAll<HTMLElement>('.section-title:not([data-split]), [data-split-title]:not([data-split])')
        .forEach(splitTitle)
    }

    const scan = () => {
      if (!reduce) splitTitles()
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
    let layoutObserver: ResizeObserver | undefined
    let layoutRaf = 0

    // Scrolling is not the only thing that moves a pending element into view.
    // Opening an FAQ answer, a late-loading image and the font swap all reflow
    // the page without firing a single scroll event — and inside a
    // `content-visibility: auto` subtree the IntersectionObserver can miss the
    // crossing outright. Re-sweeping on every document resize is what stops an
    // element from being stranded at opacity 0 for the rest of the session.
    const onLayoutChange = () => {
      if (layoutRaf || (!pending.size && !pendingGroups.size)) return
      layoutRaf = requestAnimationFrame(() => {
        layoutRaf = 0
        sweep()
      })
    }

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
        // Deferred sections mount after the pointer bindings were installed,
        // so their mesh and CTAs have to be picked up on the way in.
        if (pointerMotionStarted) {
          initMeshPointer()
        }
      })
      domObserver.observe(document.body, { childList: true, subtree: true })
      sweepTimers = [300, 900, 2000].map((ms) =>
        window.setTimeout(() => {
          scan()
          sweep()
        }, ms),
      )
      unsubscribeSweep = subscribeScroll(sweep)
      if (typeof ResizeObserver !== 'undefined') {
        layoutObserver = new ResizeObserver(onLayoutChange)
        layoutObserver.observe(document.documentElement)
      }
      window.addEventListener('resize', onLayoutChange, { passive: true })
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

    /* Counters removed. Every number on this page is a claim — a Lighthouse
       score, a delivery time, a price. Rolling them up from zero meant that for
       1.4 seconds after each section came into view the page displayed numbers
       that were simply wrong (95 for 96, 71h for 72h), and a reader scrolling
       at speed only ever saw the wrong ones. The markup already carries the
       real figures; they are now what renders. */


    /* ── DESKTOP: the grid answers the pointer ──────────────────────────
       The mesh behind the hero and the navy sections was a static texture, so
       every one of those screens was a still image with copy on it. Lighting
       the grid under the cursor costs two custom properties per frame — the
       brightened lines and the mask that limits them are pure CSS — and it is
       the one thing on the page that only exists because someone is looking
       at it. Pointer-only by design: on a phone there is no cursor to answer,
       and the ambient parallax already carries those screens. */
    const initMeshPointer = () => {
      document.querySelectorAll<HTMLElement>('.section-mesh').forEach((mesh) => {
        const host = mesh.parentElement
        if (!host || host.dataset.meshPointer === 'on') return
        host.dataset.meshPointer = 'on'

        let raf = 0
        let cx = 0
        let cy = 0

        // The rect is measured inside the frame, not in the event: pointermove
        // arrives faster than the display refreshes, and a getBoundingClientRect
        // per event forces a synchronous layout the frame is about to redo.
        const onMove = (e: PointerEvent) => {
          cx = e.clientX
          cy = e.clientY
          if (raf) return
          raf = requestAnimationFrame(() => {
            raf = 0
            const r = mesh.getBoundingClientRect()
            if (!r.width || !r.height) return
            mesh.style.setProperty('--mx', `${(((cx - r.left) / r.width) * 100).toFixed(2)}%`)
            mesh.style.setProperty('--my', `${(((cy - r.top) / r.height) * 100).toFixed(2)}%`)
          })
        }
        const onEnter = (e: PointerEvent) => {
          onMove(e)
          mesh.style.setProperty('--mesh-hover', '1')
        }
        const onLeave = () => mesh.style.setProperty('--mesh-hover', '0')

        host.addEventListener('pointerenter', onEnter)
        host.addEventListener('pointermove', onMove)
        host.addEventListener('pointerleave', onLeave)
        animeCleanups.push(() => {
          host.removeEventListener('pointerenter', onEnter)
          host.removeEventListener('pointermove', onMove)
          host.removeEventListener('pointerleave', onLeave)
          if (raf) cancelAnimationFrame(raf)
          mesh.style.removeProperty('--mesh-hover')
          delete host.dataset.meshPointer
        })
      })
    }

    /* The magnetic pull on the primary buttons is gone. A control that leans
       toward the cursor is the same family of trick as a trailing cursor dot:
       it moves the target the reader is aiming at, and it appears on every
       generated landing page of the last three years. */

    /* ── DESKTOP: Anime.js pointer response, loaded only when the browser is idle ── */
    /* ── DESKTOP: one signal per card on hover ──────────────────────────
       Was: a 2px lift plus an anime.js-driven wash that tracked the pointer
       across the card. Two effects on one element, and the wash is the
       "premium" gloss every generated card ships with. The lift stays — it is
       the only thing that tells the reader the card is a link — and it is a CSS
       transition now, so the page does not pull a motion library down the wire
       to move something four pixels. */
    const initAnime = async () => {
      document.querySelectorAll<HTMLElement>('[data-anime-card]').forEach((el) => {
        if (el.dataset.hoverBound === 'on') return
        el.dataset.hoverBound = 'on'
        el.classList.add('card-lift')
        animeCleanups.push(() => {
          el.classList.remove('card-lift')
          delete el.dataset.hoverBound
        })
      })
    }

    /* ── boot ── */
    const boot = () => {
      // Scenes are transform/opacity driven off one shared rAF, so they are
      // cheap enough to keep on phones — that is where the page is mostly read.
      if (!reduce) initScenes()
    }

    // Ambient parallax is deliberately lighter on touch screens.
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
      initMeshPointer()
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
      layoutObserver?.disconnect()
      window.removeEventListener('resize', onLayoutChange)
      if (layoutRaf) cancelAnimationFrame(layoutRaf)
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
      animeCleanups.forEach((cleanup) => cleanup())
      parallaxItems = []
      style.remove()
    }
  }, [])

  return null
}
