import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (DISCORD_WEBHOOK) {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**Nowe zapytanie:**\nNazwisko: ${name}\nEmail: ${email}\nWiadomość: ${message}`,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
