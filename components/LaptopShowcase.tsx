'use client'

import { motion } from 'framer-motion'

type LaptopShowcaseProps = {
  trigger: number
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function LaptopShowcase({ trigger }: LaptopShowcaseProps) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[920px] items-center justify-center">
      <div className="pointer-events-none absolute inset-x-[8%] top-[8%] h-32 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.28),rgba(26,111,255,0.10)_38%,transparent_72%)] blur-3xl" />

      <div className="pointer-events-none absolute left-[10%] top-[13%] h-28 w-28 rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-xl">
        <div className="m-4 h-3 rounded-full bg-white/15" />
        <div className="mx-4 mt-5 grid grid-cols-2 gap-3">
          <div className="h-10 rounded-2xl bg-cyan-300/40" />
          <div className="h-10 rounded-2xl bg-blue-400/25" />
          <div className="col-span-2 h-8 rounded-2xl bg-white/10" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[16%] right-[6%] h-36 w-32 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] backdrop-blur-xl">
        <div className="mx-5 mt-5 flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <div className="mx-5 mt-5 space-y-3">
          <div className="h-14 rounded-[22px] bg-white/10" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 rounded-2xl bg-blue-400/30" />
            <div className="h-8 rounded-2xl bg-white/10" />
            <div className="h-8 rounded-2xl bg-cyan-300/30" />
          </div>
        </div>
      </div>

      <motion.div
        key={trigger}
        className="relative w-full max-w-[780px]"
        initial={{ opacity: 0, rotateX: 22, rotateY: -14, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, rotateX: 10, rotateY: -8, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        style={{ transformStyle: 'preserve-3d', perspective: 2200 }}
      >
        <div className="absolute inset-x-[8%] bottom-[-8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(26,111,255,0.38),rgba(0,212,255,0.14)_45%,transparent_72%)] blur-2xl" />

        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="relative mx-auto aspect-[16/10] w-full rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#152438_0%,#09111d_50%,#050912_100%)] p-4 shadow-[0_45px_120px_rgba(0,0,0,0.5)]"
            initial={{ rotateX: 80 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.12, ease }}
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
          >
            <div className="relative h-full rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="absolute left-1/2 top-2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
              <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_top_left,rgba(143,239,255,0.12),transparent_26%),radial-gradient(circle_at_75%_30%,rgba(26,111,255,0.18),transparent_32%)]" />
              <div className="absolute inset-[8%] rounded-[20px] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(3,10,18,0.72),rgba(6,17,31,0.92))]">
                <div className="grid h-full grid-cols-[84px_1fr] gap-3 p-3">
                  <div className="rounded-[18px] border border-white/6 bg-white/[0.045] p-3">
                    <div className="space-y-2">
                      <div className="h-10 rounded-2xl bg-[linear-gradient(180deg,rgba(0,212,255,0.34),rgba(26,111,255,0.22))]" />
                      <div className="h-10 rounded-2xl bg-white/10" />
                      <div className="h-10 rounded-2xl bg-white/10" />
                      <div className="h-20 rounded-[22px] bg-white/6" />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-[1.1fr_0.72fr] gap-3">
                      <div className="rounded-[20px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3">
                        <div className="flex gap-2">
                          <div className="h-3 w-16 rounded-full bg-white/15" />
                          <div className="h-3 w-10 rounded-full bg-cyan-200/25" />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="h-20 rounded-[20px] bg-[linear-gradient(180deg,rgba(0,212,255,0.5),rgba(26,111,255,0.14))]" />
                          <div className="h-20 rounded-[20px] bg-white/8" />
                          <div className="h-20 rounded-[20px] bg-white/8" />
                        </div>
                      </div>
                      <div className="rounded-[20px] border border-white/6 bg-white/[0.045] p-3">
                        <div className="h-3 w-14 rounded-full bg-white/15" />
                        <div className="mt-4 h-[110px] rounded-[22px] bg-[linear-gradient(180deg,rgba(26,111,255,0.48),rgba(0,212,255,0.18))]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.05fr_0.95fr] gap-3">
                      <div className="rounded-[20px] border border-white/6 bg-white/[0.045] p-3">
                        <div className="flex gap-2">
                          <div className="h-3 w-20 rounded-full bg-white/15" />
                          <div className="h-3 w-8 rounded-full bg-white/10" />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="h-28 rounded-[22px] bg-white/8" />
                          <div className="grid gap-2">
                            <div className="h-[52px] rounded-[18px] bg-cyan-300/18" />
                            <div className="h-[52px] rounded-[18px] bg-white/8" />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[20px] border border-white/6 bg-white/[0.045] p-3">
                        <div className="h-3 w-16 rounded-full bg-white/15" />
                        <div className="mt-4 grid gap-2">
                          <div className="h-11 rounded-[18px] bg-white/9" />
                          <div className="h-11 rounded-[18px] bg-[linear-gradient(90deg,rgba(0,212,255,0.28),rgba(26,111,255,0.16))]" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-12 rounded-[16px] bg-white/8" />
                            <div className="h-12 rounded-[16px] bg-cyan-300/20" />
                            <div className="h-12 rounded-[16px] bg-white/8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative mx-auto -mt-3 h-[26px] w-[108%] rounded-b-[32px] rounded-t-[14px] border border-white/10 bg-[linear-gradient(180deg,#b8c4d8_0%,#7f8ea5_24%,#384658_56%,#172030_100%)] shadow-[0_28px_60px_rgba(0,0,0,0.38)]">
            <div className="absolute left-1/2 top-1.5 h-1.5 w-20 -translate-x-1/2 rounded-full bg-[#d8e1ef]/70" />
            <div className="absolute inset-x-[14%] bottom-[-12px] h-5 rounded-b-[24px] bg-[linear-gradient(180deg,#708099,#1a2332)] blur-[1px]" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
