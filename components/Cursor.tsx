'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, frameId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top = mouseY + 'px'
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px'
        ringRef.current.style.top = ringY + 'px'
      }
      frameId = requestAnimationFrame(animate)
    }

    const onOver = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a, button, [role="button"], label, input, textarea, select')) return
      if (ringRef.current) {
        ringRef.current.style.width = '54px'
        ringRef.current.style.height = '54px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.72)'
        ringRef.current.style.background = 'rgba(0,212,255,0.04)'
        ringRef.current.style.mixBlendMode = 'screen'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%,-50%) scale(1.6)'
      }
    }

    const onOut = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a, button, [role="button"], label, input, textarea, select')) return
      if (ringRef.current) {
        ringRef.current.style.width = '32px'
        ringRef.current.style.height = '32px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.45)'
        ringRef.current.style.background = ''
        ringRef.current.style.mixBlendMode = ''
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    frameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
