'use client'

import { useEffect, useRef } from 'react'

/* ─── Laptop screen SVG ─── */
function LaptopScreen() {
  return (
    <svg viewBox="0 0 700 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect width="700" height="440" fill="#F0F2F5" />

      {/* browser chrome */}
      <rect width="700" height="36" fill="#FAFAFA" />
      <rect y="36" width="700" height="1" fill="rgba(0,0,0,0.09)" />
      <circle cx="18" cy="18" r="5" fill="#FF5F57" />
      <circle cx="34" cy="18" r="5" fill="#FEBC2E" />
      <circle cx="50" cy="18" r="5" fill="#28C840" />
      <rect x="180" y="10" width="340" height="16" rx="5" fill="rgba(0,0,0,0.06)" />
      <rect x="196" y="14" width="12" height="8" rx="2" fill="rgba(0,0,0,0.16)" />
      <text x="214" y="22" fontSize="9" fill="rgba(0,0,0,0.35)" fontFamily="system-ui,sans-serif">nextengroup.pl</text>
      <rect x="572" y="11" width="18" height="14" rx="3" fill="rgba(0,0,0,0.05)" />
      <rect x="596" y="11" width="18" height="14" rx="3" fill="rgba(0,0,0,0.05)" />
      <rect x="620" y="11" width="18" height="14" rx="3" fill="rgba(0,0,0,0.05)" />
      <rect x="648" y="10" width="36" height="16" rx="4" fill="#1E3A5F" opacity="0.9" />
      <rect x="654" y="15" width="24" height="6" rx="2" fill="rgba(255,255,255,0.5)" />

      {/* sidebar */}
      <rect x="0" y="37" width="58" height="403" fill="#1B2338" />
      <rect x="58" y="37" width="1" height="403" fill="rgba(255,255,255,0.05)" />
      {/* logo */}
      <circle cx="29" cy="62" r="13" fill="rgba(34,211,238,0.15)" />
      <circle cx="29" cy="62" r="5" fill="rgba(34,211,238,0.7)" />
      <rect x="12" y="86" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.09)" />
      {/* nav items */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="9" y={104+i*38} width="40" height="30" rx="6" fill={i===0?'rgba(34,211,238,0.16)':'rgba(255,255,255,0.04)'} />
          <rect x="18" y={112+i*38} width="22" height="4" rx="2" fill={i===0?'rgba(34,211,238,0.7)':'rgba(255,255,255,0.14)'} />
          <rect x="18" y={119+i*38} width="16" height="3" rx="1.5" fill={i===0?'rgba(34,211,238,0.35)':'rgba(255,255,255,0.07)'} />
        </g>
      ))}
      {/* bottom user */}
      <circle cx="29" cy="410" r="10" fill="rgba(255,255,255,0.08)" />
      <rect x="19" y="407" width="20" height="6" rx="3" fill="rgba(255,255,255,0.18)" />

      {/* top nav bar */}
      <rect x="59" y="37" width="641" height="42" fill="white" />
      <rect x="59" y="79" width="641" height="1" fill="rgba(0,0,0,0.07)" />
      <rect x="72" y="51" width="80" height="14" rx="3" fill="rgba(0,0,0,0.06)" />
      <rect x="160" y="51" width="60" height="14" rx="3" fill="rgba(0,0,0,0.06)" />
      <rect x="228" y="51" width="70" height="14" rx="3" fill="rgba(0,0,0,0.06)" />
      <rect x="306" y="51" width="55" height="14" rx="3" fill="rgba(0,0,0,0.06)" />
      <rect x="560" y="48" width="72" height="20" rx="5" fill="#0F172A" />
      <rect x="570" y="54" width="52" height="8" rx="2" fill="rgba(255,255,255,0.55)" />
      <circle cx="644" cy="58" r="9" fill="rgba(0,0,0,0.07)" />
      <circle cx="662" cy="58" r="9" fill="rgba(0,0,0,0.07)" />
      <circle cx="680" cy="58" r="9" fill="#22D3EE" opacity="0.85" />

      {/* hero block */}
      <rect x="59" y="80" width="641" height="200" fill="url(#hg)" />
      <defs>
        <linearGradient id="hg" x1="59" y1="80" x2="700" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#0A0E18" />
        </linearGradient>
        <radialGradient id="cg" cx="65%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.13)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="59" y="80" width="641" height="200" fill="url(#cg)" />
      {/* hero text */}
      <rect x="80" y="102" width="90" height="8" rx="3" fill="rgba(34,211,238,0.25)" />
      <rect x="80" y="118" width="280" height="22" rx="4" fill="rgba(255,255,255,0.88)" />
      <rect x="80" y="146" width="240" height="20" rx="4" fill="rgba(255,255,255,0.65)" />
      <rect x="80" y="174" width="200" height="8" rx="3" fill="rgba(255,255,255,0.20)" />
      <rect x="80" y="186" width="160" height="8" rx="3" fill="rgba(255,255,255,0.14)" />
      <rect x="80" y="208" width="96" height="28" rx="7" fill="#22D3EE" />
      <rect x="186" y="208" width="80" height="28" rx="7" fill="rgba(255,255,255,0.08)" />
      {/* hero graphic cards */}
      <rect x="400" y="94" width="280" height="174" rx="10" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="412" y="108" width="118" height="66" rx="7" fill="rgba(34,211,238,0.09)" stroke="rgba(34,211,238,0.18)" strokeWidth="1" />
      <rect x="418" y="116" width="60" height="6" rx="2" fill="rgba(34,211,238,0.55)" />
      <rect x="418" y="126" width="90" height="4" rx="2" fill="rgba(34,211,238,0.22)" />
      <rect x="418" y="134" width="70" height="4" rx="2" fill="rgba(34,211,238,0.16)" />
      <rect x="418" y="144" width="80" height="4" rx="2" fill="rgba(34,211,238,0.12)" />
      <rect x="418" y="155" width="48" height="14" rx="4" fill="rgba(34,211,238,0.2)" />
      {/* spark */}
      <circle cx="465" cy="162" r="3" fill="#22D3EE" opacity="0.8" />
      <rect x="542" y="108" width="126" height="66" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {[0,1,2,3].map(i=>(
        <rect key={i} x="552" y={118+i*12} width={[80,100,65,90][i]} height="4" rx="2" fill="rgba(255,255,255,0.14)" />
      ))}
      <rect x="412" y="184" width="256" height="6" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="412" y="194" width="200" height="6" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="412" y="204" width="230" height="6" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="412" y="220" width="56" height="14" rx="4" fill="rgba(34,211,238,0.18)" />
      <rect x="476" y="220" width="52" height="14" rx="4" fill="rgba(255,255,255,0.05)" />
      <rect x="536" y="220" width="52" height="14" rx="4" fill="rgba(255,255,255,0.05)" />

      {/* cards section */}
      <rect x="59" y="280" width="641" height="160" fill="#F4F6F8" />
      <rect x="59" y="280" width="641" height="1" fill="rgba(0,0,0,0.07)" />
      <rect x="76" y="298" width="110" height="9" rx="3" fill="rgba(0,0,0,0.13)" />
      <rect x="76" y="313" width="200" height="5" rx="2" fill="rgba(0,0,0,0.07)" />
      <rect x="76" y="322" width="150" height="5" rx="2" fill="rgba(0,0,0,0.06)" />
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={76+i*202} y="338" width="190" height="90" rx="9" fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <rect x={76+i*202} y="338" width="190" height="44" rx="9" fill={['#DBEAFE','#D1FAE5','#FEF3C7'][i]} style={{ borderRadius:'9px 9px 0 0' }} />
          <rect x={76+i*202+12} y="390" width="80" height="6" rx="2" fill="rgba(0,0,0,0.14)" />
          <rect x={76+i*202+12} y="401" width="120" height="5" rx="2" fill="rgba(0,0,0,0.08)" />
          <rect x={76+i*202+12} y="411" width="90" height="5" rx="2" fill="rgba(0,0,0,0.07)" />
          <circle cx={76+i*202+164} cy={338+22} r="10" fill={['rgba(59,130,246,0.2)','rgba(16,185,129,0.2)','rgba(245,158,11,0.2)'][i]} />
        </g>
      ))}
    </svg>
  )
}

/* ─── Phone screen SVG ─── */
function PhoneScreen() {
  return (
    <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect width="200" height="400" fill="#F0F2F5" />
      {/* status bar */}
      <rect width="200" height="24" fill="#0F172A" />
      <rect x="68" y="8" width="64" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
      <circle cx="160" cy="12" r="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="172" cy="12" r="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="184" cy="12" r="4" fill="rgba(255,255,255,0.12)" />
      {/* nav */}
      <rect y="24" width="200" height="44" fill="url(#pnav)" />
      <defs>
        <linearGradient id="pnav" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E2D40" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <radialGradient id="phg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="46" r="11" fill="rgba(255,255,255,0.08)" />
      <circle cx="20" cy="46" r="4" fill="rgba(34,211,238,0.6)" />
      <rect x="37" y="41" width="52" height="10" rx="3" fill="rgba(255,255,255,0.16)" />
      <rect x="160" y="40" width="14" height="12" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="178" y="40" width="14" height="12" rx="3" fill="rgba(255,255,255,0.1)" />
      {/* hero */}
      <rect y="68" width="200" height="148" fill="#0F172A" />
      <rect y="68" width="200" height="148" fill="url(#phg)" />
      <rect x="16" y="86" width="70" height="7" rx="3" fill="rgba(34,211,238,0.25)" />
      <rect x="16" y="100" width="164" height="15" rx="3.5" fill="rgba(255,255,255,0.82)" />
      <rect x="16" y="120" width="140" height="13" rx="3.5" fill="rgba(255,255,255,0.58)" />
      <rect x="16" y="142" width="110" height="7" rx="3" fill="rgba(255,255,255,0.18)" />
      <rect x="16" y="153" width="86" height="7" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="16" y="170" width="78" height="24" rx="7" fill="#22D3EE" />
      <rect x="102" y="170" width="78" height="24" rx="7" fill="rgba(255,255,255,0.07)" />
      {/* stats row */}
      <rect y="216" width="200" height="42" fill="white" />
      <rect y="216" width="200" height="1" fill="rgba(0,0,0,0.07)" />
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={12+i*62} y="226" width="50" height="22" rx="5" fill="rgba(0,0,0,0.04)" />
          <rect x={18+i*62} y="231" width="28" height="5" rx="2" fill="rgba(0,0,0,0.14)" />
          <rect x={18+i*62} y="239" width="20" height="4" rx="2" fill="rgba(0,0,0,0.08)" />
        </g>
      ))}
      {/* cards */}
      <rect y="258" width="200" height="142" fill="#F4F6F8" />
      <rect y="258" width="200" height="1" fill="rgba(0,0,0,0.06)" />
      <rect x="16" y="270" width="70" height="7" rx="3" fill="rgba(0,0,0,0.13)" />
      <rect x="16" y="282" width="120" height="5" rx="2" fill="rgba(0,0,0,0.07)" />
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x="16" y={296+i*42} width="168" height="36" rx="7" fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <rect x="16" y={296+i*42} width="42" height="36" rx="7" fill={['#DBEAFE','#D1FAE5','#FEF3C7'][i]} />
          <rect x="66" y={303+i*42} width="65" height="5" rx="2" fill="rgba(0,0,0,0.14)" />
          <rect x="66" y={313+i*42} width="90" height="4" rx="2" fill="rgba(0,0,0,0.08)" />
          <rect x="66" y={322+i*42} width="60" height="4" rx="2" fill="rgba(0,0,0,0.07)" />
        </g>
      ))}
      {/* bottom bar */}
      <rect y="390" width="200" height="10" fill="rgba(0,0,0,0.09)" />
    </svg>
  )
}

export default function DeviceMockups() {
  const laptopRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let mx = 0, my = 0
    let cx = 0, cy = 0
    let scrollY = 0
    let active = false
    let ready = false

    const tick = () => {
      cx += (mx - cx) * 0.055
      cy += (my - cy) * 0.055

      const hero = document.getElementById('hero')
      const heroH = hero?.offsetHeight ?? window.innerHeight
      const sp = Math.min(scrollY / heroH, 1)
      const rotX = -sp * 18
      const tY   = -sp * 40
      const scl  = 1 - sp * 0.06

      if (laptopRef.current) {
        laptopRef.current.style.transform =
          `translate(${(cx*10).toFixed(2)}px,${(cy*7+tY).toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) scale(${scl.toFixed(4)})`
      }
      if (phoneRef.current) {
        phoneRef.current.style.transform =
          `translate(${(cx*7).toFixed(2)}px,${(cy*5+tY*0.88+16).toFixed(2)}px) rotateX(${(rotX*0.85).toFixed(2)}deg) scale(${(scl*0.97).toFixed(4)})`
      }

      const settled = Math.abs(mx-cx)<0.003 && Math.abs(my-cy)<0.003 && sp===0
      if (settled) { active=false; return }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      if (!ready) return
      mx = (e.clientX - window.innerWidth/2)  / (window.innerWidth/2)
      my = (e.clientY - window.innerHeight/2) / (window.innerHeight/2)
      if (!active) { active=true; raf=requestAnimationFrame(tick) }
    }
    const onLeave = () => { mx=0; my=0 }
    const onScroll = () => {
      scrollY = window.scrollY
      if (!active) { active=true; raf=requestAnimationFrame(tick) }
    }

    const readyTimer = setTimeout(() => { ready = true }, 900)

    /* Skip tilt/scroll JS effects on touch devices — CSS handles mobile layout */
    if (window.matchMedia('(max-width: 768px)').matches) {
      return () => {}
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll',    onScroll, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      clearTimeout(readyTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const laptopW = 'clamp(300px, 62vw, 620px)'
  const phoneW  = 'clamp(78px, 13vw, 126px)'

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        perspective: '1100px',
        perspectiveOrigin: '50% 10%',
        width: '100%',
        paddingBottom: '2rem',
      }}
    >
      {/* ── wrapper keeps laptop + phone + badges inside one flow box ── */}
      <div className="devices-group" style={{ position: 'relative', width: laptopW }}>

        {/* laptop */}
        <div
          ref={laptopRef}
          className="devices-laptop"
          style={{ willChange: 'transform', transformStyle: 'preserve-3d', position: 'relative' }}
        >
          <div style={{
            background: '#14192A',
            borderRadius: '14px',
            padding: '9px 9px 0',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.07)',
              '0 0 0 2px rgba(255,255,255,0.03)',
              '0 40px 100px rgba(34,211,238,0.16)',
              '0 20px 50px rgba(0,0,0,0.70)',
            ].join(','),
          }}>
            <div style={{
              position: 'absolute', top: '5px', left: '50%',
              transform: 'translateX(-50%)',
              width: '44px', height: '4px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.09)',
            }} />
            <div style={{ borderRadius: '6px 6px 0 0', overflow: 'hidden', lineHeight: 0, border: '1px solid rgba(0,0,0,0.1)', borderBottom: 'none' }}>
              <LaptopScreen />
            </div>
            <div style={{ height: '11px', background: 'linear-gradient(180deg,#1B2235 0%,#121720 100%)', borderRadius: '0 0 5px 5px', border: '1px solid rgba(0,0,0,0.14)', borderTop: '1px solid rgba(255,255,255,0.04)' }} />
            {/* glare */}
            <div style={{ position:'absolute', inset:0, borderRadius:'14px', background:'linear-gradient(135deg,rgba(255,255,255,0.032) 0%,transparent 40%)', pointerEvents:'none' }} />
          </div>
          {/* base */}
          <div style={{ height:'7px', background:'linear-gradient(180deg,#1A1F30 0%,#11151E 100%)', borderRadius:'0 0 18px 18px', margin:'0 7%', boxShadow:'0 2px 8px rgba(0,0,0,0.5)' }} />
          {/* ground shadow */}
          <div style={{ position:'absolute', bottom:'-18px', left:'8%', right:'8%', height:'20px', background:'rgba(0,0,0,0.28)', borderRadius:'50%', filter:'blur(14px)', pointerEvents:'none' }} />
        </div>

        {/* phone — overlapping laptop right edge */}
        <div
          ref={phoneRef}
          className="devices-phone"
          style={{
            position: 'absolute',
            right: 'clamp(-14px,-2vw,-6px)',
            top: 'clamp(18px,5%,36px)',
            width: phoneW,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            zIndex: 4,
          }}
        >
          <div style={{
            background: '#14192A',
            borderRadius: '20px',
            padding: '7px',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.08)',
              '0 18px 52px rgba(0,0,0,0.58)',
              '0 6px 20px rgba(34,211,238,0.10)',
            ].join(','),
          }}>
            <div style={{ position:'absolute', top:'5px', left:'50%', transform:'translateX(-50%)', width:'26px', height:'3.5px', borderRadius:'2px', background:'rgba(255,255,255,0.11)' }} />
            <div style={{ borderRadius:'13px', overflow:'hidden', lineHeight:0, border:'1px solid rgba(0,0,0,0.08)' }}>
              <PhoneScreen />
            </div>
            <div style={{ position:'absolute', inset:0, borderRadius:'20px', background:'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 40%)', pointerEvents:'none' }} />
          </div>
        </div>

        {/* badge — top left */}
        <div className="devices-badge" style={{
          position:'absolute', top:'10px', left: 'calc(-1 * clamp(10px,2vw,16px))',
          background:'rgba(14,20,32,0.94)', border:'1px solid rgba(34,211,238,0.22)',
          borderRadius:'12px', padding:'9px 13px',
          backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
          display:'flex', alignItems:'center', gap:'10px',
          boxShadow:'0 8px 28px rgba(0,0,0,0.5)', zIndex:10, whiteSpace:'nowrap',
        }}>
          <div style={{ width:'28px', height:'28px', borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,rgba(34,211,238,0.18) 0%,rgba(34,211,238,0.05) 100%)', border:'1px solid rgba(34,211,238,0.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style={{ fontSize:'10.5px', fontWeight:700, color:'#EAF0F7', lineHeight:1.25, fontFamily:'var(--font-syne)' }}>Lighthouse 96</div>
            <div style={{ fontSize:'9px', color:'#A6B2C4', lineHeight:1.3 }}>Performance</div>
          </div>
        </div>

        {/* badge — bottom left */}
        <div className="devices-badge" style={{
          position:'absolute', bottom:'28px', left:'calc(-1 * clamp(10px,2vw,16px))',
          background:'rgba(14,20,32,0.94)', border:'1px solid rgba(245,181,71,0.22)',
          borderRadius:'12px', padding:'9px 13px',
          backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
          display:'flex', alignItems:'center', gap:'10px',
          boxShadow:'0 8px 28px rgba(0,0,0,0.5)', zIndex:10, whiteSpace:'nowrap',
        }}>
          <div style={{ width:'28px', height:'28px', borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,rgba(245,181,71,0.18) 0%,rgba(245,181,71,0.04) 100%)', border:'1px solid rgba(245,181,71,0.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5B547" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <div style={{ fontSize:'10.5px', fontWeight:700, color:'#EAF0F7', lineHeight:1.25, fontFamily:'var(--font-syne)' }}>Wdrożenie 72h</div>
            <div style={{ fontSize:'9px', color:'#A6B2C4', lineHeight:1.3 }}>od startu do live</div>
          </div>
        </div>
      </div>
    </div>
  )
}
