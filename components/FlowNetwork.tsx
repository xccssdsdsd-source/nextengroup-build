'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const RX = 37
const RY = 32

const APPS: { id: string; label: string; color: string; angle: number }[] = [
  { id: 'crm',    label: 'CRM',        color: '#00e5ff', angle: 0   },
  { id: 'email',  label: 'Email',      color: '#3b82f6', angle: 45  },
  { id: 'chat',   label: 'Chat',       color: '#8b5cf6', angle: 90  },
  { id: 'cms',    label: 'CMS',        color: '#14b8a6', angle: 135 },
  { id: 'mobile', label: 'Mobile',     color: '#0ea5e9', angle: 180 },
  { id: 'seo',    label: 'SEO',        color: '#10b981', angle: 225 },
  { id: 'auto',   label: 'Auto',       color: '#06b6d4', angle: 270 },
  { id: 'ai',     label: 'AI',         color: '#a855f7', angle: 315 },
]

const WORKFLOW_EDGES: [number, number][] = [
  [0, 7], [7, 1], [7, 2], [1, 3], [2, 4], [3, 5], [4, 6],
]

const STORY: Array<{ active: number[]; edges: [number, number][]; label: string; hold: number }> = [
  { active: [0],          edges: [],              label: 'Lead captured',     hold: 1600 },
  { active: [0, 7],       edges: [[0, 7]],         label: 'AI processing…',    hold: 2000 },
  { active: [7, 1, 2],    edges: [[7, 1], [7, 2]], label: 'Tasks dispatched',  hold: 2000 },
  { active: [1, 3, 2, 4], edges: [[1, 3], [2, 4]], label: 'Content synced',    hold: 2000 },
  { active: [3, 5, 4, 6], edges: [[3, 5], [4, 6]], label: 'Workflow complete', hold: 1800 },
]

const STATUSES: Record<string, string[]> = {
  crm:    ['Lead captured', 'Contact synced', 'Deal closed'],
  email:  ['Message sent',  'Follow-up set',  'Reply received'],
  chat:   ['AI replied',    'Ticket resolved', 'User engaged'],
  cms:    ['Page published', 'Content live',   'Asset uploaded'],
  mobile: ['Push sent',     'Form submitted',  'Session active'],
  seo:    ['Rank improved', 'Keyword hit',     'Report ready'],
  auto:   ['Workflow ran',  'Task done',       'Trigger fired'],
  ai:     ['Model invoked', 'Insight found',   'Decision made'],
}

const ICONS: Record<string, string> = {
  crm:    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 1 0 0 8z',
  email:  'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  chat:   'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  cms:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  mobile: 'M12 18h.01 M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  seo:    'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  auto:   'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  ai:     'M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z M4 10a2 2 0 0 1 2-2h.5 M17.5 8H18a2 2 0 0 1 2 2 M12 8v8 M8 12h8',
}

function AppIcon({ id, color }: { id: string; color: string }) {
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

function qbez(t: number, ax: number, ay: number, cpx: number, cpy: number, bx: number, by: number) {
  const u = 1 - t
  return { x: u * u * ax + 2 * u * t * cpx + t * t * bx, y: u * u * ay + 2 * u * t * cpy + t * t * by }
}

function ctrl(ax: number, ay: number, bx: number, by: number, bend = 0.22) {
  const mx = (ax + bx) / 2, my = (ay + by) / 2
  const dx = bx - ax, dy = by - ay
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  return { x: mx - (dy / len) * len * bend, y: my + (dx / len) * len * bend }
}

interface HubParticle { kind: 'hub'; idx: number; dir: 'in' | 'out'; t: number; speed: number; size: number }
interface EdgeParticle { kind: 'edge'; fi: number; ti: number; t: number; speed: number; size: number }
type Particle = HubParticle | EdgeParticle

export default function FlowNetwork() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const mousePx = useRef({ x: -1, y: -1 })
  const activeIdxRef = useRef<Set<number>>(new Set())
  const activeEdgeRef = useRef<Set<string>>(new Set())
  const particles = useRef<Particle[]>([])

  const [statuses, setStatuses] = useState<string[]>(() => APPS.map(a => STATUSES[a.id][0]))
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set())
  const [storyLabel, setStoryLabel] = useState('')
  const [corePulse, setCorePulse] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spX = useSpring(mouseX, { stiffness: 42, damping: 16 })
  const spY = useSpring(mouseY, { stiffness: 42, damping: 16 })
  const rotateX = useTransform(spY, [-1, 1], [6, -6])
  const rotateY = useTransform(spX, [-1, 1], [-6, 6])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const activate = (phase: typeof STORY[0]) => {
      if (phase.active.includes(7)) setCorePulse(true)
      phase.active.forEach(ai => {
        activeIdxRef.current.add(ai)
        setActiveSet(prev => { const n = new Set(prev); n.add(ai); return n })
        setStatuses(prev => {
          const n = [...prev]
          const list = STATUSES[APPS[ai].id]
          n[ai] = list[Math.floor(Math.random() * list.length)]
          return n
        })
        for (let j = 0; j < 12; j++) {
          particles.current.push({ kind: 'hub', idx: ai, dir: 'out', t: j * 0.06, speed: 0.003 + Math.random() * 0.002, size: 2 + Math.random() * 1.4 })
        }
      })
      phase.edges.forEach(([fi, ti]) => {
        activeEdgeRef.current.add(`${fi}-${ti}`)
        for (let j = 0; j < 10; j++) {
          particles.current.push({ kind: 'edge', fi, ti, t: j * 0.07, speed: 0.003 + Math.random() * 0.0022, size: 1.8 + Math.random() * 1.2 })
        }
      })
      setStoryLabel(phase.label)
    }

    const deactivate = (phase: typeof STORY[0]) => {
      if (phase.active.includes(7)) setCorePulse(false)
      phase.active.forEach(ai => {
        activeIdxRef.current.delete(ai)
        setActiveSet(prev => { const n = new Set(prev); n.delete(ai); return n })
      })
      phase.edges.forEach(([fi, ti]) => activeEdgeRef.current.delete(`${fi}-${ti}`))
    }

    const runStory = () => {
      let offset = 0
      STORY.forEach(phase => {
        const t1 = setTimeout(() => activate(phase), offset)
        const t2 = setTimeout(() => deactivate(phase), offset + phase.hold)
        timers.push(t1, t2)
        offset += phase.hold + 500
      })
      const t3 = setTimeout(() => {
        setStoryLabel('')
        timers.push(setTimeout(runStory, 1000))
      }, offset)
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
      const W = wrap.offsetWidth, H = wrap.offsetHeight
      const now = Date.now() / 1000
      ctx.clearRect(0, 0, W, H)

      const { x: mx, y: my } = mousePx.current
      const hasM = mx > 0
      const mpx = hasM ? (mx / W - 0.5) * 22 : 0
      const mpy = hasM ? (my / H - 0.5) * 22 : 0
      const cx = W * 0.5 + mpx * 0.3
      const cy = H * 0.5 + mpy * 0.3

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.82)
      bg.addColorStop(0, 'rgba(0,130,255,0.09)')
      bg.addColorStop(0.4, 'rgba(90,0,210,0.05)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

      for (let ri = 0; ri < 5; ri++) {
        const ph = (now * 0.2 + ri * 0.22) % 1
        ctx.beginPath()
        ctx.arc(cx, cy, 38 + ph * 148, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,229,255,${((1 - ph) * 0.13).toFixed(3)})`
        ctx.lineWidth = 1; ctx.stroke()
      }

      const sats = APPS.map(app => {
        const p = cardPos(app.angle)
        return { x: (p.left / 100) * W + mpx * 0.72, y: (p.top / 100) * H + mpy * 0.72 }
      })

      APPS.forEach((app, i) => {
        const sp = sats[i]
        const isActive = activeIdxRef.current.has(i)
        const dist = hasM ? Math.sqrt((sp.x - mx) ** 2 + (sp.y - my) ** 2) : 999
        const prox = Math.max(0, 1 - dist / 110)
        const cp = ctrl(cx, cy, sp.x, sp.y)

        if (isActive || prox > 0.1) {
          ctx.save()
          ctx.shadowBlur = isActive ? 28 : 14 * prox
          ctx.shadowColor = app.color
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo(cp.x, cp.y, sp.x, sp.y)
          ctx.strokeStyle = app.color + (isActive ? '55' : Math.round(prox * 80).toString(16).padStart(2, '0'))
          ctx.lineWidth = isActive ? 2.4 : 1.5 * prox; ctx.stroke()
          ctx.restore()
        }

        const a = isActive ? 0.62 : 0.065 + prox * 0.25
        const g = ctx.createLinearGradient(cx, cy, sp.x, sp.y)
        g.addColorStop(0, `rgba(0,200,255,${a})`)
        g.addColorStop(0.5, app.color + Math.round(a * 200).toString(16).padStart(2, '0'))
        g.addColorStop(1, app.color + '10')
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo(cp.x, cp.y, sp.x, sp.y)
        ctx.strokeStyle = g; ctx.lineWidth = isActive ? 1.8 : 0.45 + prox * 0.8; ctx.stroke()
      })

      WORKFLOW_EDGES.forEach(([fi, ti]) => {
        const fSat = sats[fi], tSat = sats[ti]
        const key = `${fi}-${ti}`, isActive = activeEdgeRef.current.has(key)
        const fDist = hasM ? Math.sqrt((fSat.x - mx) ** 2 + (fSat.y - my) ** 2) : 999
        const tDist = hasM ? Math.sqrt((tSat.x - mx) ** 2 + (tSat.y - my) ** 2) : 999
        const prox = Math.max(0, 1 - Math.min(fDist, tDist) / 110)
        const cp = ctrl(fSat.x, fSat.y, tSat.x, tSat.y, 0.18)
        const fColor = APPS[fi].color, tColor = APPS[ti].color

        if (isActive || prox > 0.1) {
          ctx.save()
          ctx.shadowBlur = isActive ? 22 : 12 * prox
          ctx.shadowColor = fColor
          ctx.beginPath(); ctx.moveTo(fSat.x, fSat.y); ctx.quadraticCurveTo(cp.x, cp.y, tSat.x, tSat.y)
          ctx.strokeStyle = fColor + (isActive ? '50' : Math.round(prox * 60).toString(16).padStart(2, '0'))
          ctx.lineWidth = isActive ? 2 : 1.4 * prox; ctx.stroke()
          ctx.restore()
        }

        const a = isActive ? 0.52 : 0.055 + prox * 0.2
        const g = ctx.createLinearGradient(fSat.x, fSat.y, tSat.x, tSat.y)
        g.addColorStop(0, fColor + Math.round(a * 255).toString(16).padStart(2, '0'))
        g.addColorStop(1, tColor + Math.round(a * 255).toString(16).padStart(2, '0'))
        ctx.beginPath(); ctx.moveTo(fSat.x, fSat.y); ctx.quadraticCurveTo(cp.x, cp.y, tSat.x, tSat.y)
        ctx.strokeStyle = g; ctx.lineWidth = isActive ? 1.5 : 0.38 + prox * 0.7; ctx.stroke()
      })

      particles.current = particles.current.filter(p => p.t < 1.08)
      for (const p of particles.current) {
        p.t += p.speed
        const t = Math.min(p.t, 1)
        let ax: number, ay: number, bx: number, by: number, cpx: number, cpy: number, color: string

        if (p.kind === 'hub') {
          const sp = sats[p.idx]
          const cp0 = ctrl(cx, cy, sp.x, sp.y)
          ax = p.dir === 'out' ? cx : sp.x; ay = p.dir === 'out' ? cy : sp.y
          bx = p.dir === 'out' ? sp.x : cx; by = p.dir === 'out' ? sp.y : cy
          cpx = cp0.x; cpy = cp0.y; color = APPS[p.idx].color
        } else {
          const fSat = sats[p.fi], tSat = sats[p.ti]
          const cp0 = ctrl(fSat.x, fSat.y, tSat.x, tSat.y, 0.18)
          ax = fSat.x; ay = fSat.y; bx = tSat.x; by = tSat.y
          cpx = cp0.x; cpy = cp0.y; color = APPS[p.fi].color
        }

        const pos = qbez(t, ax, ay, cpx, cpy, bx, by)
        const trail = qbez(Math.max(0, t - 0.07), ax, ay, cpx, cpy, bx, by)
        const alpha = Math.sin(Math.min(p.t, 1) * Math.PI) * 0.92

        ctx.save()
        ctx.shadowBlur = 18; ctx.shadowColor = color
        ctx.globalAlpha = alpha
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color; ctx.fill()

        const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.size * 3.5)
        halo.addColorStop(0, color + 'bb'); halo.addColorStop(1, 'transparent')
        ctx.globalAlpha = alpha * 0.22
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.size * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = halo; ctx.fill()

        ctx.globalAlpha = alpha * 0.42
        ctx.beginPath(); ctx.arc(trail.x, trail.y, p.size * 0.52, 0, Math.PI * 2)
        ctx.fillStyle = color; ctx.fill()
        ctx.restore()
      }

      if (Math.random() < 0.038) {
        const i = Math.floor(Math.random() * APPS.length)
        particles.current.push({ kind: 'hub', idx: i, dir: Math.random() > 0.5 ? 'out' : 'in', t: 0, speed: 0.0018 + Math.random() * 0.0016, size: 1.1 + Math.random() * 0.8 })
      }

      activeIdxRef.current.forEach(i => {
        if (Math.random() < 0.09)
          particles.current.push({ kind: 'hub', idx: i, dir: Math.random() > 0.38 ? 'out' : 'in', t: 0, speed: 0.003 + Math.random() * 0.0022, size: 1.9 + Math.random() * 1.3 })
      })

      activeEdgeRef.current.forEach(key => {
        if (Math.random() < 0.09) {
          const parts = key.split('-')
          const fi = Number(parts[0]), ti = Number(parts[1])
          particles.current.push({ kind: 'edge', fi, ti, t: 0, speed: 0.0025 + Math.random() * 0.002, size: 1.7 + Math.random() * 1.1 })
        }
      })

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
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(148deg, rgba(4,13,38,0.88) 0%, rgba(3,9,24,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          boxShadow: '0 0 0 1px rgba(0,229,255,0.07), 0 36px 90px rgba(0,0,0,0.66), 0 0 120px rgba(8,60,200,0.12), inset 0 1px 0 rgba(255,255,255,0.09)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 68% 54% at 50% 50%, rgba(0,100,240,0.08) 0%, rgba(100,0,200,0.04) 58%, transparent 100%)' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" />

      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20 }}>
        <motion.div
          animate={{ scale: corePulse ? [1, 1.14, 1.07, 1] : [1, 1.04, 1] }}
          transition={{ duration: corePulse ? 0.52 : 4, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: corePulse ? 0.3 : 0 }}
          style={{
            position: 'relative', width: 92, height: 92, borderRadius: '50%',
            background: corePulse
              ? 'radial-gradient(circle at 34% 30%, rgba(0,229,255,0.55) 0%, rgba(120,20,220,0.38) 55%, rgba(0,20,70,0.22) 100%)'
              : 'radial-gradient(circle at 34% 30%, rgba(0,180,255,0.38) 0%, rgba(80,10,180,0.22) 55%, rgba(0,16,60,0.18) 100%)',
            border: `1.5px solid ${corePulse ? 'rgba(0,229,255,0.88)' : 'rgba(0,229,255,0.52)'}`,
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            boxShadow: corePulse
              ? '0 0 0 1px rgba(0,229,255,0.28), 0 0 65px rgba(0,229,255,0.54), 0 0 110px rgba(120,20,220,0.3), inset 0 1px 0 rgba(255,255,255,0.32)'
              : '0 0 0 1px rgba(0,229,255,0.18), 0 0 38px rgba(0,229,255,0.26), 0 0 85px rgba(80,10,180,0.16), inset 0 1px 0 rgba(255,255,255,0.22)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            style={{ position: 'absolute', width: 82, height: 82, borderRadius: '50%', border: '1px dashed rgba(0,229,255,0.28)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
            style={{ position: 'absolute', width: 66, height: 66, borderRadius: '50%', border: '1px dashed rgba(168,85,247,0.22)' }}
          />
          {corePulse && (
            <>
              <motion.div
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1.75, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut', repeat: Infinity }}
                style={{ position: 'absolute', width: 92, height: 92, borderRadius: '50%', border: '1.5px solid rgba(0,229,255,0.7)', pointerEvents: 'none' }}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0.45 }}
                animate={{ scale: 2.3, opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut', repeat: Infinity, delay: 0.28 }}
                style={{ position: 'absolute', width: 92, height: 92, borderRadius: '50%', border: '1px solid rgba(168,85,247,0.5)', pointerEvents: 'none' }}
              />
            </>
          )}
          <span style={{ color: '#00e5ff', fontSize: 14, fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '0.04em', position: 'relative', zIndex: 1 }}>NG</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 7.5, fontFamily: 'var(--font-figtree)', letterSpacing: '0.18em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>Core AI</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {storyLabel && (
            <motion.div
              key={storyLabel}
              initial={{ opacity: 0, y: 8, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.93 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', top: 'calc(50% + 58px)', left: '50%',
                transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                padding: '4px 14px', borderRadius: 100,
                background: 'rgba(0,14,48,0.9)',
                border: '1px solid rgba(0,229,255,0.3)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.42), 0 0 24px rgba(0,229,255,0.1)',
                color: '#00e5ff', fontSize: 10, fontFamily: 'var(--font-figtree)',
                fontWeight: 500, letterSpacing: '0.07em', zIndex: 30,
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
            animate={{ y: [0, Math.sin(i * 1.4) * 5.5, 0] }}
            transition={{ duration: 3.6 + i * 0.3, ease: 'easeInOut', repeat: Infinity, delay: i * 0.22 }}
          >
            <motion.div
              animate={{
                background: isActive
                  ? `linear-gradient(138deg, ${app.color}2c 0%, rgba(4,11,30,0.97) 100%)`
                  : 'linear-gradient(138deg, rgba(7,17,46,0.9) 0%, rgba(3,9,24,0.97) 100%)',
                boxShadow: isActive
                  ? `0 0 0 1px ${app.color}52, 0 14px 36px rgba(0,0,0,0.54), 0 0 36px ${app.color}38`
                  : '0 0 0 1px rgba(255,255,255,0.055), 0 8px 26px rgba(0,0,0,0.44)',
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 82, padding: '9px 10px 8px', borderRadius: 13,
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: `1px solid ${isActive ? app.color + '68' : 'rgba(255,255,255,0.08)'}`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${app.color}${isActive ? '72' : '2c'}, transparent)` }} />
              {isActive && (
                <>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${app.color}1c 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <motion.div
                    style={{ position: 'absolute', inset: -1, borderRadius: 14, border: `1px solid ${app.color}`, pointerEvents: 'none' }}
                    animate={{ opacity: [0.28, 0.9, 0.28] }}
                    transition={{ duration: 0.88, repeat: Infinity }}
                  />
                </>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: `${app.color}1e`, border: `1px solid ${app.color}3c`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isActive ? `0 0 12px ${app.color}32` : 'none' }}>
                  <AppIcon id={app.id} color={app.color} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 9.5, fontFamily: 'var(--font-syne)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>{app.label}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 5 }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <motion.span
                  animate={isActive ? { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] } : {}}
                  transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? app.color : 'rgba(255,255,255,0.18)', boxShadow: isActive ? `0 0 8px ${app.color}` : 'none', flexShrink: 0, marginTop: 2.5, display: 'block' }}
                />
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statuses[i]}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: isActive ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.28)', fontSize: 9, fontFamily: 'var(--font-figtree)', fontWeight: 400, lineHeight: 1.35, display: 'block', whiteSpace: 'nowrap' }}
                    >{statuses[i]}</motion.span>
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
