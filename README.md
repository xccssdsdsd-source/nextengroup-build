# Getbuild.pl — przewodnik po projekcie (dla ludzi i modeli LLM)

> Ten plik to punkt wejścia dla każdego modelu (Claude, Codex, itp.), który ma edytować ten kod.
> Przeczytaj go **przed** wprowadzeniem zmian. Folder nazywa się `nextengroup-build` historycznie —
> produkt to **getbuild.pl**, dojrzały, działający na produkcji serwis dla polskich firm
> (strony WWW + automatyzacje AI + agenci AI).

## Zasada #1: to nie jest szkic

Prawie każda funkcja, o którą ktoś może poprosić ("dodaj animację przy scrollu", "dodaj licznik",
"dodaj tilt na kartach"), **już istnieje** — często w bardziej dopracowanej formie niż standardowy
pierwszy pomysł. Zanim coś "dodasz", sprawdź czy już nie działa (patrz sekcja "Gdzie czego szukać").
Literalne wykonanie ogólnego promptu typu "unowocześnij stronę" zwykle **pogarsza** istniejący,
przemyślany design.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- GSAP (ScrollTrigger) + Framer Motion (`m` z `motionFeatures.ts`) — dwa silniki animacji, celowo
  rozdzielone wg odpowiedzialności (patrz niżej)
- Wdrożenie: Cloudflare Workers (`open-next.config.ts`, `wrangler.toml`, `npm run pages:build`)

## Struktura katalogów

```
app/                    routing Next.js App Router — jeden folder = jedna podstrona
  page.tsx              strona główna — tu składane są wszystkie sekcje z components/
  layout.tsx             <html>/<head>: fonty, JSON-LD (SEO), globalne providery
  globals.css            JEDYNY plik CSS w projekcie — wszystkie klasy custom (.nav-island,
                          .overview-card, .btn-primary, keyframes...) są tutaj
  {slug}/page.tsx        podstrony ofertowe/SEO (strony-www, automatyzacje-ai, agenci-ai, ...)
  blog/                  blog: articles.ts (dane) + [slug]/page.tsx (render)
  api/                   route handlery (formularz kontaktowy, rezerwacja)

components/             WSZYSTKIE komponenty React płasko w jednym folderze (bez podfolderów
                          poza components/ui/) — sekcje strony głównej nazwane wprost:
                          Hero, SocialProof, Services, Process, Portfolio, Testimonials, FAQ,
                          Contact, Footer, Nav
  GSAPAnimations.tsx     JEDEN globalny komponent (mountowany w layout.tsx) odpowiadający za:
                          scroll-reveal (IntersectionObserver + CSS klasy .io-reveal),
                          liczniki liczb (GSAP scrollTrigger), parallax, 3D tilt kart,
                          magnetyczne przyciski. Deleguje pracę atrybutom data-* w JSX
                          (data-fade-in, data-stagger-group, data-parallax-blob, data-tilt-card...)
                          — żeby dodać scroll-reveal do nowego elementu, dodaj atrybut data-*,
                          NIE pisz nowej logiki animacji.
  Background*.tsx        dekoracyjne tła per-sekcja (canvas/SVG), każde osobno, ładowane leniwie
  ui/                    małe, reużywalne prymitywy (Button, GlassCard...)
  motionFeatures.ts      lazy-loaded subset funkcji framer-motion (import przez `m` zamiast
                          `motion` — zmniejsza bundle)

lib/                     czyste funkcje pomocnicze bez zależności od React (np. scrollToSection.ts)
public/                  statyczne assety (obrazy, favicon, manifest)
skills/, MAIN_SKILL.md    konfiguracja skilli dla agentów AI pracujących nad tym repo — nie mylić
                          z folderem `components`
```

## Dwa silniki animacji — kto za co odpowiada

1. **GSAP** (`GSAPAnimations.tsx`, mountowany raz globalnie) — scroll-driven: reveal przy wjeździe
   w viewport, liczniki, parallax, tilt 3D, magnetyczne przyciski. Steruje przez `data-*` atrybuty
   i klasy CSS zdefiniowane w `globals.css`.
2. **Framer Motion** (`m` z `motionFeatures.ts`) — animacje wewnątrz pojedynczych komponentów
   (np. karty w `Services.tsx`, `hover`/`whileHover`, `AnimatePresence`).

Nie mieszaj tych dwóch dla tego samego elementu — jeśli element już ma `data-fade-in` (GSAP),
nie dodawaj do niego drugiej animacji wejścia we Framer Motion.

## Wzorzec "typing animation" (Nav CTA, Hero mobile title)

Oba miejsca z animacją maszyny do pisania (`components/Nav.tsx` CTA w prawym górnym rogu,
`components/Hero.tsx` tytuł na mobile) używają **tej samej metody**: pętla `requestAnimationFrame`
licząca liczbę znaków na podstawie **realnego upływu czasu** (`performance.now() - start`), a NIE
łańcucha `setTimeout` zwiększającego indeks o 1 na wywołanie.

**Dlaczego to ważne:** wersja z łańcuchem `setTimeout` (usunięta) kumulowała każde opóźnienie
main threada na stałe — jeśli przeglądarka była chwilę zajęta, animacja trwale zwalniała i nigdy
nie nadrabiała różnicy. Wersja z `requestAnimationFrame` + elapsed-time jest samokorygująca:
zawsze pokazuje tyle znaków, ile powinno być widocznych o tej porze, niezależnie od jankow.

**Jeśli dodajesz kolejną animację typu typewriter/licznik/cokolwiek opartego o czas** —
kopiuj ten wzorzec (rAF + `performance.now()`), nie pisz nowego łańcucha `setTimeout`.

## Częste pułapki

- **Nigdy nie uruchamiaj `next build` podczas gdy `npm run dev` serwuje** — koroduje `.next`
  serwera dev (błędy 404 na CSS, `Cannot find module './vendor-chunks/...'`). Jeśli musisz zbudować
  produkcyjnie, zatrzymaj dev, `rm -rf .next`, dopiero potem `npm run build`.
- Zrzuty ekranu Puppeteer: obrazy Next.js (`<Image>`) mają `loading="lazy"` + blur placeholder —
  wymuś `img.loading = 'eager'`, przewiń całą stronę i poczekaj na `img.decode()`, inaczej zobaczysz
  szare rozmycie zamiast realnej treści. Gotowy skrypt: `node shot-sections.mjs <url> <tag> [--mobile]`
  (musi leżeć w katalogu projektu, żeby zobaczyć `node_modules/puppeteer`).
- Lenis jest zainstalowany (`package.json`) ale **nieużywany** — strona korzysta z natywnego
  scrolla + ręcznie strojonego `scrollToSection` + scroll-driven 3D w `DeviceMockups.tsx`.
  Dodanie Lenisa to wysokie ryzyko regresji w istniejących animacjach scrollowych.

## Jak wprowadzać zmiany, żeby kolejny model mógł kontynuować

1. Trzymaj się istniejącej konwencji płaskiego `components/` — nie twórz nowych podfolderów
   bez wyraźnej potrzeby.
2. Style tylko w `app/globals.css` (lub Tailwind inline) — nie dodawaj CSS-in-JS ani nowych
   plików `.module.css` poza istniejącymi wyjątkami (`AnimatedBackground.module.css`).
3. Do animacji czasowych (typing, liczniki, cokolwiek z `setTimeout`/`setInterval` liczącym kroki)
   używaj wzorca rAF + `performance.now()` opisanego wyżej.
4. Scroll-reveal nowych elementów: dodaj atrybut `data-fade-in`/`data-stagger-group`/itp.
   zamiast pisać nową logikę w `GSAPAnimations.tsx`.
5. Zanim zgłosisz zadanie jako zrobione: uruchom `npm run dev`, zrób zrzut ekranu
   (`node shot-sections.mjs http://localhost:3000 <tag>` i `--mobile`), sprawdź konsolę
   przeglądarki pod kątem błędów.
