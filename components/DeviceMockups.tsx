'use client'

import { useEffect, useRef } from 'react'

export default function DeviceMockups() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sceneEl = sceneRef.current
    if (!sceneEl || !laptopRef.current) return

    let rafId = 0
    let currentLaptopY = 0
    let targetLaptopY = 0
    let maxLift = 0

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const measure = () => {
      const laptopEl = laptopRef.current
      if (!laptopEl) return

      const sceneRect = sceneEl.getBoundingClientRect()
      const laptopRect = laptopEl.getBoundingClientRect()
      maxLift = Math.max(0, laptopRect.top - sceneRect.top)
    }

    const updateTarget = () => {
      if (window.innerWidth <= 768) {
        targetLaptopY = 0
        return
      }

      targetLaptopY = clamp(-window.scrollY * 0.3, -maxLift, 0)
    }

    function animate() {
      const laptopEl = laptopRef.current
      if (!laptopEl) return

      currentLaptopY += (targetLaptopY - currentLaptopY) * 0.08
      laptopEl.style.transform = `perspective(1000px) rotateY(-12deg) rotateX(4deg) translateY(${currentLaptopY}px)`
      rafId = requestAnimationFrame(animate)
    }

    measure()
    updateTarget()
    rafId = requestAnimationFrame(animate)
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('resize', updateTarget)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', measure)
      window.removeEventListener('resize', updateTarget)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={sceneRef} className="relative h-full w-full flex items-center justify-center">
      <div className="devices-group">

        <div className="float-laptop devices-laptop">
          <div ref={laptopRef} style={{ width: '480px', willChange: 'transform' }}>
            <div style={{
              background: '#1a2744',
              borderRadius: '14px 14px 4px 4px',
              padding: '10px 10px 5px',
              boxShadow: '0 40px 100px rgba(37,99,235,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}>
              <div style={{
                background: '#0d1b2e',
                borderRadius: '6px',
                height: '290px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(56,189,248,0.15), transparent 70%)' }} />
                <div className="dmblob dmblob-l1" />
                <div className="dmblob dmblob-l2" />
                <div className="dmblob dmblob-l3" />
                <div className="dmscanlines" />
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(180deg, #1e2d4e 0%, #111f38 55%, #0d1b2e 100%)',
              height: '18px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
            }} />
            <div style={{
              background: 'linear-gradient(180deg, #0f1d35 0%, #07101f 100%)',
              borderRadius: '0 0 8px 8px',
              height: '12px',
              width: '88%',
              margin: '0 auto',
              boxShadow: '0 16px 48px rgba(0,0,0,0.65)',
            }} />
          </div>
        </div>

        <div className="float-phone devices-phone">
          <div style={{ width: '160px', height: '300px', willChange: 'transform' }}>
            <div style={{
              background: '#1a2744',
              borderRadius: '28px',
              padding: '8px',
              height: '100%',
              boxShadow: '0 60px 120px rgba(37,99,235,0.45), 0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
              position: 'relative',
            }}>
              <div style={{
                background: '#0d1b2e',
                borderRadius: '22px',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  position: 'absolute', top: '10px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '54px', height: '14px',
                  background: '#050a14',
                  borderRadius: '10px',
                  zIndex: 1,
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18), transparent 70%)' }} />
                <div className="dmblob dmblob-p1" />
                <div className="dmblob dmblob-p2" />
                <div className="dmscanlines" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
