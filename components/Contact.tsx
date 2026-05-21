'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'
const whatsappHref = 'https://wa.me/48XXXXXXXXX'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kontakt" ref={ref} className="section-shell relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-200/60 bg-white p-8 text-center sm:p-12 lg:p-16"
        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 24px 64px rgba(0,85,255,0.06)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#0055FF]/20 to-transparent" />

        <div className="relative">
          <span className="section-kicker text-blue-400">Kontakt</span>
          <h2 className="section-title text-gray-900">Porozmawiajmy o Twojej firmie</h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-[#6B7280]">
            15 minut rozmowy wystarczy, żeby ustalić co i jak. Zero zobowiązań.
          </p>

          <motion.a
            href="https://calendly.com/getbuild"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0055FF] px-8 py-5 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#0044DD] hover:shadow-[0_12px_36px_rgba(0,85,255,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="2" y="3" width="14" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M6 1.5V4M12 1.5V4M2 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Zarezerwuj 15 min rozmowę
          </motion.a>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35, ease }}
              className="inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-[13px] font-semibold text-[#0A0A0A] transition-[background,box-shadow] duration-200 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.35.36 2.61.99 3.69L1.5 16.5l3.93-.975A7.453 7.453 0 009 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5zm3.69 10.305c-.165.465-.945.885-1.305.93-.33.045-.75.06-1.2-.075-.285-.09-.645-.21-1.11-.42-1.95-.84-3.225-2.805-3.33-2.94-.09-.135-.765-1.02-.765-1.95s.48-1.38.66-1.575c.165-.18.36-.225.48-.225h.345c.165 0 .33.015.48.36.165.375.555 1.335.6 1.44.045.09.075.21.015.33-.06.12-.09.18-.18.285-.09.12-.195.255-.27.345-.09.105-.195.225-.075.435.12.21.54.885 1.155 1.44.795.705 1.455.93 1.665 1.035.21.09.33.075.45-.045.12-.12.51-.6.645-.81.135-.195.27-.165.45-.09.18.075 1.14.54 1.335.63.195.09.33.135.375.21.045.075.045.435-.12.9z" fill="#25D366" />
              </svg>
              WhatsApp
            </motion.a>

            <motion.a
              href={`mailto:${contactEmail}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.45, ease }}
              className="inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-[13px] font-semibold text-[#0A0A0A] transition-[background,box-shadow] duration-200 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="16" height="12" rx="2" stroke="#6B7280" strokeWidth="1.4" />
                <path d="M1 3l8 5 8-5" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {contactEmail}
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.6, ease }}
            className="mt-8 flex items-center justify-center gap-4 border-t border-neutral-100 pt-6"
          >
            <a href="https://www.instagram.com/getbuild.pl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#9CA3AF] transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588720012257" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#9CA3AF] transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 21v-7h2l.5-2.5H13V10c0-.69.31-1 1-1h1.5V6.5S14.7 6 13.5 6C11.5 6 10 7.5 10 9.5v2H8V14h2v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/getbuild" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#9CA3AF] transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 10v7M7 7.5v.01M11 17v-3.5c0-1.38 1.12-2.5 2.5-2.5S16 12.12 16 13.5V17M11 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
