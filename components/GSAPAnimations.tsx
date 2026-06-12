'use client'

import { useEffect } from 'react'

export default function GSAPAnimations() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        /* ── TEXT REVEAL ──────────────────────────────────────────── */
        document.querySelectorAll('h1, h2').forEach((heading) => {
          if ((heading as HTMLElement).dataset.revealed) return
          if ((heading as HTMLElement).closest('[data-no-reveal]')) return
          ;(heading as HTMLElement).dataset.revealed = '1'

          const raw = heading.innerHTML
          const lines = raw.split(/<br\s*\/?>/i)
          if (lines.length <= 1) {
            const text = heading.textContent || ''
            const sentences = text.split(/(?<=\.)\s+|(?<=\n)/)
            if (sentences.length <= 1) {
              const wrapper = document.createElement('span')
              wrapper.style.cssText = 'display:block;overflow:hidden;'
              const inner = document.createElement('span')
              inner.style.cssText = 'display:block;clip-path:inset(0 0 100% 0);'
              inner.innerHTML = heading.innerHTML
              wrapper.appendChild(inner)
              heading.innerHTML = ''
              heading.appendChild(wrapper)
              gsap.to(inner, {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.75,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 80%',
                  once: true,
                },
              })
              return
            }
          }

          const parts = heading.innerHTML.split(/<br\s*\/?>/i)
          heading.innerHTML = parts
            .map(
              (part) =>
                `<span style="display:block;overflow:hidden;"><span class="gsap-line-inner" style="display:block;">${part}</span></span>`
            )
            .join('')

          const inners = heading.querySelectorAll('.gsap-line-inner')
          gsap.set(inners, { clipPath: 'inset(0 0 100% 0)' })
          gsap.to(inners, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              once: true,
            },
          })
        })

        /* ── NUMBER COUNTERS ──────────────────────────────────────── */
        const numberTargets = [
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

        numberTargets.forEach(({ selector, final, suffix = '' }) => {
          document.querySelectorAll(selector).forEach((el) => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: final,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = Math.round(obj.val) + suffix
              },
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            })
          })
        })

        /* ── SECTION ENTRANCE ─────────────────────────────────────── */
        const sections = document.querySelectorAll(
          'section:not(#hero):not([data-no-entrance])'
        )
        sections.forEach((section) => {
          const directChildren = Array.from(section.children).filter(
            (el) => !el.matches('h1, h2, [data-no-entrance]')
          )
          if (!directChildren.length) return

          gsap.fromTo(
            section,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              once: true,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
                onEnter() {
                  gsap.set(section, { clearProps: 'willChange' })
                },
              },
              onComplete() {
                gsap.set(section, { clearProps: 'willChange' })
              },
            }
          )
        })

        /* ── PARALLAX ─────────────────────────────────────────────── */
        mm.add('(min-width: 769px)', () => {
          const heroSection = document.querySelector('#hero, section:first-of-type')

          const heroBlobs = document.querySelectorAll('[data-parallax-blob]')
          heroBlobs.forEach((blob) => {
            gsap.to(blob, {
              y: () => (heroSection?.clientHeight || 600) * 0.3,
              ease: 'none',
              scrollTrigger: {
                trigger: heroSection || document.body,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            })
          })

          const heroHeadline = document.querySelector('[data-parallax-headline]')
          if (heroHeadline) {
            gsap.to(heroHeadline, {
              y: () => (heroSection?.clientHeight || 600) * 0.05,
              ease: 'none',
              scrollTrigger: {
                trigger: heroSection || document.body,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            })
          }

          const portfolioImages = document.querySelectorAll('[data-parallax-image]')
          portfolioImages.forEach((img) => {
            gsap.to(img, {
              y: -60,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('section') || img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            })
          })
        })

        /* ── 3D CARD TILT ─────────────────────────────────────────── */
        mm.add('(min-width: 769px)', () => {
          const tiltCards = document.querySelectorAll(
            '.value-card, .realizacja-card, [data-tilt-card]'
          )

          tiltCards.forEach((card) => {
            const el = card as HTMLElement
            let glare = el.querySelector<HTMLElement>('.tilt-glare')
            if (!glare) {
              glare = document.createElement('div')
              glare.className = 'tilt-glare'
              glare.style.cssText =
                'position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%);opacity:0;z-index:1;transition:none;'
              el.style.position = 'relative'
              el.appendChild(glare)
            }

            const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.1, ease: 'none' })
            const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.1, ease: 'none' })

            const onMove = (e: MouseEvent) => {
              const rect = el.getBoundingClientRect()
              const cx = rect.left + rect.width / 2
              const cy = rect.top + rect.height / 2
              const dx = (e.clientX - cx) / (rect.width / 2)
              const dy = (e.clientY - cy) / (rect.height / 2)
              rotX(-dy * 8)
              rotY(dx * 8)
              if (glare) {
                const gx = ((e.clientX - rect.left) / rect.width) * 100
                const gy = ((e.clientY - rect.top) / rect.height) * 100
                glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
                glare.style.opacity = '1'
              }
              gsap.set(el, { willChange: 'transform' })
            }

            const onLeave = () => {
              gsap.to(el, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out',
                clearProps: 'willChange',
                onComplete: () => gsap.set(el, { clearProps: 'rotationX,rotationY' }),
              })
              if (glare) gsap.to(glare, { opacity: 0, duration: 0.3 })
            }

            el.addEventListener('mousemove', onMove)
            el.addEventListener('mouseleave', onLeave)

            return () => {
              el.removeEventListener('mousemove', onMove)
              el.removeEventListener('mouseleave', onLeave)
            }
          })
        })

        /* ── MAGNETIC BUTTONS ─────────────────────────────────────── */
        mm.add('(min-width: 769px) and (hover: hover) and (pointer: fine)', () => {
          const magnetics = document.querySelectorAll<HTMLElement>(
            '.btn-primary, [data-magnetic]'
          )

          const cleanups: Array<() => void> = []

          magnetics.forEach((btn) => {
            const moveX = gsap.quickTo(btn, 'x', { duration: 0.2, ease: 'power2.out' })
            const moveY = gsap.quickTo(btn, 'y', { duration: 0.2, ease: 'power2.out' })

            const onMove = (e: MouseEvent) => {
              const rect = btn.getBoundingClientRect()
              const cx = rect.left + rect.width / 2
              const cy = rect.top + rect.height / 2
              const dx = ((e.clientX - cx) / (rect.width / 2)) * 8
              const dy = ((e.clientY - cy) / (rect.height / 2)) * 8
              moveX(dx)
              moveY(dy)
            }

            const onLeave = () => {
              gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'elastic.out(1, 0.4)',
              })
            }

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

    init()

    return () => {
      ctx?.revert()
    }
  }, [])

  return null
}
