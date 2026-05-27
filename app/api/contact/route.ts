import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENTS = [
  'akshat@cameraonrollproduction.com',
  'ashna@cameraonrollproduction.com',
  'welcometo101world@gmail.com',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, budget, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"Camera On Roll" <${user}>`,
      to: RECIPIENTS.join(', '),
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || 'N/A'}
Budget: ${budget || 'N/A'}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e8176a;">New Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #eee;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">Budget</td><td style="padding: 8px; border: 1px solid #eee;">${budget || 'N/A'}</td></tr>
          </table>
          <h3 style="margin-top: 24px;">Message</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 4px;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact email error:', err);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
