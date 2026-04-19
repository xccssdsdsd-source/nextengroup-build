'use client'

import { useEffect, useRef } from 'react'

export default function DeviceMockups() {
  const laptopWrapRef = useRef<HTMLDivElement>(null)
  const phoneWrapRef = useRef<HTMLDivElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const laptopWrap = laptopWrapRef.current
    const phoneWrap = phoneWrapRef.current
    const laptopEl = laptopRef.current
    const phoneEl = phoneRef.current
    if (!laptopWrap || !phoneWrap || !laptopEl || !phoneEl) return

    let laptopY = 0, phoneY = 0, laptopTarget = 0, phoneTarget = 0
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    let rafId: number

    const onScroll = () => {
      if (window.innerWidth > 768) {
        laptopTarget = window.scrollY * 0.12
        phoneTarget = window.scrollY * 0.22
      }
      laptopWrap.classList.add('no-float')
      phoneWrap.classList.add('no-float')
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        laptopWrap.classList.remove('no-float')
        phoneWrap.classList.remove('no-float')
      }, 300)
    }

    function animate() {
      if (window.innerWidth > 768) {
        laptopY += (laptopTarget - laptopY) * 0.07
        phoneY += (phoneTarget - phoneY) * 0.07
        laptopEl.style.transform = `perspective(1000px) rotateY(-12deg) rotateX(4deg) translateY(${laptopY}px)`
        phoneEl.style.transform = `perspective(1000px) rotateY(8deg) rotateX(-2deg) translateY(${phoneY}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="devices-group">

        <div ref={laptopWrapRef} className="float-laptop devices-laptop">
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

        <div ref={phoneWrapRef} className="float-phone devices-phone">
          <div ref={phoneRef} style={{ width: '160px', height: '300px', willChange: 'transform' }}>
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
