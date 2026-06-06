'use client'

import { useEffect, useRef } from 'react'

interface Props {
  className?: string
}

export default function ProcessFlowBackground({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.offsetWidth || 800
    const H = canvas.offsetHeight || 400
    canvas.width = W
    canvas.height = H

    const NODE_COUNT = 38
    const MAX_DIST = 180

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    let raf: number

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(37,99,235,${alpha})`
            ctx!.lineWidth = 1
            ctx!.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 3, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(37,99,235,0.55)'
        ctx!.fill()
      }

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
