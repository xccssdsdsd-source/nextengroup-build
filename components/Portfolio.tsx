'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'Dorimari.pl',
    href: 'https://dorimari.pl',
    description: 'sklep premium',
    preview: '/portfolio/dorimari-preview.webp',
  },
  {
    name: 'PM-Apartments',
    href: 'https://pm-apartments.pl/',
    description: 'apartamenty premium',
    preview: '/portfolio/pm-apartments-preview.webp',
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
      className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-all duration-300"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.14, ease }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
    >
      <div className="p-5 pb-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400 truncate">
            {project.href.replace('https://', '')}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-50">
          <Image
            src={project.preview}
            alt={`${project.name} - ${project.description}`}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            loading="eager"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-black/[0.05] px-6 py-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#0055FF]">
            {project.description}
          </div>
          <h3 className="mt-1 text-[1.5rem] font-bold tracking-[-0.04em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>
            {project.name}
          </h3>
        </div>
        <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color,transform] duration-300 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(0,85,255,0.3)]">
          <ArrowUpRight size={17} strokeWidth={2} />
        </span>
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
      className="section-shell overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(0,85,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(0,85,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Nasze realizacje</span>
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
