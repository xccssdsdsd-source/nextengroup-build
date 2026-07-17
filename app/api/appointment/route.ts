import { NextRequest, NextResponse } from 'next/server'

const MAX_BODY_BYTES = 16_384
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const noStore = { headers: { 'Cache-Control': 'no-store' } }

const cleanText = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().replace(/\r\n/g, '\n').slice(0, max) : ''

const cleanHeaderText = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().replace(/[\r\n]+/g, ' ').slice(0, max) : ''

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413, ...noStore })
    }

    const payload = await req.json().catch(() => null)
    const name = cleanHeaderText(payload?.name, 120)
    const email = cleanHeaderText(payload?.email, 254).toLowerCase()
    const phone = cleanHeaderText(payload?.phone, 64)
    const message = cleanText(payload?.message, 2_000)
    const pkg = cleanHeaderText(payload?.package, 120)

    if (!name || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400, ...noStore })
    }

    const lines = [
      `Nowa rezerwacja spotkania przez stronę getbuild.pl`,
      ``,
      `Pakiet: ${pkg ?? 'Strona kompletna'}`,
      `Imię i nazwisko: ${name}`,
      `Email: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      message ? `\nProjekt / notatka:\n${message}` : null,
    ].filter(Boolean) as string[]

    const subject = `Rezerwacja: ${pkg ?? 'Strona kompletna'} — ${name}`
    const body = lines.join('\n')

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=getbuild.pl@gmail.com` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    return NextResponse.json({ success: true, redirectUrl: gmailUrl }, noStore)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, ...noStore })
  }
}
