'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
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
    <section ref={ref} className="px-5 pb-8 sm:pb-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C879B]"
        >
          Ostatnie realizacje
        </motion.p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#161C28] transition-[box-shadow,transform] duration-200 hover:shadow-[0_4px_16px_rgba(34,211,238,0.18),0_8px_28px_rgba(34,211,238,0.12)]"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[12px] font-semibold text-[#EAF0F7]">{item.name}</span>
                <ArrowUpRight size={14} className="text-[#7C879B] transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#22D3EE]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
