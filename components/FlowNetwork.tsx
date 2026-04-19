'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Bot, ChartNoAxesColumn, CheckCircle2, FileText, Globe, Mail, MessageSquareText, PhoneCall, Sparkles } from 'lucide-react'

const tasks = [
  {
    source: 'Klient',
    sourceDetail: 'Formularz z nowej strony',
    title: 'Prośba o ofertę na stronę i automatyzację',
    brief: 'Branża premium, szybki kontakt, zależy na leadach z kampanii.',
    tags: ['WWW', 'Lead', 'Automatyzacja'],
    actions: [
      { label: 'Strona ofertowa', detail: 'Makieta i sekcje sprzedażowe', icon: Globe, color: '#00d4ff' },
      { label: 'Follow-up AI', detail: 'Odpowiedź i kwalifikacja leada', icon: Bot, color: '#7c83ff' },
      { label: 'CRM i status', detail: 'Lead wpada do pipeline', icon: ChartNoAxesColumn, color: '#22c55e' },
    ],
    result: 'Klient dostaje szybką odpowiedź, zespół widzi lead w systemie i może domknąć sprzedaż.',
  },
  {
    source: 'Klient',
    sourceDetail: 'Wiadomość z kampanii reklamowej',
    title: 'Pytanie o wolny termin i wycenę',
    brief: 'Lead z reklamy potrzebuje odpowiedzi w ciągu kilku minut.',
    tags: ['Ads', 'Termin', 'Oferta'],
    actions: [
      { label: 'Odpowiedź AI', detail: 'Wysyłka pierwszej wiadomości', icon: Mail, color: '#00d4ff' },
      { label: 'Zbieranie danych', detail: 'Formularz i priorytet klienta', icon: FileText, color: '#7c83ff' },
      { label: 'Telefon handlowca', detail: 'Powiadomienie do zespołu', icon: PhoneCall, color: '#22c55e' },
    ],
    result: 'Lead nie stygnie, a handlowiec dostaje gotowy kontekst do rozmowy.',
  },
  {
    source: 'Klient',
    sourceDetail: 'Zapytanie z czatu na stronie',
    title: 'Klient chce umówić demo lub konsultację',
    brief: 'System ma przejąć pierwsze pytania i skierować do właściwej ścieżki.',
    tags: ['Chat', 'Demo', 'AI'],
    actions: [
      { label: 'Chatbot AI', detail: 'Obsługa pytań 24/7', icon: MessageSquareText, color: '#00d4ff' },
      { label: 'Segmentacja', detail: 'Dobór ścieżki i priorytetu', icon: Sparkles, color: '#7c83ff' },
      { label: 'Booking', detail: 'Termin spotkania i przypomnienie', icon: CheckCircle2, color: '#22c55e' },
    ],
    result: 'Klient przechodzi przez proces bez czekania, a Ty dostajesz gotowe spotkanie.',
  },
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function FlowNetwork() {
  const [activeTask, setActiveTask] = useState(0)
  const currentTask = useMemo(() => tasks[activeTask], [activeTask])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTask(prev => (prev + 1) % tasks.length)
    }, 3600)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="relative h-full overflow-hidden rounded-[28px] border border-white/10"
      style={{
        background: 'linear-gradient(180deg, rgba(5,14,34,0.94) 0%, rgba(2,8,19,0.98) 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 100px rgba(0,0,0,0.54), 0 0 100px rgba(0,212,255,0.08)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 15% 20%, rgba(0,212,255,0.12), transparent 34%), radial-gradient(circle at 85% 18%, rgba(124,131,255,0.16), transparent 30%), radial-gradient(circle at 50% 100%, rgba(34,197,94,0.1), transparent 32%)',
        }}
      />

      <div className="relative flex h-full flex-col gap-5 p-4 sm:p-5">
        <div className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#4a6080]">Task Router</div>
            <div className="mt-1 font-barlow text-lg uppercase tracking-[0.08em] text-[#e8f0ff]">Klient {'->'} System {'->'} Wynik</div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#8be8ff]">
            <span className="h-2 w-2 rounded-full bg-[#00d4ff]" />
            Live Flow
          </div>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[1.05fr_0.88fr]">
          <div className="grid gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTask.title}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                className="grid gap-4"
              >
                <div className="rounded-[24px] border border-[#00d4ff]/14 bg-[linear-gradient(135deg,rgba(0,212,255,0.12),rgba(255,255,255,0.03))] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-[#8be8ff]">{currentTask.source}</div>
                      <div className="mt-1 text-sm text-[#7ea0c8]">{currentTask.sourceDetail}</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#b7c7de]">
                      Nowe zadanie
                    </div>
                  </div>
                  <div className="mt-4 text-xl font-semibold leading-tight text-[#f3f7ff]">{currentTask.title}</div>
                  <div className="mt-3 text-sm leading-6 text-[#8fa7c9]">{currentTask.brief}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentTask.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#c5d6ee]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.26em] text-[#4a6080]">NG Engine</div>
                      <div className="mt-1 text-base font-semibold text-[#eff5ff]">System rozbija zadanie na gotowe akcje</div>
                    </div>
                    <div className="rounded-full border border-[#7c83ff]/20 bg-[#7c83ff]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#c6c8ff]">
                      AI Active
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {currentTask.actions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <motion.div
                          key={action.label}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.38, delay: 0.1 + index * 0.08, ease }}
                          className="relative overflow-hidden rounded-[18px] border border-white/8 bg-[#07111f]/90 p-3"
                        >
                          <div
                            className="absolute inset-y-0 left-0 w-[3px]"
                            style={{ background: action.color }}
                          />
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
                              style={{
                                background: `${action.color}16`,
                                borderColor: `${action.color}3a`,
                                boxShadow: `0 0 24px ${action.color}18`,
                              }}
                            >
                              <Icon size={18} color={action.color} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-[#f5f8ff]">{action.label}</div>
                              <div className="mt-1 text-sm text-[#86a0c2]">{action.detail}</div>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#b5c9e7]">
                              <span className="h-2 w-2 rounded-full" style={{ background: action.color }} />
                              Run
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#4a6080]">Flow Preview</div>
              <div className="mt-3 grid gap-3">
                {['Zapytanie wpada', 'System analizuje', 'Akcje odpalone', 'Zespół dostaje wynik'].map((step, index) => (
                  <div key={step} className="relative flex items-center gap-3 rounded-[18px] border border-white/8 bg-[#081220]/90 px-3 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-[#e8f0ff]">
                      0{index + 1}
                    </div>
                    <div className="flex-1 text-sm text-[#c8d8ef]">{step}</div>
                    <ArrowRight size={16} className="text-[#4a6080]" />
                    {index < 3 && (
                      <motion.div
                        className="absolute -bottom-3 left-4 right-4 h-px"
                        style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255,0.6), rgba(0,212,255,0))' }}
                        animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.72, 1, 0.72] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#22c55e]/14 bg-[linear-gradient(160deg,rgba(34,197,94,0.12),rgba(255,255,255,0.03))] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#77e7a5]">Outcome</div>
                  <div className="mt-1 text-base font-semibold text-[#f5fbf7]">Co widzisz po wdrożeniu</div>
                </div>
                <div className="rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#b5f5ca]">
                  Finalized
                </div>
              </div>

              <div className="mt-4 rounded-[20px] border border-white/8 bg-[#07141a]/80 p-4 text-sm leading-6 text-[#daf4e1]">
                {currentTask.result}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ['Lead', 'w CRM'],
                  ['Odpowiedź', '< 5 min'],
                  ['Proces', 'bez ręcznego chaosu'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[18px] border border-white/8 bg-white/[0.04] px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#7fb694]">{k}</div>
                    <div className="mt-1 text-sm font-semibold text-[#f2fff6]">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#4a6080]">Queue</div>
              <div className="mt-3 space-y-2">
                {tasks.map((task, index) => (
                  <button
                    key={task.title}
                    type="button"
                    onClick={() => setActiveTask(index)}
                    className="flex w-full items-center justify-between rounded-[16px] border px-3 py-2.5 text-left transition-colors duration-200"
                    style={{
                      borderColor: activeTask === index ? 'rgba(0,212,255,0.28)' : 'rgba(255,255,255,0.08)',
                      background: activeTask === index ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div>
                      <div className="text-sm font-medium text-[#edf4ff]">{task.title}</div>
                      <div className="mt-1 text-xs text-[#7892b8]">{task.sourceDetail}</div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8ecfff]">
                      {activeTask === index ? 'Active' : 'Ready'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
