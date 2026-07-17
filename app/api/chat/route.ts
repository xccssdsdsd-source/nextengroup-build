import { NextRequest, NextResponse } from 'next/server'
import { KNOWLEDGE_BASE } from './knowledge'

const MODEL = 'gemini-flash-lite-latest'
const RATE_LIMIT = 8
const RATE_WINDOW_MS = 60_000
const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_ITEM_LENGTH = 800
const MIN_REPLY_DELAY_MS = 1_000
const MAX_HISTORY_ITEMS = 12
const MAX_BODY_BYTES = 20_000

const hits = new Map<string, number[]>()
let lastSweep = Date.now()

// Prevents unbounded growth of `hits` between requests, since this Map never
// otherwise loses entries for IPs that stop sending traffic.
const sweepStaleEntries = (now: number) => {
  if (now - lastSweep < RATE_WINDOW_MS) return
  lastSweep = now
  for (const [ip, timestamps] of hits) {
    const fresh = timestamps.filter(t => now - t < RATE_WINDOW_MS)
    if (fresh.length === 0) hits.delete(ip)
    else hits.set(ip, fresh)
  }
}

const isRateLimited = (ip: string) => {
  const now = Date.now()
  sweepStaleEntries(now)
  const timestamps = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) {
    hits.set(ip, timestamps)
    return true
  }
  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}

type HistoryItem = { role: 'user' | 'assistant'; content: string }
const noStore = { headers: { 'Cache-Control': 'no-store' } }

export async function POST(req: NextRequest) {
  const startedAt = Date.now()
  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ reply: 'Wiadomość jest zbyt długa. Skróć ją i spróbuj ponownie.' }, { status: 413, ...noStore })
    }

    // cf-connecting-ip is set by Cloudflare's edge and can't be spoofed by the client;
    // x-forwarded-for is attacker-controlled unless a proxy overwrites it, so it's only a fallback.
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ reply: 'Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za chwilę.' }, { status: 429, ...noStore })
    }

    const body = await req.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : ''
    const history: HistoryItem[] = Array.isArray(body?.history)
      ? body.history
          .slice(-MAX_HISTORY_ITEMS)
          .map((h: Partial<HistoryItem>) => ({
            role: h?.role,
            content: typeof h?.content === 'string' ? h.content.slice(0, MAX_HISTORY_ITEM_LENGTH) : '',
          }))
          .filter((h: Partial<HistoryItem>): h is HistoryItem => (h.role === 'user' || h.role === 'assistant') && !!h.content)
      : []

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400, ...noStore })
    }

    const apiKeys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_2].filter((k): k is string => !!k)
    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: 'Asystent jest chwilowo niedostępny. Napisz do nas przez formularz kontaktowy.' }, noStore)
    }

    const systemInstruction = `Jesteś asystentem sprzedażowym AI firmy Getbuild.pl osadzonym na stronie głównej. Odpowiadasz wyłącznie na podstawie poniższej bazy wiedzy o firmie. Nie odpowiadasz na pytania niezwiązane z ofertą Getbuild (polityka, inne firmy, tematy prywatne) — w takim wypadku grzecznie kierujesz rozmówcę z powrotem do tematu strony/automatyzacji i proponujesz kontakt. Trzymaj się tonu i zasad opisanych w bazie wiedzy.\n\n${KNOWLEDGE_BASE}`

    const contents = [
      ...history
        .filter(h => h && typeof h.content === 'string' && (h.role === 'user' || h.role === 'assistant'))
        .map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] },
    ]

    let res: Response | null = null
    for (const key of apiKeys) {
      const attempt = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemInstruction }] },
            generationConfig: { temperature: 0.6, maxOutputTokens: 600 },
          }),
        }
      )
      if (attempt.ok) {
        res = attempt
        break
      }
      res = attempt
      // Any failure (rate limit, quota, transient 5xx) is worth trying the next key for, not just 429.
    }

    if (!res || !res.ok) {
      console.error('chat: Gemini request failed', { status: res?.status, statusText: res?.statusText })
      return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy, odpowiemy szybko.' }, noStore)
    }

    const data = await res.json().catch(() => null)
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ?? ''

    const elapsed = Date.now() - startedAt
    if (elapsed < MIN_REPLY_DELAY_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_REPLY_DELAY_MS - elapsed))
    }

    if (!reply) {
      return NextResponse.json({ reply: 'Nie udało mi się przygotować odpowiedzi. Chętnie pomogę na bezpłatnej konsultacji, może umówimy termin?' }, noStore)
    }

    return NextResponse.json({ reply: reply.trim() }, noStore)
  } catch (err) {
    console.error('chat: unhandled error', err)
    return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy.' }, noStore)
  }
}
