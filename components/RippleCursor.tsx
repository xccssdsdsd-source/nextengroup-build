'use client'

import { useEffect, useRef } from 'react'

export default function RippleCursor() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overlay = overlayRef.current
    const canvas = canvasRef.current
    if (!overlay || !canvas) return

    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize, { passive: true })

    const mx = { x: -999, y: -999 }
    let lastMove = 0
    let raf = 0
    let active = false
    let overlayVisible = false

    const trail: { x: number; y: number; t: number }[] = []
    const TRAIL_LEN = 18
    const FADE_MS = 180

    const onMove = (e: MouseEvent) => {
      mx.x = e.clientX; mx.y = e.clientY
      lastMove = performance.now()

      overlay.style.setProperty('--fx', e.clientX + 'px')
      overlay.style.setProperty('--fy', e.clientY + 'px')
      if (!overlayVisible) {
        overlayVisible = true
        overlay.style.opacity = '1'
      }

      if (!active) { active = true; raf = requestAnimationFrame(draw) }
    }

    const onLeave = () => {
      overlayVisible = false
      overlay.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave, { passive: true })

    let lastEmit = 0

    const draw = (now: number) => {
      const idle = now - lastMove
      const stopped = idle > 80

      if (!stopped && now - lastEmit > 10) {
        lastEmit = now
        trail.push({ x: mx.x, y: mx.y, t: now })
        if (trail.length > TRAIL_LEN) trail.shift()
      }

      const cutoff = now - FADE_MS
      while (trail.length && trail[0].t < cutoff) trail.shift()

      ctx.clearRect(0, 0, W, H)

      if (trail.length < 2) {
        active = false
        return
      }

      raf = requestAnimationFrame(draw)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 1; i < trail.length; i++) {
        const p0 = trail[i - 1]
        const p1 = trail[i]
        const age0 = 1 - Math.min((now - p0.t) / FADE_MS, 1)
        const age1 = 1 - Math.min((now - p1.t) / FADE_MS, 1)

        const frac = i / trail.length
        const w = frac * 10 * ((age0 + age1) / 2)
        if (w < 0.2) continue

        const a0 = age0 * age0 * 0.6
        const a1 = age1 * age1 * 0.6

        const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y)
        grad.addColorStop(0, `rgba(180,240,255,${a0.toFixed(3)})`)
        grad.addColorStop(1, `rgba(34,211,238,${a1.toFixed(3)})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = w
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }

      ctx.restore()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9996,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          mixBlendMode: 'screen',
          background: 'radial-gradient(circle 300px at var(--fx, -999px) var(--fy, -999px), rgba(94,234,255,0.09) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9997, mixBlendMode: 'screen' }}
      />
    </>
  )
}
