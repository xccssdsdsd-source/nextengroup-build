'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const RX = 38
const RY = 33

const APPS = [
  { id: 'chat',   label: 'Chat',   color: '#00d4ff', angle: 0,   statusList: ['AI replied',    'Ticket resolved', 'User engaged'  ] },
  { id: 'cms',    label: 'CMS',    color: '#60a5fa', angle: 45,  statusList: ['Page published', 'Content live',   'Asset uploaded'] },
  { id: 'mobile', label: 'Mobile', color: '#38bdf8', angle: 90,  statusList: ['Push sent',      'Form submitted', 'Session active'] },
  { id: 'seo',    label: 'SEO',    color: '#93c5fd', angle: 135, statusList: ['Rank improved',  'Keyword hit',    'Report ready'  ] },
  { id: 'crm',    label: 'CRM',    color: '#00d4ff', angle: 180, statusList: ['Lead captured',  'Contact synced', 'Deal closed'   ] },
  { id: 'auto',   label: 'Auto',   color: '#34d399', angle: 225, statusList: ['Workflow ran',   'Task done',      'Trigger fired' ] },
  { id: 'ai',     label: 'AI',     color: '#a78bfa', angle: 270, statusList: ['Model invoked',  'Insight found',  'Decision made' ] },
  { id: 'email',  label: 'Email',  color: '#60a5fa', angle: 315, statusList: ['Message sent',   'Follow-up set',  'Reply received'] },
] as const

type AppId = typeof APPS[number]['id']

function cardPos(angle: number) {
  const r = angle * Math.PI / 180
  return { left: 50 + RX * Math.sin(r), top: 50 - RY * Math.cos(r) }
}

const ICON_PATHS: Record<AppId, string> = {
  chat:   'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  cms:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  mobile: 'M12 18h.01 M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  seo:    'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  crm:    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 1 0 0 8z',
  auto:   'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  ai:     'M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z M4 10a2 2 0 0 1 2-2h.5 M17.5 8H18a2 2 0 0 1 2 2 M12 8v8 M8 12h8',
  email:  'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
}

function AppIcon({ id, color }: { id: AppId; color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[id].split(' M').map((seg, i) => (
        <path key={i} d={(i === 0 ? '' : 'M') + seg} stroke={color} strokeWidth="1.8" fill="none" />
      ))}
    </svg>
  )
}

interface Particle { idx: number; t: number; speed: number }

export default function FlowNetwork() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const mouseCanvasRef = useRef({ x: -1, y: -1 })
  const activeRef = useRef<Set<number>>(new Set())
  const particlesRef = useRef<Particle[]>([])

  const [statuses, setStatuses] = useState<string[]>(() => APPS.map(a => a.statusList[0]))
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set())

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-1, 1], [4, -4])
  const rotateY = useTransform(springX, [-1, 1], [-4, 4])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    APPS.forEach((app, i) => {
      let si = 0
      const cycle = () => {
        si = (si + 1) % app.statusList.length
        setStatuses(prev => { const n = [...prev]; n[i] = app.statusList[si]; return n })
        activeRef.current.add(i)
        setActiveSet(prev => { const n = new Set(prev); n.add(i); return n })
        for (let j = 0; j < 5; j++) {
          particlesRef.current.push({ idx: i, t: j * 0.1, speed: 0.004 + Math.random() * 0.0025 })
        }
        const off = setTimeout(() => {
          activeRef.current.delete(i)
          setActiveSet(prev => { const n = new Set(prev); n.delete(i); return n })
        }, 2000)
        timers.push(off)
        const next = setTimeout(cycle, 2800 + i * 90 + Math.random() * 1400)
        timers.push(next)
      }
      const init = setTimeout(cycle, i * 380 + Math.random() * 500)
      timers.push(init)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = wrap.offsetWidth * dpr
      canvas.height = wrap.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const onMM = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      mouseCanvasRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
    }
    const onML = () => {
      mouseCanvasRef.current = { x: -1, y: -1 }
      mouseX.set(0)
      mouseY.set(0)
    }
    wrap.addEventListener('mousemove', onMM)
    wrap.addEventListener('mouseleave', onML)

    const draw = () => {
      const W = wrap.offsetWidth
      const H = wrap.offsetHeight
      const now = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      const { x: mx, y: my } = mouseCanvasRef.current
      const hasM = mx > 0
      const mpx = hasM ? (mx / W - 0.5) * 12 : 0
      const mpy = hasM ? (my / H - 0.5) * 12 : 0

      const cx = W * 0.5 + mpx * 0.4
      const cy = H * 0.5 + mpy * 0.4

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.65)
      bg.addColorStop(0, 'rgba(0,80,180,0.07)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      for (let ri = 0; ri < 3; ri++) {
        const phase = ((now * 0.35 + ri * 0.45) % 1)
        const rr = 44 + phase * 90
        const ro2 = (1 - phase) * 0.14
        ctx.beginPath()
        ctx.arc(cx, cy, rr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${ro2.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const satPx = APPS.map(app => {
        const p = cardPos(app.angle)
        return { x: (p.left / 100) * W + mpx, y: (p.top / 100) * H + mpy }
      })

      APPS.forEach((app, i) => {
        const sp = satPx[i]
        const isActive = activeRef.current.has(i)

        if (isActive) {
          ctx.save()
          ctx.shadowBlur = 18
          ctx.shadowColor = app.color
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(sp.x, sp.y)
          ctx.strokeStyle = app.color + '44'
          ctx.lineWidth = 2.5
          ctx.stroke()
          ctx.restore()
        }

        const grad = ctx.createLinearGradient(cx, cy, sp.x, sp.y)
        const a = isActive ? 0.55 : 0.12
        grad.addColorStop(0, `rgba(0,200,255,${a})`)
        grad.addColorStop(0.5, app.color + Math.round(a * 140).toString(16).padStart(2, '0'))
        grad.addColorStop(1, app.color + '22')
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(sp.x, sp.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = isActive ? 1.5 : 0.8
        ctx.stroke()
      })

      particlesRef.current = particlesRef.current.filter(p => p.t < 1.05)
      for (const p of particlesRef.current) {
        p.t += p.speed
        const sp = satPx[p.idx]
        const t = Math.min(p.t, 1)
        const px = cx + (sp.x - cx) * t
        const py = cy + (sp.y - cy) * t
        const alpha = Math.sin(t * Math.PI) * 0.95
        const app = APPS[p.idx]
        ctx.save()
        ctx.shadowBlur = 10
        ctx.shadowColor = app.color
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = app.color
        ctx.fill()
        ctx.globalAlpha = alpha * 0.35
        ctx.beginPath()
        ctx.arc(px - (sp.x - cx) * 0.028, py - (sp.y - cy) * 0.028, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (Math.random() < 0.045) {
        particlesRef.current.push({
          idx: Math.floor(Math.random() * APPS.length),
          t: 0,
          speed: 0.0028 + Math.random() * 0.0025,
        })
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      wrap.removeEventListener('mousemove', onMM)
      wrap.removeEventListener('mouseleave', onML)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={wrapRef}
      className="relative w-full h-full select-none"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(5,15,38,0.75) 0%, rgba(4,11,28,0.88) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(0,212,255,0.06), 0 28px 70px rgba(0,0,0,0.55), 0 0 90px rgba(8,60,180,0.12), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,80,200,0.06) 0%, transparent 100%)',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" />

      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20 }}>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            position: 'relative',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, rgba(0,170,255,0.38) 0%, rgba(0,55,160,0.22) 55%, rgba(0,20,70,0.18) 100%)',
            border: '1px solid rgba(0,212,255,0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 0 0 1px rgba(0,212,255,0.18), 0 0 35px rgba(0,212,255,0.28), 0 0 70px rgba(0,100,255,0.14), inset 0 1px 0 rgba(255,255,255,0.22)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 70,
              height: 70,
              borderRadius: '50%',
              border: '1px dashed rgba(0,212,255,0.22)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 58,
              height: 58,
              borderRadius: '50%',
              border: '1px dashed rgba(0,212,255,0.1)',
            }}
          />
          <span style={{ color: '#00d4ff', fontSize: 12, fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '0.04em', position: 'relative', zIndex: 1 }}>NG</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'var(--font-figtree)', letterSpacing: '0.16em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>Core AI</span>
        </motion.div>
      </div>

      {APPS.map((app, i) => {
        const pos = cardPos(app.angle)
        const isActive = activeSet.has(i)

        return (
          <motion.div
            key={app.id}
            className="absolute"
            style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%, -50%)', zIndex: 15 }}
            animate={{ y: [0, Math.sin(i * 1.4) * 5, 0] }}
            transition={{ duration: 3.2 + i * 0.35, ease: 'easeInOut', repeat: Infinity, delay: i * 0.18 }}
          >
            <motion.div
              animate={{
                background: isActive
                  ? `linear-gradient(135deg, ${app.color}22 0%, rgba(5,14,34,0.94) 100%)`
                  : 'linear-gradient(135deg, rgba(10,22,52,0.9) 0%, rgba(4,11,28,0.97) 100%)',
              }}
              transition={{ duration: 0.4 }}
              style={{
                width: 78,
                padding: '8px 9px 7px',
                borderRadius: 12,
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: `1px solid ${isActive ? app.color + '55' : 'rgba(255,255,255,0.09)'}`,
                boxShadow: isActive
                  ? `0 0 0 1px ${app.color}30, 0 8px 28px rgba(0,0,0,0.45), 0 0 22px ${app.color}25`
                  : '0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${app.color}40, transparent)`,
                  opacity: isActive ? 1 : 0.3,
                }}
              />

              {isActive && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: 13,
                    border: `1px solid ${app.color}`,
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: `${app.color}18`,
                    border: `1px solid ${app.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <AppIcon id={app.id} color={app.color} />
                </div>
                <span style={{
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 9.5,
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}>
                  {app.label}
                </span>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 5 }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <motion.span
                  animate={isActive ? { scale: [1, 1.35, 1], opacity: [1, 0.65, 1] } : {}}
                  transition={{ duration: 0.85, repeat: isActive ? Infinity : 0 }}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: isActive ? app.color : 'rgba(255,255,255,0.22)',
                    boxShadow: isActive ? `0 0 7px ${app.color}` : 'none',
                    flexShrink: 0,
                    marginTop: 2,
                    display: 'block',
                  }}
                />
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statuses[i]}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        color: isActive ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.36)',
                        fontSize: 9,
                        fontFamily: 'var(--font-figtree)',
                        fontWeight: 400,
                        lineHeight: 1.35,
                        display: 'block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {statuses[i]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
