// Beautiful, brand-consistent HTML e-mail templates for the contact form.
// Table-based + inline styles so they render reliably across e-mail clients
// (Gmail, Outlook, Apple Mail, mobile clients).

export const CONTACT = {
  brand: 'getBuild',
  handle: '@getbuild.pl',
  email: 'getbuild.pl@gmail.com',
  site: 'https://getbuild.pl',
  logo: 'https://getbuild.pl/getbuild-logo-og.png',
  instagram: 'https://www.instagram.com/getbuild.pl/',
  facebook: 'https://www.facebook.com/profile.php?id=61588720012257',
} as const

// Basic HTML escaping so user input can't break the markup.
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const COLORS = {
  bg: '#05070C',
  card: '#11161F',
  cardHi: '#161C28',
  border: '#1F2733',
  text: '#EAF0F7',
  muted: '#A6B2C4',
  faint: '#7C879B',
  accent: '#22D3EE',
}

// Shared social buttons row (Instagram + Facebook).
function socialButtons(): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
    <tr>
      <td style="padding:6px;">
        <a href="${CONTACT.instagram}" target="_blank" style="display:inline-block;padding:11px 22px;border-radius:999px;background:linear-gradient(45deg,#833ab4,#fd1d1d,#fcb045);color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;">Instagram</a>
      </td>
      <td style="padding:6px;">
        <a href="${CONTACT.facebook}" target="_blank" style="display:inline-block;padding:11px 22px;border-radius:999px;background:#1877f2;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;">Facebook</a>
      </td>
    </tr>
  </table>`
}

// Outer shell shared by every e-mail.
function shell(innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:20px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0B1220 0%,#11161F 100%);padding:32px 32px 24px;text-align:center;border-bottom:1px solid ${COLORS.border};">
              <img src="${CONTACT.logo}" width="64" height="64" alt="${CONTACT.brand}" style="display:block;margin:0 auto 12px;border-radius:14px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:${COLORS.text};letter-spacing:-0.02em;">${CONTACT.brand}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.accent};margin-top:2px;">${CONTACT.handle}</div>
            </td>
          </tr>
          ${innerHtml}
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 28px;text-align:center;border-top:1px solid ${COLORS.border};">
              ${socialButtons()}
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.faint};margin-top:16px;line-height:1.6;">
                <a href="${CONTACT.site}" target="_blank" style="color:${COLORS.accent};text-decoration:none;">getbuild.pl</a>
                &nbsp;·&nbsp; ${CONTACT.email}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${COLORS.faint};margin-top:8px;">
                © ${new Date().getFullYear()} ${CONTACT.brand}. Wszelkie prawa zastrzeżone.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// E-mail the client receives — the "mega beautiful" thank-you confirmation.
export function clientConfirmationEmail(name: string): { subject: string; html: string; text: string } {
  const safeName = esc(name.trim().split(' ')[0] || name.trim())
  const inner = `
  <tr>
    <td style="padding:36px 32px 8px;">
      <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:bold;color:${COLORS.text};">
        Dziękujemy${safeName ? `, ${safeName}` : ''}! 🙌
      </h1>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${COLORS.muted};">
        Otrzymaliśmy Twoją wiadomość i już się nią zajmujemy. Odpowiemy najszybciej, jak to możliwe — zwykle w ciągu jednego dnia roboczego.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:20px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.cardHi};border:1px solid ${COLORS.border};border-radius:14px;">
        <tr>
          <td style="padding:20px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${COLORS.muted};">
            W międzyczasie zerknij na nasze realizacje i bądźmy w kontakcie w social mediach 👇
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:4px 32px 28px;text-align:center;">
      <a href="${CONTACT.site}#realizacje" target="_blank" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${COLORS.accent};color:#05070C;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;">Zobacz nasze realizacje</a>
    </td>
  </tr>`

  const text = `Dziękujemy${safeName ? `, ${safeName}` : ''}!

Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej, jak to możliwe — zwykle w ciągu jednego dnia roboczego.

Realizacje: ${CONTACT.site}#realizacje
Instagram: ${CONTACT.instagram}
Facebook: ${CONTACT.facebook}

${CONTACT.brand} ${CONTACT.handle}
${CONTACT.site} · ${CONTACT.email}`

  return {
    subject: 'Dziękujemy za kontakt z getBuild! 🙌',
    html: shell(inner),
    text,
  }
}

// E-mail the owner receives — the inquiry, nicely formatted.
export function ownerNotificationEmail(data: {
  name: string
  email: string
  message: string
}): { subject: string; html: string; text: string } {
  const name = esc(data.name.trim())
  const email = esc(data.email.trim())
  const message = esc(data.message.trim()).replace(/\n/g, '<br>')

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.faint};">${label}</td>
    </tr>
    <tr>
      <td style="padding:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};">${value}</td>
    </tr>`

  const inner = `
  <tr>
    <td style="padding:32px 32px 8px;">
      <h1 style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:${COLORS.text};">Nowe zapytanie z formularza ✉️</h1>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.muted};">Ktoś właśnie wysłał wiadomość przez stronę.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:20px 32px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.cardHi};border:1px solid ${COLORS.border};border-radius:14px;">
        <tr>
          <td style="padding:22px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row('Imię i nazwisko', name)}
              ${row('E-mail', `<a href="mailto:${email}" style="color:${COLORS.accent};text-decoration:none;">${email}</a>`)}
              ${row('Wiadomość', message)}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:8px 32px 28px;text-align:center;">
      <a href="mailto:${email}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${COLORS.accent};color:#05070C;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;">Odpowiedz klientowi</a>
    </td>
  </tr>`

  const text = `Nowe zapytanie z formularza

Imię i nazwisko: ${data.name}
E-mail: ${data.email}

Wiadomość:
${data.message}`

  return {
    subject: `Nowe zapytanie od ${data.name}`,
    html: shell(inner),
    text,
  }
}
