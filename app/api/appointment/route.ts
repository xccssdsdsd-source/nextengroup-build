import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, package: pkg } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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

    return NextResponse.json({ success: true, redirectUrl: gmailUrl })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
