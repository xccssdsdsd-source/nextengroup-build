import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=getbuild.pl@gmail.com&su=${encodeURIComponent(`Zapytanie od ${name} (${email})`)}&body=${encodeURIComponent(`Imię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`)}`

    return NextResponse.json({ success: true, redirectUrl: gmailUrl })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
