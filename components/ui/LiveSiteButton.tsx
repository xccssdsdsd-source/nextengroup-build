'use client'

import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type LiveSiteButtonProps = {
  href: string
  label?: string
  className?: string
}

export default function LiveSiteButton({ href, label = 'Zobacz stronę na żywo', className = '' }: LiveSiteButtonProps) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0D0D0D] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_20px_rgba(13,13,13,0.22)] ${className}`}
      style={{ fontFamily: 'var(--font-syne)' }}
    >
      {/* Automatic shine sweep that loops periodically */}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ x: '-150%' }}
        animate={{ x: ['-150%', '150%'] }}
        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 3.6, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)' }}
      />
      <span className="relative z-10">{label}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={2.6}
        className="relative z-10 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </m.a>
  )
}
