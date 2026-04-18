'use client'

import { useEffect, useRef, useState } from 'react'
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

const NODE_INFO: Record<string, string> = {
  WWW: 'Strony internetowe',
  CMS: 'Zarządzanie treścią',
  Auto: 'Automatyzacje',
  Chat: 'Chatbot AI',
  SEO: 'Pozycjonowanie',
  Email: 'Email marketing',
  Mobile: 'Aplikacje mobilne',
  AI: 'Sztuczna inteligencja',
}

const NUM_SATELLITES = 8
const CENTER_R = 32
const SATELLITE_R = 22

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; color: string
}

export default function FlowNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const hoveredIdxRef = useRef(-1)
  const highlightRef = useRef<{ nodeIdx: number; until: number } | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const [tooltip, setTooltip] = useState({ label: '', desc: '', x: 0, y: 0, visible: false })

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
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const getPositions = (w: number, h: number, timeS: number) =>
      NODES.map(n => ({
        x: (n.x / 100) * w,
        y: (n.y / 100) * h + Math.sin(timeS * 0.4 + n.phase) * 5,
        isCenter: n.isCenter,
        label: n.label,
        r: n.isCenter ? CENTER_R : SATELLITE_R,
      }))

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      hoveredIdxRef.current = -1
      canvas.style.cursor = 'default'
      setTooltip(prev => ({ ...prev, visible: false }))
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const pos = getPositions(w, h, Date.now() / 1000)

      let ci = -1, cd = 81
      pos.forEach((p, i) => {
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < cd) { cd = d; ci = i }
      })

      if (ci >= 0) {
        const p = pos[ci]
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const speed = 2 + Math.random() * 2
          particlesRef.current.push({
            x: p.x, y: p.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1.0, color: '#00d4ff',
          })
        }
        highlightRef.current = { nodeIdx: ci, until: Date.now() + 1500 }
      }
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('click', onClick)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const now = Date.now()
      const timeS = now / 1000

      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(6,16,36,0.7)'
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      for (let gx = 14; gx < w; gx += 28) {
        for (let gy = 14; gy < h; gy += 28) {
          ctx.beginPath()
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const positions = getPositions(w, h, timeS)
      const center = positions[0]

      const cgGrad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 140)
      cgGrad.addColorStop(0, 'rgba(0,100,255,0.08)')
      cgGrad.addColorStop(1, 'rgba(0,100,255,0)')
      ctx.beginPath()
      ctx.arc(center.x, center.y, 140, 0, Math.PI * 2)
      ctx.fillStyle = cgGrad
      ctx.fill()

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      let nearIdx = -1, nearDist = 81
      positions.forEach((p, i) => {
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < nearDist) { nearDist = d; nearIdx = i }
      })

      if (nearIdx !== hoveredIdxRef.current) {
        hoveredIdxRef.current = nearIdx
        canvas.style.cursor = nearIdx >= 0 ? 'pointer' : 'default'
        if (nearIdx > 0) {
          const p = positions[nearIdx]
          setTooltip({
            label: p.label,
            desc: NODE_INFO[p.label] || '',
            x: p.x,
            y: p.y - p.r - 10,
            visible: true,
          })
        } else {
          setTooltip(prev => ({ ...prev, visible: false }))
        }
      }

      const hl = highlightRef.current
      const hlActive = hl !== null && now < hl.until

      for (let li = 0; li < NUM_SATELLITES; li++) {
        const pb = positions[li + 1]
        const lineHl = hlActive && (hl!.nodeIdx === 0 || hl!.nodeIdx === li + 1)

        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.setLineDash([])
        ctx.strokeStyle = lineHl ? 'rgba(0,180,255,0.2)' : 'rgba(0,180,255,0.08)'
        ctx.lineWidth = 1
        ctx.stroke()

        const t = (now / 2000 + li * 0.18) % 1
        if (t > 0.12 && t < 0.88) {
          const t0 = Math.max(0.001, t - 0.15)
          const t2 = Math.min(0.999, t + 0.15)
          const beamGrad = ctx.createLinearGradient(center.x, center.y, pb.x, pb.y)
          beamGrad.addColorStop(0, 'rgba(0,212,255,0)')
          beamGrad.addColorStop(t0, 'rgba(0,212,255,0)')
          beamGrad.addColorStop(t, 'rgba(0,212,255,0.9)')
          beamGrad.addColorStop(t2, 'rgba(0,212,255,0)')
          beamGrad.addColorStop(1, 'rgba(0,212,255,0)')
          ctx.beginPath()
          ctx.moveTo(center.x, center.y)
          ctx.lineTo(pb.x, pb.y)
          ctx.strokeStyle = beamGrad
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      if (nearIdx >= 0 && mx > 0) {
        const p = positions[nearIdx]
        ctx.beginPath()
        ctx.moveTo(mx, my)
        ctx.lineTo(p.x, p.y)
        ctx.setLineDash([4, 6])
        ctx.strokeStyle = 'rgba(0,212,255,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.setLineDash([])
      }

      const ringConfigs = [
        { cycle: 2000, maxR: 70, offset: 0 },
        { cycle: 3000, maxR: 90, offset: 1000 },
      ]
      ringConfigs.forEach(({ cycle, maxR, offset }) => {
        const rt = ((now + offset) % cycle) / cycle
        const rr = CENTER_R + (maxR - CENTER_R) * rt
        const ringOpacity = (1 - rt) * 0.6
        ctx.beginPath()
        ctx.arc(center.x, center.y, rr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${ringOpacity.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.setLineDash([])
        ctx.stroke()
      })

      positions.forEach((p, i) => {
        const isHovered = i === hoveredIdxRef.current
        ctx.save()

        if (p.isCenter) {
          ctx.shadowBlur = 30
          ctx.shadowColor = '#00d4ff'
          const fill = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
          fill.addColorStop(0, 'rgba(0,150,255,0.25)')
          fill.addColorStop(1, 'rgba(0,60,180,0.1)')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = fill
          ctx.fill()
          ctx.strokeStyle = '#00d4ff'
          ctx.lineWidth = 1.5
          ctx.stroke()
        } else {
          if (isHovered) {
            ctx.shadowBlur = 16
            ctx.shadowColor = '#00d4ff'
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r + 4, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(0,212,255,0.4)'
            ctx.lineWidth = 1
            ctx.stroke()
          }
          const fill = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
          fill.addColorStop(0, isHovered ? 'rgba(20,55,100,0.98)' : 'rgba(13,40,80,0.95)')
          fill.addColorStop(1, 'rgba(4,14,32,0.98)')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = fill
          ctx.fill()
          ctx.strokeStyle = isHovered ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.15)'
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.shadowBlur = 0
        ctx.fillStyle = p.isCenter ? '#ffffff' : 'rgba(255,255,255,0.7)'
        ctx.font = p.isCenter
          ? 'bold 13px var(--font-syne), sans-serif'
          : '10px var(--font-figtree), sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.label, p.x, p.y)
        ctx.restore()
      })

      particlesRef.current = particlesRef.current.filter(pt => pt.life > 0)
      for (const pt of particlesRef.current) {
        pt.life -= 0.025
        pt.x += pt.vx
        pt.y += pt.vy
        pt.vx *= 0.96
        pt.vy *= 0.96
        ctx.save()
        ctx.shadowBlur = pt.life * 10
        ctx.shadowColor = pt.color
        ctx.globalAlpha = pt.life * 0.8
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.life * 4, 0, Math.PI * 2)
        ctx.fillStyle = pt.color
        ctx.fill()
        ctx.restore()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObserver.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <motion.div
      className="relative w-full h-full"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(0,212,255,0.05), 0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(13,79,199,0.12), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div
        className="absolute pointer-events-none z-50 px-3 py-2 rounded-lg"
        style={{
          left: tooltip.x,
          top: tooltip.y,
          background: 'rgba(8,20,44,0.92)',
          border: '1px solid rgba(0,212,255,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          fontFamily: 'var(--font-figtree), sans-serif',
          transform: tooltip.visible
            ? 'translate(-50%, calc(-100% - 8px))'
            : 'translate(-50%, calc(-100% + 4px))',
          opacity: tooltip.visible ? 1 : 0,
          transition: 'opacity 0.15s, transform 0.15s',
          whiteSpace: 'nowrap',
        }}
      >
        <div className="text-[#00d4ff] font-medium text-xs">{tooltip.label}</div>
        <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{tooltip.desc}</div>
      </div>
    </motion.div>
  )
}
