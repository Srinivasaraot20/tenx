import nodemailer from "nodemailer";
import twilio from "twilio";
// Fallback to ethereal email or console logs if env vars are missing for testing
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendAdminEmailNotification(enquiry) {
  try {
    const htmlContent = `
      <h2>New Blog Enquiry Received</h2>
      <p><strong>Name:</strong> ${enquiry.fullName}</p>
      <p><strong>Phone:</strong> ${enquiry.phone}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Blog Title:</strong> ${enquiry.blogTitle}</p>
      <p><strong>Subject:</strong> ${enquiry.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${enquiry.message}</p>
      <br />
      <p><strong>Submitted At:</strong> ${new Date(enquiry.createdAt).toLocaleString()}</p>
      <p><strong>Source URL:</strong> ${enquiry.sourcePage}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || '"Digital Marketing TenX" <noreply@digitalmarketingtenx.com>',
      to: process.env.ADMIN_EMAIL || "info@digitalmarketingtenx.com",
      subject: "New Blog Enquiry Received - " + enquiry.subject,
      html: htmlContent,
    });
    console.log("Admin email sent for enquiry:", enquiry.id);
  } catch (error) {
    console.error("Failed to send admin email notification:", error);
  }
}

export async function sendUserAutoReply(enquiry) {
  try {
    const htmlContent = `
      <h3>Thank you for reaching out to Digital Marketing TenX!</h3>
      <p>Hi ${enquiry.fullName},</p>
      <p>We have received your enquiry regarding "<strong>${enquiry.subject}</strong>".</p>
      <p>Our team will review your message and contact you shortly.</p>
      <br/>
      <p>Best Regards,</p>
      <p><strong>Digital Marketing TenX Team</strong></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || '"Digital Marketing TenX" <noreply@digitalmarketingtenx.com>',
      to: enquiry.email,
      subject: "We received your enquiry - Digital Marketing TenX",
      html: htmlContent,
    });
    console.log("Auto-reply email sent to:", enquiry.email);
  } catch (error) {
    console.error("Failed to send user auto-reply:", error);
  }
}

export async function sendWhatsAppNotification(enquiry) {
  try {
    // Placeholder for actual WhatsApp Business API integration (e.g. Meta Graph API, Twilio)
    // For now, we just log it. You can replace this with actual HTTP requests to your WhatsApp provider.
    const message = `
*New Blog Enquiry*
*Name:* ${enquiry.fullName}
*Phone:* ${enquiry.phone}
*Email:* ${enquiry.email}
*Subject:* ${enquiry.subject}
*Message:* ${enquiry.message}
*Blog:* ${enquiry.blogTitle}
*Time:* ${new Date(enquiry.createdAt).toLocaleString()}
    `.trim();

    console.log("WhatsApp Notification Triggered:");
    console.log(message);
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (!accountSid || !authToken) {
      console.warn("Twilio credentials missing. Skipping WhatsApp notification.");
      return;
    }

    const client = twilio(accountSid, authToken);
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886';
    const toNumber = process.env.ADMIN_WHATSAPP_NUMBER;

    if (!toNumber) {
      console.warn("ADMIN_WHATSAPP_NUMBER is missing. Skipping WhatsApp notification.");
      return;
    }

    await client.messages.create({
       body: message,
       from: fromNumber.startsWith('whatsapp:') ? fromNumber : `whatsapp:${fromNumber}`,
       to: toNumber.startsWith('whatsapp:') ? toNumber : `whatsapp:${toNumber}`
     });
     console.log("WhatsApp message sent via Twilio!");
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
  }
}
