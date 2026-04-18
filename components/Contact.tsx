'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Link2 } from 'lucide-react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-28 px-6 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(26,111,255,0.08) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14 flex flex-col gap-8">
              <div>
                <span
                  className="text-xs text-[#00d4ff] tracking-[0.2em] uppercase mb-4 block"
                  style={{ fontFamily: 'var(--font-figtree)' }}
                >
                  Napisz do nas
                </span>
                <h2
                  className="font-barlow text-[clamp(48px,7vw,80px)] uppercase text-[#e8f0ff] leading-[0.9] tracking-[-0.02em]"
                  style={{ fontWeight: 900 }}
                >
                  ZACZNIJMY<br />
                  <span className="gradient-text">RAZEM</span>
                </h2>
              </div>

              <p
                className="text-[#4a6080] text-base leading-[1.7] max-w-sm"
                style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
              >
                Napisz do nas, a w ciągu 24h przygotujemy bezpłatną wizualizację Twojej strony. Zero zobowiązań.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail, label: 'kontakt@nextgroup.pl', href: 'mailto:kontakt@nextgroup.pl' },
                  { icon: Link2, label: '@nextgroup.pl', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(0,212,255,0.07)',
                        border: '1px solid rgba(0,212,255,0.15)',
                      }}
                    >
                      <Icon size={16} color="#00d4ff" />
                    </div>
                    <span
                      className="text-sm text-[#4a6080] group-hover:text-[#e8f0ff] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-figtree)' }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="p-10 lg:p-14 lg:border-l"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
                  >
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-syne text-xl font-bold text-[#e8f0ff]">Wiadomość wysłana!</h3>
                  <p className="text-[#4a6080] text-sm" style={{ fontFamily: 'var(--font-figtree)' }}>
                    Odezwiemy się w ciągu 24h z bezpłatną wizualizacją.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
                    { name: 'email', label: 'Adres e-mail', type: 'email', required: true },
                    { name: 'branza', label: 'Branża / rodzaj firmy', type: 'text', required: false },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label
                        className="text-xs text-[#4a6080] tracking-wide"
                        style={{ fontFamily: 'var(--font-figtree)' }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        className="w-full px-4 py-3 text-sm text-[#e8f0ff] placeholder-[#4a6080] outline-none transition-[border-color] duration-200 rounded-xl"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontFamily: 'var(--font-figtree)',
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs text-[#4a6080] tracking-wide"
                      style={{ fontFamily: 'var(--font-figtree)' }}
                    >
                      Wiadomość
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 text-sm text-[#e8f0ff] placeholder-[#4a6080] outline-none transition-[border-color] duration-200 rounded-xl resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        fontFamily: 'var(--font-figtree)',
                      }}
                      placeholder="Opowiedz nam o swojej firmie i celach..."
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-sm font-semibold mt-1"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
                  >
                    Wyślij i odbierz bezpłatny projekt
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
