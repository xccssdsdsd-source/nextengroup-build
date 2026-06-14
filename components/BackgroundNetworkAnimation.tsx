'use client'

import { useEffect, useRef } from 'react'

interface Point { x: number; y: number; vx: number; vy: number }

export default function BackgroundNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let W = rect.width || canvas.offsetWidth
    let H = rect.height || canvas.offsetHeight
    if (W === 0 || H === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)

    const COUNT = isMobile ? 6 : (window.innerWidth >= 1024 ? 22 : 12)
    const MAX_DIST = Math.min(W, H) * 0.30
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST
    const FRAME_INTERVAL = isMobile ? 1000 / 30 : 0
    let lastFrameTime = 0

    const pts: Point[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.20,
      vy: (Math.random() - 0.5) * 0.20,
    }))

    let raf = 0
    let visible = true

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(draw)
    }, { threshold: 0 })
    io.observe(canvas)

    const draw = (timestamp: number) => {
      if (isMobile && timestamp - lastFrameTime < FRAME_INTERVAL) {
        raf = visible ? requestAnimationFrame(draw) : 0
        return
      }
      lastFrameTime = timestamp

      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < COUNT; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)) }
        if (p.y < 0 || p.y > H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)) }
      }

      ctx.lineWidth = 0.8
      ctx.lineCap = 'round'

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dSq = dx * dx + dy * dy
          if (dSq < MAX_DIST_SQ) {
            const alpha = (1 - Math.sqrt(dSq) / MAX_DIST) * 0.18
            ctx.strokeStyle = `rgba(34,211,238,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = 'rgba(34,211,238,0.25)'
      for (let i = 0; i < COUNT; i++) {
        const r = i % 4 === 0 ? 2.5 : 1.5
        ctx.beginPath()
        ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = visible ? requestAnimationFrame(draw) : 0
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
