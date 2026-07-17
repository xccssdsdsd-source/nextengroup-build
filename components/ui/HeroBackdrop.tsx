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
  const [inRange, setInRange] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) return

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return

    let cancelled = false
    const start = () => {
      if (!supportsWebGL()) return
      void loadHeroGradientCanvas().then(() => {
        if (!cancelled) setWebGLAvailable(true)
      })
    }

    // Load quietly once the browser is idle rather than waiting for the
    // user's first pointer move/click — starting it on interaction meant
    // the abrupt fade-in landed at the exact moment someone reached for a
    // button, reading as the button itself glitching.
    let idleId = 0
    let timeoutId = 0
    if (typeof requestIdleCallback !== 'undefined') {
      idleId = requestIdleCallback(start, { timeout: 1500 })
    } else {
      timeoutId = window.setTimeout(start, 400)
    }

    return () => {
      cancelled = true
      if (idleId && typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
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

  useEffect(() => {
    if (!inRange) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = rootRef.current
    const stage = stageRef.current
    const cursorGlow = cursorGlowRef.current
    if (!root || !stage || !cursorGlow) return

    let frame = 0
    let inside = false
    let x = 0
    let y = 0
    let velocityX = 0
    let velocityY = 0
    let targetX = 0
    let targetY = 0
    let glowX = window.innerWidth * 0.64
    let glowY = window.innerHeight * 0.34
    let targetGlowX = glowX
    let targetGlowY = glowY

    const tick = () => {
      velocityX = (velocityX + (targetX - x) * 0.075) * 0.72
      velocityY = (velocityY + (targetY - y) * 0.075) * 0.72
      x += velocityX
      y += velocityY
      glowX += (targetGlowX - glowX) * 0.14
      glowY += (targetGlowY - glowY) * 0.14

      stage.style.transform = `scale(1.08) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateX(${(-y * 0.018).toFixed(3)}deg) rotateY(${(x * 0.018).toFixed(3)}deg)`
      cursorGlow.style.transform = `translate3d(${(glowX - 260).toFixed(1)}px, ${(glowY - 260).toFixed(1)}px, 0)`

      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(velocityX) + Math.abs(velocityY) > 0.04
      const glowMoving = Math.abs(targetGlowX - glowX) + Math.abs(targetGlowY - glowY) > 0.4
      frame = moving || (inside && glowMoving) ? window.requestAnimationFrame(tick) : 0
    }

    const ensureFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const bounds = root.getBoundingClientRect()
      const nextInside = e.clientY >= bounds.top && e.clientY <= bounds.bottom
      if (!nextInside) {
        if (inside) {
          inside = false
          targetX = 0
          targetY = 0
          cursorGlow.style.opacity = '0'
          ensureFrame()
        }
        return
      }

      inside = true
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = ((e.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2
      targetX = -nx * 34
      targetY = -ny * 24
      targetGlowX = e.clientX
      targetGlowY = e.clientY - bounds.top
      cursorGlow.style.opacity = '1'
      ensureFrame()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
      stage.style.transform = 'scale(1.08)'
      cursorGlow.style.opacity = '0'
    }
  }, [inRange])

  const renderCanvas = webGLAvailable && inRange && pageVisible

  return (
    <div ref={rootRef} className={styles.root} data-hero-backdrop data-active={inRange} aria-hidden='true'>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.poster} />
        <div className={styles.mobileAurora} />
        {renderCanvas ? (
          <div className={styles.canvas} data-hero-canvas>
            <CanvasErrorBoundary>
              <HeroGradientCanvas />
            </CanvasErrorBoundary>
          </div>
        ) : null}
      </div>
      <div ref={cursorGlowRef} className={styles.cursorGlow} />
      <div className={styles.mobileGrain} />
      <div className={styles.veil} />
    </div>
  )
}
