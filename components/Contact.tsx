'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'digitalagencymail0@gmail.com'

const cardCls = 'glass group relative flex min-h-[180px] cursor-pointer flex-col justify-between overflow-hidden rounded-[28px] px-6 py-6 transition-[border-color,box-shadow] duration-200 hover:border-[#00d4ff]/40 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2),inset_0_0_32px_rgba(0,140,255,0.08),0_20px_48px_rgba(0,0,0,0.3)]'
const iconCls = 'flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00d4ff]/24 bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(0,100,220,0.08))] text-[#9ff3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_24px_rgba(0,212,255,0.28)]'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kontakt" ref={ref} className="section-shell scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(26,111,255,0.18),transparent_36%),radial-gradient(ellipse_at_20%_80%,rgba(0,212,255,0.08),transparent_28%)]" />

      <motion.div
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.75, ease }}
        className="glass relative mx-auto max-w-7xl overflow-hidden rounded-[34px] p-7 sm:p-10 lg:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,255,0.15),transparent_28%),radial-gradient(ellipse_at_bottom_left,rgba(26,111,255,0.1),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.8),transparent)]" />
        <div className="pulse-glow absolute inset-x-[20%] top-0 h-px blur-sm bg-[rgba(0,212,255,0.5)]" />

        <div className="relative">
          <span className="section-kicker">Kontakt</span>
          <h2 className="section-title">Porozmawiajmy o Twojej firmie</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <motion.a
              href={`mailto:${contactEmail}`}
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.62, delay: 0.5, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className={iconCls}>
                <Mail size={22} />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">E-mail</span>
                <span className="mt-2 block text-lg text-white break-all">{contactEmail}</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#d8ecff]">
                <span>Otwórz mail</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/getbuild.pl/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.62, delay: 0.64, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className={iconCls}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">Instagram</span>
                <span className="mt-2 block text-lg text-white">@getbuild.pl</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#d8ecff]">
                <span>Przejdź do profilu</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/profile.php?id=61588720012257"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.62, delay: 0.78, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className={iconCls}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M13.5 20V12.8H16L16.4 10H13.5V8.2C13.5 7.4 13.8 6.8 15 6.8H16.5V4.3C16.2 4.2 15.3 4 14.2 4C11.8 4 10.2 5.4 10.2 8V10H8V12.8H10.2V20H13.5Z" fill="currentColor" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">Facebook</span>
                <span className="mt-2 block text-lg text-white">GetBuild</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#d8ecff]">
                <span>Przejdź do profilu</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
