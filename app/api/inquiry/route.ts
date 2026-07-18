import { NextRequest, NextResponse } from 'next/server'
import { logoB64, igB64, fbB64 } from './assets'

const OWNER_EMAIL = 'getbuild.pl@gmail.com'
const FROM = 'Getbuild.pl <kontakt@getbuild.pl>'
const IG = 'https://www.instagram.com/getbuild.pl/'
const FB = 'https://www.facebook.com/profile.php?id=61588720012257'
const SITE = 'https://getbuild.pl'
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60_000
const MAX_BODY_BYTES = 16_384
const MAX_MESSAGE_LENGTH = 5_000
const MAX_SUBJECT_LENGTH = 160
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const esc = (s: string) => s.replace(/[<>&]/g, c => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'))
const noStore = { headers: { 'Cache-Control': 'no-store' } }

const hits = new Map<string, number[]>()
let lastSweep = Date.now()

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

const cleanText = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().replace(/\r\n/g, '\n').slice(0, max) : ''

const cleanHeaderText = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().replace(/[\r\n]+/g, ' ').slice(0, max) : ''

const clientEmail = (message: string) => `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>Potwierdzenie zgłoszenia</title></head><body style="margin:0;padding:0;background:#F4F5F8;-webkit-font-smoothing:antialiased;">
<div style="display:none;font-size:0;line-height:0;max-height:0;overflow:hidden;opacity:0;">Otrzymaliśmy Twoje zgłoszenie — odpowiadamy w ciągu 24–48 godzin.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5F8;padding:40px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:24px;overflow:hidden;box-shadow:0 1px 2px rgba(16,24,64,0.04),0 12px 32px rgba(16,24,64,0.07);">
<tr><td style="height:4px;background:#1A47E0;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td align="center" style="padding:52px 48px 0;">
<img src="cid:logo" width="84" height="84" alt="Getbuild.pl" style="display:block;border:0;outline:none;" />
<p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#8A93A8;">Getbuild.pl</p>
</td></tr>
<tr><td align="center" style="padding:40px 48px 0;">
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;font-weight:400;letter-spacing:-0.02em;color:#101736;">Dziękujemy za&nbsp;kontakt</h1>
<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#5A6379;">Twoje zgłoszenie trafiło do nas bezpiecznie. Przeczytamy je osobiście i wrócimy z odpowiedzią.</p>
</td></tr>
<tr><td align="center" style="padding:24px 48px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding:9px 20px;background:#EEF1FE;border-radius:999px;">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;color:#1A47E0;">Odpowiedź w ciągu 24–48 h</p>
</td></tr></table>
</td></tr>
<tr><td style="padding:40px 48px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FB;border-radius:16px;">
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;color:#98A0B3;">Twoja wiadomość</p>
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.8;color:#3A4257;white-space:pre-wrap;">${esc(message)}</p>
</td></tr>
</table>
</td></tr>
<tr><td align="center" style="padding:36px 48px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background:#101736;border-radius:12px;">
<a href="${SITE}" style="display:inline-block;padding:16px 38px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.02em;">Wróć na stronę</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:44px 48px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="height:1px;background:#E9EBF1;font-size:0;line-height:0;">&nbsp;</td>
</tr></table></td></tr>
<tr><td align="center" style="padding:28px 48px 44px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding:0 7px;"><a href="${IG}"><img src="cid:ig" width="34" height="34" alt="Instagram" style="display:block;border:0;border-radius:9px;" /></a></td>
<td style="padding:0 7px;"><a href="${FB}"><img src="cid:fb" width="34" height="34" alt="Facebook" style="display:block;border:0;border-radius:9px;" /></a></td>
</tr></table>
<p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:#A2A9B9;"><a href="${SITE}" style="color:#7A8394;text-decoration:none;font-weight:700;">getbuild.pl</a><br />Wiadomość wysłana automatycznie po wypełnieniu formularza kontaktowego.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`

const ownerEmail = (email: string, subject: string, message: string) => `<!doctype html><html lang="pl"><body style="margin:0;padding:0;background:#0A0E14;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E14;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#11161F;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
<tr><td style="padding:32px 36px 4px;">
<p style="margin:0;font-family:'Syne',Arial,sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#22D3EE;">Nowe zapytanie</p>
<h1 style="margin:8px 0 0;font-family:'Syne',Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#EAF0F7;">Zgłoszenie z getbuild.pl</h1>
</td></tr>
<tr><td style="padding:24px 36px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
<tr><td style="padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;"><p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#7C879B;">Email</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#EAF0F7;"><a href="mailto:${esc(email)}" style="color:#22D3EE;text-decoration:none;">${esc(email)}</a></p></td></tr>
${subject ? `<tr><td height="10"></td></tr>
<tr><td style="padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;"><p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#7C879B;">Temat</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#EAF0F7;">${esc(subject)}</p></td></tr>` : ''}
<tr><td height="10"></td></tr>
<tr><td style="padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;"><p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#7C879B;">Wiadomość</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#EAF0F7;white-space:pre-wrap;">${esc(message)}</p></td></tr>
</table>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413, ...noStore })
    }

    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, ...noStore })
    }

    const body = await req.json().catch(() => null)
    const email = cleanHeaderText(body?.email, 254).toLowerCase()
    const subject = cleanHeaderText(body?.subject, MAX_SUBJECT_LENGTH)
    const message = cleanText(body?.message, MAX_MESSAGE_LENGTH)

    if (!EMAIL_RE.test(email) || !message) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400, ...noStore })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500, ...noStore })
    }

    const send = (payload: Record<string, unknown>) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

    const ownerRes = await send({
      from: FROM,
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: subject ? `Nowe zapytanie: ${subject}` : 'Nowe zapytanie z getbuild.pl',
      html: ownerEmail(email, subject || '', message),
    })

    if (!ownerRes.ok) {
      console.error('inquiry: Resend owner email failed', { status: ownerRes.status, statusText: ownerRes.statusText })
      return NextResponse.json({ error: 'Send failed' }, { status: 502, ...noStore })
    }

    await send({
      from: FROM,
      to: [email],
      subject: `Potwierdzenie zgłoszenia – Getbuild.pl`,
      html: clientEmail(message),
      attachments: [
        { filename: 'logo.png', content: logoB64, content_id: 'logo' },
        { filename: 'instagram.png', content: igB64, content_id: 'ig' },
        { filename: 'facebook.png', content: fbB64, content_id: 'fb' },
      ],
    })

    return NextResponse.json({ success: true }, noStore)
  } catch (error) {
    console.error('inquiry: unhandled error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, ...noStore })
  }
}
