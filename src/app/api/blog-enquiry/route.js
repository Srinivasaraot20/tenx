import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { sendAdminEmailNotification, sendUserAutoReply, sendWhatsAppNotification } from '@/lib/notifications';

const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number is too short").max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  blogTitle: z.string(),
  blogUrl: z.string(),
  sourcePage: z.string(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = enquirySchema.parse(body);

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || 'Unknown IP';

    // 1. Save to Database
    const newEnquiry = await prisma.blogEnquiry.create({
      data: {
        ...validatedData,
        ip,
      },
    });

    // 2. Create Admin Notification
    await prisma.adminNotification.create({
      data: {
        type: "BlogEnquiry",
        title: "New Blog Enquiry",
        message: `${newEnquiry.fullName} sent an enquiry regarding "${newEnquiry.blogTitle}".`,
        link: "/admin/blog-enquiries",
      },
    });

    // 3. Send Email Notification
    import('@/lib/email').then(({ sendEmail }) => {
      sendEmail({
        to: 'digitalmarketingtenx@gmail.com',
        subject: `New Blog Enquiry: ${newEnquiry.subject}`,
        html: `
          <h3>New Blog Enquiry</h3>
          <p><strong>Name:</strong> ${newEnquiry.fullName}</p>
          <p><strong>Email:</strong> ${newEnquiry.email}</p>
          <p><strong>Phone:</strong> ${newEnquiry.phone}</p>
          <p><strong>Blog Title:</strong> ${newEnquiry.blogTitle}</p>
          <p><strong>Message:</strong> ${newEnquiry.message}</p>
        `
      }).catch(err => console.error("Email notification error:", err));
    });

    // Run other notifications asynchronously without blocking the response
    Promise.all([
      sendUserAutoReply(newEnquiry),
      sendWhatsAppNotification(newEnquiry),
    ]).catch((err) => {
      console.error("Error running background notifications:", err);
    });

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error("Blog Enquiry Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

