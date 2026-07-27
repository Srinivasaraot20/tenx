import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name, companyName, email, phone, whatsapp, website, location,
      businessType, industry, companySize, monthlyRevenue,
      services, goals, budget, timeline, projectDescription,
      contactMethod, contactTime, consentPrivacy, consentCommunication, referrer
    } = body;

    // 1. Basic Validation
    if (!name || !email || !phone || !businessType || !budget || !timeline || !projectDescription || !contactMethod) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    if (!consentPrivacy || !consentCommunication) {
      return NextResponse.json({ success: false, error: 'Consent is required' }, { status: 400 });
    }

    // Capture Request Metadata
    let ipAddress = "Unknown";
    let userAgent = "Unknown";
    try {
      const headersList = await headers();
      ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
      userAgent = headersList.get("user-agent") || "Unknown";
    } catch (e) {
      // Ignore header errors
    }

    // Generate Consultation ID
    const consultationId = `DMTX-CONS-${Math.floor(100000 + Math.random() * 900000)}`;

    // 2. Save to Database
    const newLead = await prisma.lead.create({
      data: {
        consultationId,
        fullName: name.trim(),
        company: companyName?.trim() || null,
        email: email.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp?.trim() || null,
        website: website?.trim() || null,
        city: location?.trim() || null, // Storing location in city
        business: businessType,
        country: industry?.trim() || null, // Storing industry in country fallback
        companySize: companySize || null,
        monthlyRevenue: monthlyRevenue || null,
        servicesInterested: JSON.stringify(services || []),
        marketingGoals: JSON.stringify(goals || []),
        budget: budget,
        preferredTime: timeline, // Timeline
        message: projectDescription.trim(),
        contactMethod,
        contactTime: contactTime?.trim() || null,
        privacyAccepted: consentPrivacy,
        marketingConsent: consentCommunication,
        leadType: "Consultation",
        status: "New",
        sourcePage: "Book Free Consultation",
        referrer: referrer || null,
        ip: ipAddress,
        browser: userAgent,
      }
    });

    // 3. Create Admin Notification
    await prisma.adminNotification.create({
      data: {
        type: "Consultation",
        title: "New Consultation Request",
        message: `${newLead.fullName} requested a consultation.`,
        link: "/admin/leads?type=Consultation",
      }
    });

    // 4. Send Email & WhatsApp Notifications asynchronously
    import('@/lib/email').then(({ sendEmail }) => {
      // Admin Email
      sendEmail({
        to: 'digitalmarketingtenx@gmail.com',
        subject: `New Consultation Request: ${newLead.fullName}`,
        html: `
          <h3>New Consultation Lead (${consultationId})</h3>
          <p><strong>Name:</strong> ${newLead.fullName}</p>
          <p><strong>Company:</strong> ${newLead.company || 'N/A'}</p>
          <p><strong>Email:</strong> ${newLead.email}</p>
          <p><strong>Phone:</strong> ${newLead.phone}</p>
          <p><strong>Business Type:</strong> ${newLead.business}</p>
          <p><strong>Budget:</strong> ${newLead.budget}</p>
          <p><strong>Timeline:</strong> ${newLead.preferredTime}</p>
          <p><strong>Services:</strong> ${(services || []).join(', ')}</p>
          <p><strong>Goals:</strong> ${(goals || []).join(', ')}</p>
          <br>
          <p><a href="https://digitalmarketingtenx.com/admin/leads?type=Consultation">View full details in Dashboard</a></p>
        `
      }).catch(err => console.error("Admin Email error:", err));

      // Customer Email
      sendEmail({
        to: newLead.email,
        subject: `Your Free Consultation Request - Digital Marketing TenX`,
        html: `
          <h3>Thank you, ${newLead.fullName}!</h3>
          <p>We have successfully received your request for a free consultation. Our team is reviewing your project details and will contact you via ${newLead.contactMethod} shortly.</p>
          <br>
          <p><strong>Consultation Reference:</strong> ${consultationId}</p>
          <p>If you have immediate questions, feel free to reply to this email or reach out on WhatsApp.</p>
          <br>
          <p>Best regards,<br><strong>Digital Marketing TenX Team</strong></p>
        `
      }).catch(err => console.error("Customer Email error:", err));
    });

    return NextResponse.json({ success: true, consultationId, message: "Consultation requested successfully" }, { status: 201 });
  } catch (error) {
    console.error("Consultation API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit request" }, { status: 500 });
  }
}
