'use client'

import { useEffect } from 'react'

const counterTargets = [
  { selector: '.counter-2099', final: 2099 },
  { selector: '.counter-2499', final: 2499 },
  { selector: '.counter-3999', final: 3999 },
  { selector: '.counter-247', final: 24, suffix: '/7' },
  { selector: '.counter-24h', final: 24, suffix: 'h' },
  { selector: '.counter-72h', final: 72, suffix: 'h' },
  { selector: '.counter-96', final: 96 },
  { selector: '.counter-97', final: 97 },
  { selector: '.counter-100', final: 100 },
  { selector: '.counter-93', final: 93 },
]

export default function GSAPAnimations() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null

    /* ── CSS-BASED SCROLL REVEALS (IntersectionObserver) ── */
    const style = document.createElement('style')
    style.textContent = `
      .io-reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
      .io-reveal.io-visible { opacity: 1; transform: none; }
      .io-reveal-scale { opacity: 0; transform: scale(0.96); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
      .io-reveal-scale.io-visible { opacity: 1; transform: none; }
      .io-kicker { opacity: 0; transform: translateX(-10px); transition: opacity 0.5s ease, transform 0.5s ease; }
      .io-kicker.io-visible { opacity: 1; transform: none; }
      .io-divider { opacity: 0; transform: scaleX(0); transform-origin: center; transition: opacity 0.8s ease, transform 0.8s ease; }
      .io-divider.io-visible { opacity: 1; transform: scaleX(1); }
    `
    document.head.appendChild(style)

    const revealTargets: { el: HTMLElement; cls: string; delay?: number }[] = []

    document.querySelectorAll<HTMLElement>('[data-fade-in], [data-stagger-group] > *, [data-img-reveal], [data-stat-block]').forEach((el, i) => {
      const delay = parseFloat((el as HTMLElement).dataset.fadeIn || '0') || (el.closest('[data-stagger-group]') ? i * 0.07 : 0)
      el.classList.add('io-reveal')
      if (delay) el.style.transitionDelay = `${delay}s`
      revealTargets.push({ el, cls: 'io-reveal' })
    })

    document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((el) => {
      el.classList.remove('io-reveal')
      el.classList.add('io-reveal-scale')
      revealTargets.push({ el, cls: 'io-reveal-scale' })
    })

    document.querySelectorAll<HTMLElement>('.section-kicker').forEach((el) => {
      if (!el.dataset.ioKicker) {
        el.dataset.ioKicker = '1'
        el.classList.add('io-kicker')
        revealTargets.push({ el, cls: 'io-kicker' })
      }
    })

    document.querySelectorAll<HTMLElement>('.section-divider').forEach((el) => {
      el.classList.add('io-divider')
      revealTargets.push({ el, cls: 'io-divider' })
    })

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).classList.add('io-visible')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    revealTargets.forEach(({ el }) => io.observe(el))

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        /* ── NUMBER COUNTERS ── */
        const animateCounter = (el: Element, final: number, suffix: string) => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: final,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(obj.val) + suffix },
            scrollTrigger: { trigger: el, start: 'top 87%', once: true },
          })
        }
        counterTargets.forEach(({ selector, final, suffix = '' }) => {
          document.querySelectorAll(selector).forEach((el) => animateCounter(el, final, suffix))
        })
        document.querySelectorAll<HTMLElement>('[data-counter-final]').forEach((el) =>
          animateCounter(el, Number(el.dataset.counterFinal), el.dataset.counterSuffix || ''),
        )

        /* ── PARALLAX ── */
        mm.add('(min-width: 769px)', () => {
          const heroSection = document.querySelector('#hero, section:first-of-type')

          document.querySelectorAll('[data-parallax-blob]').forEach((blob, i) => {
            gsap.to(blob, {
              y: () => (heroSection?.clientHeight || 600) * (0.25 + i * 0.05),
              ease: 'none',
              force3D: true,
              scrollTrigger: { trigger: heroSection || document.body, start: 'top top', end: 'bottom top', scrub: 2 },
            })
          })

          const heroHeadline = document.querySelector('[data-parallax-headline]')
          if (heroHeadline) {
            gsap.to(heroHeadline, {
              y: () => (heroSection?.clientHeight || 600) * 0.10,
              ease: 'none',
              force3D: true,
              scrollTrigger: { trigger: heroSection || document.body, start: 'top top', end: 'bottom top', scrub: 1.5 },
            })
          }

          document.querySelectorAll('[data-parallax-image]').forEach((img) => {
            gsap.to(img, {
              y: -50,
              ease: 'none',
              scrollTrigger: { trigger: img.closest('section') || img, start: 'top bottom', end: 'bottom top', scrub: 1 },
            })
          })
        })

        /* ── 3D CARD TILT ── */
        mm.add('(min-width: 769px)', () => {
          const tiltCards = document.querySelectorAll('.value-card, .realizacja-card, [data-tilt-card]')
          tiltCards.forEach((card) => {
            const el = card as HTMLElement
            let glare = el.querySelector<HTMLElement>('.tilt-glare')
            if (!glare) {
              glare = document.createElement('div')
              glare.className = 'tilt-glare'
              glare.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 60%);opacity:0;z-index:1;'
              el.style.position = 'relative'
              el.appendChild(glare)
            }

            const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.12, ease: 'none' })
            const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.12, ease: 'none' })

            const onMove = (e: MouseEvent) => {
              const rect = el.getBoundingClientRect()
              rotX(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 7)
              rotY(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7)
              if (glare) {
                glare.style.background = `radial-gradient(circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%, rgba(255,255,255,0.10) 0%, transparent 60%)`
                glare.style.opacity = '1'
              }
            }
            const onLeave = () => {
              gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.55, ease: 'power2.out', onComplete: () => gsap.set(el, { clearProps: 'rotationX,rotationY' }) })
              if (glare) gsap.to(glare, { opacity: 0, duration: 0.3 })
            }
            el.addEventListener('mousemove', onMove)
            el.addEventListener('mouseleave', onLeave)
            return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
          })
        })

        /* ── MAGNETIC BUTTONS ── */
        mm.add('(min-width: 769px) and (hover: hover) and (pointer: fine)', () => {
          const cleanups: Array<() => void> = []
          document.querySelectorAll<HTMLElement>('.btn-primary, [data-magnetic]').forEach((btn) => {
            const moveX = gsap.quickTo(btn, 'x', { duration: 0.2, ease: 'power2.out' })
            const moveY = gsap.quickTo(btn, 'y', { duration: 0.2, ease: 'power2.out' })
            const onMove = (e: MouseEvent) => {
              const rect = btn.getBoundingClientRect()
              moveX(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8)
              moveY(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8)
            }
            const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
            btn.addEventListener('mousemove', onMove)
            btn.addEventListener('mouseleave', onLeave)
            cleanups.push(() => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) })
          })
          return () => cleanups.forEach((fn) => fn())
        })
      })
    }

    /* ── MOBILE: counters only, no GSAP payload (parallax/tilt/magnetic are desktop-only) ── */
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    let counterIo: IntersectionObserver | undefined

    const runMobileCounters = () => {
      counterIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          counterIo!.unobserve(el)
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
      }, { threshold: 0, rootMargin: '0px 0px -13% 0px' })

      counterTargets.forEach(({ selector, final, suffix = '' }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          el.dataset.cf = String(final)
          el.dataset.cs = suffix
          counterIo!.observe(el)
        })
      })
      document.querySelectorAll<HTMLElement>('[data-counter-final]').forEach((el) => {
        el.dataset.cf = el.dataset.counterFinal!
        el.dataset.cs = el.dataset.counterSuffix || ''
        counterIo!.observe(el)
      })
    }

    let t: ReturnType<typeof setTimeout> | undefined
    const start = isMobile ? runMobileCounters : init

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => start(), { timeout: 2000 })
      return () => {
        cancelIdleCallback(id)
        ctx?.revert()
        counterIo?.disconnect()
        io.disconnect()
        style.remove()
      }
    }
    t = setTimeout(() => start(), 400)

    return () => {
      clearTimeout(t)
      ctx?.revert()
      counterIo?.disconnect()
      io.disconnect()
      style.remove()
    }
  }, [])

  return null
}
