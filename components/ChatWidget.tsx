'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Avatar = () => (
  <span className="hero-chat__avatar">
    <Image src="/getbuild-logo.webp" alt="" width={30} height={30} />
  </span>
)

const WORD_STEP_MS = 26

const renderMessageContent = (text: string, animate: boolean) => {
  if (!animate) return text

  let wordIndex = 0
  return text.split(/(\s+)/).map((chunk, idx) => {
    if (!chunk) return null
    if (/^\s+$/.test(chunk)) return chunk

    const delay = wordIndex * WORD_STEP_MS
    wordIndex += 1
    return (
      <span key={idx} className="hero-chat__word" style={{ animationDelay: `${delay}ms` }}>
        {chunk}
      </span>
    )
  })
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
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
      <div className="hero-chat__bar">
        <span className="hero-chat__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      </div>

      <div className="hero-chat__thread hero-chat__thread--scroll" ref={threadRef}>
        {messages.length === 0 && (
          <div className="hero-chat__row hero-chat__row--ai hero-chat__pop">
            <Avatar />
            <div className="hero-chat__bubble hero-chat__bubble--ai">
              {renderMessageContent('Cześć! Pytaj śmiało, odpowiadam od razu.', true)}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`hero-chat__row hero-chat__row--${m.role === 'user' ? 'user' : 'ai'} hero-chat__pop`}>
            {m.role === 'assistant' && <Avatar />}
            <div className={`hero-chat__bubble hero-chat__bubble--${m.role === 'user' ? 'user' : 'ai'}`}>
              {m.role === 'assistant' ? renderMessageContent(m.content, i === messages.length - 1) : m.content}
            </div>
          </div>
        ))}

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
