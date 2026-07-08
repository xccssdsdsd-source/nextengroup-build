import { NextRequest, NextResponse } from 'next/server'
import { logoB64, igB64, fbB64 } from './assets'

const OWNER_EMAIL = 'getbuild.pl@gmail.com'
const FROM = 'Getbuild.pl <kontakt@getbuild.pl>'
const IG = 'https://www.instagram.com/getbuild.pl/'
const FB = 'https://www.facebook.com/profile.php?id=61588720012257'
const SITE = 'https://getbuild.pl'

const esc = (s: string) => s.replace(/[<>&]/g, c => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'))

const clientEmail = (message: string) => `<!doctype html><html lang="pl"><body style="margin:0;padding:0;background:#070B11;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070B11;padding:48px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0F141C;border:1px solid rgba(255,255,255,0.07);border-radius:28px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(34,211,238,0.04);">
<!-- top gradient bar -->
<tr><td style="height:6px;background:linear-gradient(90deg,#22D3EE 0%,#6366F1 60%,#3B82F6 100%);font-size:0;line-height:0;">&nbsp;</td></tr>
<!-- logo -->
<tr><td align="center" style="padding:44px 40px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(34,211,238,0.18);">
<img src="cid:logo" width="68" height="68" alt="Getbuild.pl" style="display:block;border-radius:20px;" />
</td></tr></table>
<p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#5B687A;">Getbuild.pl</p>
</td></tr>
<!-- checkmark -->
<tr><td align="center" style="padding:32px 40px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;border-radius:999px;background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(99,102,241,0.10));border:1px solid rgba(34,211,238,0.25);box-shadow:0 0 32px rgba(34,211,238,0.12);">
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16.5L13 22.5L25 10" stroke="#22D3EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</td></tr></table>
</td></tr>
<!-- heading -->
<tr><td align="center" style="padding:24px 40px 0;">
<h1 style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#EAF0F7;">Dziękujemy!</h1>
<p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#8A97AA;">Otrzymaliśmy Twoją wiadomość i odezwiemy się wkrótce.</p>
<!-- response time badge -->
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding:8px 18px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.22);border-radius:999px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#22D3EE;">&#9679;&nbsp; Odpowiedź w ciągu 24–48 h</p>
</td></tr></table>
</td></tr>
<!-- message echo -->
<tr><td style="padding:32px 40px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="3" style="width:3px;background:linear-gradient(180deg,#22D3EE,#6366F1);border-radius:2px;">&nbsp;</td>
<td width="16" style="width:16px;">&nbsp;</td>
<td>
<p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#5B687A;">Twoja wiadomość</p>
<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.75;color:#8A97AA;white-space:pre-wrap;">${esc(message)}</p>
</td>
</tr></table>
</td></tr>
<!-- CTA -->
<tr><td align="center" style="padding:36px 40px 0;">
<a href="${SITE}" style="display:inline-block;padding:15px 36px;background:linear-gradient(90deg,#22D3EE,#6366F1);border-radius:14px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:#070B11;text-decoration:none;letter-spacing:0.04em;box-shadow:0 8px 24px rgba(34,211,238,0.25);">Wróć na stronę</a>
</td></tr>
<!-- social -->
<tr><td align="center" style="padding:36px 40px 0;">
<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#5B687A;">Obserwuj nas</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding:0 6px;"><a href="${IG}"><img src="cid:ig" width="44" height="44" alt="Instagram" style="display:block;border-radius:12px;opacity:0.85;" /></a></td>
<td style="padding:0 6px;"><a href="${FB}"><img src="cid:fb" width="44" height="44" alt="Facebook" style="display:block;border-radius:12px;opacity:0.85;" /></a></td>
</tr></table>
</td></tr>
<!-- separator -->
<tr><td style="padding:32px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07) 30%,rgba(255,255,255,0.07) 70%,transparent);font-size:0;line-height:0;">&nbsp;</td>
</tr></table></td></tr>
<!-- footer -->
<tr><td align="center" style="padding:20px 40px 40px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;line-height:1.6;color:#3D4A5C;"><a href="${SITE}" style="color:#3D4A5C;text-decoration:underline;">Getbuild.pl</a> · Ten e-mail został wysłany automatycznie, ponieważ skontaktowano się z nami przez formularz na stronie.</p>
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
    const { email, subject, message } = await req.json()
    if (!email || !message) {
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
      subject: subject ? `Nowe zapytanie: ${subject}` : 'Nowe zapytanie z getbuild.pl',
      html: ownerEmail(email, subject || '', message),
    })

    if (!ownerRes.ok) {
      const detail = await ownerRes.text()
      return NextResponse.json({ error: 'Send failed', detail }, { status: 502 })
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

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
