'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  PiArrowClockwiseBold,
  PiArrowRightBold,
  PiCheckBold,
  PiEnvelopeSimpleBold,
  PiHouseLineBold,
  PiPaperPlaneTiltBold,
  PiPlusBold,
} from 'react-icons/pi'
import ChatWidget from '@/components/ChatWidget'
import s from './InteractiveSiteShowcase.module.css'

type Listing = {
  city: string
  district: string
  price: string
}

type Lead = {
  name: string
  phone: string
  message: string
}

type FieldKey = keyof Listing | keyof Lead

const emptyListing: Listing = { city: '', district: '', price: '' }
const demoListing: Listing = { city: 'Warszawa', district: 'Mokotów', price: '1 240 000 zł' }
const emptyLead: Lead = { name: '', phone: '', message: '' }
const demoLead: Lead = {
  name: 'Marta Nowak',
  phone: '+48 601 204 118',
  message: 'Chcę zobaczyć mieszkanie w sobotę.',
}

function BrowserBar({ path }: { path: string }) {
  return (
    <div className={s.browserBar} aria-hidden="true">
      <em>anna-nieruchomosci.pl/{path}</em>
    </div>
  )
}

type DemoFieldProps = {
  label: string
  value: string
  placeholder: string
  typing: boolean
  multiline?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  onChange: (value: string) => void
}

// The autoplay types into these fields, and text that grows with no caret and no
// active-field ring reads as a video rather than a panel. The caret layer mirrors
// the value in transparent text so the bar lands exactly after the last glyph
// without measuring anything — and nothing ever steals the visitor's keyboard.
function DemoField({ label, value, placeholder, typing, multiline, inputRef, onChange }: DemoFieldProps) {
  return (
    <label>
      {label}
      <span className={s.fieldBox}>
        {multiline ? (
          <textarea
            aria-label={label}
            rows={2}
            value={value}
            placeholder={placeholder}
            data-typing={typing || undefined}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            ref={inputRef}
            aria-label={label}
            value={value}
            placeholder={placeholder}
            data-typing={typing || undefined}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        {typing ? (
          <span className={`${s.caretLayer} ${multiline ? s.caretLayerMulti : s.caretLayerSingle}`} aria-hidden="true">
            <span>{value}</span>
            <i />
          </span>
        ) : null}
      </span>
    </label>
  )
}

export default function InteractiveSiteShowcase() {
  const storyRef = useRef<HTMLDivElement>(null)
  const firstActRef = useRef<HTMLDivElement>(null)
  const secondActRef = useRef<HTMLDivElement>(null)
  const addBtnRef = useRef<HTMLButtonElement>(null)
  const publishBtnRef = useRef<HTMLButtonElement>(null)
  const sendBtnRef = useRef<HTMLButtonElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const districtRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const timers = useRef<number[]>([])
  const firstPlayed = useRef(false)
  const secondPlayed = useRef(false)

  const [phase, setPhase] = useState(0)
  const [listing, setListing] = useState<Listing>(emptyListing)
  const [publishedListing, setPublishedListing] = useState<Listing>(demoListing)
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [visitorCount, setVisitorCount] = useState(0)
  const [manual, setManual] = useState(false)
  const [typing, setTyping] = useState<FieldKey | null>(null)
  const [pressed, setPressed] = useState<'add' | 'publish' | 'send' | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, tap: false, act: 1 })

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }, [])

  const later = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay)
    timers.current.push(id)
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
    later(() => setTyping((current) => (current === key ? null : current)), start + value.length * pace + 260)
  }, [later])

  // The cursor is placed against the story box, so one element can serve both
  // acts; remounting it on the act change stops it from flying the whole gap.
  // `edge` parks the pointer just inside a field the way a real one rests after
  // a click — nudged below the text line so the arrow never covers the glyphs
  // it is supposed to be producing.
  const moveCursor = useCallback((target: HTMLElement | null, act: number, edge = false) => {
    const stage = storyRef.current
    if (!stage || !target) return
    const box = stage.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    setCursor({
      x: rect.left - box.left + (edge ? Math.min(30, rect.width * 0.34) : rect.width / 2),
      y: rect.top - box.top + rect.height / 2 + (edge ? 9 : 0),
      on: true,
      tap: false,
      act,
    })
  }, [])

  const tapCursor = useCallback((target: 'add' | 'publish' | 'send') => {
    setCursor((current) => ({ ...current, tap: true }))
    setPressed(target)
    later(() => setCursor((current) => ({ ...current, tap: false })), 150)
    later(() => setPressed(null), 210)
  }, [later])

  const hideCursor = useCallback(() => {
    setCursor((current) => ({ ...current, on: false, tap: false }))
  }, [])

  const startFirstAct = useCallback(() => {
    clearTimers()
    setManual(false)
    setPhase(1)
    setListing(emptyListing)
    setLead(emptyLead)
    setVisitorCount(0)
    setTyping(null)

    // Every state change downstream is caused by something the visitor can see:
    // the pointer arrives, the button goes down, and only then does the panel move.
    later(() => moveCursor(addBtnRef.current, 1), 240)
    later(() => tapCursor('add'), 760)
    later(() => setPhase(2), 880)
    later(() => moveCursor(cityRef.current, 1, true), 1020)
    typeField(setListing, 'city', demoListing.city, 1200)
    later(() => moveCursor(districtRef.current, 1, true), 1600)
    typeField(setListing, 'district', demoListing.district, 1740)
    later(() => moveCursor(priceRef.current, 1, true), 2100)
    typeField(setListing, 'price', demoListing.price, 2240, 34)
    later(() => moveCursor(publishBtnRef.current, 1), 2780)
    later(() => tapCursor('publish'), 3210)
    later(() => setPhase(3), 3320)
    later(hideCursor, 3420)
    later(() => {
      setPublishedListing(demoListing)
      setPhase(4)
    }, 3980)
    later(() => {
      setVisitorCount(1)
      setPhase(5)
    }, 5320)
  }, [clearTimers, hideCursor, later, moveCursor, tapCursor, typeField])

  const startSecondAct = useCallback(() => {
    if (secondPlayed.current || manual) return
    secondPlayed.current = true
    setPhase(6)
    later(() => setPhase(7), 900)
    later(() => setPhase(8), 2050)
    later(() => setPhase(9), 3300)
    later(() => moveCursor(nameRef.current, 2, true), 3380)
    typeField(setLead, 'name', demoLead.name, 3560)
    later(() => moveCursor(phoneRef.current, 2, true), 4060)
    typeField(setLead, 'phone', demoLead.phone, 4200, 30)
    later(() => setTyping('message'), 4760)
    typeField(setLead, 'message', demoLead.message, 4880, 24)
    later(() => moveCursor(sendBtnRef.current, 2), 5820)
    later(() => tapCursor('send'), 6220)
    later(() => setPhase(10), 6330)
    later(hideCursor, 6420)
    later(() => setPhase(11), 7060)
  }, [hideCursor, later, manual, moveCursor, tapCursor, typeField])

  useEffect(() => {
    const first = firstActRef.current
    if (!first) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setListing(demoListing)
      setPublishedListing(demoListing)
      setLead(demoLead)
      setVisitorCount(1)
      setPhase(11)
      firstPlayed.current = true
      secondPlayed.current = true
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || firstPlayed.current) return
      firstPlayed.current = true
      startFirstAct()
      observer.disconnect()
    }, { threshold: 0.32 })
    observer.observe(first)
    return () => observer.disconnect()
  }, [startFirstAct])

  useEffect(() => {
    const second = secondActRef.current
    if (!second || phase < 5 || secondPlayed.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      startSecondAct()
      observer.disconnect()
    }, { threshold: 0.28 })
    observer.observe(second)
    return () => observer.disconnect()
  }, [phase, startSecondAct])

  useEffect(() => () => clearTimers(), [clearTimers])

  const stopDemo = useCallback(() => {
    clearTimers()
    firstPlayed.current = true
    secondPlayed.current = true
    setManual(true)
    setTyping(null)
    setPressed(null)
    hideCursor()
  }, [clearTimers, hideCursor])

  const addListing = () => {
    stopDemo()
    setPhase(2)
    setListing(emptyListing)
  }

  const publishListing = (event: FormEvent) => {
    event.preventDefault()
    if (!listing.city || !listing.price) return
    stopDemo()
    setPublishedListing({ ...listing })
    setPhase(3)
    later(() => setPhase(4), 520)
    later(() => { setVisitorCount(1); setPhase(5) }, 1050)
  }

  const submitLead = (event: FormEvent) => {
    event.preventDefault()
    if (!lead.name || !lead.phone) return
    stopDemo()
    setPhase(10)
    later(() => setPhase(11), 620)
  }

  const replay = () => {
    firstPlayed.current = true
    secondPlayed.current = false
    firstActRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    later(startFirstAct, 260)
  }

  const location = [publishedListing.city, publishedListing.district].filter(Boolean).join(', ')
  const editing = phase >= 2 && phase <= 3

  const cursorLayer: ReactNode = (
    <span
      key={cursor.act}
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
  )

  return (
    <div ref={storyRef} className={s.story} data-phase={phase}>
      {cursorLayer}

      <div className={s.storyIntro}>
        <div className={s.storyPath} aria-label="Od oferty do kontaktu">
          <span><i>1</i> Dodajesz</span>
          <PiArrowRightBold aria-hidden="true" />
          <span><i>2</i> Publikujesz</span>
          <PiArrowRightBold aria-hidden="true" />
          <span><i>3</i> Pozyskujesz kontakt</span>
        </div>
        <button type="button" onClick={replay}><PiArrowClockwiseBold /> Odtwórz</button>
      </div>

      <div ref={firstActRef} className={s.firstAct}>
        <div className={s.actCaption}>
          <span>01</span>
          <div><b>Dodajesz raz</b><small>Oferta od razu trafia na Twoją stronę.</small></div>
        </div>

        <div className={s.screenPair}>
          <article className={s.adminScreen}>
            <BrowserBar path="panel" />
            <div className={s.adminNav}>
              <b>AN</b>
              <span>Oferty</span>
              <button type="button" ref={addBtnRef} data-press={pressed === 'add' || undefined} onClick={addListing}><PiPlusBold /> Dodaj</button>
            </div>
            <div className={s.adminBody}>
              {editing ? (
                <form className={s.editor} onSubmit={publishListing} onFocusCapture={stopDemo}>
                  <strong>Nowa oferta</strong>
                  <div>
                    <DemoField label="Miasto" placeholder="Warszawa" value={listing.city} typing={typing === 'city'} inputRef={cityRef} onChange={(city) => setListing({ ...listing, city })} />
                    <DemoField label="Dzielnica" placeholder="Mokotów" value={listing.district} typing={typing === 'district'} inputRef={districtRef} onChange={(district) => setListing({ ...listing, district })} />
                  </div>
                  <DemoField label="Cena" placeholder="1 240 000 zł" value={listing.price} typing={typing === 'price'} inputRef={priceRef} onChange={(price) => setListing({ ...listing, price })} />
                  <span className={s.photoInput}><Image src="/mockup/listing-detail.jpg" alt="Nowoczesny apartament" width={78} height={54} /><small>Zdjęcie dodane</small><PiCheckBold /></span>
                  <button type="submit" ref={publishBtnRef} data-press={pressed === 'publish' || undefined} disabled={!listing.city || !listing.price}>{phase === 3 ? 'Publikuję…' : 'Opublikuj'} <PiArrowRightBold /></button>
                </form>
              ) : (
                <div className={s.singleRow}>
                  <Image src="/mockup/listing-detail.jpg" alt="" width={70} height={54} />
                  <span><b>{phase >= 4 ? location : 'Brak ofert'}</b><small>{phase >= 4 ? publishedListing.price : 'Kliknij „Dodaj”'}</small></span>
                  {phase >= 4 && <em>Aktywna</em>}
                </div>
              )}
            </div>
          </article>

          <div className={s.transfer} aria-hidden="true"><i /><PiArrowRightBold /></div>

          <article className={s.liveScreen}>
            <BrowserBar path="oferty" />
            <div className={s.liveNav}><b>ANNA <i>nieruchomości</i></b><span>Podgląd strony</span></div>
            <div className={s.liveBody}>
              {phase < 4 ? (
                <div className={s.liveEmpty}><PiHouseLineBold /><span>Oferta pojawi się tutaj</span></div>
              ) : (
                <div className={s.liveListing}>
                  <div><Image src="/mockup/listing-detail.jpg" alt={`Apartament ${location}`} fill sizes="420px" /><em>Nowa oferta</em></div>
                  <span><small>{location}</small><b>{publishedListing.price}</b><p>74 m² · 3 pokoje · balkon</p></span>
                </div>
              )}
              {phase >= 4 && phase <= 5 && <span className={s.saved} data-out={phase === 5 || undefined}><PiCheckBold /> Opublikowano w 0,8 s</span>}
              {visitorCount > 0 && <span className={s.visitor}><i /> 1 osoba ogląda teraz</span>}
            </div>
          </article>
        </div>
      </div>

      <div ref={secondActRef} className={s.secondAct}>
        <div className={s.actCaption}>
          <span>02</span>
          <div><b>Strona pracuje za Ciebie</b><small>AI odpowiada. Kontakt trafia do Ciebie.</small></div>
        </div>

        <div className={s.conversationFlow}>
          <article className={`${s.chatStage} ${phase >= 11 ? s.chatReady : ''}`}>
            <div className={s.chatStageHead}>
              <span className={s.aiMark}><Image src="/getbuild-logo.webp" alt="" width={36} height={36} /></span>
              <div><b>Asystent Anny</b><small><i /> online</small></div>
            </div>
            <div className={s.demoConversation} aria-live="polite">
              {phase < 11 && (
                <>
                  {phase >= 6 && <p className={s.messageUser}>Czy mogę zobaczyć ofertę na Mokotowie?</p>}
                  {phase === 7 && <span className={s.typing}><i /><i /><i /></span>}
                  {phase >= 8 && <p className={s.messageAi}>Tak. 74 m², balkon, 1 240 000 zł.</p>}
                  {phase >= 9 && <p className={s.messageAi}>Zostaw numer — umówimy prezentację.</p>}
                </>
              )}
            </div>
            {phase >= 11 && (
              <div className={s.liveAssistant}>
                <span className={s.readyCopy}><b>Teraz zapytaj mnie</b><small>O wdrożenie AI na Twojej stronie.</small></span>
                <ChatWidget interactiveReady onUserInteraction={stopDemo} />
              </div>
            )}
          </article>

          <article className={`${s.leadStage} ${phase >= 11 ? s.leadComplete : ''}`}>
            <form onSubmit={submitLead} onFocusCapture={stopDemo}>
              <span>Zarezerwuj prezentację</span>
              <DemoField label="Imię" placeholder="Marta Nowak" value={lead.name} typing={typing === 'name'} inputRef={nameRef} onChange={(name) => setLead({ ...lead, name })} />
              <DemoField label="Telefon" placeholder="+48 601 204 118" value={lead.phone} typing={typing === 'phone'} inputRef={phoneRef} onChange={(phone) => setLead({ ...lead, phone })} />
              <DemoField label="Wiadomość" placeholder="Chcę zobaczyć mieszkanie…" value={lead.message} typing={typing === 'message'} multiline onChange={(message) => setLead({ ...lead, message })} />
              <button type="submit" ref={sendBtnRef} data-press={pressed === 'send' || undefined} disabled={!lead.name || !lead.phone}>{phase === 10 ? 'Wysyłam…' : 'Wyślij'} <PiPaperPlaneTiltBold /></button>
            </form>
            <div className={s.mailPreview}>
              {phase < 11 ? (
                <><PiEnvelopeSimpleBold /><span>Kontakt pojawi się tutaj</span></>
              ) : (
                <><PiCheckBold /><span><b>Kontakt zapisany</b><small>Marta · {location}</small><em>Trafia na Twój e-mail i do panelu.</em></span></>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
