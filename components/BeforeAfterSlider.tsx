'use client'

import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { m, animate, useMotionValue, useTransform, type AnimationPlaybackControls } from 'framer-motion'
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

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
  const pos = useMotionValue(50)
  const dragging = useRef(false)
  const controls = useRef<AnimationPlaybackControls | null>(null)

  const [mode, setMode] = useState<'before' | 'after' | 'split'>('split')
  const [building, setBuilding] = useState(false)

  // Motion-derived styles
  const beforeClip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(pos, (v) => `${v}%`)
  const beforeLabelOpacity = useTransform(pos, [8, 16], [0, 1])
  const afterLabelOpacity = useTransform(pos, [84, 92], [1, 0])

  const stopAnim = useCallback(() => {
    controls.current?.stop()
    controls.current = null
  }, [])

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    pos.set(Math.max(0, Math.min(100, pct)))
  }, [pos])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stopAnim()
    setBuilding(false)
    setMode('split')
    dragging.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }, [updateFromClientX, stopAnim])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }, [updateFromClientX])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  // PRZED / PO toggle — animate the reveal. Switching to "po" plays a build effect.
  const goTo = useCallback((target: 'before' | 'after') => {
    stopAnim()
    setMode(target)
    const isBuild = target === 'after'
    if (isBuild) setBuilding(true)
    // Left portion (0..pos%) shows the "before" image, the rest shows "after".
    // So fully-after = 0, fully-before = 100.
    controls.current = animate(pos, target === 'after' ? 0 : 100, {
      duration: isBuild ? 1.15 : 0.6,
      ease,
      onComplete: () => setBuilding(false),
    })
  }, [pos, stopAnim])

  // Keyboard accessibility on the handle
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    stopAnim()
    setMode('split')
    if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - 4))
    else if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + 4))
    else if (e.key === 'Home') pos.set(0)
    else if (e.key === 'End') pos.set(100)
  }, [pos, stopAnim])

  // One-time hint nudge when it scrolls into view
  const [hinted, setHinted] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el || hinted) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setHinted(true)
        obs.disconnect()
        controls.current = animate(pos, [50, 40, 60, 50], { duration: 1.6, ease, delay: 0.35 })
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [hinted, pos])

  useEffect(() => () => stopAnim(), [stopAnim])

  return (
    <div className="flex flex-col gap-3">
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

        {/* Build effect overlay — a scanner beam + grid that "constructs" the new site */}
        {building && (
          <m.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.15, times: [0, 0.1, 0.8, 1], ease: 'linear' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(37,99,235,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.18) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            />
          </m.div>
        )}

        {/* Before image (clipped to the left of the handle) */}
        <m.div className="absolute inset-0 overflow-hidden z-10" style={{ clipPath: beforeClip }}>
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
        </m.div>

        {/* Labels */}
        <m.span
          className="pointer-events-none absolute left-3 top-3 z-30 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
          style={{ opacity: beforeLabelOpacity }}
        >
          {beforeLabel}
        </m.span>
        <m.span
          className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-blue-600/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
          style={{ opacity: afterLabelOpacity }}
        >
          {afterLabel}
        </m.span>

        {/* Divider line + handle */}
        <m.div className="pointer-events-none absolute inset-y-0 z-30" style={{ left: handleLeft, x: '-50%' }}>
          <div
            className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
            style={building ? { boxShadow: '0 0 14px 2px rgba(37,99,235,0.8)' } : undefined}
          />
          <button
            type="button"
            role="slider"
            aria-label="Przeciągnij, aby porównać efekt przed i po"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(mode === 'after' ? 0 : mode === 'before' ? 100 : 50)}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0D0D] shadow-[0_4px_14px_rgba(0,0,0,0.3)] ring-1 ring-black/10 transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            style={{ cursor: 'ew-resize' }}
          >
            <MoveHorizontal size={20} strokeWidth={2.4} />
          </button>
        </m.div>
      </div>

      {/* PRZED / PO toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center rounded-full bg-[#F3F4F6] p-1 ring-1 ring-black/5">
          <button
            type="button"
            onClick={() => goTo('before')}
            aria-pressed={mode === 'before'}
            className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
              mode === 'before' ? 'bg-[#0D0D0D] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#0D0D0D]'
            }`}
          >
            {beforeLabel}
          </button>
          <button
            type="button"
            onClick={() => goTo('after')}
            aria-pressed={mode === 'after'}
            className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
              mode === 'after' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#6B7280] hover:text-[#0D0D0D]'
            }`}
          >
            {afterLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
