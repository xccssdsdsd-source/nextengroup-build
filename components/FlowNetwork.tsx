'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { x: 50, y: 50, isCenter: true,  label: 'NG',     phase: 0    },
  { x: 22, y: 30, isCenter: false, label: 'WWW',    phase: 0.7  },
  { x: 68, y: 18, isCenter: false, label: 'CMS',    phase: 1.4  },
  { x: 82, y: 35, isCenter: false, label: 'Auto',   phase: 2.1  },
  { x: 80, y: 65, isCenter: false, label: 'Chat',   phase: 0.3  },
  { x: 70, y: 82, isCenter: false, label: 'SEO',    phase: 1.9  },
  { x: 30, y: 85, isCenter: false, label: 'Email',  phase: 2.6  },
  { x: 18, y: 65, isCenter: false, label: 'Mobile', phase: 0.9  },
  { x: 20, y: 52, isCenter: false, label: 'AI',     phase: 1.6  },
]

const NUM_LINES = 8
const BURST_CYCLE = 4000
const BURST_TRAVEL = 600
const CENTER_R = 28
const SATELLITE_R = 22

export default function FlowNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const now = Date.now()
      const timeS = now / 1000

      const positions = NODES.map(n => ({
        x: (n.x / 100) * w,
        y: (n.y / 100) * h + Math.sin(timeS * 0.4 + n.phase) * 5,
        isCenter: n.isCenter,
        label: n.label,
        r: n.isCenter ? CENTER_R : SATELLITE_R,
      }))

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      let nearestIdx = -1
      let nearestDist = 61
      positions.forEach((p, i) => {
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < nearestDist) { nearestDist = d; nearestIdx = i }
      })
      canvas.style.cursor = nearestIdx >= 0 ? 'pointer' : 'default'

      const center = positions[0]

      for (let li = 0; li < NUM_LINES; li++) {
        const pb = positions[li + 1]

        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1
        ctx.stroke()

        const pulseT = (now / 1800 + li * 0.14) % 1
        const px = center.x + (pb.x - center.x) * pulseT
        const py = center.y + (pb.y - center.y) * pulseT
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00d4ff'
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#00d4ff'
        ctx.fill()
        ctx.restore()

        const cycleMod = (now + li * (BURST_CYCLE / NUM_LINES)) % BURST_CYCLE
        if (cycleMod < BURST_TRAVEL) {
          const bt = cycleMod / BURST_TRAVEL
          const bx = center.x + (pb.x - center.x) * bt
          const by = center.y + (pb.y - center.y) * bt
          ctx.save()
          ctx.shadowBlur = 16
          ctx.shadowColor = '#00d4ff'
          ctx.globalAlpha = Math.sin(bt * Math.PI)
          ctx.beginPath()
          ctx.arc(bx, by, 5, 0, Math.PI * 2)
          ctx.fillStyle = '#00d4ff'
          ctx.fill()
          ctx.restore()
        }
      }

      positions.forEach((p, i) => {
        if (p.isCenter) {
          const ringSize = p.r + 10 + Math.sin(timeS * 2) * 4
          const glow = ctx.createRadialGradient(p.x, p.y, p.r, p.x, p.y, ringSize + 20)
          glow.addColorStop(0, 'rgba(0,180,255,0.25)')
          glow.addColorStop(1, 'rgba(0,180,255,0)')
          ctx.beginPath()
          ctx.arc(p.x, p.y, ringSize + 20, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        ctx.save()
        if (p.isCenter) {
          ctx.shadowBlur = 20
          ctx.shadowColor = '#00d4ff'
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.isCenter ? 'rgba(0,180,255,0.15)' : 'rgba(8,20,44,0.9)'
        ctx.fill()
        ctx.strokeStyle = p.isCenter
          ? '#00d4ff'
          : i === nearestIdx ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.12)'
        ctx.lineWidth = p.isCenter ? 1.5 : 1
        ctx.stroke()
        ctx.restore()

        ctx.fillStyle = p.isCenter ? '#00d4ff' : '#ffffff'
        ctx.font = p.isCenter ? `bold 13px var(--font-syne)` : `11px var(--font-figtree)`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.label, p.x, p.y)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="relative w-full h-full"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 0 60px rgba(13,79,199,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  )
}
