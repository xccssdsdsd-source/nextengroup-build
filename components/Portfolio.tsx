'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'Dorimari.pl',
    href: 'https://dorimari.pl',
    description: 'sklep premium',
    accent: 'rgba(0,180,216,0.32)',
    preview: '/portfolio/dorimari-preview.png',
  },
  {
    name: 'PM-Apartments',
    href: 'https://pm-apartments.pl/',
    description: 'apartamenty premium',
    accent: 'rgba(201,169,110,0.3)',
    preview: '/portfolio/pm-apartments-preview.png',
  },
] as const

function ProjectPreview({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[number]
  index: number
  inView: boolean
}) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,18,38,0.96),rgba(3,9,20,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 12% 14%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 84% 86%, rgba(0,180,216,0.14), transparent 28%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[29px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}` }}
      />

      <div className="relative p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-white/85" />
            <span className="h-3 w-3 rounded-full bg-white/25" />
            <span className="h-3 w-3 rounded-full bg-white/12" />
          </div>
          <div className="truncate rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/45">
            {project.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#020817]">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(2,8,23,0)_0%,rgba(2,8,23,0.08)_62%,rgba(2,8,23,0.42)_100%)]" />
          <img
            src={project.preview}
            alt={project.name}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex items-end justify-between gap-4 px-1">
          <div>
            <h3 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.04em] text-white">
              {project.name}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-[0.22em] text-white/50">
              {project.description}
            </p>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07] group-hover:text-white">
            <ArrowUpRight size={18} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      id="portfolio"
      ref={ref}
      className="section-shell overflow-hidden bg-[#020617]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,180,216,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,180,216,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 grain-drift opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Realizacje</span>
          <h2 className="section-title">Dwa różne brandy, ten sam porządek i ten sam poziom dopracowania.</h2>
          <p className="section-copy">
            Pokazujemy tylko to, co rzeczywiście wspiera sprzedaż: klarowną strukturę,
            mocniejszą prezentację oferty i estetykę premium.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectPreview
              key={project.name}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
