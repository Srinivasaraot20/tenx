import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    // 1. Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: 'Invalid email format.' }, { status: 400 });
    }

    // 2. Check for duplicates
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existingSubscriber) {
      return NextResponse.json({ success: false, error: 'This email is already subscribed.' }, { status: 409 });
    }

    // 3. Extract Tracking Data
    let ipAddress = 'Unknown';
    let userAgent = 'Unknown';
    let referrer = 'Direct';

    try {
      const headersList = await headers();
      ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown';
      userAgent = headersList.get('user-agent') || 'Unknown';
      referrer = headersList.get('referer') || 'Direct';
    } catch (e) {
      // Ignore header parsing errors safely
    }

    // 4. Generate custom ID
    const count = await prisma.newsletterSubscriber.count();
    const paddedNumber = String(count + 1).padStart(6, '0');
    const subscriberId = `DMTX-NEWS-${paddedNumber}`;

    // 5. Save to Database
    const newSubscriber = await prisma.newsletterSubscriber.create({
      data: {
        subscriberId,
        email: cleanEmail,
        status: 'Subscribed',
        source: 'Homepage Newsletter',
        ipAddress,
        userAgent,
        referrer,
      }
    });

    // 5b. Create Admin Notification
    await prisma.adminNotification.create({
      data: {
        type: "Newsletter",
        title: "New Newsletter Subscriber",
        message: `${cleanEmail} subscribed to the newsletter.`,
        link: "/admin/newsletter",
      },
    });

    // Send Welcome Email / Notify Admin
    import('@/lib/email').then(({ sendEmail }) => {
      // Notify Admin
      sendEmail({
        to: 'digitalmarketingtenx@gmail.com',
        subject: `New Newsletter Subscriber: ${cleanEmail}`,
        html: `
          <h3>New Newsletter Subscriber</h3>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Subscriber ID:</strong> ${subscriberId}</p>
        `
      }).catch(err => console.error("Admin email notification error:", err));
      
      // Welcome Email to Subscriber
      sendEmail({
        to: cleanEmail,
        subject: `Welcome to Digital Marketing TenX Newsletter!`,
        html: `
          <h3>Welcome!</h3>
          <p>Thank you for subscribing to our newsletter. We'll send you our latest marketing tips and updates soon!</p>
        `
      }).catch(err => console.error("Subscriber email notification error:", err));
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Newsletter subscription successful.', 
      subscriberId: newSubscriber.subscriberId 
    }, { status: 201 });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

