'use client'

import { useEffect, useRef } from 'react'

export default function RippleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize, { passive: true })

    const mx = { x: -999, y: -999 }
    let lastMove = 0
    let raf = 0

    // trail of points
    const trail: { x: number; y: number; t: number }[] = []
    const TRAIL_LEN = 28
    const FADE_MS = 220  // how fast trail fades after stop

    const onMove = (e: MouseEvent) => {
      mx.x = e.clientX; mx.y = e.clientY
      lastMove = performance.now()
      if (!active) { active = true; raf = requestAnimationFrame(draw) }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let lastEmit = 0
    let active = false

    const draw = (now: number) => {
      const idle = now - lastMove
      const stopped = idle > 80

      if (!stopped && now - lastEmit > 6) {
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

      if (trail.length < 2) return

      // draw thick torch trail
      for (let i = 1; i < trail.length; i++) {
        const p0 = trail[i - 1]
        const p1 = trail[i]
        const age0 = 1 - Math.min((now - p0.t) / FADE_MS, 1)
        const age1 = 1 - Math.min((now - p1.t) / FADE_MS, 1)

        // thickness: fat at head, tapers at tail
        const frac0 = i / trail.length
        const frac1 = (i + 1) / trail.length
        const w0 = frac0 * 18 * age0
        const w1 = frac1 * 18 * age1
        const w = (w0 + w1) / 2

        if (w < 0.2) continue

        const a0 = age0 * age0 * 0.85
        const a1 = age1 * age1 * 0.85

        const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y)
        grad.addColorStop(0, `rgba(180,240,255,${a0.toFixed(3)})`)
        grad.addColorStop(1, `rgba(34,211,238,${a1.toFixed(3)})`)

        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.strokeStyle = grad
        ctx.lineWidth = w
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = 'rgba(34,211,238,0.9)'
        ctx.shadowBlur = w * 2.2
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
        ctx.restore()
      }

      // glowing head dot
      const head = trail[trail.length - 1]
      const headAge = 1 - Math.min((now - head.t) / FADE_MS, 1)
      if (headAge > 0.05) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        const r = 14
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r)
        g.addColorStop(0, `rgba(255,255,255,${(headAge * 0.95).toFixed(3)})`)
        g.addColorStop(0.3, `rgba(120,240,255,${(headAge * 0.7).toFixed(3)})`)
        g.addColorStop(1, 'rgba(34,211,238,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(head.x, head.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
