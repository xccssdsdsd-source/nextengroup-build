'use client'

import { useEffect, useRef } from 'react'
import { subscribeScroll } from '@/lib/scrollTicker'
import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Page-long colour journey: the aurora stack is painted twice (a cool blue
  // set and a deeper violet/amber set) and cross-faded by scroll depth, so the
  // background warms up as the visitor travels down the page instead of being
  // one flat wash. Only two custom properties are written per frame — no
  // layout reads, no per-layer style writes — and it rides the shared scroll
  // ticker rather than adding another listener.
  useEffect(() => {
    const root = rootRef.current
    const bar = barRef.current
    if (!root || !bar) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tintable = !window.matchMedia('(max-width: 768px)').matches

    let last = -1
    const render = () => {
      const travel = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const p = Math.min(Math.max(window.scrollY / travel, 0), 1)
      const rounded = Math.round(p * 200) / 200
      if (rounded === last) return
      last = rounded
      // Written on the bar itself, not on <html>: a custom property set on
      // the root element invalidates style for the entire document on every
      // scrolled frame, and the bar is the only thing that reads it.
      // The progress bar is worth having on every device; the aurora tint is
      // not, because mobile swaps the whole live stack for a still image.
      bar.style.setProperty('--read-p', String(rounded))
      if (!tintable) return
      root.style.setProperty('--sp', String(rounded))
      // Eased companion value so the drift never tracks the scrollbar 1:1.
      root.style.setProperty('--spe', (rounded * rounded * (3 - 2 * rounded)).toFixed(4))
    }

    render()
    return subscribeScroll(render)
  }, [])

  return (
    <>
      <div ref={barRef} className="read-progress" aria-hidden="true" />
      <div ref={rootRef} className={styles.root} data-bg-root aria-hidden="true">
        <div className={styles.mobileFallback} />
        <div className={styles.auroraCool} />
        <div className={styles.auroraWarm} />
        <div className={styles.ribbon} />
        <div className={`${styles.beam} ${styles.beamA}`} data-transient />
        <div className={`${styles.beam} ${styles.beamB}`} data-transient />
        <div className={`${styles.scrollBand} ${styles.bandA}`} />
        <div className={`${styles.scrollBand} ${styles.bandB}`} />
        <div className={styles.scrollGrain} />
        <div className={styles.stars} />
        <div className={styles.ambientGrain} />
        <div className={styles.fineGrain} />
        <div className={styles.coarseGrain} />
        <div className={styles.sheen} />
        <div className={styles.vignette} />
      </div>
    </>
  )
}
