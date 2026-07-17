'use client'

import { useEffect, useRef } from 'react'
import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const bandARef = useRef<HTMLDivElement>(null)
  const bandBRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const field = fieldRef.current
    if (!field) return
    let frame = 0
    const onMove = (e: MouseEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        field.style.translate = `${(-nx * 24).toFixed(2)}px ${(-ny * 18).toFixed(2)}px`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    const bandA = bandARef.current
    const bandB = bandBRef.current
    const grain = grainRef.current
    const stars = starsRef.current
    if (!bandA || !bandB || !grain || !stars) return

    let frame = 0

    const render = () => {
      frame = 0
      const viewport = Math.max(window.innerHeight, 1)
      const phase = window.scrollY / viewport
      const compact = window.innerWidth <= 768
      const amplitude = compact ? 0.64 : 1
      const waveA = Math.sin(phase * Math.PI * 0.62)
      const waveB = Math.cos(phase * Math.PI * 0.44)

      bandA.style.transform = `translate3d(${(waveA * 42 * amplitude).toFixed(2)}px, ${(phase * -24 * amplitude).toFixed(2)}px, 0) rotate(${(-8 + waveB * 2.2).toFixed(2)}deg) scale(${(1.02 + Math.abs(waveA) * 0.035).toFixed(3)})`
      bandA.style.opacity = (0.2 + Math.abs(waveB) * 0.12).toFixed(3)

      bandB.style.transform = `translate3d(${(waveB * -34 * amplitude).toFixed(2)}px, ${(phase * 18 * amplitude).toFixed(2)}px, 0) rotate(${(7 + waveA * 1.8).toFixed(2)}deg) scale(${(1.01 + Math.abs(waveB) * 0.04).toFixed(3)})`
      bandB.style.opacity = (0.14 + Math.abs(waveA) * 0.1).toFixed(3)

      grain.style.transform = `translate3d(${(waveB * 18 * amplitude).toFixed(2)}px, ${(waveA * 26 * amplitude).toFixed(2)}px, 0) rotate(${(waveA * 1.2).toFixed(2)}deg)`
      grain.style.opacity = (0.085 + Math.abs(waveA * waveB) * 0.07).toFixed(3)

      stars.style.transform = `translate3d(${(waveA * -12 * amplitude).toFixed(2)}px, ${(waveB * 16 * amplitude).toFixed(2)}px, 0)`
    }

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender, { passive: true })

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={fieldRef} className={styles.field} />
      <div ref={bandARef} className={`${styles.scrollBand} ${styles.bandA}`} />
      <div ref={bandBRef} className={`${styles.scrollBand} ${styles.bandB}`} />
      <div ref={grainRef} className={styles.scrollGrain} />
      <div ref={starsRef} className={styles.stars} />
      <div className={styles.sheen} />
    </div>
  )
}
