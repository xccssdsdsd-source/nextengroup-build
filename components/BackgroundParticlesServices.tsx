'use client'

import { useEffect, useRef } from 'react'

const CANVAS_OPACITY = 0.85
const WIREFRAME_COLOR = 'rgba(59, 130, 246, 0.07)'
const LINE_COLOR = 'rgba(59, 130, 246, 0.05)'
const ACCENT_COLOR = 'rgba(96, 165, 250, 0.15)'

export default function BackgroundParticlesServices() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

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

    const drawWireframe = (time: number) => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, w, h)

      const pulse = Math.sin(time / 1000) * 0.15 + 0.85

      ctx.strokeStyle = LINE_COLOR
      ctx.lineWidth = 1
      ctx.fillStyle = WIREFRAME_COLOR

      const padding = w * 0.08
      const frameW = w - padding * 2
      const frameH = h * 0.9

      ctx.globalAlpha = pulse * 0.8
      ctx.strokeRect(padding, 20, frameW, frameH)

      const headerH = 30
      ctx.globalAlpha = pulse
      ctx.fillRect(padding, 20, frameW, headerH)

      const navY = 60
      const navItem = frameW / 8
      ctx.globalAlpha = pulse * 0.7
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(padding + navItem * (i + 1), navY, navItem * 0.6, 12)
      }

      const heroY = navY + 40
      const heroW = frameW * 0.7
      const heroX = padding + (frameW - heroW) / 2
      ctx.globalAlpha = pulse * 0.9
      ctx.fillRect(heroX, heroY, heroW, frameH * 0.25)

      const contentY = heroY + frameH * 0.3
      const cardW = (frameW - 30) / 3
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const x = padding + col * (cardW + 15)
          const y = contentY + row * (frameH * 0.2)
          ctx.globalAlpha = pulse * 0.6
          ctx.strokeRect(x, y, cardW, frameH * 0.15)
          ctx.globalAlpha = pulse * 0.8
          ctx.fillRect(x + 8, y + 10, cardW - 16, 6)
          ctx.globalAlpha = pulse * 0.7
          ctx.fillRect(x + 8, y + 22, cardW - 16, 4)
          ctx.globalAlpha = pulse * 0.65
          ctx.fillRect(x + 8, y + 32, cardW * 0.6, 4)
        }
      }

      ctx.globalAlpha = 1
      ctx.strokeStyle = ACCENT_COLOR
      ctx.lineWidth = 1.5
      for (let i = 0; i < 2; i++) {
        const offset = Math.sin(time / 1200 + i) * 8
        ctx.globalAlpha = Math.sin(time / 1200 + i) * 0.3 + 0.3
        ctx.beginPath()
        ctx.moveTo(padding + 20, 100 + i * 100 + offset)
        ctx.lineTo(padding + frameW - 20, 100 + i * 100 + offset)
        ctx.stroke()
      }
    }

    const animate = (time: number) => {
      timeRef.current = time
      drawWireframe(time)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
      drawWireframe(timeRef.current)
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
