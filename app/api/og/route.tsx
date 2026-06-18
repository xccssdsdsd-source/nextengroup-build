import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const ACCENT = '#22D3EE'
const BG = '#000000'
const TEXT_PRIMARY = '#FFFFFF'
const TEXT_SECONDARY = '#B0B8C8'
const TEXT_MUTED = '#6B7485'
const BORDER_ACCENT = 'rgba(34,211,238,0.22)'

async function loadSyneFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Syne:wght@800&display=block',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      }
    ).then((r) => r.text())
    const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1]
    if (!fontUrl) return null
    return fetch(fontUrl).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

function getFontSize(title: string): number {
  if (title.length < 28) return 72
  if (title.length < 50) return 60
  if (title.length < 70) return 50
  return 42
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const rawTitle = searchParams.get('title') || 'Nowoczesne Strony WWW\ni Automatyzacje AI'
  const title = rawTitle.replace(/\\n/g, '\n')
  const subtitle = searchParams.get('subtitle') || ''

  const fontData = await loadSyneFont()
  const fonts = fontData
    ? [{ name: 'Syne', data: fontData, style: 'normal' as const, weight: 800 as const }]
    : []
  const fontFamily = fontData ? 'Syne, sans-serif' : 'sans-serif'
  const fontSize = getFontSize(title)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: BG,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily,
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            display: 'flex',
          }}
        />

        {/* Radial cyan glow top-center */}
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            left: '200px',
            width: '800px',
            height: '500px',
            background:
              'radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.06) 45%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Secondary glow — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '60px',
            width: '400px',
            height: '300px',
            background:
              'radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: `linear-gradient(90deg, transparent 0%, ${ACCENT} 20%, ${ACCENT} 80%, transparent 100%)`,
            display: 'flex',
          }}
        />

        {/* Main layout */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '56px 80px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── Left content ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              paddingRight: '64px',
            }}
          >
            {/* Brand label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: ACCENT,
                  display: 'flex',
                }}
              />
              <span
                style={{
                  fontSize: '16px',
                  fontFamily,
                  fontWeight: 800,
                  color: ACCENT,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                Getbuild
              </span>
            </div>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily,
                  fontWeight: 800,
                  color: TEXT_PRIMARY,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'pre-wrap',
                  maxWidth: '680px',
                }}
              >
                {title}
              </div>

              {subtitle && (
                <div
                  style={{
                    fontSize: '19px',
                    color: TEXT_SECONDARY,
                    marginTop: '20px',
                    lineHeight: 1.55,
                    maxWidth: '580px',
                    display: 'flex',
                  }}
                >
                  {subtitle}
                </div>
              )}
            </div>

            {/* Bottom: tags + domain */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Divider */}
              <div
                style={{
                  width: '48px',
                  height: '2px',
                  background: ACCENT,
                  borderRadius: '2px',
                  display: 'flex',
                }}
              />

              {/* Service chips */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Strony WWW', 'Automatyzacje AI', 'Agenci AI', 'SEO & GEO'].map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: '6px 16px',
                      border: `1px solid ${BORDER_ACCENT}`,
                      borderRadius: '100px',
                      color: TEXT_SECONDARY,
                      fontSize: '14px',
                      display: 'flex',
                      background: 'rgba(34,211,238,0.04)',
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* Domain */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: TEXT_MUTED,
                  fontSize: '15px',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '1px',
                    background: TEXT_MUTED,
                    display: 'flex',
                  }}
                />
                getbuild.pl
              </div>
            </div>
          </div>

          {/* ── Right visual ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '260px',
              position: 'relative',
            }}
          >
            {/* Concentric circles */}
            {[248, 196, 144, 96].map((size, i) => (
              <div
                key={size}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  border: `1px solid rgba(34,211,238,${0.07 + i * 0.07})`,
                  display: 'flex',
                }}
              />
            ))}

            {/* Crosshair H */}
            <div
              style={{
                position: 'absolute',
                width: '248px',
                height: '1px',
                background: 'rgba(34,211,238,0.07)',
                display: 'flex',
              }}
            />

            {/* Crosshair V */}
            <div
              style={{
                position: 'absolute',
                width: '1px',
                height: '248px',
                background: 'rgba(34,211,238,0.07)',
                display: 'flex',
              }}
            />

            {/* Center glow ring */}
            <div
              style={{
                position: 'absolute',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0.1) 55%, transparent 75%)',
                display: 'flex',
              }}
            />

            {/* Center dot */}
            <div
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: ACCENT,
                display: 'flex',
              }}
            />

            {/* Corner tick marks */}
            {[
              { top: '126px', left: '-2px', width: '12px', height: '1px' },
              { top: '126px', right: '-2px', width: '12px', height: '1px' },
              { left: '126px', top: '-2px', width: '1px', height: '12px' },
              { left: '126px', bottom: '-2px', width: '1px', height: '12px' },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  background: `rgba(34,211,238,0.4)`,
                  display: 'flex',
                  ...style,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom border line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
