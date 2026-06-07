'use client'

import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60
const CONNECT_RADIUS = 140
const HUB_INTERVAL = 8
const CANVAS_OPACITY = 0.9

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  mass: number
  isHub: boolean
  color: string
}

const colors = [
  'rgba(59, 130, 246, 0.4)',
  'rgba(6, 182, 212, 0.4)',
  'rgba(99, 102, 241, 0.4)',
]

const hubColor = 'rgba(59, 130, 246, 0.6)'

export default function BackgroundParticlesServices() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * (canvas.width / window.devicePixelRatio),
      y: Math.random() * (canvas.height / window.devicePixelRatio),
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      mass: Math.random() * 1.5 + 0.5,
      isHub: i % HUB_INTERVAL === 0,
      color: colors[i % colors.length],
    }))

    particlesRef.current = particles

    const drawParticle = (p: Particle) => {
      const radius = p.isHub ? 5 : 2.5
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = p.isHub ? hubColor : p.color
      ctx.fill()
    }

    const drawLine = (p1: Particle, p2: Particle, dist: number) => {
      const alpha = Math.max(0, 1 - dist / CONNECT_RADIUS)
      const width = p1.isHub || p2.isHub ? 1.2 : 0.7
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.15})`
      ctx.lineWidth = width
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    }

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x
          const dy = particles[j].y - particles[i].y
          const dist = Math.hypot(dx, dy)

          if (dist < CONNECT_RADIUS) {
            drawLine(particles[i], particles[j], dist)
          }
        }
      }

      particles.forEach(drawParticle)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })

    resizeObserver.observe(canvas)

    return () => {
      resizeObserver.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        opacity: CANVAS_OPACITY,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
