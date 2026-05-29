'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, type MouseEvent, type FormEvent } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const benefits = [
  {
    title: 'Analiza on-page',
    desc: 'Sprawdzenie nagłówków, meta tagów, słów kluczowych, struktury treści i linkowania',
  },
  {
    title: 'Omówienie procesów',
    desc: 'Przeanalizujemy Twoje aktualne procesy biznesowe i zidentyfikujemy obszary do automatyzacji',
  },
  {
    title: 'Dobór ścieżki',
    desc: 'Dopasowanie najlepszej strategii i technologii do Twoich konkretnych potrzeb i budżetu',
  },
  {
    title: 'Wybór narzędzi',
    desc: 'Wskazówki dotyczące najlepszych narzędzi i platform dostosowanych do Twojej branży',
  },
  {
    title: 'Zrozumienie AI',
    desc: 'Wyjaśnimy, jak sztuczna inteligencja może rzeczywiście wspomóc Twój biznes',
  },
]

const consultationTopics = [
  { value: 'strony-www', label: 'Strony WWW dla firm' },
  { value: 'automatyzacje-ai', label: 'Automatyzacje AI' },
  { value: 'agenci-ai', label: 'Agenci AI' },
  { value: 'inne', label: 'Inne' },
]

export default function FreeConsultation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [formData, setFormData] = useState({ topic: '', name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ topic: '', name: '', email: '', phone: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  return (
    <section id="konsultacja" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Bezpłatna oferta</span>
          <h2 className="section-title">Konsultacja AI — zupełnie za darmo</h2>
          <p className="section-copy">
            Nie musisz podejmować decyzji od razu. Umów się na bezpłatną 15-minutową rozmowę i sprawdź, jak AI może rzeczywiście wspomóc Twój biznes.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {benefits.map((benefit, idx) => <BenefitCard key={idx} benefit={benefit} ease={ease} />)}
        </motion.div>

        <motion.div
          className="mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
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
                  <label htmlFor="topic" className="block text-[13px] font-semibold text-[#0A0A0F] mb-2">
                    Czego dotyczy konsultacja? *
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  >
                    <option value="">Wybierz temat...</option>
                    {consultationTopics.map(topic => (
                      <option key={topic.value} value={topic.value}>{topic.label}</option>
                    ))}
                  </select>
                </div>

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
                  <label htmlFor="phone" className="block text-[13px] font-semibold text-[#0A0A0F] mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+48 123 456 789"
                    className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary py-3"
                >
                  Umów bezpłatną konsultację
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BenefitCard({ benefit, ease }: { benefit: typeof benefits[0], ease: [number, number, number, number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-4 sm:p-6 transition-[border-color,box-shadow] duration-200 ${
        isHovered ? 'border-[#2563EB] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)]' : 'border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
      style={{ background: 'var(--bg-card)' }}
    >
      <h3 className="text-[1.025rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {benefit.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
        {benefit.desc}
      </p>
    </motion.article>
  )
}
