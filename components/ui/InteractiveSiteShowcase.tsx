'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
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
      <span><i /><i /><i /></span>
      <em>anna-nieruchomosci.pl/{path}</em>
    </div>
  )
}

export default function InteractiveSiteShowcase() {
  const firstActRef = useRef<HTMLDivElement>(null)
  const secondActRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const firstPlayed = useRef(false)
  const secondPlayed = useRef(false)
  const [phase, setPhase] = useState(0)
  const [listing, setListing] = useState<Listing>(emptyListing)
  const [publishedListing, setPublishedListing] = useState<Listing>(demoListing)
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [visitorCount, setVisitorCount] = useState(0)
  const [manual, setManual] = useState(false)

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
    key: keyof T,
    value: string,
    start: number,
    pace = 38,
  ) => {
    Array.from(value).forEach((_, index) => {
      later(() => setter((current) => ({ ...current, [key]: value.slice(0, index + 1) })), start + index * pace)
    })
  }, [later])

  const startFirstAct = useCallback(() => {
    clearTimers()
    setManual(false)
    setPhase(1)
    setListing(emptyListing)
    setLead(emptyLead)
    setVisitorCount(0)

    later(() => setPhase(2), 520)
    typeField(setListing, 'city', demoListing.city, 820)
    typeField(setListing, 'district', demoListing.district, 1450)
    typeField(setListing, 'price', demoListing.price, 2180, 34)
    later(() => setPhase(3), 3040)
    later(() => {
      setPublishedListing(demoListing)
      setPhase(4)
    }, 3700)
    later(() => {
      setVisitorCount(1)
      setPhase(5)
    }, 4600)
  }, [clearTimers, later, typeField])

  const startSecondAct = useCallback(() => {
    if (secondPlayed.current || manual) return
    secondPlayed.current = true
    setPhase(6)
    later(() => setPhase(7), 900)
    later(() => setPhase(8), 2050)
    later(() => setPhase(9), 3300)
    typeField(setLead, 'name', demoLead.name, 3500)
    typeField(setLead, 'phone', demoLead.phone, 4020, 30)
    typeField(setLead, 'message', demoLead.message, 4600, 24)
    later(() => setPhase(10), 5850)
    later(() => setPhase(11), 6700)
  }, [later, manual, typeField])

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
    if (!second) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || phase < 5) return
      startSecondAct()
      observer.disconnect()
    }, { threshold: 0.28 })
    observer.observe(second)
    return () => observer.disconnect()
  }, [phase, startSecondAct])

  useEffect(() => () => clearTimers(), [clearTimers])

  const stopDemo = () => {
    clearTimers()
    firstPlayed.current = true
    secondPlayed.current = true
    setManual(true)
  }

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
    startFirstAct()
    firstActRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const location = [publishedListing.city, publishedListing.district].filter(Boolean).join(', ')

  return (
    <div className={s.story} data-phase={phase}>
      <div className={s.storyIntro}>
        <span>Jedna oferta. Jedna droga klienta.</span>
        <button type="button" onClick={replay}><PiArrowClockwiseBold /> Odtwórz</button>
      </div>

      <div ref={firstActRef} className={s.firstAct}>
        <div className={s.actCaption}>
          <span>01</span>
          <div><b>Publikujesz ofertę</b><small>Panel sam przenosi ją na stronę.</small></div>
        </div>

        <div className={s.screenPair}>
          <article className={s.adminScreen}>
            <BrowserBar path="panel" />
            <div className={s.adminNav}>
              <b>AN</b>
              <span>Oferty</span><span>Zapytania</span><span>Ustawienia</span>
              <button type="button" onClick={addListing}><PiPlusBold /> Dodaj</button>
            </div>
            <div className={s.adminBody}>
              {phase >= 2 && phase <= 3 ? (
                <form className={s.editor} onSubmit={publishListing} onFocusCapture={stopDemo}>
                  <strong>Nowa oferta</strong>
                  <div>
                    <label>Miasto<input aria-label="Miasto" value={listing.city} onChange={(event) => setListing({ ...listing, city: event.target.value })} placeholder="Warszawa" /></label>
                    <label>Dzielnica<input aria-label="Dzielnica" value={listing.district} onChange={(event) => setListing({ ...listing, district: event.target.value })} placeholder="Mokotów" /></label>
                  </div>
                  <label>Cena<input aria-label="Cena" value={listing.price} onChange={(event) => setListing({ ...listing, price: event.target.value })} placeholder="1 240 000 zł" /></label>
                  <span className={s.photoInput}><Image src="/mockup/listing-detail.jpg" alt="Nowoczesny apartament" width={78} height={54} /><small>apartament-mokotow.jpg</small><PiCheckBold /></span>
                  <button type="submit" disabled={!listing.city || !listing.price}>{phase === 3 ? 'Publikuję…' : 'Opublikuj'} <PiArrowRightBold /></button>
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
            <div className={s.liveNav}><b>ANNA <i>nieruchomości</i></b><span>Oferty</span><span>Kontakt</span></div>
            <div className={s.liveBody}>
              {phase < 4 ? (
                <div className={s.liveEmpty}><PiHouseLineBold /><span>Oferta pojawi się tutaj</span></div>
              ) : (
                <div className={s.liveListing}>
                  <div><Image src="/mockup/listing-detail.jpg" alt={`Apartament ${location}`} fill sizes="420px" /><em>Nowa oferta</em></div>
                  <span><small>{location}</small><b>{publishedListing.price}</b><p>74 m² · 3 pokoje · balkon</p></span>
                </div>
              )}
              {phase === 4 && <span className={s.saved}><PiCheckBold /> Oferta online w 0,8 s</span>}
              {visitorCount > 0 && <span className={s.visitor}><i /> Klientka właśnie ogląda ofertę</span>}
            </div>
          </article>
        </div>
      </div>

      <div ref={secondActRef} className={s.secondAct}>
        <div className={s.actCaption}>
          <span>02</span>
          <div><b>Oferta zamienia się w kontakt</b><small>AI odpowiada. Klientka zostawia numer.</small></div>
        </div>

        <div className={s.conversationFlow}>
          <article className={`${s.chatStage} ${phase >= 11 ? s.chatReady : ''}`}>
            <div className={s.chatStageHead}>
              <span className={s.aiMark}>AI</span>
              <div><b>Asystent Anny</b><small><i /> online</small></div>
              {phase >= 11 && <em>Teraz Ty</em>}
            </div>
            <div className={s.demoConversation} aria-live="polite">
              {phase < 11 && (
                <>
                  {phase >= 6 && <p className={s.messageUser}>Widzę nową ofertę na Mokotowie. Mogę dowiedzieć się więcej?</p>}
                  {phase === 7 && <span className={s.typing}><i /><i /><i /></span>}
                  {phase >= 8 && <p className={s.messageAi}>Jasne. To apartament 74 m² z balkonem. Cena: 1 240 000 zł.</p>}
                  {phase >= 9 && <p className={s.messageAi}>Najlepiej umówić prezentację. Zostaw kontakt obok.</p>}
                </>
              )}
            </div>
            {phase >= 11 && (
              <div className={s.liveAssistant}>
                <span className={s.readyCopy}><b>Sprawdź mnie</b><small>Zapytaj o wdrożenie na Twojej stronie.</small></span>
                <ChatWidget interactiveReady onUserInteraction={stopDemo} />
              </div>
            )}
          </article>

          <article className={`${s.leadStage} ${phase >= 11 ? s.leadComplete : ''}`}>
            <form onSubmit={submitLead} onFocusCapture={stopDemo}>
              <span>Umów prezentację</span>
              <label>Imię<input aria-label="Imię i nazwisko" value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} placeholder="Marta Nowak" /></label>
              <label>Telefon<input aria-label="Telefon" value={lead.phone} onChange={(event) => setLead({ ...lead, phone: event.target.value })} placeholder="+48 601 204 118" /></label>
              <label>Wiadomość<textarea aria-label="Wiadomość" rows={2} value={lead.message} onChange={(event) => setLead({ ...lead, message: event.target.value })} placeholder="Chcę zobaczyć mieszkanie…" /></label>
              <button type="submit" disabled={!lead.name || !lead.phone}>{phase === 10 ? 'Wysyłam…' : 'Wyślij'} <PiPaperPlaneTiltBold /></button>
            </form>
            <div className={s.mailPreview}>
              {phase < 11 ? <><PiEnvelopeSimpleBold /><span>Czekamy na kontakt</span></> : <><PiCheckBold /><span><b>Nowy kontakt: Marta Nowak</b><small>Prezentacja · {location}</small></span></>}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
