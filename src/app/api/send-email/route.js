// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { rateLimiter } from '@/utils/rateLimiter';
import { validateForm } from '@/utils/validation';
import { generateEmailHtml } from '@/lib/emailTemplate';
import {
  sendContactEmail,
  sendConsultationEmail,
  sendQuoteEmail,
  sendServiceInquiryEmail,
  sendEmail,
} from '@/lib/mail';

/**
 * Helper to extract client IP (Vercel passes it via x-forwarded-for)
 */
function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const remote = request.headers.get('remote-addr');
  return remote || 'unknown';
}

export async function POST(request) {
  try {
    // Rate limiting – will throw if limit exceeded
    await rateLimiter(request);

    const payload = await request.json();
    const { formName, ...rawData } = payload;

    // Validate and sanitize input
    const { valid, errors, data } = validateForm(formName, rawData);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    // Enrich data with meta information
    const enriched = {
      ...data,
      ip: getClientIp(request),
      browser: request.headers.get('user-agent') || '',
      device: '', // could be derived client‑side if needed
      referrer: request.headers.get('referer') || '',
      submittedAt: new Date().toISOString(),
    };

    // Dispatch to appropriate email sender
    switch (formName) {
      case 'contact':
        await sendContactEmail(enriched);
        break;
      case 'consultation':
        await sendConsultationEmail(enriched);
        break;
      case 'quote':
        await sendQuoteEmail(enriched);
        break;
      case 'serviceInquiry':
        await sendServiceInquiryEmail(enriched);
        break;
      default:
        // Fallback – generic email using unified helper
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: '🚀 New Lead Received | Digital Marketing TenX',
          html: generateEmailHtml(formName, enriched),
        });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email API error:', err);
    const status = err.status || 500;
    return NextResponse.json({ success: false, message: 'Unable to send email' }, { status });
  }
}

