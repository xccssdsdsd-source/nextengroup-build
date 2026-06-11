'use client'

import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { MoveHorizontal } from 'lucide-react'

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width: number
  height: number
  beforeLabel?: string
  afterLabel?: string
  priority?: boolean
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
  beforeLabel = 'Przed',
  afterLabel = 'Po',
  priority = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, pct)))
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }, [updateFromClientX])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }, [updateFromClientX])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  // Keyboard accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4))
    else if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4))
    else if (e.key === 'Home') setPosition(0)
    else if (e.key === 'End') setPosition(100)
  }, [])

  // Gentle one-time hint nudge when it scrolls into view
  const [hinted, setHinted] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el || hinted) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setHinted(true)
        obs.disconnect()
        const seq = [42, 58, 50]
        seq.forEach((v, i) => setTimeout(() => setPosition(v), 350 + i * 320))
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [hinted])

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/5 touch-none"
      style={{ aspectRatio: `${width} / ${height}`, cursor: 'ew-resize' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After image (full, underneath) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 420px, 90vw"
        className="absolute inset-0 h-full w-full object-cover object-top"
        quality={82}
        priority={priority}
        draggable={false}
      />

      {/* Before image (clipped to the left of the handle) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 420px, 90vw"
          className="absolute inset-0 h-full w-full object-cover object-top"
          quality={82}
          priority={priority}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: position > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full bg-blue-600/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: position < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Divider line + handle */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]" />
        <button
          type="button"
          role="slider"
          aria-label="Przeciągnij, aby porównać efekt przed i po"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0D0D] shadow-[0_4px_14px_rgba(0,0,0,0.3)] ring-1 ring-black/10 transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          style={{ cursor: 'ew-resize' }}
        >
          <MoveHorizontal size={20} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
}
