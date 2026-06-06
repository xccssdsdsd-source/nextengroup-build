'use client'

import { useEffect, useRef } from 'react'

interface Props {
  density?: number
  color?: string
  accent?: string
  lineColor?: string
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

interface Packet {
  edgeFrom: number
  edgeTo: number
  t: number
  speed: number
  isAccent: boolean
}

export default function ProcessFlowBackground({
  density = 42,
  color = '37,99,235',
  accent = '132,204,22',
  lineColor = '37,99,235',
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')!
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    let nodes: Node[] = []
    let packets: Packet[] = []
    let rafId = 0
    let running = false

    function resize() {
      const rect = parent!.getBoundingClientRect()
      w = rect.width || window.innerWidth
      h = rect.height || 400
      canvas!.width = Math.round(w * DPR)
      canvas!.height = Math.round(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      initNodes()
    }

    function initNodes() {
      const count = Math.min(density, Math.floor((w * h) / 14000) + 12)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
      packets = []
    }

    function getEdges(): [number, number][] {
      const edges: [number, number][] = []
      const maxDist = Math.min(w, h) * 0.32
      const maxDistSq = maxDist * maxDist
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          if (dx * dx + dy * dy < maxDistSq) edges.push([i, j])
        }
      }
      return edges
    }

    function spawnPackets(edges: [number, number][]) {
      if (edges.length === 0) return
      const target = Math.min(edges.length * 0.5, 22)
      while (packets.length < target) {
        const e = edges[Math.floor(Math.random() * edges.length)]
        const reverse = Math.random() > 0.5
        packets.push({
          edgeFrom: reverse ? e[1] : e[0],
          edgeTo: reverse ? e[0] : e[1],
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          isAccent: Math.random() < 0.3,
        })
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h)
      const maxDist = Math.min(w, h) * 0.32
      const edges = getEdges()

      for (const [i, j] of edges) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const alpha = (1 - dist / maxDist) * 0.22
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.strokeStyle = `rgba(${lineColor},${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},0.45)`
        ctx.fill()
      }

      const edgeKeys = new Set(edges.map(e => `${e[0]}_${e[1]}`))
      packets = packets.filter(p => {
        return edgeKeys.has(`${p.edgeFrom}_${p.edgeTo}`) || edgeKeys.has(`${p.edgeTo}_${p.edgeFrom}`)
      })

      for (const p of packets) {
        const from = nodes[p.edgeFrom]
        const to = nodes[p.edgeTo]
        if (!from || !to) continue
        const x = from.x + (to.x - from.x) * p.t
        const y = from.y + (to.y - from.y) * p.t
        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = p.isAccent ? `rgba(${accent},0.85)` : `rgba(${color},0.85)`
        ctx.fill()
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) { n.vx *= -1; n.x = Math.max(0, Math.min(w, n.x)) }
        if (n.y < 0 || n.y > h) { n.vy *= -1; n.y = Math.max(0, Math.min(h, n.y)) }
      }
      const edges = getEdges()
      spawnPackets(edges)
      for (const p of packets) p.t += p.speed
      packets = packets.filter(p => p.t < 1)
    }

    function loop() {
      if (!running) return
      tick()
      drawFrame()
      rafId = requestAnimationFrame(loop)
    }

    function start() {
      if (running) return
      running = true
      loop()
    }

    function stop() {
      running = false
      cancelAnimationFrame(rafId)
    }

    resize()

    if (prefersReduced) {
      drawFrame()
      const ro = new ResizeObserver(() => { resize(); drawFrame() })
      ro.observe(parent)
      return () => ro.disconnect()
    }

    start()

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) start()
      else stop()
    }, { threshold: 0 })
    io.observe(parent)

    const ro = new ResizeObserver(() => {
      resize()
      if (!running) drawFrame()
    })
    ro.observe(parent)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
    }
  }, [density, color, accent, lineColor])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
