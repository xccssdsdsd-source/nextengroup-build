import { NextRequest, NextResponse } from 'next/server'
import { logoB64, igB64, fbB64 } from './assets'
export const runtime = 'edge'

const OWNER_EMAIL = 'getbuild.pl@gmail.com'
const FROM = 'Getbuild.pl <kontakt@getbuild.pl>'
const IG = 'https://www.instagram.com/getbuild.pl/'
const FB = 'https://www.facebook.com/profile.php?id=61588720012257'
const SITE = 'https://getbuild.pl'

const esc = (s: string) => s.replace(/[<>&]/g, c => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'))

const clientEmail = (name: string, message: string) => `<!doctype html><html lang="pl"><body style="margin:0;padding:0;background:#0A0E14;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E14;padding:40px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#11161F;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.5);">
<tr><td style="height:4px;background:linear-gradient(90deg,#22D3EE,#3B82F6);font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td align="center" style="padding:40px 36px 0;">
<img src="cid:logo" width="64" height="64" alt="Getbuild.pl" style="display:block;border-radius:16px;" />
<p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:18px;font-weight:800;letter-spacing:0.04em;color:#EAF0F7;">Getbuild.pl</p>
</td></tr>
<tr><td align="center" style="padding:28px 36px 0;">
<div style="width:60px;height:60px;border-radius:999px;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.3);text-align:center;line-height:60px;font-size:28px;color:#22D3EE;">&#10003;</div>
</td></tr>
<tr><td align="center" style="padding:22px 36px 0;">
<h1 style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:27px;font-weight:800;letter-spacing:-0.03em;color:#EAF0F7;">Dziękujemy, ${esc(name)}!</h1>
<p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#A6B2C4;">Otrzymaliśmy Twoją wiadomość i odezwiemy się w ciągu <strong style="color:#EAF0F7;">24–48 godzin</strong>.</p>
</td></tr>
<tr><td style="padding:28px 36px 0;">
<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#7C879B;">Twoja wiadomość</p>
<div style="padding:16px 20px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#A6B2C4;white-space:pre-wrap;">${esc(message)}</p>
</div>
</td></tr>
<tr><td align="center" style="padding:28px 36px 0;">
<a href="${SITE}" style="display:inline-block;padding:14px 32px;background:linear-gradient(90deg,#22D3EE,#3B82F6);border-radius:12px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#0A0E14;text-decoration:none;letter-spacing:0.02em;">Wróć na stronę</a>
</td></tr>
<tr><td align="center" style="padding:32px 36px 0;">
<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#7C879B;">Obserwuj nas</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding:0 8px;"><a href="${IG}"><img src="cid:ig" width="48" height="48" alt="Instagram" style="display:block;border-radius:14px;" /></a></td>
<td style="padding:0 8px;"><a href="${FB}"><img src="cid:fb" width="48" height="48" alt="Facebook" style="display:block;border-radius:14px;" /></a></td>
</tr></table>
</td></tr>
<tr><td style="padding:36px 36px 0;"><div style="height:1px;background:rgba(255,255,255,0.06);font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td align="center" style="padding:22px 36px 36px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#7C879B;"><a href="${SITE}" style="color:#7C879B;text-decoration:underline;">Getbuild.pl</a> · Ten e-mail został wysłany automatycznie, ponieważ skontaktowano się z nami przez formularz na stronie.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`

const ownerEmail = (name: string, email: string, message: string) => `<!doctype html><html lang="pl"><body style="margin:0;padding:0;background:#0A0E14;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E14;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#11161F;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
<tr><td style="padding:32px 36px 4px;">
<p style="margin:0;font-family:'Syne',Arial,sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#22D3EE;">Nowe zapytanie</p>
<h1 style="margin:8px 0 0;font-family:'Syne',Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#EAF0F7;">Zgłoszenie z getbuild.pl</h1>
</td></tr>
<tr><td style="padding:24px 36px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
<tr><td style="padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;"><p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#7C879B;">Imię i nazwisko</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#EAF0F7;">${esc(name)}</p></td></tr>
<tr><td height="10"></td></tr>
<tr><td style="padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;"><p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#7C879B;">Email</p><p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#EAF0F7;"><a href="mailto:${esc(email)}" style="color:#22D3EE;text-decoration:none;">${esc(email)}</a></p></td></tr>
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
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
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
      subject: `Nowe zapytanie od ${name}`,
      html: ownerEmail(name, email, message),
    })

    if (!ownerRes.ok) {
      const detail = await ownerRes.text()
      return NextResponse.json({ error: 'Send failed', detail }, { status: 502 })
    }

    await send({
      from: FROM,
      to: [email],
      subject: `Potwierdzenie zgłoszenia – Getbuild.pl`,
      html: clientEmail(name, message),
      attachments: [
        { filename: 'logo.png', content: logoB64, content_id: 'logo' },
        { filename: 'instagram.png', content: igB64, content_id: 'ig' },
        { filename: 'facebook.png', content: fbB64, content_id: 'fb' },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
