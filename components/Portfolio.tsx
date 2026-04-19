'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'Dormari.pl',
    title: 'Dormari.pl - E-commerce & AI Automation',
    href: 'https://dormari.pl',
    accent: 'rgba(0,180,216,0.4)',
    surface:
      'linear-gradient(145deg, rgba(11,25,54,0.96) 0%, rgba(3,10,26,0.92) 52%, rgba(0,18,38,0.88) 100%)',
    mockup: 'desktop' as const,
  },
  {
    name: 'PM-Apartments',
    title: 'PM-Apartments - Luxury Real Estate System',
    href: 'https://pm-apartments.pl',
    accent: 'rgba(0,180,216,0.28)',
    surface:
      'linear-gradient(145deg, rgba(8,18,40,0.98) 0%, rgba(4,9,24,0.94) 48%, rgba(11,31,52,0.9) 100%)',
    mockup: 'mobile' as const,
  },
]

function DesktopMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] [perspective:1800px]">
      <div className="absolute inset-x-[12%] top-[8%] h-40 rounded-full bg-[#00B4D8]/20 blur-[90px]" />
      <div className="absolute inset-x-[24%] bottom-[2%] h-20 rounded-full bg-[#00B4D8]/20 blur-[50px]" />
      <div
        className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#061123]/80 shadow-[0_35px_100px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)]"
        style={{
          transform: 'rotateX(12deg) rotateY(-16deg) rotateZ(4deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.14), transparent 40%)' }} />
        <div className="absolute inset-0 grain-overlay" />
        <div className="flex items-center gap-2 border-b border-white/8 px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#00B4D8]/60" />
          <div className="ml-4 h-8 w-40 rounded-full border border-white/8 bg-white/5" />
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="rounded-[22px] border border-white/8 bg-gradient-to-br from-[#12315f] via-[#0a2246] to-[#071224] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded-full bg-[#00B4D8]/70" />
                  <div className="h-7 w-40 rounded-full bg-white/90" />
                </div>
                <div className="rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#9cefff]">
                  AI Flow
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/8 bg-black/20 p-3">
                    <div className="mb-3 h-24 rounded-[14px] bg-gradient-to-br from-white/12 to-transparent" />
                    <div className="h-3 w-16 rounded-full bg-white/80" />
                    <div className="mt-2 h-2 w-11 rounded-full bg-white/30" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-5">
                <div className="mb-4 h-3 w-20 rounded-full bg-white/70" />
                <div className="space-y-3">
                  {[56, 72, 46].map((width) => (
                    <div key={width} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-2xl bg-[#00B4D8]/14" />
                      <div className="h-2.5 rounded-full bg-white/20" style={{ width: `${width}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-3 w-24 rounded-full bg-white/75" />
                  <div className="h-8 w-20 rounded-full bg-[#00B4D8]/14" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((item) => (
                    <div key={item} className="rounded-[18px] border border-white/8 bg-gradient-to-br from-white/10 to-transparent p-3">
                      <div className="h-16 rounded-[12px] bg-black/20" />
                      <div className="mt-3 h-2.5 w-14 rounded-full bg-white/70" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-[24px] border border-[#00B4D8]/16 bg-[#07101f]/90 p-5 shadow-[0_0_50px_rgba(0,180,216,0.12)]">
              <div className="mb-4 h-3 w-28 rounded-full bg-[#a7f0ff]" />
              <div className="space-y-3">
                {[72, 88, 64, 54].map((height, index) => (
                  <div key={index} className="rounded-[16px] border border-white/8 bg-white/[0.03] p-3">
                    <div className="rounded-[12px] bg-gradient-to-r from-[#00B4D8]/18 to-transparent" style={{ height }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-[#00B4D8]/18" />
                <div className="space-y-2">
                  <div className="h-2.5 w-16 rounded-full bg-white/80" />
                  <div className="h-2 w-10 rounded-full bg-white/30" />
                </div>
              </div>
              <div className="h-28 rounded-[18px] bg-gradient-to-br from-[#00B4D8]/16 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileMockup() {
  return (
    <div className="relative mx-auto flex w-full max-w-[620px] items-end justify-center gap-6">
      <div className="absolute left-1/2 top-[10%] h-44 w-44 -translate-x-1/2 rounded-full bg-[#00B4D8]/18 blur-[100px]" />
      <div className="relative hidden h-[340px] w-[190px] translate-y-8 rounded-[34px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:block">
        <div className="mb-4 h-28 rounded-[24px] bg-gradient-to-br from-[#18365f] to-[#0a1426]" />
        <div className="space-y-3">
          {[60, 85, 48].map((width) => (
            <div key={width} className="h-2.5 rounded-full bg-white/15" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
      <div
        className="relative w-full max-w-[280px] overflow-hidden rounded-[40px] border border-white/12 bg-[#07101f]/90 p-4 shadow-[0_30px_110px_rgba(0,0,0,0.55),0_0_80px_rgba(0,180,216,0.16)]"
        style={{ transform: 'rotateX(10deg) rotateY(-14deg) rotateZ(6deg)', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute inset-x-8 top-3 h-6 rounded-full bg-black/40" />
        <div className="rounded-[30px] border border-white/8 bg-gradient-to-b from-[#10274f] via-[#091527] to-[#06101f] p-4">
          <div className="mb-4 overflow-hidden rounded-[24px] border border-white/8">
            <div className="h-44 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_48%),linear-gradient(180deg,#24416b_0%,#0b1526_100%)] p-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[#d7f8ff]">
                <span>Sea View</span>
                <span>Suite</span>
              </div>
              <div className="mt-16 inline-flex rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/80">
                Premium Stay
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-2.5 w-16 rounded-full bg-[#8fefff]" />
                <div className="h-7 w-32 rounded-full bg-white/90" />
              </div>
              <div className="rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#b2f4ff]">
                4.9
              </div>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-3">
              <div className="grid grid-cols-3 gap-2">
                {['Check in', 'Guests', 'Nights'].map((label) => (
                  <div key={label} className="rounded-[16px] border border-white/8 bg-black/20 px-2 py-3">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-white/45">{label}</div>
                    <div className="mt-2 h-2.5 rounded-full bg-white/70" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-gradient-to-r from-[#00B4D8]/18 to-[#00B4D8]/6 p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-2.5 w-14 rounded-full bg-white/80" />
                  <div className="h-6 w-20 rounded-full bg-white" />
                </div>
                <div className="rounded-full bg-[#02101b] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#baf7ff]">
                  Book now
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
                  <div className="h-20 rounded-[16px] bg-gradient-to-br from-white/12 to-transparent" />
                  <div className="mt-3 h-2.5 w-14 rounded-full bg-white/75" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-[280px] w-[150px] -translate-y-4 rounded-[30px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:block">
        <div className="mb-3 h-20 rounded-[18px] bg-gradient-to-br from-[#1f3d67] to-[#0a1527]" />
        <div className="space-y-3">
          {[70, 52, 82, 46].map((width) => (
            <div key={width} className="h-2 rounded-full bg-white/15" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[number]
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[32px] border border-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease }}
      style={{
        background: project.surface,
        boxShadow: `0 24px 80px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px ${project.accent}`,
      }}
    >
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 12% 18%, rgba(0,180,216,0.14), transparent 36%), radial-gradient(circle at 84% 82%, rgba(0,180,216,0.12), transparent 32%)' }} />
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute inset-[1px] rounded-[31px] border border-[#00B4D8]/25 opacity-70 shadow-[0_0_40px_rgba(0,180,216,0.18)] transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid min-h-[560px] gap-10 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center lg:px-10 lg:py-10">
        <div className={`order-2 ${index === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
          {project.mockup === 'desktop' ? <DesktopMockup /> : <MobileMockup />}
        </div>
        <div className={`order-1 flex h-full flex-col justify-between ${index === 1 ? 'lg:order-1' : 'lg:order-2'} lg:pl-2`}>
          <div>
            <span className="inline-flex rounded-full border border-[#00B4D8]/25 bg-[#00B4D8]/8 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#86ecff]">
              Selected Work
            </span>
            <h3 className="mt-6 max-w-[10ch] font-sans text-[clamp(34px,4.2vw,58px)] font-bold leading-[0.95] tracking-[-0.05em] text-[#F8FAFC]">
              {project.title}
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#9ab4d3] sm:text-base">
              Premium interface system built for conversion, motion clarity and a polished product feel.
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between gap-4">
            <div className="text-xs uppercase tracking-[0.28em] text-white/35">{project.name}</div>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex translate-y-3 items-center gap-2 rounded-full border border-[#00B4D8]/30 bg-[#06101d]/80 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#d9faff] opacity-0 backdrop-blur-xl transition-[transform,opacity,border-color,background-color] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 hover:border-[#00B4D8]/60 hover:bg-[#082132]"
            >
              View Project
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative overflow-hidden bg-[#020617] px-6 py-28 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,180,216,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,180,216,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 grain-drift opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="inline-flex rounded-full border border-[#00B4D8]/20 bg-[#00B4D8]/8 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[#8fefff]">
            Selected Works
          </span>
          <h2 className="mt-6 font-sans text-[clamp(42px,6vw,78px)] font-bold tracking-[-0.06em] text-[#F8FAFC]">
            Minimal systems with premium depth.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#8da9c8] sm:text-base">
            Two production-focused interfaces designed to feel sharp, quiet and unmistakably high-end.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
