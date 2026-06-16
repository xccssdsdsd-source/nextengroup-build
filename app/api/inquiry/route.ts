import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, topic } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD
    const businessEmail = process.env.BUSINESS_EMAIL || 'getbuild.pl@gmail.com'

    if (!smtpUser || !smtpPassword) {
      console.error('SMTP credentials not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    })

    const topicLabel = topic || 'Nie podano'

    // Powiadomienie do firmy
    await transporter.sendMail({
      from: `"GetBuild" <${smtpUser}>`,
      to: businessEmail,
      replyTo: email,
      subject: `Nowe zapytanie od ${name} – ${topicLabel}`,
      html: `
        <!DOCTYPE html>
        <html lang="pl">
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: #11161F; padding: 24px 32px;">
              <h1 style="color: #22D3EE; margin: 0; font-size: 22px;">Nowe zapytanie z formularza</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 160px;">Imię i nazwisko</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #22D3EE;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Temat</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${topicLabel}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Wiadomość:</p>
                <div style="background: #f8f8f8; border-left: 4px solid #22D3EE; padding: 16px; border-radius: 4px; color: #333; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Potwierdzenie do klienta
    await transporter.sendMail({
      from: `"GetBuild" <${smtpUser}>`,
      to: email,
      subject: 'Dziękujemy za wiadomość – GetBuild',
      html: `
        <!DOCTYPE html>
        <html lang="pl">
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: #11161F; padding: 24px 32px;">
              <h1 style="color: #22D3EE; margin: 0; font-size: 22px;">GetBuild</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #111; margin-top: 0;">Cześć, ${name}! 👋</h2>
              <p style="color: #555; line-height: 1.7;">Dziękujemy za kontakt. Otrzymaliśmy Twoją wiadomość i odezwiemy się do Ciebie tak szybko jak to możliwe – zazwyczaj w ciągu 24 godzin roboczych.</p>
              <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #333;">Twoje zapytanie dotyczy: <span style="color: #22D3EE;">${topicLabel}</span></p>
                <p style="margin: 0; color: #555; font-style: italic; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="color: #555; line-height: 1.7;">Jeśli masz pilną sprawę, możesz napisać do nas bezpośrednio na <a href="mailto:${businessEmail}" style="color: #22D3EE;">${businessEmail}</a></p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              <p style="color: #999; font-size: 12px; margin: 0;">GetBuild – Strony WWW, Automatyzacja, Agenci AI</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ error: 'Wysyłka emaila nie powiodła się' }, { status: 500 })
  }
}
