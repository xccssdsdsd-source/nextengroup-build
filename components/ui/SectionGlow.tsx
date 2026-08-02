'use client'

import { useEffect, useRef, useState } from 'react'
import { subscribeScroll } from '@/lib/scrollTicker'
import styles from './SectionGlow.module.css'

type Variant =
  | 'hero'
  | 'services1'
  | 'services2'
  | 'process'
  | 'portfolio'
  | 'testimonials'
  | 'faq'
  | 'contact'

export default function SectionGlow({ variant }: { variant: Variant }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const washRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '8% 0px 8% 0px', threshold: 0.04 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    const wash = washRef.current
    if (!root || !wash) return

    let frame = 0
    let offsetTop = 0
    let height = 0

    const measure = () => {
      const r = root.getBoundingClientRect()
      offsetTop = r.top + window.scrollY
      height = r.height
    }

    const render = () => {
      frame = 0
      const top = offsetTop - window.scrollY
      const viewport = Math.max(window.innerHeight, 1)
      const travel = viewport + height
      const progress = Math.max(0, Math.min(1, (viewport - top) / travel))
      const offset = progress - 0.5
      const compact = window.innerWidth <= 768
      const amplitude = compact ? 0.68 : 1

      wash.style.transform = `translate3d(${(offset * 64 * amplitude).toFixed(2)}px, ${(offset * -42 * amplitude).toFixed(2)}px, 0) rotate(${(offset * 5).toFixed(2)}deg) scale(${(1.02 + Math.abs(offset) * 0.08).toFixed(3)})`
      wash.style.opacity = (0.32 + (1 - Math.abs(offset) * 2) * 0.24).toFixed(3)
    }

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }
    const requestRemeasure = () => {
      measure()
      requestRender()
    }

    measure()
    render()
    const unsubscribeScroll = subscribeScroll(render)
    window.addEventListener('resize', requestRemeasure, { passive: true })

    return () => {
      unsubscribeScroll()
      window.removeEventListener('resize', requestRemeasure)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [visible])

  return (
    <div
      ref={rootRef}
      className={`${styles.glow} ${styles[variant]}`}
      data-visible={visible}
      aria-hidden='true'
    >
      <div ref={washRef} className={styles.scrollWash} />
    </div>
  )
}
