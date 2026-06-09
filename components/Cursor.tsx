'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(check.matches)
    if (!check.matches) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
    let rafId = 0

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        // Use transform instead of left/top — composited on GPU, no layout/paint
        ringRef.current.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      }
      const settled = Math.abs(mouseX - ringX) < 0.08 && Math.abs(mouseY - ringY) < 0.08
      if (settled) {
        rafId = 0
      } else {
        rafId = requestAnimationFrame(animate)
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    const onOver = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a, button, [role="button"], label, input, textarea, select')) return
      if (ringRef.current) {
        ringRef.current.style.width = '54px'
        ringRef.current.style.height = '54px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.72)'
        ringRef.current.style.background = 'rgba(0,212,255,0.04)'
      }
    }

    const onOut = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a, button, [role="button"], label, input, textarea, select')) return
      if (ringRef.current) {
        ringRef.current.style.width = '32px'
        ringRef.current.style.height = '32px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.45)'
        ringRef.current.style.background = ''
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isDesktop) return null

  return <div ref={ringRef} className="cursor-ring" />
}
