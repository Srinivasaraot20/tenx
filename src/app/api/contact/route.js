import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

/**
 * API Route: POST /api/contact
 * Handles contact form submissions and consultation requests.
 * Saves to the database first, then dispatches email and WhatsApp notifications.
 */
export async function POST(request) {
  try {
    const formData = await request.json();

    // Step 1: Validate the Form
    if (!formData.fullName || !formData.email || !formData.phone) {
      return NextResponse.json(
        { success: false, message: "Full Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Capture IP Address and User Agent safely
    let ipAddress = "Unknown";
    let userAgent = "Unknown";
    let referrer = "Direct";

    try {
      const headersList = await headers();
      ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown IP";
      userAgent = headersList.get("user-agent") || "Unknown Browser";
      referrer = headersList.get("referer") || "Direct";
    } catch (e) {
      console.warn("Could not retrieve headers", e);
    }

    // Convert services object to string
    let selectedServices = [];
    if (formData.services) {
      if (formData.services.seo) selectedServices.push("SEO");
      if (formData.services.googleAds) selectedServices.push("Google Ads");
      if (formData.services.websiteDesign) selectedServices.push("Website Design");
      if (formData.services.socialMedia) selectedServices.push("Social Media");
      if (formData.services.ecommerce) selectedServices.push("E-Commerce Marketing");
      if (formData.services.whatsappAutomation) selectedServices.push("WhatsApp Automation");
      if (formData.services.aiAutomation) selectedServices.push("AI Powered Solutions");
    }
    const servicesStr = selectedServices.join(", ");

    // 2. Save to Database
    const newLead = await prisma.lead.create({
      data: {
        fullName: formData.fullName.trim(),
        company: formData.companyName?.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsApp?.trim() || null,
        website: formData.website?.trim() || null,
        city: formData.businessLocation?.trim() || null,
        business: formData.businessType || null,
        country: formData.industry?.trim() || null, 
        budget: formData.budget || null,
        preferredTime: formData.timeline || null, 
        service: servicesStr || null,
        message: formData.projectDescription?.trim() || null,
        contactMethod: formData.contactMethod || null,
        leadType: "Contact", 
        status: "New",
        sourcePage: "Contact Page",
        ip: ipAddress,
        browser: userAgent,
      },
    });

    // 2b. Create Admin Notification
    await prisma.adminNotification.create({
      data: {
        type: "Contact",
        title: "New Contact Request",
        message: `${newLead.fullName} submitted a contact request.`,
        link: "/admin/leads?type=Contact",
      },
    });

    // Step 3-6 handled by DB schema and Admin pages automatically pulling the lead.

    // Step 7: Notifications
    const leadId = newLead.id;

    // Dispatch Emails (Non-blocking but wrapped in try/catch)
    try {
      await sendEmails(newLead, leadId, selectedServices, formData.contactMethod);
    } catch (err) {
      console.error("Email notification failed:", err);
    }

    // Dispatch WhatsApp (Non-blocking but wrapped in try/catch)
    try {
      await sendWhatsApp(newLead, leadId, selectedServices);
    } catch (err) {
      console.error("WhatsApp notification failed:", err);
    }

    // Step 8: Return HTTP 201 Created
    return NextResponse.json(
      { success: true, message: "Consultation request submitted successfully.", leadId },
      { status: 201 }
    );

  } catch (error) {
    // Step 9: Error Handling
    console.error("Error saving lead to database:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit consultation request. Please try again later." },
      { status: 500 }
    );
  }
}

// -- Helper Functions for Notifications --

async function sendEmails(data, leadId, selectedServices, contactMethod) {
  const smtpUser = process.env.SMTP_USER || "digitalmarketingtenx@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "sxgfdhcenwmimhyj";

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const adminEmailBody = `
    New Consultation Request Details:
    ---------------------------------
    Lead ID: ${leadId}
    Full Name: ${data.fullName}
    Company Name: ${data.company || "N/A"}
    Email: ${data.email}
    Phone: ${data.phone}
    WhatsApp: ${data.whatsapp || "N/A"}
    Website: ${data.website || "N/A"}
    Business Location: ${data.city || "N/A"}
    Business Type: ${data.business || "N/A"}
    Industry: ${data.country || "N/A"}
    Marketing Budget: ${data.budget || "N/A"}
    Desired Project Start: ${data.preferredTime || "N/A"}
    Preferred Contact Method: ${contactMethod || "N/A"}
    Services Interested In: ${selectedServices.join(", ") || "None"}
    
    Project Description:
    ${data.message || "None provided"}
    
    Submission Details:
    IP Address: ${data.ip}
    Time: ${new Date(data.createdAt).toUTCString()}
  `;

  // Send to Admin
  await transporter.sendMail({
    from: `"Digital Marketing TenX" <${smtpUser}>`,
    to: "admin@digitalmarketingtenx.com",
    subject: `New Consultation Request - ${data.fullName}`,
    text: adminEmailBody,
  });

  // Send Confirmation to Customer
  const customerEmailBody = `
    Hi ${data.fullName},

    Thank you for requesting a free consultation with Digital Marketing TenX!

    We have successfully received your inquiry. 
    Our team of experts is currently reviewing your requirements and will get back to you shortly via your preferred contact method (${contactMethod || "Email"}).

    If you have any urgent questions, feel free to reply to this email or message us on WhatsApp.

    Best Regards,
    The Digital Marketing TenX Team
  `;

  await transporter.sendMail({
    from: `"Digital Marketing TenX" <${smtpUser}>`,
    to: data.email,
    subject: "Thank You for Contacting Digital Marketing TenX",
    text: customerEmailBody,
  });
}

async function sendWhatsApp(data, leadId, selectedServices) {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;

  const whatsappMsg = [
    `📩 *New Consultation Request*`,
    ``,
    `*Name:* ${data.fullName}`,
    `*Company:* ${data.company || "N/A"}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    `*WhatsApp:* ${data.whatsapp || "N/A"}`,
    ``,
    `*Business Type:* ${data.business || "N/A"}`,
    ``,
    `*Budget:* ${data.budget || "N/A"}`,
    ``,
    `*Services:*`,
    `${selectedServices.join("\\n") || "None selected"}`,
    ``,
    `*Message:*`,
    `${data.message || "None provided"}`,
  ].join("\n");

  if (!apiUrl || !apiToken || !adminPhone) {
    console.log("⚠️ WhatsApp API credentials not found in environment. Skipping actual WhatsApp send.");
    console.log(`[MOCK WHATSAPP NOTIFICATION to ${adminPhone || "Admin"}] \n${whatsappMsg}`);
    return;
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiToken}`
    },
    body: JSON.stringify({
      to: adminPhone,
      message: whatsappMsg
    })
  });
}

