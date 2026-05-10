'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'digitalagencymail0@gmail.com'

const cardCls = 'group relative flex min-h-[180px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white px-6 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-[#0EA5E9]/40 hover:shadow-lg hover:shadow-neutral-200/60'
const iconCls = 'flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0EA5E9] transition-transform duration-300 group-hover:scale-110'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      id="kontakt"
      ref={ref}
      className="section-shell scroll-mt-32 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-neutral-200 bg-[#F7F8FA] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12"
      >
        <div className="relative">
          <span className="section-kicker">Kontakt</span>
          <h2 className="section-title">Porozmawiajmy o Twojej firmie</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <motion.a
              href={`mailto:${contactEmail}`}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.62, delay: 0.5, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className={iconCls}>
                <Mail size={22} />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">E-mail</span>
                <span className="mt-2 block text-lg text-[#0A0A0A] break-all">{contactEmail}</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#0EA5E9]">
                <span>Otwórz mail</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/getbuild.pl/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.62, delay: 0.64, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className={iconCls}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">Instagram</span>
                <span className="mt-2 block text-lg text-[#0A0A0A]">@getbuild.pl</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#0EA5E9]">
                <span>Przejdź do profilu</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/profile.php?id=61588720012257"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.62, delay: 0.78, ease }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cardCls}
            >
              <span className={iconCls}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M13.5 20V12.8H16L16.4 10H13.5V8.2C13.5 7.4 13.8 6.8 15 6.8H16.5V4.3C16.2 4.2 15.3 4 14.2 4C11.8 4 10.2 5.4 10.2 8V10H8V12.8H10.2V20H13.5Z" fill="currentColor" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">Facebook</span>
                <span className="mt-2 block text-lg text-[#0A0A0A]">GetBuild</span>
              </span>
              <span className="mt-5 flex items-center justify-between text-sm text-[#0EA5E9]">
                <span>Przejdź do profilu</span>
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
