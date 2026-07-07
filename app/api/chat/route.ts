import { NextRequest, NextResponse } from 'next/server'
import { KNOWLEDGE_BASE } from './knowledge'

export const runtime = 'edge'

const MODEL = 'gemini-flash-lite-latest'
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

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
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ reply: 'Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za chwilę.' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const history: HistoryItem[] = Array.isArray(body?.history) ? body.history.slice(-12) : []

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'Asystent jest chwilowo niedostępny. Napisz do nas przez formularz kontaktowy.' })
    }

    const systemInstruction = `Jesteś asystentem sprzedażowym AI firmy Getbuild.pl osadzonym na stronie głównej. Odpowiadasz wyłącznie na podstawie poniższej bazy wiedzy o firmie. Nie odpowiadasz na pytania niezwiązane z ofertą Getbuild (polityka, inne firmy, tematy prywatne) — w takim wypadku grzecznie kierujesz rozmówcę z powrotem do tematu strony/automatyzacji i proponujesz kontakt. Trzymaj się tonu i zasad opisanych w bazie wiedzy.\n\n${KNOWLEDGE_BASE}`

    const contents = [
      ...history
        .filter(h => h && typeof h.content === 'string' && (h.role === 'user' || h.role === 'assistant'))
        .map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] },
    ]

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
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

    if (!res.ok) {
      return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy, odpowiemy szybko.' })
    }

    const data = await res.json().catch(() => null)
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ?? ''

    if (!reply) {
      return NextResponse.json({ reply: 'Nie udało mi się przygotować odpowiedzi. Chętnie pomogę na bezpłatnej konsultacji, może umówimy termin?' })
    }

    return NextResponse.json({ reply: reply.trim() })
  } catch {
    return NextResponse.json({ reply: 'Coś poszło nie tak po naszej stronie. Napisz do nas przez formularz kontaktowy.' })
  }
}
