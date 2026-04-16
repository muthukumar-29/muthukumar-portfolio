import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['POST'],
}))
app.use(express.json())

// Professional HTML email template
function buildEmailHtml({ name, email, subject, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#0a0f0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111a15;border-radius:16px;overflow:hidden;border:1px solid rgba(0,255,178,0.15);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00FFB2,#00C8FF);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#050D0A;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                ⚡ New Portfolio Message
              </h1>
              <p style="margin:6px 0 0;color:rgba(5,13,10,0.7);font-size:13px;">via muthukumar.dev contact form</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,255,178,0.05);border:1px solid rgba(0,255,178,0.12);border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:0 0 12px;">
                    <span style="display:inline-block;background:rgba(0,255,178,0.12);color:#00FFB2;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;">Sender Details</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Name</span><br/>
                          <span style="color:#ffffff;font-size:15px;font-weight:600;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br/>
                          <a href="mailto:${email}" style="color:#00C8FF;font-size:15px;font-weight:600;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      ${subject ? `
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Subject</span><br/>
                          <span style="color:#ffffff;font-size:15px;font-weight:600;">${subject}</span>
                        </td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-bottom:24px;">
                <span style="display:inline-block;background:rgba(167,139,250,0.12);color:#A78BFA;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:14px;">Message</span>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
                  <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.75;white-space:pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin-top:16px;">
                <a href="mailto:${email}?subject=Re: ${subject || 'Your message'}"
                   style="display:inline-block;background:linear-gradient(135deg,#00FFB2,#00C8FF);color:#050D0A;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">
                  Reply to ${name}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;">
                Sent via Muthukumar's Portfolio · Powered by Nodemailer
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// Auto-reply template for the sender
function buildAutoReplyHtml({ name }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Message Received</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

          <tr>
            <td style="background:linear-gradient(135deg,#00FFB2,#00C8FF);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#050D0A;font-size:22px;font-weight:800;">⚡ Message Received!</h1>
              <p style="margin:6px 0 0;color:rgba(5,13,10,0.6);font-size:13px;">muthukumar.dev</p>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;color:#1e293b;font-size:16px;line-height:1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.75;">
                Thanks for reaching out! I've received your message and will get back to you within <strong>24 hours</strong>.
              </p>
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.75;">
                In the meantime, feel free to check out my work on
                <a href="https://github.com/muthukumar-29" style="color:#0d9488;">GitHub</a> or
                connect with me on
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
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                This is an automated reply. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
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

    // Send notification to yourself
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: buildEmailHtml({ name, email, subject, message }),
    })

    // Send auto-reply to the sender
    await transporter.sendMail({
      from: `"Muthukumar M" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Got your message — I\'ll be in touch soon!',
      html: buildAutoReplyHtml({ name }),
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`)
})
