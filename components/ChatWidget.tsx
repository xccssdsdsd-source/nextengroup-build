'use client'

import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

type ChatWidgetProps = {
  interactiveReady?: boolean
  onUserInteraction?: () => void
}

const propertySuggestions = [
  'Czy apartament na Mokotowie ma balkon?',
  'Pokaż oferty do 1,5 mln zł',
  'Czy AI umówi prezentację za mnie?',
] as const

const implementationSuggestions = [
  'Ile trwa wdrożenie?',
  'Czy AI pozna moje oferty?',
  'Ile to kosztuje?',
] as const

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const StopIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
  </svg>
)

export default function ChatWidget({ interactiveReady = false, onUserInteraction }: ChatWidgetProps = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const idle = messages.length === 0 && !loading
  const suggestions = interactiveReady ? implementationSuggestions : propertySuggestions
  const opening = interactiveReady
    ? 'Gotowe. Teraz zapytaj mnie o wdrożenie takiego asystenta u siebie.'
    : 'Cześć, jestem Asystentem Anny. Znam jej oferty — zapytaj mnie o dowolną z nich.'

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior })
  }, [messages, loading])

  useEffect(() => () => {
    abortRef.current?.abort()
  }, [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    onUserInteraction?.()

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
    <div className={`hero-chat${isFocused ? ' hero-chat--focused' : ''}${idle ? ' hero-chat--idle' : ''}`} onClick={focusInput}>
      <div
        className="hero-chat__thread"
        ref={threadRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {/* The opening line is set as a lede, not as a chat bubble: it is the
            assistant introducing itself, and it is the only sentence in the
            panel that has the room to be read as a statement. */}
        <p className="hero-chat__lede hero-chat__pop">{opening}</p>

        {messages.map((m, i) => (
          <div key={i} className={`hero-chat__msg hero-chat__msg--${m.role === 'user' ? 'user' : 'ai'} hero-chat__pop`}>
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="hero-chat__msg hero-chat__msg--ai hero-chat__pop">
            <span className="hero-chat__typing" aria-label="Asystent pisze">
              <i /><i /><i />
            </span>
          </div>
        )}
      </div>

      {idle && (
        <div className="hero-chat__suggestions" aria-label="Przykładowe pytania">
          {suggestions.map(s => (
            <button key={s} type="button" className="hero-chat__chip" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      {error && <p className="hero-chat__error">{error}</p>}

      <form
        className="hero-chat__composer"
        onSubmit={handleSubmit}
        {...{
          toolname: 'ask_getbuild',
          tooldescription: 'Asks the Getbuild assistant a question about services, pricing, delivery, or business automation.',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          name="question"
          value={input}
          onChange={e => { onUserInteraction?.(); setInput(e.target.value) }}
          onFocus={() => { onUserInteraction?.(); setIsFocused(true) }}
          onBlur={() => setIsFocused(false)}
          placeholder="Napisz wiadomość…"
          aria-label="Pytanie do asystenta"
          {...{ toolparamdescription: 'Question about Getbuild services, pricing, delivery, websites, chatbots, or automations.' }}
          disabled={loading}
          className="hero-chat__input"
          data-chat-input
        />
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
            className={`hero-chat__send${input.trim() ? ' hero-chat__send--active' : ''}`}
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
