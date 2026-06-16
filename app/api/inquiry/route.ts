import { NextRequest, NextResponse } from 'next/server'
import { CONTACT, clientConfirmationEmail, ownerNotificationEmail } from '@/lib/emailTemplates'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Sends both e-mails (owner notification + client confirmation) directly via
 * the Brevo HTTP API. Works on the edge runtime (plain fetch, no Node SMTP).
 * Requires a free BREVO_API_KEY env var and a verified sender e-mail.
 */
async function sendViaBrevo(
  apiKey: string,
  data: { name: string; email: string; message: string },
) {
  const owner = ownerNotificationEmail(data)
  const client = clientConfirmationEmail(data.name)
  const sender = { name: CONTACT.brand, email: CONTACT.email }

  const send = (
    to: { name?: string; email: string },
    subject: string,
    htmlContent: string,
    textContent: string,
    replyTo?: { name?: string; email: string },
  ) =>
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ sender, to: [to], subject, htmlContent, textContent, replyTo }),
    })

  const [ownerRes, clientRes] = await Promise.all([
    // Notification to the business — reply goes straight to the client.
    send({ email: CONTACT.email }, owner.subject, owner.html, owner.text, {
      name: data.name,
      email: data.email,
    }),
    // Beautiful confirmation to the client.
    send({ name: data.name, email: data.email }, client.subject, client.html, client.text),
  ])

  if (!ownerRes.ok) {
    throw new Error(`Brevo owner e-mail failed: ${ownerRes.status} ${await ownerRes.text()}`)
  }
  // Client confirmation is best-effort: don't fail the whole request if it bounces.
  if (!clientRes.ok) {
    console.error('Brevo client confirmation failed:', clientRes.status, await clientRes.text())
  }
}

/**
 * Zero-config fallback used in preview / when no e-mail API key is set.
 * Posts the inquiry to FormSubmit, which forwards it to the inbox and sends the
 * client an auto-response. NOTE: first submission triggers a one-time activation
 * e-mail that must be confirmed once.
 */
async function sendViaFormSubmit(data: { name: string; email: string; message: string }) {
  const client = clientConfirmationEmail(data.name)

  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: `Nowe zapytanie od ${data.name}`,
      _template: 'box',
      _captcha: 'false',
      _autoresponse: client.text,
    }),
  })

  if (!res.ok) {
    throw new Error(`FormSubmit failed: ${res.status} ${await res.text()}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const message = String(body?.message ?? '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Nieprawidłowy adres e-mail' }, { status: 400 })
    }

    const data = { name, email, message }
    const brevoKey = process.env.BREVO_API_KEY

    if (brevoKey) {
      await sendViaBrevo(brevoKey, data)
    } else {
      await sendViaFormSubmit(data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Nie udało się wysłać wiadomości' }, { status: 500 })
  }
}
