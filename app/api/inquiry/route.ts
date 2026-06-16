import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'

const OWNER_EMAIL = 'getbuild.pl@gmail.com'
const FROM = 'Getbuild <kontakt@getbuild.pl>'
const IG = 'https://www.instagram.com/getbuild.pl/'
const FB = 'https://www.facebook.com/profile.php?id=61588720012257'

const esc = (s: string) => s.replace(/[<>&]/g, c => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'))

const clientEmail = (name: string) => `<!doctype html><html lang="pl"><body style="margin:0;padding:0;background:#0A0E14;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E14;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#11161F;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
<tr><td style="padding:36px 36px 8px;">
<p style="margin:0 0 24px;font-family:'Syne',Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#EAF0F7;">GETBUILD</p>
<div style="width:56px;height:56px;border-radius:999px;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.3);text-align:center;line-height:56px;font-size:26px;color:#22D3EE;">&#10003;</div>
</td></tr>
<tr><td style="padding:20px 36px 0;">
<h1 style="margin:0 0 14px;font-family:'Syne',Arial,sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.03em;color:#EAF0F7;">Dziękujemy, ${esc(name)}!</h1>
<p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#A6B2C4;">Otrzymaliśmy Twoją wiadomość i odezwiemy się najszybciej, jak to możliwe.</p>
<p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#A6B2C4;">W międzyczasie zapraszamy do obserwowania nas:</p>
</td></tr>
<tr><td style="padding:0 36px 36px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:10px;"><a href="${IG}" style="display:inline-block;padding:12px 22px;border-radius:12px;background:#22D3EE;color:#06121a;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">Instagram</a></td>
<td><a href="${FB}" style="display:inline-block;padding:12px 22px;border-radius:12px;border:1px solid rgba(255,255,255,0.14);color:#EAF0F7;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">Facebook</a></td>
</tr></table>
</td></tr>
<tr><td style="padding:22px 36px;border-top:1px solid rgba(255,255,255,0.06);">
<p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#7C879B;">Getbuild · getbuild.pl · Ten e-mail został wysłany automatycznie, ponieważ skontaktowano się z nami przez formularz na stronie.</p>
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
      subject: 'Dziękujemy za kontakt z Getbuild',
      html: clientEmail(name),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
