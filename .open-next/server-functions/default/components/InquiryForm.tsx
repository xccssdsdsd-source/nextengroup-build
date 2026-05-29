'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function InquiryForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  return (
    <section id="zapytanie" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <div className="relative mx-auto max-w-2xl">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Wiadomość</span>
          <h2 className="section-title">Wyślij nam zapytanie</h2>
          <p className="section-copy">
            Masz pytanie? Chętnie je czytamy. Odpowiemy tak szybko jak się da.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(37,99,235,0.06)' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="text-lg font-bold text-[#0A0A0F] mb-2">Dziękujemy!</h3>
                <p className="text-[14px] text-[#6b7280]">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-semibold text-[#0A0A0F] mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jan Kowalski"
                    className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-[#0A0A0F] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jan@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-semibold text-[#0A0A0F] mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Twoja wiadomość..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary py-3"
                >
                  Wyślij wiadomość
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
