import nodemailer from 'nodemailer'

function buildEmailHtml({ name, email, subject, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Contact Message</title></head>
<body style="margin:0;padding:0;background:#0a0f0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0d;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111a15;border-radius:16px;overflow:hidden;border:1px solid rgba(0,255,178,0.15);">

        <tr>
          <td style="background:linear-gradient(135deg,#00FFB2,#00C8FF);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#050D0A;font-size:22px;font-weight:800;">⚡ New Portfolio Message</h1>
            <p style="margin:6px 0 0;color:rgba(5,13,10,0.7);font-size:13px;">via muthukumar.dev contact form</p>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,255,178,0.05);border:1px solid rgba(0,255,178,0.12);border-radius:12px;padding:20px;margin-bottom:24px;">
              <tr><td style="padding:0 0 12px;">
                <span style="background:rgba(0,255,178,0.12);color:#00FFB2;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;">Sender Details</span>
              </td></tr>
              <tr><td>
                <p style="margin:6px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                <p style="margin:0 0 10px;color:#fff;font-size:15px;font-weight:600;">${name}</p>
                <p style="margin:6px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                <a href="mailto:${email}" style="color:#00C8FF;font-size:15px;font-weight:600;text-decoration:none;display:block;margin-bottom:10px;">${email}</a>
                <p style="margin:6px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Subject</p>
                <p style="margin:0;color:#fff;font-size:15px;font-weight:600;">${subject}</p>
              </td></tr>
            </table>

            <span style="display:inline-block;background:rgba(167,139,250,0.12);color:#A78BFA;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:14px;">Message</span>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.75;white-space:pre-wrap;">${message}</p>
            </div>

            <div style="text-align:center;">
              <a href="mailto:${email}?subject=Re: ${subject}"
                 style="display:inline-block;background:linear-gradient(135deg,#00FFB2,#00C8FF);color:#050D0A;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">
                Reply to ${name}
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;">Sent via Muthukumar's Portfolio · Powered by Nodemailer</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildAutoReplyHtml({ name }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>Message Received</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background:linear-gradient(135deg,#00FFB2,#00C8FF);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#050D0A;font-size:22px;font-weight:800;">⚡ Message Received!</h1>
            <p style="margin:6px 0 0;color:rgba(5,13,10,0.6);font-size:13px;">muthukumar.dev</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 16px;color:#1e293b;font-size:16px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.75;">
              Thanks for reaching out! I've received your message and will get back to you within <strong>24 hours</strong>.
            </p>
            <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.75;">
              In the meantime, feel free to check out my work on
              <a href="https://github.com/muthukumar-29" style="color:#0d9488;">GitHub</a> or connect on
              <a href="https://www.linkedin.com/in/muthukumar29" style="color:#0d9488;">LinkedIn</a>.
            </p>
            <div style="background:#f1fdf9;border:1px solid #a7f3d0;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;color:#065f46;font-size:14px;font-weight:600;">— Muthukumar M</p>
              <p style="margin:4px 0 0;color:#047857;font-size:13px;">AI Automation Developer · Automaitee</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">This is an automated reply. Please do not reply to this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: buildEmailHtml({ name, email, subject, message }),
    })

    await transporter.sendMail({
      from: `"Muthukumar M" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Got your message — I'll be in touch soon!",
      html: buildAutoReplyHtml({ name }),
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
