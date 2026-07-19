'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import CanvasErrorBoundary from './CanvasErrorBoundary'
import styles from './HeroBackdrop.module.css'

const loadHeroGradientCanvas = () => import('./HeroGradientCanvas')
const HeroGradientCanvas = dynamic(loadHeroGradientCanvas, { ssr: false })

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

export default function HeroBackdrop() {
  const [webGLAvailable, setWebGLAvailable] = useState(false)
  const [canvasFailed, setCanvasFailed] = useState(false)
  const [inRange, setInRange] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const slowConnection = connection?.saveData || connection?.effectiveType === '2g'
    if (reducedMotion || !finePointer || slowConnection) return

    let cancelled = false
    let started = false
    let idleCallback = 0
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      if (started || !supportsWebGL()) return
      started = true
      void loadHeroGradientCanvas().then(() => {
        if (!cancelled) setWebGLAvailable(true)
      })
    }

    // The CSS poster is present in the first server-rendered frame. Load the
    // heavier WebGL enhancement only after critical page resources are ready
    // and the browser has an idle window, so it never competes with the hero.
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleCallback = window.requestIdleCallback(start, { timeout: 1600 })
      } else {
        fallbackTimer = globalThis.setTimeout(start, 500)
      }
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', schedule)
      if (idleCallback) window.cancelIdleCallback(idleCallback)
      if (fallbackTimer) clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setInRange(entry.isIntersecting),
      { rootMargin: '180px 0px 180px 0px', threshold: 0.01 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!inRange) return
    const root = rootRef.current
    if (!root) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
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
  }, [inRange])

  const renderCanvas = webGLAvailable && !canvasFailed && inRange && pageVisible

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-hero-backdrop
      data-active={inRange}
      data-canvas-active={renderCanvas}
      aria-hidden='true'
    >
      <div className={styles.stage}>
        <div className={styles.poster} />
        {renderCanvas ? (
          <div className={styles.canvas} data-hero-canvas>
            <CanvasErrorBoundary onError={() => setCanvasFailed(true)}>
              <HeroGradientCanvas />
            </CanvasErrorBoundary>
          </div>
        ) : null}
      </div>
      <div className={styles.mobileGrain} />
      <div className={styles.veil} />
    </div>
  )
}
