'use client'

import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

interface Connection {
  from: number
  to: number
  opacity: number
}

export default function BackgroundNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
      },
      { threshold: 0 }
    )

    if (canvasRef.current) observer.observe(canvasRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width || canvas.offsetWidth
    const height = rect.height || canvas.offsetHeight

    if (width === 0 || height === 0) return

    canvas.width = width
    canvas.height = height

    const pointCount = window.innerWidth >= 1024 ? 25 : 15

    pointsRef.current = Array.from({ length: pointCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: (i % 4 === 0) ? 0.8 : (Math.random() * 0.5 + 0.4),
    }))

    const generateConnections = () => {
      const connections: Connection[] = []
      const points = pointsRef.current
      const maxDistance = Math.min(width, height) * 0.25

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            connections.push({
              from: i,
              to: j,
              opacity: 0.1 + (1 - distance / maxDistance) * 0.3,
            })
          }
        }
      }

      return connections
    }

    connectionsRef.current = generateConnections()

    const draw = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, width, height)

      connectionsRef.current.forEach((conn, idx) => {
        const from = pointsRef.current[conn.from]
        const to = pointsRef.current[conn.to]

        const pulse = Math.sin(Date.now() / 1500 + idx) * 0.15 + 0.85
        const opacity = isVisible ? conn.opacity * pulse * 0.7 : conn.opacity * 0.5

        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      })

      pointsRef.current.forEach((point, idx) => {
        const isHub = idx % 4 === 0
        const radius = isHub ? 2.5 : 1.5
        const baseSizeOpacity = isVisible ? (0.5 + Math.sin(Date.now() / 2000) * 0.2) : 0.5
        ctx.fillStyle = `rgba(59, 130, 246, ${point.opacity * baseSizeOpacity})`
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      if (!prefersReducedMotion) {
        pointsRef.current.forEach((point) => {
          point.x += point.vx
          point.y += point.vy

          if (point.x < 0 || point.x > width) point.vx *= -1
          if (point.y < 0 || point.y > height) point.vy *= -1

          point.x = Math.max(0, Math.min(width, point.x))
          point.y = Math.max(0, Math.min(height, point.y))
        })

        connectionsRef.current = generateConnections()
      }

      draw(ctx)

      if (isVisible && !prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (isVisible && !prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      const ctx = canvas.getContext('2d')
      if (ctx) draw(ctx)
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isVisible, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  )
}
