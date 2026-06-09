'use client'

import { useEffect, useRef } from 'react'

interface Props {
  className?: string
}

export default function ProcessFlowBackground({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    function setCanvasSize(): { W: number; H: number; dpr: number } | undefined {
      const parent = canvas!.parentElement
      if (!parent) return

      const W = parent.offsetWidth
      const H = parent.offsetHeight
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx.scale(dpr, dpr)

      return { W, H, dpr }
    }

    const sizeInit = setCanvasSize()
    if (!sizeInit) return
    let size = sizeInit

    // Fewer nodes — was max(50,...), reduced for better perf
    const NODE_COUNT = Math.max(25, Math.floor((size.W * size.H) / 60000))
    const MAX_DIST = Math.min(200, size.W / 4)
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST // avoid sqrt in hot path

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * size.W,
      y: Math.random() * size.H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }))

    function draw() {
      if (!size) return
      const { W, H } = size

      ctx.clearRect(0, 0, W, H)

      // Use squared distance check — skip sqrt unless inside range
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < MAX_DIST_SQ) {
            const alpha = (1 - Math.sqrt(distSq) / MAX_DIST) * 0.4
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(37,99,235,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(37,99,235,0.65)'
        ctx.fill()
      }

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > size.W) n.vx *= -1
        if (n.y < 0 || n.y > size.H) n.vy *= -1
        n.x = Math.max(0, Math.min(size.W, n.x))
        n.y = Math.max(0, Math.min(size.H, n.y))
      }

      if (isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    function startAnimation() {
      if (isVisibleRef.current) {
        draw()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const newSize = setCanvasSize()
      if (newSize) {
        size = newSize
        nodes.forEach(n => {
          n.x = Math.random() * size.W
          n.y = Math.random() * size.H
        })
      }
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        }
      },
      { threshold: 0.1 }
    )

    startAnimation()
    resizeObserver.observe(canvas.parentElement!)
    intersectionObserver.observe(canvas)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      style={{ willChange: 'contents' }}
    />
  )
}
