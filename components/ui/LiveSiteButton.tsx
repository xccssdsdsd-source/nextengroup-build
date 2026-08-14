'use client'

import { m } from 'framer-motion'
import { PiArrowUpRightBold } from 'react-icons/pi'

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
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#fff] shadow-[var(--shadow-brand)] transition-colors duration-200 hover:bg-[var(--brand-hover)] ${className}`}
      style={{ fontFamily: 'var(--font-heading)' }}
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
      <PiArrowUpRightBold
        size={16}
        className="relative z-10 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </m.a>
  )
}

