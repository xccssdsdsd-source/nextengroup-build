'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import {
  PiArrowClockwiseBold,
  PiArrowRightBold,
  PiBuildingsBold,
  PiCalendarCheckBold,
  PiChatCircleDotsBold,
  PiCheckBold,
  PiClockBold,
  PiEnvelopeSimpleBold,
  PiEyeBold,
  PiHouseLineBold,
  PiMapPinBold,
  PiPaperPlaneTiltBold,
  PiPlusBold,
  PiSparkleBold,
  PiTrashBold,
  PiXBold,
} from 'react-icons/pi'
import ChatWidget from '@/components/ChatWidget'
import s from './InteractiveSiteShowcase.module.css'

type Draft = {
  city: string
  district: string
  price: string
  area: string
  rooms: string
}

type Lead = {
  name: string
  phone: string
  message: string
}

const emptyDraft: Draft = { city: '', district: '', price: '', area: '', rooms: '' }
const demoDraft: Draft = { city: 'Warszawa', district: 'Mokotów', price: '1 240 000 zł', area: '74 m²', rooms: '3 pokoje' }
const emptyLead: Lead = { name: '', phone: '', message: '' }
const demoLead: Lead = { name: 'Marta Nowak', phone: '+48 601 204 118', message: 'Czy mogę obejrzeć apartament w sobotę?' }

const storySteps = [
  { icon: PiBuildingsBold, label: 'Dodajesz ofertę' },
  { icon: PiHouseLineBold, label: 'Oferta jest online' },
  { icon: PiChatCircleDotsBold, label: 'AI odpowiada' },
  { icon: PiEnvelopeSimpleBold, label: 'Otrzymujesz lead' },
]

const existingOffers = [
  { id: 1, place: 'Gdynia, Orłowo', price: '1 890 000 zł', image: '/mockup/listing-orlowo.jpg' },
  { id: 2, place: 'Gdańsk, Oliwa', price: '3 120 000 zł', image: '/mockup/listing-oliwa.jpg' },
]

function DemoCursor({ className }: { className: string }) {
  return (
    <span className={`${s.cursor} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 28" fill="none">
        <path d="M2 1.5v21l5.4-5.2 3.8 8.8 4.2-1.9-3.8-8.5 7.8-.1L2 1.5Z" fill="white" stroke="#071023" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <i />
    </span>
  )
}

function BrowserBar({ path }: { path: string }) {
  return (
    <div className={s.browserBar} aria-hidden="true">
      <span className={s.browserDots}><i /><i /><i /></span>
      <span className={s.address}><b>●</b> anna-nieruchomosci.pl/{path}</span>
      <span className={s.browserMenu}>•••</span>
    </div>
  )
}

export default function InteractiveSiteShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const chatCardRef = useRef<HTMLElement>(null)
  const tourTimers = useRef<number[]>([])
  const actionTimers = useRef<number[]>([])
  const played = useRef(false)
  const continuationStarted = useRef(false)
  const [tourStep, setTourStep] = useState(0)
  const [storyRun, setStoryRun] = useState(0)
  const [touring, setTouring] = useState(false)
  const [chatCardVisible, setChatCardVisible] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [publishedOffer, setPublishedOffer] = useState<Draft>(demoDraft)
  const [visibleOfferIds, setVisibleOfferIds] = useState(() => existingOffers.map((offer) => offer.id))
  const [offerOpen, setOfferOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [siteFilter, setSiteFilter] = useState<'all' | 'apartments' | 'houses'>('all')
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [deliveredLead, setDeliveredLead] = useState<Lead>(demoLead)
  const [selectedTime, setSelectedTime] = useState<'Sobota 12:00' | 'Inny termin'>('Sobota 12:00')
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent'>('idle')

  const clearTourTimers = useCallback(() => {
    tourTimers.current.forEach(window.clearTimeout)
    tourTimers.current = []
  }, [])

  const later = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay)
    tourTimers.current.push(id)
  }, [])

  const clearActionTimers = useCallback(() => {
    actionTimers.current.forEach(window.clearTimeout)
    actionTimers.current = []
  }, [])

  const actionLater = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay)
    actionTimers.current.push(id)
  }, [])

  const stopTour = useCallback(() => {
    played.current = true
    clearTourTimers()
    setTouring(false)
  }, [clearTourTimers])

  const typeDraft = useCallback((key: keyof Draft, value: string, start: number, pace = 48) => {
    Array.from(value).forEach((_, index) => {
      later(() => setDraft((current) => ({ ...current, [key]: value.slice(0, index + 1) })), start + index * pace)
    })
  }, [later])

  const typeLead = useCallback((key: keyof Lead, value: string, start: number, pace = 40) => {
    Array.from(value).forEach((_, index) => {
      later(() => setLead((current) => ({ ...current, [key]: value.slice(0, index + 1) })), start + index * pace)
    })
  }, [later])

  const playStory = useCallback(() => {
    clearTourTimers()
    clearActionTimers()
    played.current = true
    continuationStarted.current = false
    setTouring(true)
    setStoryRun((current) => current + 1)
    setTourStep(0)
    setEditorOpen(false)
    setDraft(emptyDraft)
    setPublishing(false)
    setPublished(false)
    setPublishedOffer(demoDraft)
    setVisibleOfferIds(existingOffers.map((offer) => offer.id))
    setOfferOpen(false)
    setFavorite(false)
    setSiteFilter('all')
    setLead(emptyLead)
    setDeliveredLead(demoLead)
    setSelectedTime('Sobota 12:00')
    setLeadState('idle')

    later(() => setTourStep(1), 420)
    later(() => setEditorOpen(true), 1050)
    later(() => setTourStep(2), 1250)
    typeDraft('city', demoDraft.city, 1450)
    typeDraft('district', demoDraft.district, 2050)
    typeDraft('price', demoDraft.price, 2600, 38)
    later(() => setDraft((current) => ({ ...current, area: demoDraft.area, rooms: demoDraft.rooms })), 3220)
    later(() => { setTourStep(3); setPublishing(true) }, 3720)
    later(() => {
      setPublishing(false)
      setPublished(true)
      setPublishedOffer(demoDraft)
      setEditorOpen(false)
      setTourStep(4)
    }, 4480)
    later(() => { setTourStep(5); setOfferOpen(true) }, 5680)
  }, [clearActionTimers, clearTourTimers, later, typeDraft])

  const continueStory = useCallback(() => {
    if (continuationStarted.current) return
    continuationStarted.current = true
    later(() => setTourStep(6), 400)
    later(() => setTourStep(7), 1200)
    later(() => setTourStep(8), 2400)
    later(() => setTourStep(9), 3600)
    typeLead('name', demoLead.name, 3850)
    typeLead('phone', demoLead.phone, 4420, 32)
    typeLead('message', demoLead.message, 5000, 24)
    later(() => { setTourStep(10); setLeadState('sending') }, 6350)
    later(() => {
      setDeliveredLead(demoLead)
      setTourStep(11)
      setLeadState('sent')
      setTouring(false)
    }, 7300)
  }, [later, typeLead])

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played.current) return
      played.current = true
      later(playStory, 500)
      observer.disconnect()
    }, { threshold: 0.2 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [later, playStory])

  useEffect(() => {
    const card = chatCardRef.current
    if (!card) return
    const observer = new IntersectionObserver(([entry]) => setChatCardVisible(entry.isIntersecting), { threshold: 0.32 })
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (touring && tourStep === 5 && chatCardVisible) continueStory()
  }, [chatCardVisible, continueStory, tourStep, touring])

  useEffect(() => () => {
    clearTourTimers()
    clearActionTimers()
  }, [clearActionTimers, clearTourTimers])

  const activeStoryStep = tourStep === 0 ? 0 : tourStep <= 3 ? 1 : tourStep <= 5 ? 2 : tourStep <= 8 ? 3 : 4

  const openEditor = () => {
    stopTour()
    setEditorOpen(true)
    setDraft(emptyDraft)
    setTourStep(2)
  }

  const publishOffer = (event: FormEvent) => {
    event.preventDefault()
    if (!draft.city || !draft.price || publishing) return
    const offer = { ...draft }
    stopTour()
    setPublishing(true)
    setTourStep(3)
    actionLater(() => {
      setPublishing(false)
      setPublished(true)
      setPublishedOffer(offer)
      setEditorOpen(false)
      setTourStep(4)
    }, 760)
  }

  const removeOffer = () => {
    stopTour()
    setPublished(false)
    setOfferOpen(false)
    setTourStep(0)
  }

  const removeExistingOffer = (id: number) => {
    stopTour()
    setVisibleOfferIds((current) => current.filter((offerId) => offerId !== id))
  }

  const openOffer = () => {
    stopTour()
    setOfferOpen(true)
    setTourStep(5)
  }

  const submitLead = (event: FormEvent) => {
    event.preventDefault()
    if (!lead.name || !lead.phone || leadState === 'sending') return
    const sentLead = { ...lead }
    stopTour()
    setTourStep(10)
    setLeadState('sending')
    actionLater(() => {
      setDeliveredLead(sentLead)
      setTourStep(11)
      setLeadState('sent')
    }, 900)
  }

  const offerLocation = [publishedOffer.city, publishedOffer.district].filter(Boolean).join(', ')

  return (
    <div ref={rootRef} className={s.story} data-progress={activeStoryStep}>
      <div className={s.storyTop}>
        <div className={s.storyRail} aria-label="Przepływ klienta od oferty do zapytania">
          {storySteps.map(({ icon: Icon, label }, index) => {
            const number = index + 1
            const done = activeStoryStep > number || (number === 4 && leadState === 'sent')
            const active = activeStoryStep === number
            return (
              <span key={label} className={`${s.railStep} ${done ? s.railDone : ''} ${active ? s.railActive : ''}`}>
                <i>{done ? <PiCheckBold /> : <Icon />}</i>
                <b>0{number}</b>
                <em>{label}</em>
              </span>
            )
          })}
        </div>
        <button type="button" className={s.replay} onClick={playStory} disabled={touring}>
          <PiArrowClockwiseBold aria-hidden="true" />
          {touring ? 'Historia trwa…' : 'Odtwórz całość'}
        </button>
      </div>

      <div className={s.grid}>
        <article className={`${s.card} ${s.panelCard} ${activeStoryStep === 1 ? s.cardActive : ''}`}>
          <header className={s.cardHead}>
            <div><span>01 · Panel ofert</span><h3>Dodajesz. Bez programisty.</h3></div>
            <span className={s.cardState}>{published ? <><PiCheckBold /> Opublikowana</> : 'Twój panel'}</span>
          </header>

          <div className={s.panelWindow}>
            <BrowserBar path="panel/oferty" />
            <div className={s.panelToolbar}>
              <span><i>AN</i><b>Twoje oferty</b></span>
              <button type="button" onClick={openEditor}>
                <PiPlusBold /> Dodaj ofertę
                {touring && tourStep === 1 && <DemoCursor className={s.cursorOnButton} />}
              </button>
            </div>

            {editorOpen ? (
              <form className={s.offerEditor} onSubmit={publishOffer} onFocusCapture={stopTour}>
                <div className={s.editorTitle}>
                  <span><b>Nowa oferta</b><small>Podstawowe informacje</small></span>
                  <button type="button" aria-label="Zamknij formularz" onClick={() => { stopTour(); setEditorOpen(false) }}><PiXBold /></button>
                </div>
                <div className={s.editorGrid}>
                  <label className={s.cursorAnchor}>Miasto<input required value={draft.city} onChange={(event) => { stopTour(); setDraft({ ...draft, city: event.target.value }) }} placeholder="np. Warszawa" />{touring && tourStep === 2 && <DemoCursor className={s.cursorOnField} />}</label>
                  <label>Dzielnica<input value={draft.district} onChange={(event) => { stopTour(); setDraft({ ...draft, district: event.target.value }) }} placeholder="np. Mokotów" /></label>
                  <label>Cena<input required value={draft.price} onChange={(event) => { stopTour(); setDraft({ ...draft, price: event.target.value }) }} placeholder="1 240 000 zł" /></label>
                  <label>Powierzchnia<input value={draft.area} onChange={(event) => { stopTour(); setDraft({ ...draft, area: event.target.value }) }} placeholder="74 m²" /></label>
                </div>
                <div className={s.editorMedia}>
                  <Image src="/mockup/listing-detail.jpg" alt="Podgląd dodawanego apartamentu" width={120} height={76} />
                  <span><b>Zdjęcie główne</b><small>apartament-mokotow.jpg · 1,8 MB</small></span>
                  <PiCheckBold />
                </div>
                <button className={s.publishButton} type="submit" disabled={!draft.city || !draft.price || publishing}>
                  {publishing ? <><i /> Publikuję…</> : <>Opublikuj ofertę <PiArrowRightBold /></>}
                  {touring && tourStep === 3 && <DemoCursor className={s.cursorOnPublish} />}
                </button>
              </form>
            ) : (
              <div className={s.panelRows}>
                {published && (
                  <div className={`${s.panelRow} ${s.newPanelRow}`}>
                    <Image src="/mockup/listing-detail.jpg" alt="" width={70} height={50} />
                    <span><b>{offerLocation}</b><small>Apartament · {publishedOffer.area || '74 m²'} · {publishedOffer.rooms || '3 pokoje'}</small></span>
                    <strong>{publishedOffer.price}</strong>
                    <em>Aktywna</em>
                    <button type="button" aria-label="Usuń nową ofertę" onClick={removeOffer}><PiTrashBold /></button>
                  </div>
                )}
                {existingOffers.filter((offer) => visibleOfferIds.includes(offer.id)).map((offer) => (
                  <div className={s.panelRow} key={offer.id}>
                    <Image src={offer.image} alt="" width={70} height={50} />
                    <span><b>{offer.place}</b><small>Dom · 4 pokoje</small></span>
                    <strong>{offer.price}</strong>
                    <em>Aktywna</em>
                    <button type="button" aria-label={`Usuń ofertę ${offer.place}`} onClick={() => removeExistingOffer(offer.id)}><PiTrashBold /></button>
                  </div>
                ))}
                {!published && visibleOfferIds.length === 0 && <span className={s.emptyPanel}>Brak ofert. Dodaj pierwszą nieruchomość.</span>}
              </div>
            )}

            {published && tourStep === 4 && <span className={s.publishToast}><PiCheckBold /> Oferta online w <b>0,8 s</b></span>}
          </div>
        </article>

        <article className={`${s.card} ${s.siteCard} ${activeStoryStep === 2 ? s.cardActive : ''}`}>
          <header className={s.cardHead}>
            <div><span>02 · Strona agenta</span><h3>Klient widzi ją od razu.</h3></div>
            <span className={s.cardState}>{published ? <><i className={s.liveDot} /> Online</> : 'Widok klienta'}</span>
          </header>

          <div className={s.siteWindow}>
            <BrowserBar path="oferty" />
            <nav className={s.siteNav}><b>ANNA <i>nieruchomości</i></b><span>Oferty</span><span>O mnie</span><span>Kontakt</span></nav>
            {!offerOpen ? (
              <div className={s.siteIndex}>
                <div className={s.siteTitle}><span>Warszawa · Trójmiasto</span><h4>Oferty wybrane dla Ciebie</h4></div>
                <div className={s.siteFilters} aria-label="Filtr ofert">
                  {([
                    ['all', 'Wszystkie'],
                    ['apartments', 'Apartamenty'],
                    ['houses', 'Domy'],
                  ] as const).map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={siteFilter === value ? s.filterActive : ''}
                      aria-pressed={siteFilter === value}
                      onClick={() => { stopTour(); setSiteFilter(value) }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className={s.offerTiles}>
                  {published && siteFilter !== 'houses' ? (
                    <button type="button" className={`${s.offerTile} ${s.newOfferTile}`} onClick={openOffer}>
                      <span className={s.offerPhoto}><Image src="/mockup/listing-detail.jpg" alt="Apartament w Warszawie na Mokotowie" fill sizes="340px" /><em>Nowa</em></span>
                      <span><small><PiMapPinBold /> {offerLocation}</small><b>{publishedOffer.price}</b><i>Apartament · {publishedOffer.area || '74 m²'} · {publishedOffer.rooms || '3 pokoje'}</i></span>
                      {touring && tourStep === 5 && <DemoCursor className={s.cursorOnOffer} />}
                    </button>
                  ) : !published && siteFilter !== 'houses' ? (
                    <span className={s.offerPlaceholder}><PiSparkleBold /><b>Tu pojawi się nowa oferta</b><small>Opublikuj ją w panelu obok.</small></span>
                  ) : null}
                  {siteFilter !== 'houses' ? (
                    <button type="button" className={s.offerTile} aria-pressed={favorite} onClick={() => { stopTour(); setFavorite((value) => !value) }}>
                      <span className={s.offerPhoto}><Image src="/mockup/listing-sopot.jpg" alt="Apartament w Sopocie" fill sizes="340px" /></span>
                      <span><small><PiMapPinBold /> Sopot, Dolny Sopot</small><b>2 450 000 zł</b><i>Apartament · 104 m²</i></span>
                      <em className={favorite ? s.favoriteOn : ''}>♡</em>
                    </button>
                  ) : (
                    <button type="button" className={s.offerTile} onClick={() => { stopTour(); setOfferOpen(false) }}>
                      <span className={s.offerPhoto}><Image src="/mockup/listing-orlowo.jpg" alt="Dom w Gdyni Orłowie" fill sizes="340px" /></span>
                      <span><small><PiMapPinBold /> Gdynia, Orłowo</small><b>1 890 000 zł</b><i>Dom · 132 m² · 4 pokoje</i></span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={s.offerDetail}>
                <button type="button" className={s.backButton} onClick={() => { stopTour(); setOfferOpen(false) }}>← Wszystkie oferty</button>
                <div className={s.detailImage}><Image src="/mockup/listing-detail.jpg" alt="Apartament w Warszawie na Mokotowie" fill sizes="460px" /><span>Nowa oferta</span></div>
                <div className={s.detailCopy}>
                  <small>{offerLocation}</small><h4>{publishedOffer.price}</h4><p>{publishedOffer.area || '74 m²'} · {publishedOffer.rooms || '3 pokoje'} · balkon · garaż</p>
                  <div className={s.buyingProcess}><span><b>01</b> Oglądanie</span><span><b>02</b> Rezerwacja</span><span><b>03</b> Umowa</span></div>
                  <button type="button" onClick={() => rootRef.current?.querySelector<HTMLElement>('[data-chat-input]')?.focus()}>Zapytaj o ofertę <PiArrowRightBold /></button>
                </div>
              </div>
            )}
          </div>
          <p className={s.cardNote}><PiClockBold /> Nowa oferta przechodzi z panelu na stronę w mniej niż sekundę.</p>
        </article>

        <article ref={chatCardRef} className={`${s.card} ${s.chatCard} ${activeStoryStep === 3 ? s.cardActive : ''}`}>
          <header className={s.cardHead}>
            <div><span>03 · Asystent Anny</span><h3>Pyta. Odpowiada. Umawia.</h3></div>
            <span className={`${s.cardState} ${s.tryBadge}`}>Sprawdź mnie</span>
          </header>
          <div className={s.chatIntro}>
            <span className={s.aiLogo}>AI<i /></span>
            <p>Zna każdą ofertę i odpowiada Twoim klientom także po godzinach.</p>
          </div>
          <div className={s.chatFrame}>
            <ChatWidget
              key={storyRun}
              compact
              demoStep={tourStep >= 8 ? 3 : tourStep === 7 ? 2 : tourStep === 6 ? 1 : 0}
              onUserInteraction={stopTour}
            />
            {touring && tourStep === 6 && <DemoCursor className={s.cursorChat} />}
          </div>
        </article>

        <article className={`${s.card} ${s.leadCard} ${activeStoryStep === 4 ? s.cardActive : ''} ${leadState === 'sent' ? s.leadComplete : ''}`}>
          <header className={s.cardHead}>
            <div><span>04 · Formularz i lead</span><h3>Zapytanie trafia prosto do Ciebie.</h3></div>
            <span className={s.cardState}>{leadState === 'sent' ? <><PiCheckBold /> Pozyskany</> : 'Interaktywny podgląd'}</span>
          </header>

          <div className={s.leadFlow}>
            <form className={s.leadForm} onSubmit={submitLead} onFocusCapture={stopTour}>
              <span className={s.formEyebrow}>Umów prezentację</span>
              <h4>Apartament · {publishedOffer.district || 'Mokotów'}</h4>
              <div className={s.timeSlots} aria-label="Wybierz termin prezentacji">
                {(['Sobota 12:00', 'Inny termin'] as const).map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={selectedTime === time ? s.timeActive : ''}
                    aria-pressed={selectedTime === time}
                    onClick={() => { stopTour(); setSelectedTime(time) }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <label className={s.cursorAnchor}>Imię i nazwisko<input value={lead.name} onChange={(event) => { stopTour(); setLead({ ...lead, name: event.target.value }) }} placeholder="Marta Nowak" required />{touring && tourStep === 9 && <DemoCursor className={s.cursorOnField} />}</label>
              <label>Telefon<input value={lead.phone} onChange={(event) => { stopTour(); setLead({ ...lead, phone: event.target.value }) }} placeholder="+48 601 204 118" required /></label>
              <label>Wiadomość<textarea rows={2} value={lead.message} onChange={(event) => { stopTour(); setLead({ ...lead, message: event.target.value }) }} placeholder="Napisz pytanie…" /></label>
              <button type="submit" className={s.sendLead} disabled={!lead.name || !lead.phone || leadState === 'sending'}>
                {leadState === 'sending' ? <><i /> Wysyłam…</> : <>Wyślij zapytanie <PiPaperPlaneTiltBold /></>}
                {touring && tourStep === 10 && <DemoCursor className={s.cursorOnPublish} />}
              </button>
            </form>

            <div className={s.inbox}>
              <div className={s.inboxBar}><span><PiEnvelopeSimpleBold /> Skrzynka agenta</span><em>{leadState === 'sent' ? '1 nowe' : '0 nowych'}</em></div>
              <div className={s.inboxBody}>
                {leadState === 'sent' ? (
                  <div className={s.newMail}>
                    <span className={s.mailAvatar}>{deliveredLead.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</span>
                    <span><b>Nowy lead · {deliveredLead.name}</b><small>Apartament {offerLocation || 'Warszawa, Mokotów'} · {selectedTime}</small><em>„{deliveredLead.message || 'Proszę o kontakt w sprawie oferty.'}”</em></span>
                    <strong>teraz</strong>
                  </div>
                ) : (
                  <div className={s.emptyInbox}><PiEnvelopeSimpleBold /><b>Czekamy na zapytanie</b><small>Wiadomość pojawi się tu automatycznie.</small></div>
                )}
              </div>
              {leadState === 'sent' && <span className={s.leadOutcome}><PiCheckBold /> Potencjalny klient pozyskany</span>}
            </div>
            {leadState === 'sending' && <span className={s.flyingMail} aria-hidden="true"><PiEnvelopeSimpleBold /></span>}
          </div>
        </article>
      </div>
    </div>
  )
}
