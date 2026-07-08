import { NextRequest, NextResponse } from 'next/server'
import { KNOWLEDGE_BASE } from './knowledge'

const MODEL = 'gemini-flash-lite-latest'
const RATE_LIMIT = 8
const RATE_WINDOW_MS = 60_000
const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_ITEM_LENGTH = 800
const MIN_REPLY_DELAY_MS = 1_000
const MAX_HISTORY_ITEMS = 60

const hits = new Map<string, number[]>()
const isRateLimited = (ip: string) => {
  const now = Date.now()
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

export async function POST(req: NextRequest) {
  const startedAt = Date.now()
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ reply: 'Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za chwilę.' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : ''
    const history: HistoryItem[] = Array.isArray(body?.history)
      ? body.history.slice(-MAX_HISTORY_ITEMS).map((h: HistoryItem) => ({ ...h, content: typeof h?.content === 'string' ? h.content.slice(0, MAX_HISTORY_ITEM_LENGTH) : '' }))
      : []

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    }

    const apiKeys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_2].filter((k): k is string => !!k)
    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: 'Asystent jest chwilowo niedostępny. Napisz do nas przez formularz kontaktowy.' })
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
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      if (attempt.status !== 429) {
        res = attempt
        break
      }
    }

    if (!res || !res.ok) {
      return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy, odpowiemy szybko.' })
    }

    const data = await res.json().catch(() => null)
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ?? ''

    const elapsed = Date.now() - startedAt
    if (elapsed < MIN_REPLY_DELAY_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_REPLY_DELAY_MS - elapsed))
    }

    if (!reply) {
      return NextResponse.json({ reply: 'Nie udało mi się przygotować odpowiedzi. Chętnie pomogę na bezpłatnej konsultacji, może umówimy termin?' })
    }

    return NextResponse.json({ reply: reply.trim() })
  } catch {
    return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy.' })
  }
}
