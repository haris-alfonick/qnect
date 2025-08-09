// lib/mail.ts
import nodemailer from 'nodemailer';

export async function sendMailToAdmin(subject: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.ADMIN_EMAIL_USER,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"Qnect App" <admin@qnect.com>',
    to: process.env.ADMIN_EMAIL_RECEIVER, // updated line
    subject,
    text: message,
  });
}
