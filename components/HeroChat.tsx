'use client'

import { useEffect, useRef, useState } from 'react'

const MONO =
  'ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code", Menlo, Consolas, monospace'

const CHAT = [
  {
    chip: 'Zakres usług',
    q: 'W czym możecie mi pomóc?',
    a: 'Tworzymy strony WWW, które generują zapytania, oraz automatyzacje i agentów AI, którzy odciążają zespół z powtarzalnej pracy. Wszystko w jednym miejscu.',
  },
  {
    chip: 'Wycena',
    q: 'Ile kosztuje wdrożenie?',
    a: 'Prosta, profesjonalna strona startuje od 2099 zł, a większe wdrożenia z AI wyceniamy indywidualnie. Zawsze podajemy stałą kwotę przed startem, bez ukrytych kosztów.',
  },
  {
    chip: 'Czas realizacji',
    q: 'Ile trwa realizacja?',
    a: 'Pierwszą wizualizację strony pokazujemy zwykle w ciągu 24 godzin. Działające demo automatyzacji albo agenta AI dostajesz w kilka dni.',
  },
  {
    chip: 'Gwarancja',
    q: 'Co jeśli nie będę zadowolony?',
    a: 'Nie ryzykujesz nic. Najpierw widzisz bezpłatną wizualizację, a poprawki masz bez limitu. Płacisz dopiero za efekt, który akceptujesz.',
  },
  {
    chip: 'Proces',
    q: 'Jak wygląda proces współpracy?',
    a: 'Umawiasz bezpłatną konsultację, my poznajemy Twoje cele i przygotowujemy wycenę oraz wizualizację. Potem projektujemy, wdrażamy i zostajemy na wsparciu.',
  },
] as const

const TYPE_INPUT = 20
const TYPE_ANSWER = 9
const HOLD_BEFORE_SEND = 200
const SENDING = 200
const THINKING = 420
const HOLD_AFTER = 1900
const CLEAR = 220
const REDUCED_HOLD = 2600

type Phase = 'input' | 'send' | 'thinking' | 'answer' | 'hold' | 'clear'

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function HeroChat() {
  const [input, setInput] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [aiMsg, setAiMsg] = useState('')
  const [phase, setPhase] = useState<Phase>('input')
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const aliveRef = useRef(true)
  const jumpRef = useRef<number | null>(null)

  const handleChipClick = (i: number) => {
    jumpRef.current = i
  }

  useEffect(() => {
    aliveRef.current = true
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let timer: ReturnType<typeof setTimeout>

    const wait = (ms: number) =>
      new Promise<void>(resolve => {
        const start = performance.now()
        const poll = () => {
          if (!aliveRef.current || jumpRef.current !== null) return resolve()
          if (performance.now() - start >= ms) return resolve()
          timer = setTimeout(poll, 30)
        }
        poll()
      })

    // Reduced motion: no typing/movement, but questions still cycle via opacity.
    if (mq.matches) {
      setReduced(true)
      const cycle = async () => {
        let i = 0
        while (aliveRef.current) {
          if (jumpRef.current !== null) {
            i = jumpRef.current
            jumpRef.current = null
          }
          setActive(i)
          setUserMsg(CHAT[i].q)
          setAiMsg(CHAT[i].a)
          setPhase('hold')
          await wait(REDUCED_HOLD)
          if (!aliveRef.current) break
          setPhase('clear')
          await wait(CLEAR)
          i = jumpRef.current !== null ? jumpRef.current : (i + 1) % CHAT.length
          jumpRef.current = null
        }
      }
      cycle()
      return () => {
        aliveRef.current = false
        clearTimeout(timer)
      }
    }

    const type = (value: string, speed: number, set: (v: string) => void) =>
      new Promise<void>(resolve => {
        const start = performance.now()
        const tick = (now: number) => {
          if (!aliveRef.current || jumpRef.current !== null) return resolve()
          const n = Math.min(value.length, Math.floor((now - start) / speed))
          set(value.slice(0, n))
          if (n >= value.length) return resolve()
          raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      })

    const run = async () => {
      let i = 0
      while (aliveRef.current) {
        if (jumpRef.current !== null) {
          i = jumpRef.current
          jumpRef.current = null
        }
        const item = CHAT[i]
        setActive(i)
        setUserMsg('')
        setAiMsg('')
        setInput('')

        setPhase('input')
        await type(item.q, TYPE_INPUT, setInput)
        if (!aliveRef.current) break

        if (jumpRef.current === null) await wait(HOLD_BEFORE_SEND)

        setPhase('send')
        setUserMsg(item.q)
        setInput('')
        if (jumpRef.current === null) await wait(SENDING)

        setPhase('thinking')
        if (jumpRef.current === null) await wait(THINKING)

        setPhase('answer')
        await type(item.a, TYPE_ANSWER, setAiMsg)
        if (!aliveRef.current) break

        if (jumpRef.current === null) {
          setPhase('hold')
          await wait(HOLD_AFTER)
        }

        setPhase('clear')
        if (jumpRef.current === null) await wait(CLEAR)

        i = jumpRef.current !== null ? jumpRef.current : (i + 1) % CHAT.length
        if (jumpRef.current !== null) jumpRef.current = null
      }
    }
    run()

    return () => {
      aliveRef.current = false
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  const typingInput = phase === 'input'
  const answering = phase === 'answer'
  const showUser = userMsg !== '' && phase !== 'clear'
  const showThinking = phase === 'thinking'
  const showAi = (phase === 'answer' || phase === 'hold') && phase !== 'clear'
  const live = !reduced && phase !== 'hold' && phase !== 'clear'
  const clearing = phase === 'clear'
  const sending = phase === 'send'

  return (
    <div
      className={`hero-chat ${live ? 'hero-chat--live' : ''}`}
      style={{ fontFamily: MONO }}
      role="img"
      aria-label="Rozmowa z asystentem AI o współpracy, wycenie i realizacji"
    >
      <div className="hero-chat__bar">
        <span className="hero-chat__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="hero-chat__title" aria-hidden="true">asystent-ai.nexten</span>
        <span className="hero-chat__status" aria-hidden="true">
          <span className="hero-chat__pulse" />online
        </span>
      </div>

      <div className="hero-chat__chips">
        {CHAT.map((item, i) => (
          <button
            key={item.chip}
            type="button"
            onClick={() => handleChipClick(i)}
            className={`hero-chat__chip ${i === active ? 'hero-chat__chip--on' : ''}`}
          >
            {item.chip}
          </button>
        ))}
      </div>

      <div
        className="hero-chat__thread"
        style={{ opacity: clearing ? 0 : 1, transition: `opacity ${CLEAR}ms ease` }}
        aria-hidden="true"
      >
        {showUser && (
          <div className="hero-chat__row hero-chat__row--user hero-chat__pop">
            <div className="hero-chat__bubble hero-chat__bubble--user">{userMsg}</div>
          </div>
        )}

        {(showThinking || showAi) && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <span className="hero-chat__avatar">AI</span>
            <div className="hero-chat__bubble hero-chat__bubble--ai">
              {showThinking ? (
                <span className="hero-chat__typing" aria-label="AI pisze">
                  <i /><i /><i />
                </span>
              ) : (
                <>
                  {aiMsg}
                  {answering && <span className="hero-chat__caret" />}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="hero-chat__composer" aria-hidden="true">
        <div className="hero-chat__field">
          {input ? (
            <span className="hero-chat__field-text">{input}</span>
          ) : (
            <span className="hero-chat__placeholder">Zadaj pytanie…</span>
          )}
          {typingInput && <span className="hero-chat__caret hero-chat__caret--input" />}
        </div>
        <span className={`hero-chat__send ${sending ? 'hero-chat__send--active' : ''}`} aria-hidden="true">
          <SendIcon />
        </span>
      </div>

      <ul className="sr-only">
        {CHAT.map(item => (
          <li key={item.q}>{item.q} {item.a}</li>
        ))}
      </ul>
    </div>
  )
}
