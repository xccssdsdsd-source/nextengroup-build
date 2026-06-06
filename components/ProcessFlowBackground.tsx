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
      w = rect.width
      h = rect.height
      canvas!.width = w * DPR
      canvas!.height = h * DPR
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx.scale(DPR, DPR)
      initNodes()
    }

    function initNodes() {
      const count = Math.min(density, Math.floor((w * h) / 18000) + 10)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
      packets = []
    }

    function getEdges(): [number, number][] {
      const edges: [number, number][] = []
      const maxDist = Math.min(w, h) * 0.28
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          if (dx * dx + dy * dy < maxDist * maxDist) edges.push([i, j])
        }
      }
      return edges
    }

    function spawnPackets(edges: [number, number][]) {
      if (edges.length === 0) return
      while (packets.length < Math.min(edges.length * 0.4, 18)) {
        const e = edges[Math.floor(Math.random() * edges.length)]
        const reverse = Math.random() > 0.5
        packets.push({
          edgeFrom: reverse ? e[1] : e[0],
          edgeTo: reverse ? e[0] : e[1],
          t: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          isAccent: Math.random() < 0.3,
        })
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h)
      const maxDist = Math.min(w, h) * 0.28
      const edges = getEdges()

      for (const [i, j] of edges) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const alpha = (1 - dist / maxDist) * 0.12
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.strokeStyle = `rgba(${lineColor},${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},0.25)`
        ctx.fill()
      }

      const edgeSet = new Set(edges.map(e => `${e[0]}-${e[1]}`))
      packets = packets.filter(p => {
        const key1 = `${p.edgeFrom}-${p.edgeTo}`
        const key2 = `${p.edgeTo}-${p.edgeFrom}`
        return edgeSet.has(key1) || edgeSet.has(key2)
      })

      for (const p of packets) {
        const from = nodes[p.edgeFrom]
        const to = nodes[p.edgeTo]
        if (!from || !to) continue
        const x = from.x + (to.x - from.x) * p.t
        const y = from.y + (to.y - from.y) * p.t
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = p.isAccent ? `rgba(${accent},0.7)` : `rgba(${color},0.7)`
        ctx.fill()
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      const edges = getEdges()
      spawnPackets(edges)
      for (const p of packets) {
        p.t += p.speed
      }
      packets = packets.filter(p => p.t < 1)
    }

    function loop() {
      if (!running) return
      tick()
      drawFrame()
      rafId = requestAnimationFrame(loop)
    }

    if (prefersReduced) {
      resize()
      drawFrame()
      const ro = new ResizeObserver(resize)
      ro.observe(parent)
      return () => ro.disconnect()
    }

    resize()

    const io = new IntersectionObserver(entries => {
      const visible = entries[0].isIntersecting
      if (visible && !running) {
        running = true
        loop()
      } else if (!visible && running) {
        running = false
        cancelAnimationFrame(rafId)
      }
    })
    io.observe(canvas)

    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    })
    ro.observe(parent)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
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
