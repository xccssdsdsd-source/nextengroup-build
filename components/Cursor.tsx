'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
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
        ringRef.current.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      }
      const settled = Math.abs(mouseX - ringX) < 0.08 && Math.abs(mouseY - ringY) < 0.08
      rafId = settled ? 0 : requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`
      }
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (ringRef.current) {
        if (target.closest('.value-card, .realizacja-card, [data-tilt-card]')) {
          ringRef.current.style.width = '48px'
          ringRef.current.style.height = '48px'
          ringRef.current.style.borderRadius = '4px'
          ringRef.current.style.opacity = '0.5'
          ringRef.current.style.mixBlendMode = 'normal'
        } else if (target.closest('a, button, [role="button"], label, input, textarea, select')) {
          ringRef.current.style.width = '48px'
          ringRef.current.style.height = '48px'
          ringRef.current.style.borderRadius = '50%'
          ringRef.current.style.opacity = '0.4'
          ringRef.current.style.mixBlendMode = 'difference'
        }
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"], label, input, textarea, select, .value-card, .realizacja-card, [data-tilt-card]')) {
        if (ringRef.current) {
          ringRef.current.style.width = '28px'
          ringRef.current.style.height = '28px'
          ringRef.current.style.borderRadius = '50%'
          ringRef.current.style.opacity = '1'
          ringRef.current.style.mixBlendMode = 'normal'
        }
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

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
