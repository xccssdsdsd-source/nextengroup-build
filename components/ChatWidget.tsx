'use client'

import { useEffect, useRef, useState } from 'react'

const MONO =
  'ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code", Menlo, Consolas, monospace'

type Message = { role: 'user' | 'assistant'; content: string }

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: nextMessages.slice(0, -1) }),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok && res.status === 429) {
        setError(data?.reply || 'Zbyt wiele wiadomości. Spróbuj za chwilę.')
        setLoading(false)
        return
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data?.reply || 'Coś poszło nie tak. Napisz do nas przez formularz kontaktowy.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Chwilowy problem z połączeniem. Napisz do nas przez formularz kontaktowy.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="hero-chat hero-chat--live" style={{ fontFamily: MONO }}>
      <div className="hero-chat__bar">
        <span className="hero-chat__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="hero-chat__title" aria-hidden="true">asystent-ai.getbuild</span>
        <span className="hero-chat__status" aria-hidden="true">
          <span className="hero-chat__pulse" />online
        </span>
      </div>

      <div className="hero-chat__thread hero-chat__thread--scroll" ref={threadRef}>
        {messages.length === 0 && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <span className="hero-chat__avatar">AI</span>
            <div className="hero-chat__bubble hero-chat__bubble--ai">
              Cześć! Zapytaj o ofertę, wycenę albo czas realizacji, chętnie pomogę.
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`hero-chat__row hero-chat__row--${m.role === 'user' ? 'user' : 'ai'} hero-chat__pop`}>
            {m.role === 'assistant' && <span className="hero-chat__avatar">AI</span>}
            <div className={`hero-chat__bubble hero-chat__bubble--${m.role === 'user' ? 'user' : 'ai'}`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <span className="hero-chat__avatar">AI</span>
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
            placeholder="Zadaj pytanie…"
            disabled={loading}
            className="hero-chat__input"
            aria-label="Wiadomość do asystenta AI"
          />
        </div>
        <button
          type="submit"
          className={`hero-chat__send ${input.trim() ? 'hero-chat__send--active' : ''}`}
          disabled={loading || !input.trim()}
          aria-label="Wyślij wiadomość"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
