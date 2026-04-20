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
    accent: 'rgba(0,180,216,0.32)',
    preview: '/portfolio/dorimari-preview.webp',
  },
  {
    name: 'PM-Apartments',
    href: 'https://pm-apartments.pl/',
    description: 'apartamenty premium',
    accent: 'rgba(201,169,110,0.3)',
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
      className="group relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(152deg,rgba(10,22,50,0.95),rgba(3,9,20,0.98))] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1),0_40px_100px_rgba(0,0,0,0.44),0_0_60px_rgba(0,80,180,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-white/18 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.16),0_60px_120px_rgba(0,0,0,0.5),0_0_80px_rgba(0,100,220,0.1)]"
      initial={{ opacity: 0, y: 56, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.14, ease }}
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
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#020817]">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(2,8,23,0)_0%,rgba(2,8,23,0.08)_62%,rgba(2,8,23,0.42)_100%)]" />
          <Image
            src={project.preview}
            alt={`${project.name} - ${project.description}`}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            quality={82}
          />
        </div>

        <div className="mt-4 flex items-end justify-between gap-4 px-1">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#7f98b8]">
              {project.description}
            </div>
            <h3 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.04em] text-white">
              {project.name}
            </h3>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-[border-color,background,transform,color] duration-300 group-hover:border-[#00d4ff]/36 group-hover:bg-[linear-gradient(135deg,rgba(0,212,255,0.14),rgba(0,100,220,0.07))] group-hover:text-[#9ff3ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
