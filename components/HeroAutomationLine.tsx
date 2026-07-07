'use client'

import { useEffect, useRef, useState } from 'react'

const LINE_1 = 'Dzień dobry, ile kosztuje strona dla mojej firmy?'
const LINE_2 = 'Wycena: 4 900 zł · realizacja 14 dni · rozmowa: jutro 10:00'

const MONO =
  'ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code", Menlo, Consolas, monospace'

const TYPE_1 = 46
const TYPE_2 = 26
const HOLD_1 = 750
const FADE = 420
const HOLD_2 = 1300
const GAP = 1000

export default function HeroAutomationLine() {
  const [text, setText] = useState('')
  const [line, setLine] = useState<1 | 2>(1)
  const [visible, setVisible] = useState(true)
  const [typing, setTyping] = useState(true)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setLine(2)
      setText(LINE_2)
      setTyping(false)
      return
    }

    let raf = 0
    let timer: ReturnType<typeof setTimeout>

    const type = (value: string, speed: number) =>
      new Promise<void>(resolve => {
        const start = performance.now()
        const tick = (now: number) => {
          if (!aliveRef.current) return resolve()
          const chars = Math.min(value.length, Math.floor((now - start) / speed))
          setText(value.slice(0, chars))
          if (chars >= value.length) return resolve()
          raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      })

    const wait = (ms: number) =>
      new Promise<void>(resolve => {
        timer = setTimeout(resolve, ms)
      })

    const run = async () => {
      while (aliveRef.current) {
        setLine(1)
        setVisible(true)
        setTyping(true)
        await type(LINE_1, TYPE_1)
        setTyping(false)
        await wait(HOLD_1)
        setVisible(false)
        await wait(FADE)
        setLine(2)
        setVisible(true)
        setTyping(true)
        await type(LINE_2, TYPE_2)
        setTyping(false)
        await wait(HOLD_2)
        setVisible(false)
        await wait(FADE)
        await wait(GAP)
      }
    }
    run()

    return () => {
      aliveRef.current = false
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      role="img"
      aria-label="Wiadomość klienta zamienia się w gotową wycenę"
      style={{
        width: '100%',
        maxWidth: 560,
        fontFamily: MONO,
        fontSize: 'clamp(15px, 1.5vw, 21px)',
        lineHeight: 1.65,
        letterSpacing: '-0.01em',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6ch', minHeight: '1.65em' }}>
        <span aria-hidden="true" style={{ color: '#334155', flexShrink: 0, userSelect: 'none' }}>
          &gt;
        </span>
        <span
          aria-hidden="true"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: line === 1 ? '#94A3B8' : '#22D3EE',
            opacity: visible ? 1 : 0,
            transition: 'opacity 380ms ease',
          }}
        >
          {text}
        </span>
        {typing && (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '0.55ch',
              height: '1.05em',
              transform: 'translateY(0.14em)',
              background: '#22D3EE',
              marginLeft: '0.1ch',
              animation: 'blink 1s steps(1) infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}
