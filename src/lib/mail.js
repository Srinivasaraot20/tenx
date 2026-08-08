// lib/mail.js
import nodemailer from 'nodemailer';
import { generateEmailHtml } from './emailTemplate';

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to,
    subject,
    html,
  };
  return await getTransporter().sendMail(mailOptions);
}

export async function sendContactEmail(data) {
  const html = generateEmailHtml('Contact Form', data);
  return sendEmail({ to: process.env.ADMIN_EMAIL, subject: '🚀 New Lead Received | Digital Marketing TenX', html });
}

export async function sendConsultationEmail(data) {
  const html = generateEmailHtml('Book Consultation', data);
  return sendEmail({ to: process.env.ADMIN_EMAIL, subject: '🚀 New Lead Received | Digital Marketing TenX', html });
}

export async function sendQuoteEmail(data) {
  const html = generateEmailHtml('Get Quote', data);
  return sendEmail({ to: process.env.ADMIN_EMAIL, subject: '🚀 New Lead Received | Digital Marketing TenX', html });
}

export async function sendServiceInquiryEmail(data) {
  const html = generateEmailHtml('Service Inquiry', data);
  return sendEmail({ to: process.env.ADMIN_EMAIL, subject: '🚀 New Lead Received | Digital Marketing TenX', html });
}

