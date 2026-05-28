'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const items = [
  { name: 'PM Apartments', href: 'https://pm-apartments.pl/', img: '/portfolio/pm-apartments-preview.webp' },
  { name: 'Dorimari', href: 'https://dorimari.pl', img: '/portfolio/dorimari-preview.webp' },
  { name: 'MS Design Studio', href: 'https://msdesignstudio.pl/', img: '/portfolio/msdesignstudio-preview.webp' },
  { name: 'Getbuild.pl', href: 'https://getbuild.pl/', img: '/portfolio/getbuild-preview.webp' },
]

export default function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-white px-5 pb-8 sm:pb-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="mb-6 text-[15px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]"
        >
          Ostatnie realizacje:
        </motion.p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-black/[0.07] bg-neutral-50 transition-[box-shadow] duration-200 hover:shadow-[0_8px_28px_rgba(0,85,255,0.1)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[12px] font-semibold text-[#0A0A0A]">{item.name}</span>
                <ArrowUpRight size={14} className="text-[#9CA3AF] transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0055FF]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
