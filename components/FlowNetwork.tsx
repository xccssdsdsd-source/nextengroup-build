'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const RX = 38
const RY = 33

const APPS = [
  { id: 'crm',    label: 'CRM',    color: '#00d4ff', angle: 0   },
  { id: 'email',  label: 'Email',  color: '#60a5fa', angle: 45  },
  { id: 'chat',   label: 'Chat',   color: '#00d4ff', angle: 90  },
  { id: 'cms',    label: 'CMS',    color: '#7dd3fc', angle: 135 },
  { id: 'mobile', label: 'Mobile', color: '#38bdf8', angle: 180 },
  { id: 'seo',    label: 'SEO',    color: '#93c5fd', angle: 225 },
  { id: 'auto',   label: 'Auto',   color: '#34d399', angle: 270 },
  { id: 'ai',     label: 'AI',     color: '#a78bfa', angle: 315 },
] as const

type AppId = typeof APPS[number]['id']

const STORY = [
  { active: [0],    label: 'Lead captured',      dir: 'in'  as const, hold: 2400 },
  { active: [7],    label: 'AI processing…',     dir: 'out' as const, hold: 2200 },
  { active: [1, 2], label: 'Auto-response sent', dir: 'out' as const, hold: 2200 },
  { active: [3, 4], label: 'Content updated',    dir: 'out' as const, hold: 2000 },
  { active: [5, 6], label: 'Workflow triggered', dir: 'out' as const, hold: 2000 },
]

const STATUSES: Record<AppId, string[]> = {
  crm:    ['Lead captured',  'Contact synced', 'Deal closed'   ],
  email:  ['Message sent',   'Follow-up set',  'Reply received'],
  chat:   ['AI replied',     'Ticket resolved','User engaged'  ],
  cms:    ['Page published', 'Content live',   'Asset uploaded'],
  mobile: ['Push sent',      'Form submitted', 'Session active'],
  seo:    ['Rank improved',  'Keyword hit',    'Report ready'  ],
  auto:   ['Workflow ran',   'Task done',      'Trigger fired' ],
  ai:     ['Model invoked',  'Insight found',  'Decision made' ],
}

const ICONS: Record<AppId, string> = {
  crm:    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 1 0 0 8z',
  email:  'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  chat:   'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  cms:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  mobile: 'M12 18h.01 M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  seo:    'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  auto:   'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  ai:     'M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z M4 10a2 2 0 0 1 2-2h.5 M17.5 8H18a2 2 0 0 1 2 2 M12 8v8 M8 12h8',
}

function AppIcon({ id, color }: { id: AppId; color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[id].split(' M').map((seg, i) => (
        <path key={i} d={(i === 0 ? '' : 'M') + seg} stroke={color} strokeWidth="1.8" fill="none" />
      ))}
    </svg>
  )
}

function cardPos(angle: number) {
  const r = angle * Math.PI / 180
  return { left: 50 + RX * Math.sin(r), top: 50 - RY * Math.cos(r) }
}

function bezierPt(t: number, p0: {x:number,y:number}, cp: {x:number,y:number}, p1: {x:number,y:number}) {
  const u = 1 - t
  return { x: u*u*p0.x + 2*u*t*cp.x + t*t*p1.x, y: u*u*p0.y + 2*u*t*cp.y + t*t*p1.y }
}

function ctrlPt(a: {x:number,y:number}, b: {x:number,y:number}, bend = 0.22) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx*dx + dy*dy) || 1
  return { x: mx - (dy / len) * len * bend, y: my + (dx / len) * len * bend }
}

interface Particle { idx: number; t: number; speed: number; size: number; dir: 'in'|'out' }

export default function FlowNetwork() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const mousePx = useRef({ x: -1, y: -1 })
  const activeRef = useRef<Set<number>>(new Set())
  const particles = useRef<Particle[]>([])

  const [statuses, setStatuses] = useState<string[]>(() => APPS.map(a => STATUSES[a.id][0]))
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set())
  const [storyLabel, setStoryLabel] = useState('')
  const [corePulse, setCorePulse] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spX = useSpring(mouseX, { stiffness: 48, damping: 18 })
  const spY = useSpring(mouseY, { stiffness: 48, damping: 18 })
  const rotateX = useTransform(spY, [-1, 1], [5, -5])
  const rotateY = useTransform(spX, [-1, 1], [-5, 5])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const activate = (idxs: number[], dir: 'in'|'out', label: string) => {
      if (idxs.includes(7)) setCorePulse(true)
      idxs.forEach(ai => {
        activeRef.current.add(ai)
        setActiveSet(prev => { const n = new Set(prev); n.add(ai); return n })
        setStatuses(prev => {
          const n = [...prev]
          const list = STATUSES[APPS[ai].id]
          n[ai] = list[Math.floor(Math.random() * list.length)]
          return n
        })
        for (let j = 0; j < 10; j++) {
          particles.current.push({ idx: ai, t: j * 0.055, speed: 0.003 + Math.random() * 0.002, size: 2.2 + Math.random() * 1.4, dir })
        }
      })
      setStoryLabel(label)
    }

    const deactivate = (idxs: number[]) => {
      if (idxs.includes(7)) setCorePulse(false)
      idxs.forEach(ai => {
        activeRef.current.delete(ai)
        setActiveSet(prev => { const n = new Set(prev); n.delete(ai); return n })
      })
    }

    const runStory = () => {
      let offset = 0
      STORY.forEach(phase => {
        const t1 = setTimeout(() => activate(phase.active, phase.dir, phase.label), offset)
        const t2 = setTimeout(() => deactivate(phase.active), offset + phase.hold)
        timers.push(t1, t2)
        offset += phase.hold + 600
      })
      const t3 = setTimeout(() => { setStoryLabel(''); timers.push(setTimeout(runStory, 1000)) }, offset)
      timers.push(t3)
    }

    runStory()
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
      mousePx.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
    }
    const onML = () => { mousePx.current = { x: -1, y: -1 }; mouseX.set(0); mouseY.set(0) }
    wrap.addEventListener('mousemove', onMM)
    wrap.addEventListener('mouseleave', onML)

    const draw = () => {
      const W = wrap.offsetWidth
      const H = wrap.offsetHeight
      const now = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      const { x: mx, y: my } = mousePx.current
      const hasM = mx > 0
      const mpx = hasM ? (mx / W - 0.5) * 16 : 0
      const mpy = hasM ? (my / H - 0.5) * 16 : 0

      const cx = W * 0.5 + mpx * 0.28
      const cy = H * 0.5 + mpy * 0.28

      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.72)
      bgG.addColorStop(0, 'rgba(0,110,255,0.065)')
      bgG.addColorStop(0.55, 'rgba(0,40,140,0.03)')
      bgG.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bgG
      ctx.fillRect(0, 0, W, H)

      for (let ri = 0; ri < 4; ri++) {
        const phase = (now * 0.26 + ri * 0.32) % 1
        ctx.beginPath()
        ctx.arc(cx, cy, 38 + phase * 120, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${((1 - phase) * 0.16).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const sats = APPS.map(app => {
        const p = cardPos(app.angle)
        return { x: (p.left / 100) * W + mpx * 0.72, y: (p.top / 100) * H + mpy * 0.72 }
      })

      APPS.forEach((app, i) => {
        const sp = sats[i]
        const isActive = activeRef.current.has(i)
        const cp = ctrlPt({ x: cx, y: cy }, sp)

        if (isActive) {
          ctx.save()
          ctx.shadowBlur = 22
          ctx.shadowColor = app.color
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.quadraticCurveTo(cp.x, cp.y, sp.x, sp.y)
          ctx.strokeStyle = app.color + '50'
          ctx.lineWidth = 2.2
          ctx.stroke()
          ctx.restore()
        }

        const g = ctx.createLinearGradient(cx, cy, sp.x, sp.y)
        const a = isActive ? 0.62 : 0.11
        g.addColorStop(0, `rgba(0,200,255,${a})`)
        g.addColorStop(0.5, app.color + Math.round(a * 170).toString(16).padStart(2, '0'))
        g.addColorStop(1, app.color + '12')
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.quadraticCurveTo(cp.x, cp.y, sp.x, sp.y)
        ctx.strokeStyle = g
        ctx.lineWidth = isActive ? 1.6 : 0.65
        ctx.stroke()
      })

      particles.current = particles.current.filter(p => p.t < 1.06)
      for (const p of particles.current) {
        p.t += p.speed
        const sp = sats[p.idx]
        const app = APPS[p.idx]
        const cp = ctrlPt({ x: cx, y: cy }, sp)
        const bt = p.dir === 'out' ? Math.min(p.t, 1) : 1 - Math.min(p.t, 1)
        const pos = bezierPt(bt, { x: cx, y: cy }, cp, sp)
        const trailBt = p.dir === 'out' ? Math.max(0, bt - 0.07) : Math.min(1, bt + 0.07)
        const trail = bezierPt(trailBt, { x: cx, y: cy }, cp, sp)
        const alpha = Math.sin(Math.min(p.t, 1) * Math.PI) * 0.92

        ctx.save()
        ctx.shadowBlur = 16
        ctx.shadowColor = app.color
        ctx.globalAlpha = alpha

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = app.color
        ctx.fill()

        const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.size * 3)
        halo.addColorStop(0, app.color + 'aa')
        halo.addColorStop(1, 'transparent')
        ctx.globalAlpha = alpha * 0.22
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        ctx.globalAlpha = alpha * 0.38
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, p.size * 0.55, 0, Math.PI * 2)
        ctx.fillStyle = app.color
        ctx.fill()

        ctx.restore()
      }

      if (Math.random() < 0.038) {
        const i = Math.floor(Math.random() * APPS.length)
        particles.current.push({ idx: i, t: 0, speed: 0.0022 + Math.random() * 0.0018, size: 1.4 + Math.random() * 0.8, dir: Math.random() > 0.5 ? 'out' : 'in' })
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
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(148deg, rgba(4,13,36,0.84) 0%, rgba(3,9,24,0.93) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 0 0 1px rgba(0,212,255,0.07), 0 32px 80px rgba(0,0,0,0.62), 0 0 100px rgba(8,60,180,0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 64% 52% at 50% 50%, rgba(0,95,230,0.07) 0%, transparent 100%)' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" />

      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20 }}>
        <motion.div
          animate={{ scale: corePulse ? [1, 1.13, 1.06, 1] : [1, 1.032, 1] }}
          transition={{ duration: corePulse ? 0.55 : 3.8, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: corePulse ? 0.35 : 0 }}
          style={{
            position: 'relative',
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: corePulse
              ? 'radial-gradient(circle at 34% 30%, rgba(0,225,255,0.52) 0%, rgba(0,85,210,0.34) 55%, rgba(0,25,82,0.22) 100%)'
              : 'radial-gradient(circle at 34% 30%, rgba(0,172,255,0.36) 0%, rgba(0,56,162,0.21) 55%, rgba(0,20,72,0.17) 100%)',
            border: `1px solid ${corePulse ? 'rgba(0,212,255,0.78)' : 'rgba(0,212,255,0.52)'}`,
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            boxShadow: corePulse
              ? '0 0 0 1px rgba(0,212,255,0.26), 0 0 55px rgba(0,212,255,0.48), 0 0 95px rgba(0,100,255,0.27), inset 0 1px 0 rgba(255,255,255,0.30)'
              : '0 0 0 1px rgba(0,212,255,0.17), 0 0 34px rgba(0,212,255,0.25), 0 0 72px rgba(0,100,255,0.13), inset 0 1px 0 rgba(255,255,255,0.21)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            style={{ position: 'absolute', width: 78, height: 78, borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.26)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 13, ease: 'linear', repeat: Infinity }}
            style={{ position: 'absolute', width: 63, height: 63, borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.13)' }}
          />
          {corePulse && (
            <motion.div
              initial={{ scale: 0.88, opacity: 0.65 }}
              animate={{ scale: 1.65, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut', repeat: Infinity }}
              style={{ position: 'absolute', width: 88, height: 88, borderRadius: '50%', border: '1.5px solid rgba(0,212,255,0.65)', pointerEvents: 'none' }}
            />
          )}
          <span style={{ color: '#00d4ff', fontSize: 13, fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '0.04em', position: 'relative', zIndex: 1 }}>NG</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 7.5, fontFamily: 'var(--font-figtree)', letterSpacing: '0.18em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>Core AI</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {storyLabel && (
            <motion.div
              key={storyLabel}
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 'calc(50% + 54px)',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                padding: '4px 13px',
                borderRadius: 100,
                background: 'rgba(0,18,56,0.88)',
                border: '1px solid rgba(0,212,255,0.28)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.38), 0 0 20px rgba(0,212,255,0.1)',
                color: '#00d4ff',
                fontSize: 10,
                fontFamily: 'var(--font-figtree)',
                fontWeight: 500,
                letterSpacing: '0.07em',
                zIndex: 30,
              }}
            >
              {storyLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {APPS.map((app, i) => {
        const pos = cardPos(app.angle)
        const isActive = activeSet.has(i)

        return (
          <motion.div
            key={app.id}
            className="absolute"
            style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%, -50%)', zIndex: 15 }}
            animate={{ y: [0, Math.sin(i * 1.38) * 5.5, 0] }}
            transition={{ duration: 3.4 + i * 0.32, ease: 'easeInOut', repeat: Infinity, delay: i * 0.22 }}
          >
            <motion.div
              animate={{
                background: isActive
                  ? `linear-gradient(138deg, ${app.color}2a 0%, rgba(4,11,30,0.96) 100%)`
                  : 'linear-gradient(138deg, rgba(7,17,44,0.9) 0%, rgba(3,9,24,0.97) 100%)',
                boxShadow: isActive
                  ? `0 0 0 1px ${app.color}48, 0 12px 34px rgba(0,0,0,0.52), 0 0 30px ${app.color}32`
                  : '0 0 0 1px rgba(255,255,255,0.055), 0 8px 26px rgba(0,0,0,0.44)',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 80,
                padding: '9px 10px 8px',
                borderRadius: 13,
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                border: `1px solid ${isActive ? app.color + '62' : 'rgba(255,255,255,0.09)'}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${app.color}${isActive ? '65' : '2e'}, transparent)`,
              }} />

              {isActive && (
                <motion.div
                  style={{ position: 'absolute', inset: -1, borderRadius: 14, border: `1px solid ${app.color}`, pointerEvents: 'none' }}
                  animate={{ opacity: [0.38, 0.88, 0.38] }}
                  transition={{ duration: 0.92, repeat: Infinity }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <div style={{
                  width: 23, height: 23, borderRadius: 6,
                  background: `${app.color}1c`,
                  border: `1px solid ${app.color}3a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: isActive ? `0 0 11px ${app.color}2e` : 'none',
                }}>
                  <AppIcon id={app.id} color={app.color} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 9.5, fontFamily: 'var(--font-syne)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>
                  {app.label}
                </span>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 5 }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <motion.span
                  animate={isActive ? { scale: [1, 1.42, 1], opacity: [1, 0.58, 1] } : {}}
                  transition={{ duration: 0.82, repeat: isActive ? Infinity : 0 }}
                  style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: isActive ? app.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? `0 0 8px ${app.color}` : 'none',
                    flexShrink: 0, marginTop: 2.5, display: 'block',
                  }}
                />
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statuses[i]}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        color: isActive ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.3)',
                        fontSize: 9, fontFamily: 'var(--font-figtree)', fontWeight: 400,
                        lineHeight: 1.35, display: 'block', whiteSpace: 'nowrap',
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
