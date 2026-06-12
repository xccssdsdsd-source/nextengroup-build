'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

export default function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && lenis) {
            lenis.scrollTo(value as number, { immediate: true })
          }
          return lenis ? lenis.scroll : window.scrollY
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
      })

      ScrollTrigger.addEventListener('refresh', () => lenis?.resize())
      ScrollTrigger.refresh()
    }

    init()

    return () => {
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
