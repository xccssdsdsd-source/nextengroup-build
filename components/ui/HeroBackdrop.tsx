'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroBackdrop.module.css'

export default function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inRangeRef = useRef(true)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        inRangeRef.current = entry.isIntersecting
      },
      { rootMargin: '180px 0px 180px 0px', threshold: 0.01 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let frame = 0
    const onScroll = () => {
      if (frame || !inRangeRef.current) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const h = (window.innerHeight || 1) * 0.94
        const p = Math.min(Math.max(window.scrollY / h, 0), 1)
        const eased = p * p * (3 - 2 * p)
        root.style.opacity = String(1 - eased)
        root.style.transform = `translate3d(0, ${(window.scrollY * 0.2).toFixed(1)}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.root} data-hero-backdrop aria-hidden='true'>
      <div className={styles.stage}>
        <div className={styles.poster}>
          <div className={styles.blobA} />
          <div className={styles.blobB} />
          <div className={styles.blobC} />
          <div className={styles.blobD} />
        </div>
      </div>
      <div className={styles.mobileGrain} />
      <div className={styles.veil} />
    </div>
  )
}
