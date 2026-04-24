'use client'

import { useEffect, useRef } from 'react'

export default function DeviceMockups() {
  const deviceRef = useRef<HTMLDivElement>(null)
  const screenContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0
    let tX = 0, tY = 0, cX = 0, cY = 0
    let tsX = 0, tsY = 0, csX = 0, csY = 0

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      tX = nx * 18; tY = ny * 18
      tsX = nx * 10; tsY = ny * 10
    }

    const onLeave = () => { tX = tY = tsX = tsY = 0 }

    const lerp = (a: number, b: number) => a + (b - a) * 0.08

    const tick = () => {
      cX = lerp(cX, tX); cY = lerp(cY, tY)
      csX = lerp(csX, tsX); csY = lerp(csY, tsY)
      if (deviceRef.current) deviceRef.current.style.transform = `translate(${cX}px,${cY}px)`
      if (screenContentRef.current) screenContentRef.current.style.transform = `translate(${csX}px,${csY}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="dm-scene relative h-full w-full flex items-center justify-center">
      <div ref={deviceRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        <div style={{
          width: '520px',
          height: '360px',
          background: '#0d1117',
          borderRadius: '20px',
          padding: '14px',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(37,99,235,0.28), 0 20px 60px rgba(0,0,0,0.6)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '7px', left: '50%',
            transform: 'translateX(-50%)',
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#1c2840',
          }} />

          <div style={{
            background: '#0a0f1e',
            borderRadius: '8px',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div ref={screenContentRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
              <div style={{
                height: '28px',
                background: 'rgba(8,16,34,0.97)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 10px', flexShrink: 0,
              }}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57', opacity: 0.9 }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#febc2e', opacity: 0.9 }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28c840', opacity: 0.9 }} />
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '10px', borderRadius: '6px', background: '#1e3a5f', opacity: 0.8 }} />
                  <div style={{ width: '28px', height: '10px', borderRadius: '6px', background: '#1e3a5f', opacity: 0.8 }} />
                </div>
              </div>

              <div style={{ display: 'flex', height: 'calc(100% - 28px)' }}>
                <div style={{
                  width: '44px',
                  background: 'rgba(6,12,26,0.98)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  paddingTop: '14px', gap: '8px', flexShrink: 0,
                }}>
                  {([0.9, 0.7, 0.7, 0.7] as number[]).map((op, i) => (
                    <div key={i} style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#1e3a5f', opacity: op }} />
                  ))}
                </div>

                <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{
                    flex: 2, borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1a2744 0%, #0f1e3d 100%)',
                    opacity: 0.9, position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#00d4ff' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, borderRadius: '8px', background: 'linear-gradient(135deg, #1a2744 0%, #0f1e3d 100%)', opacity: 0.8 }} />
                    <div style={{ flex: 1, borderRadius: '8px', background: 'linear-gradient(135deg, #1a2744 0%, #0f1e3d 100%)', opacity: 0.75 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
