'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundParticlesServices() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const FRAME_INTERVAL = isMobile ? 1000 / 15 : 0
    let lastFrameTime = 0

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1) : window.devicePixelRatio

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (time: number) => {
      if (isMobile && time - lastFrameTime < FRAME_INTERVAL) {
        if (visible) raf = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = time

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      const pulse = Math.sin(time / 1200) * 0.12 + 0.88
      const pad = w * 0.08
      const fw = w - pad * 2
      const fh = h * 0.88

      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.lineWidth = 1

      ctx.globalAlpha = pulse * 0.7
      ctx.strokeRect(pad, 20, fw, fh)

      ctx.globalAlpha = pulse * 0.9
      ctx.fillRect(pad, 20, fw, 28)

      const navItem = fw / 8
      ctx.globalAlpha = pulse * 0.6
      for (let i = 0; i < 3; i++) ctx.fillRect(pad + navItem * (i + 1), 62, navItem * 0.55, 10)

      const heroY = 100
      const heroW = fw * 0.65
      ctx.globalAlpha = pulse * 0.85
      ctx.fillRect(pad + (fw - heroW) / 2, heroY, heroW, fh * 0.22)

      const contentY = heroY + fh * 0.28
      const cardW = (fw - 24) / 3
      for (let col = 0; col < 3; col++) {
        const x = pad + col * (cardW + 12)
        ctx.globalAlpha = pulse * 0.5
        ctx.strokeRect(x, contentY, cardW, fh * 0.14)
        ctx.globalAlpha = pulse * 0.7
        ctx.fillRect(x + 8, contentY + 10, cardW - 16, 5)
        ctx.globalAlpha = pulse * 0.55
        ctx.fillRect(x + 8, contentY + 20, cardW * 0.65, 4)
      }

      ctx.strokeStyle = 'rgba(34,211,238,0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < 2; i++) {
        const off = Math.sin(time / 1400 + i) * 6
        ctx.globalAlpha = Math.sin(time / 1400 + i) * 0.25 + 0.2
        ctx.beginPath()
        ctx.moveTo(pad + 16, 105 + i * 90 + off)
        ctx.lineTo(pad + fw - 16, 105 + i * 90 + off)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      if (visible) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.9, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
