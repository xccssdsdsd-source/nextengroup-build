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
  beforeBlur?: string
  afterBlur?: string
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
  beforeBlur,
  afterBlur,
  priority = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pos = useMotionValue(50)
  const dragging = useRef(false)
  const controls = useRef<AnimationPlaybackControls | null>(null)

  // Direction detection — decide horizontal vs vertical on first move
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const directionLocked = useRef(false)

  const [mode, setMode] = useState<'before' | 'after' | 'split'>('split')
  const [building, setBuilding] = useState(false)

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
    // Record start position; don't commit to dragging until direction is known
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    directionLocked.current = false
    dragging.current = false
    stopAnim()
    setBuilding(false)
    setMode('split')
  }, [stopAnim])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - dragStartX.current)
    const dy = Math.abs(e.clientY - dragStartY.current)

    if (!directionLocked.current) {
      // Wait for minimum movement before deciding direction
      if (dx < 4 && dy < 4) return
      // Vertical dominant — let the browser scroll, don't interfere
      if (dy > dx) return
      // Horizontal dominant — lock in and capture pointer
      directionLocked.current = true
      dragging.current = true
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
    }

    if (dragging.current) {
      updateFromClientX(e.clientX)
    }
  }, [updateFromClientX])

  const onPointerUp = useCallback(() => {
    dragging.current = false
    directionLocked.current = false
  }, [])

  const goTo = useCallback((target: 'before' | 'after') => {
    stopAnim()
    setMode(target)
    const isBuild = target === 'after'
    if (isBuild) setBuilding(true)
    controls.current = animate(pos, target === 'after' ? 0 : 100, {
      duration: isBuild ? 1.15 : 0.6,
      ease,
      onComplete: () => setBuilding(false),
    })
  }, [pos, stopAnim])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    stopAnim()
    setMode('split')
    if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - 4))
    else if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + 4))
    else if (e.key === 'Home') pos.set(0)
    else if (e.key === 'End') pos.set(100)
  }, [pos, stopAnim])

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
        // touch-pan-y: browser handles vertical scroll; horizontal → our pointer handlers
        // stopPropagation on touch events so parent carousel doesn't intercept
        className="relative w-full select-none overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/5 touch-pan-y"
        style={{ aspectRatio: `${width} / ${height}`, cursor: 'ew-resize' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => { if (dragging.current) e.stopPropagation() }}
        onTouchEnd={(e) => { if (dragging.current) e.stopPropagation() }}
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
          {...(afterBlur ? { placeholder: 'blur' as const, blurDataURL: afterBlur } : {})}
          draggable={false}
        />

        {/* Build effect overlay */}
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
                  'linear-gradient(rgba(34,211,238,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)',
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
            {...(beforeBlur ? { placeholder: 'blur' as const, blurDataURL: beforeBlur } : {})}
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
          className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-[#22D3EE]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#06141A] backdrop-blur-sm"
          style={{ opacity: afterLabelOpacity }}
        >
          {afterLabel}
        </m.span>

        {/* Divider line + handle */}
        <m.div className="pointer-events-none absolute inset-y-0 z-30" style={{ left: handleLeft, x: '-50%' }}>
          <div
            className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
            style={building ? { boxShadow: '0 0 14px 2px rgba(34,211,238,0.8)' } : undefined}
          />
          <button
            type="button"
            role="slider"
            aria-label="Przeciągnij, aby porównać efekt przed i po"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(mode === 'after' ? 0 : mode === 'before' ? 100 : 50)}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0D0D] shadow-[0_4px_14px_rgba(0,0,0,0.5)] ring-1 ring-black/10 transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            style={{ cursor: 'ew-resize', touchAction: 'none' }}
          >
            <MoveHorizontal size={20} strokeWidth={2.4} />
          </button>
        </m.div>
      </div>

      {/* PRZED / PO toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center rounded-full bg-[#161C28] p-1 ring-1 ring-[rgba(255,255,255,0.08)]">
          <button
            type="button"
            onClick={() => goTo('before')}
            aria-pressed={mode === 'before'}
            className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-[color,background-color,box-shadow,transform] duration-200 ease-out ${
              mode === 'before' ? 'bg-[#1C2433] text-[#EAF0F7] shadow-sm' : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
            }`}
          >
            {beforeLabel}
          </button>
          <button
            type="button"
            onClick={() => goTo('after')}
            aria-pressed={mode === 'after'}
            className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-[color,background-color,box-shadow,transform] duration-200 ease-out ${
              mode === 'after' ? 'bg-[#22D3EE] text-[#06141A] shadow-sm' : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
            }`}
          >
            {afterLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
