import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL

export async function POST(req: NextRequest) {
  try {
    const { topic, name, email, phone } = await req.json()

    if (!topic || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (DISCORD_WEBHOOK) {
      const topicLabels: Record<string, string> = {
        'strony-www': 'Strony WWW dla firm',
        'automatyzacje-ai': 'Automatyzacje AI',
        'agenci-ai': 'Agenci AI',
        'inne': 'Inne',
      }
      const topicLabel = topicLabels[topic] || topic

      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**Nowa konsultacja:**\nTemat: ${topicLabel}\nNazwisko: ${name}\nEmail: ${email}\nTelefon: ${phone || 'nie podano'}`,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
