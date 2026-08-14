'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import {
  PiArrowClockwiseBold,
  PiArrowRightBold,
  PiBellRingingBold,
  PiCheckBold,
  PiEyeBold,
  PiPaperPlaneTiltBold,
  PiPhoneBold,
  PiPlusBold,
} from 'react-icons/pi'
import ChatWidget from '@/components/ChatWidget'
import s from './InteractiveSiteShowcase.module.css'

type Listing = { city: string; district: string; price: string }
type Lead = { name: string; phone: string }
type FieldKey = keyof Listing | keyof Lead

const emptyListing: Listing = { city: '', district: '', price: '' }
const demoListing: Listing = { city: 'Warszawa', district: 'Mokotów', price: '1 240 000 zł' }
const emptyLead: Lead = { name: '', phone: '' }
const demoLead: Lead = { name: 'Marta Nowak', phone: '+48 601 204 118' }

const visitors = [
  { initials: 'MN', tone: 'a' },
  { initials: 'PK', tone: 'b' },
  { initials: 'JW', tone: 'c' },
  { initials: 'AS', tone: 'd' },
  { initials: 'TL', tone: 'e' },
]

// One story, five stops. The step is the only source of truth; every screen
// below reads it, so autoplay and a click on the stepper cannot disagree.
const scenes = [
  { label: 'Dodajesz ofertę', title: 'Dodajesz ofertę w panelu', sub: 'Trzy pola i zdjęcie. Bez kodu, bez czekania na kogokolwiek.', rest: 8 },
  { label: 'Klient ją widzi', title: 'Oferta jest już na Twojej stronie', sub: 'W tej chwili ogląda ją pięć osób. Jedną z nich jest Marta.', rest: 11 },
  { label: 'Agent odpowiada', title: 'Marta pyta. Agent AI odpowiada', sub: 'Zna Twoje oferty, więc odpowiada konkretem — o każdej porze.', rest: 18 },
  { label: 'Masz kontakt', title: 'Marta zostawia numer', sub: 'Zgłoszenie trafia do Ciebie, zanim zdąży napisać do konkurencji.', rest: 24 },
  { label: 'Twoja kolej', title: 'Teraz Twoja kolej', sub: 'Ten sam agent, tylko już nasz. Zapytaj go o wdrożenie u siebie.', rest: 25 },
] as const

const SCENE_OF_STEP = (step: number) => {
  if (step >= 25) return 4
  if (step >= 19) return 3
  if (step >= 12) return 2
  if (step >= 9) return 1
  return 0
}

type DemoFieldProps = {
  label: string
  value: string
  placeholder: string
  typing: boolean
  inputRef?: React.Ref<HTMLInputElement>
  onChange: (value: string) => void
}

// The caret layer repeats the value in transparent text so the bar lands after
// the last glyph without measuring anything — and without stealing the keyboard.
function DemoField({ label, value, placeholder, typing, inputRef, onChange }: DemoFieldProps) {
  return (
    <label>
      {label}
      <span className={s.fieldBox}>
        <input
          ref={inputRef}
          aria-label={label}
          value={value}
          placeholder={placeholder}
          data-typing={typing || undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        {typing ? (
          <span className={s.caretLayer} aria-hidden="true"><span>{value}</span><i /></span>
        ) : null}
      </span>
    </label>
  )
}

export default function InteractiveSiteShowcase() {
  const storyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const addBtnRef = useRef<HTMLButtonElement>(null)
  const publishBtnRef = useRef<HTMLButtonElement>(null)
  const askBtnRef = useRef<HTMLButtonElement>(null)
  const sendBtnRef = useRef<HTMLButtonElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const districtRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const timers = useRef<number[]>([])
  const played = useRef(false)

  const [step, setStep] = useState(0)
  const [listing, setListing] = useState<Listing>(emptyListing)
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [typing, setTyping] = useState<FieldKey | null>(null)
  const [pressed, setPressed] = useState<string | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, tap: false })

  const scene = SCENE_OF_STEP(step)

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }, [])

  const later = useCallback((callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay))
  }, [])

  const typeField = useCallback(<T extends Listing | Lead>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T & FieldKey,
    value: string,
    start: number,
    pace = 38,
  ) => {
    later(() => setTyping(key), start - 60)
    Array.from(value).forEach((_, index) => {
      later(() => setter((current) => ({ ...current, [key]: value.slice(0, index + 1) })), start + index * pace)
    })
    later(() => setTyping((current) => (current === key ? null : current)), start + value.length * pace + 240)
  }, [later])

  const moveCursor = useCallback((target: HTMLElement | null, edge = false) => {
    const stage = storyRef.current
    if (!stage || !target) return
    const box = stage.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    setCursor({
      x: rect.left - box.left + (edge ? Math.min(30, rect.width * 0.34) : rect.width / 2),
      y: rect.top - box.top + rect.height / 2 + (edge ? 9 : 0),
      on: true,
      tap: false,
    })
  }, [])

  const tapCursor = useCallback((target: string) => {
    setCursor((current) => ({ ...current, tap: true }))
    setPressed(target)
    later(() => setCursor((current) => ({ ...current, tap: false })), 150)
    later(() => setPressed(null), 210)
  }, [later])

  const hideCursor = useCallback(() => setCursor((current) => ({ ...current, on: false, tap: false })), [])

  const play = useCallback(() => {
    clearTimers()
    setStep(1)
    setListing(emptyListing)
    setLead(emptyLead)
    setTyping(null)

    const at = (time: number, run: () => void) => later(run, time)

    at(240, () => moveCursor(addBtnRef.current))
    at(720, () => tapCursor('add'))
    at(840, () => setStep(2))
    at(980, () => moveCursor(cityRef.current, true))
    typeField(setListing, 'city', demoListing.city, 1160)
    at(1520, () => { setStep(3); moveCursor(districtRef.current, true) })
    typeField(setListing, 'district', demoListing.district, 1700)
    at(2020, () => { setStep(4); moveCursor(priceRef.current, true) })
    typeField(setListing, 'price', demoListing.price, 2200, 34)
    at(2740, () => { setStep(5); moveCursor(publishBtnRef.current) })
    at(3160, () => tapCursor('publish'))
    at(3270, () => setStep(7))
    at(3360, hideCursor)
    at(3900, () => setStep(8))

    at(4900, () => setStep(9))
    at(5800, () => setStep(10))
    at(6700, () => setStep(11))

    at(7500, () => setStep(12))
    at(8300, () => setStep(13))
    at(9100, () => setStep(14))
    at(10200, () => setStep(15))
    at(11600, () => setStep(16))
    at(12600, () => setStep(17))
    at(13300, () => { setStep(18); moveCursor(askBtnRef.current) })
    at(13900, () => tapCursor('ask'))
    at(14020, () => setStep(19))
    at(14180, () => moveCursor(nameRef.current, true))
    typeField(setLead, 'name', demoLead.name, 14360)
    at(14860, () => { setStep(20); moveCursor(phoneRef.current, true) })
    typeField(setLead, 'phone', demoLead.phone, 15040, 30)
    at(15680, () => { setStep(21); moveCursor(sendBtnRef.current) })
    at(16100, () => tapCursor('send'))
    at(16210, () => setStep(22))
    at(16300, hideCursor)
    at(16900, () => setStep(23))
    at(17600, () => setStep(24))
    at(19000, () => setStep(25))
  }, [clearTimers, hideCursor, later, moveCursor, tapCursor, typeField])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    // Without motion the story cannot play itself, so it rests on its opening
    // frame and the stepper becomes the way through it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setListing(demoListing)
      setStep(8)
      played.current = true
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played.current) return
      played.current = true
      play()
      observer.disconnect()
    }, { threshold: 0.28 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [play])

  useEffect(() => () => clearTimers(), [clearTimers])

  const stop = useCallback(() => {
    clearTimers()
    played.current = true
    setTyping(null)
    setPressed(null)
    hideCursor()
  }, [clearTimers, hideCursor])

  const jumpTo = (index: number) => {
    stop()
    const target = scenes[index].rest
    setListing(target >= 5 ? demoListing : emptyListing)
    setLead(target >= 22 ? demoLead : emptyLead)
    setStep(target)
  }

  const replay = () => {
    played.current = true
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    later(play, 260)
  }

  const addListing = () => { stop(); setStep(2); setListing(emptyListing) }

  const publishListing = (event: FormEvent) => {
    event.preventDefault()
    if (!listing.city || !listing.price) return
    stop()
    setStep(7)
    later(() => setStep(8), 520)
    later(() => setStep(9), 1100)
    later(() => setStep(11), 1900)
  }

  const submitLead = (event: FormEvent) => {
    event.preventDefault()
    if (!lead.name || !lead.phone) return
    stop()
    setStep(22)
    later(() => setStep(23), 560)
    later(() => setStep(24), 1200)
  }

  const location = [demoListing.city, demoListing.district].filter(Boolean).join(', ')
  const editing = step >= 2 && step <= 7
  const shownVisitors = step >= 10 ? 5 : 0

  return (
    <div ref={storyRef} className={s.story} data-step={step} data-scene={scene}>
      <span
        className={s.cursor}
        data-on={cursor.on || undefined}
        data-tap={cursor.tap || undefined}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 22" fill="none">
          <path d="M2 1.4 17.2 12.1h-7.05l-3.2 7.6z" fill="#fff" stroke="#101b2d" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <i />
      </span>

      <div className={s.head}>
        <ol className={s.stepper}>
          {scenes.map((sc, i) => (
            <li key={sc.label} data-state={scene > i ? 'done' : scene === i ? 'now' : 'next'}>
              <button type="button" onClick={() => jumpTo(i)}>
                <i>{scene > i ? <PiCheckBold size={11} /> : i + 1}</i>
                {sc.label}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className={s.replay} onClick={replay}><PiArrowClockwiseBold /> Odtwórz</button>
      </div>

      <p className={s.caption} key={scene}>
        <b>{scenes[scene].title}</b>
        <span>{scenes[scene].sub}</span>
      </p>

      <div ref={stageRef} className={s.stage}>
        <article className={s.adminCard} data-active={scene === 0 || undefined}>
          <div className={s.chrome}><em>Twój panel</em></div>
          <div className={s.adminNav}>
            <b>AN</b>
            <span>Twoje oferty</span>
            <button type="button" ref={addBtnRef} data-press={pressed === 'add' || undefined} onClick={addListing}>
              <PiPlusBold /> Dodaj ofertę
            </button>
          </div>
          <div className={s.adminBody}>
            {editing ? (
              <form className={s.editor} onSubmit={publishListing} onFocusCapture={stop}>
                <strong>Nowa oferta</strong>
                <div className={s.editorRow}>
                  <DemoField label="Miasto" placeholder="Warszawa" value={listing.city} typing={typing === 'city'} inputRef={cityRef} onChange={(city) => setListing({ ...listing, city })} />
                  <DemoField label="Dzielnica" placeholder="Mokotów" value={listing.district} typing={typing === 'district'} inputRef={districtRef} onChange={(district) => setListing({ ...listing, district })} />
                </div>
                <DemoField label="Cena" placeholder="1 240 000 zł" value={listing.price} typing={typing === 'price'} inputRef={priceRef} onChange={(price) => setListing({ ...listing, price })} />
                <span className={s.photoInput}>
                  <Image src="/mockup/listing-detail.jpg" alt="Nowoczesny apartament" width={92} height={62} />
                  <small>apartament-mokotow.jpg<b>Zdjęcie dodane</b></small>
                  <PiCheckBold />
                </span>
                <button type="submit" ref={publishBtnRef} data-press={pressed === 'publish' || undefined} disabled={!listing.city || !listing.price}>
                  {step === 7 ? 'Publikuję…' : 'Opublikuj'} <PiArrowRightBold />
                </button>
              </form>
            ) : (
              <div className={s.emptyRow}>
                <Image src="/mockup/listing-detail.jpg" alt="" width={92} height={66} />
                <span><b>{step >= 8 ? location : 'Brak ofert'}</b><small>{step >= 8 ? demoListing.price : 'Kliknij „Dodaj ofertę”'}</small></span>
                {step >= 8 && <em>Aktywna</em>}
              </div>
            )}
            {step === 8 && <span className={s.published}><PiCheckBold /> Opublikowano w 0,8 s</span>}
          </div>
        </article>

        <article className={s.siteCard} data-active={scene >= 1 || undefined} data-live={scene === 4 || undefined}>
          <div className={s.chrome}><em>Twoja strona — to widzi klient</em></div>
          <div className={s.siteNav}><b>ANNA <i>nieruchomości</i></b><span>Oferty · O mnie · Kontakt</span></div>
          <div className={s.siteBody}>
            <div className={s.siteMedia}>
              <Image src="/mockup/listing-detail.jpg" alt={`Apartament ${location}`} fill sizes="(max-width: 900px) 100vw, 640px" />
              <em>Nowa oferta</em>
            </div>
            <div className={s.siteInfo}>
              <small>{location}</small>
              <b>{demoListing.price}</b>
              <p>74 m² · 3 pokoje · balkon 8 m² · garaż podziemny</p>
              <span className={s.siteCta}>Zapytaj o tę ofertę</span>
            </div>

            <div className={s.visitorBar} data-on={shownVisitors > 0 || undefined}>
              <span className={s.avatars}>
                {visitors.map((v, i) => (
                  <i key={v.initials} data-tone={v.tone} data-me={i === 0 && step >= 11 ? 'true' : undefined} style={{ transitionDelay: `${i * 70}ms` }}>{v.initials}</i>
                ))}
              </span>
              <span className={s.visitorText}>
                <PiEyeBold size={13} />
                {step >= 11 ? <>Marta ogląda tę ofertę<b>i jeszcze 4 osoby</b></> : <>5 osób ogląda tę ofertę<b>teraz</b></>}
              </span>
            </div>
          </div>

          <div className={s.dock} data-on={step >= 12 || undefined}>
            <div className={s.dockHead}>
              <span className={s.dockMark}><Image src="/getbuild-logo.webp" alt="" width={34} height={34} /></span>
              <div>
                <b>{scene === 4 ? 'Agent Getbuild' : 'Asystent Anny'}</b>
                <small><i /> {scene === 4 ? 'zapytaj go, o co chcesz' : 'odpowiada od razu'}</small>
              </div>
            </div>

            {scene < 4 ? (
              <>
                <div className={s.thread} aria-live="polite">
                  {step >= 12 && <p className={s.fromAi}>Cześć, jestem asystentem Anny. Znam wszystkie jej oferty — o co chcesz zapytać?</p>}
                  {step >= 13 && <p className={s.fromUser}>Czy ten apartament na Mokotowie ma balkon i garaż?</p>}
                  {step === 14 && <span className={s.dots}><i /><i /><i /></span>}
                  {step >= 15 && (
                    <div className={s.fromAi}>
                      <p>Tak — balkon 8 m² od strony południowej i miejsce w garażu podziemnym w cenie.</p>
                      <span className={s.specCard}>
                        <Image src="/mockup/listing-detail.jpg" alt="" width={64} height={52} />
                        <span>
                          <b>{location}</b>
                          <small>74 m² · 3 pokoje · 2. piętro</small>
                          <em>1 240 000 zł</em>
                        </span>
                      </span>
                    </div>
                  )}
                  {step >= 16 && <p className={s.fromAi}>Chcesz, żeby Anna oddzwoniła i pokazała Ci je na żywo?</p>}
                  {step >= 17 && <p className={s.fromUser}>Tak, poproszę</p>}
                </div>

                {step >= 18 && step < 19 && (
                  <button type="button" ref={askBtnRef} className={s.askBtn} data-press={pressed === 'ask' || undefined} onClick={() => { stop(); setStep(19) }}>
                    <PiPhoneBold size={15} /> Zostaw numer do kontaktu
                  </button>
                )}

                {step >= 19 && step < 23 && (
                  <form className={s.leadForm} onSubmit={submitLead} onFocusCapture={stop}>
                    <DemoField label="Imię" placeholder="Marta Nowak" value={lead.name} typing={typing === 'name'} inputRef={nameRef} onChange={(name) => setLead({ ...lead, name })} />
                    <DemoField label="Telefon" placeholder="+48 601 204 118" value={lead.phone} typing={typing === 'phone'} inputRef={phoneRef} onChange={(phone) => setLead({ ...lead, phone })} />
                    <button type="submit" ref={sendBtnRef} data-press={pressed === 'send' || undefined} disabled={!lead.name || !lead.phone}>
                      {step === 22 ? 'Wysyłam…' : 'Wyślij'} <PiPaperPlaneTiltBold />
                    </button>
                  </form>
                )}

                {step >= 23 && (
                  <div className={s.dockDone}>
                    <span><PiCheckBold size={18} /></span>
                    <b>Zapytanie wysłane</b>
                    <small>Anna odezwie się do Marty w ciągu godziny.</small>
                  </div>
                )}
              </>
            ) : (
              <div className={s.liveAssistant}>
                <ChatWidget interactiveReady onUserInteraction={stop} />
              </div>
            )}
          </div>

          <div className={s.leadToast} data-on={step >= 24 && scene < 4 ? 'true' : undefined}>
            <span><PiBellRingingBold size={15} /></span>
            <div>
              <b>Nowy kontakt w panelu</b>
              <small>Marta Nowak · +48 601 204 118</small>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
