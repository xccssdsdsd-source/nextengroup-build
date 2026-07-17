'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const suggestions = [
  'Co może zrobić dla mnie agent AI?',
  'Jak szybko zobaczę pierwszy projekt?',
  'Chcesz takiego na swojej stronie? Przetestuj mnie tutaj.',
] as const

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const StopIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
)

const Avatar = () => (
  <span className="hero-chat__avatar">
    <Image src="/getbuild-logo.webp" alt="" width={30} height={30} />
  </span>
)

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => () => {
    abortRef.current?.abort()
  }, [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: nextMessages.slice(0, -1) }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => null)

      if (!res.ok && res.status === 429) {
        setError(data?.reply || 'Zbyt wiele wiadomości. Spróbuj za chwilę.')
        setLoading(false)
        return
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data?.reply || 'Coś poszło nie tak. Napisz do nas przez formularz kontaktowy.' }])
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setMessages(prev => [...prev, { role: 'assistant', content: 'Chwilowy problem z połączeniem. Napisz do nas przez formularz kontaktowy.' }])
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  const cancelSend = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('button, a, input')) return
    inputRef.current?.focus()
  }

  return (
    <div
      className={`hero-chat hero-chat--live ${isFocused ? 'hero-chat--focused' : ''}`}
      onClick={focusInput}
    >
      <div className="hero-chat__interactive-bg" aria-hidden="true">
        <div className="hero-chat__interactive-grid" />
        <div className="hero-chat__interactive-glow" />
      </div>

      <div className="hero-chat__bar">
        <span className="hero-chat__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      </div>

      <div
        className="hero-chat__thread hero-chat__thread--scroll"
        ref={threadRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.length === 0 && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <Avatar />
            <div className="hero-chat__bubble hero-chat__bubble--ai">
              Cześć! Pytaj śmiało, odpowiadam od razu.
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`hero-chat__row hero-chat__row--${m.role === 'user' ? 'user' : 'ai'} hero-chat__pop`}>
            {m.role === 'assistant' && <Avatar />}
            <div className={`hero-chat__bubble hero-chat__bubble--${m.role === 'user' ? 'user' : 'ai'}`}>
              {m.content}
            </div>
          </div>
        ))}

        {messages.length === 0 && !loading && (
          <div className="hero-chat__suggestions" aria-label="Przykładowe pytania">
            {suggestions.map(s => (
              <button key={s} type="button" className="hero-chat__chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}

        {loading && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <Avatar />
            <div className="hero-chat__bubble hero-chat__bubble--ai">
              <span className="hero-chat__typing" aria-label="AI pisze">
                <i /><i /><i />
              </span>
            </div>
          </div>
        )}
      </div>

      {error && <p className="hero-chat__error">{error}</p>}

      <form className="hero-chat__composer" onSubmit={handleSubmit}>
        <div className="hero-chat__field">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Zadaj pytanie…"
            disabled={loading}
            className="hero-chat__input"
            aria-label="Wiadomość do asystenta AI"
          />
        </div>
        {loading ? (
          <button
            type="button"
            className="hero-chat__send hero-chat__send--active"
            onClick={cancelSend}
            aria-label="Anuluj wysyłanie"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            type="submit"
            className={`hero-chat__send ${input.trim() ? 'hero-chat__send--active' : ''}`}
            disabled={!input.trim()}
            aria-label="Wyślij wiadomość"
          >
            <SendIcon />
          </button>
        )}
      </form>
    </div>
  )
}
