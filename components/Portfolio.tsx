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
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60"
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.14, ease }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-neutral-300" />
            <span className="h-3 w-3 rounded-full bg-neutral-200" />
            <span className="h-3 w-3 rounded-full bg-neutral-100" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
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
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#0EA5E9]">
              {project.description}
            </div>
            <h3 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.04em] text-[#0A0A0A]">
              {project.name}
            </h3>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-[#6B7280] transition-[border-color,background,color] duration-300 group-hover:border-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white">
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
    <motion.section
      id="portfolio"
      ref={ref}
      className="section-shell overflow-hidden bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
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
    </motion.section>
  )
}
