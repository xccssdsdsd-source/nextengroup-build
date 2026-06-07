'use client'

import { useEffect, useRef } from 'react'

const CANVAS_OPACITY = 0.9
const WIREFRAME_COLOR = 'rgba(59, 130, 246, 0.06)'
const LINE_COLOR = 'rgba(59, 130, 246, 0.04)'

export default function BackgroundParticlesServices() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    const drawWireframe = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = LINE_COLOR
      ctx.lineWidth = 1
      ctx.fillStyle = WIREFRAME_COLOR

      const padding = w * 0.08
      const frameW = w - padding * 2
      const frameH = h * 0.9

      ctx.strokeRect(padding, 20, frameW, frameH)

      const headerH = 30
      ctx.fillRect(padding, 20, frameW, headerH)

      const navY = 60
      const navItem = frameW / 8
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(padding + navItem * (i + 1), navY, navItem * 0.6, 12)
      }

      const heroY = navY + 40
      const heroW = frameW * 0.7
      const heroX = padding + (frameW - heroW) / 2
      ctx.fillRect(heroX, heroY, heroW, frameH * 0.25)

      const contentY = heroY + frameH * 0.3
      const cardW = (frameW - 30) / 3
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const x = padding + col * (cardW + 15)
          const y = contentY + row * (frameH * 0.2)
          ctx.strokeRect(x, y, cardW, frameH * 0.15)
          ctx.fillRect(x + 8, y + 10, cardW - 16, 6)
          ctx.fillRect(x + 8, y + 22, cardW - 16, 4)
          ctx.fillRect(x + 8, y + 32, cardW * 0.6, 4)
        }
      }
    }

    drawWireframe()

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
      drawWireframe()
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
