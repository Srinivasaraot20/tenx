import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        fullName: body.name || body.fullName || 'Anonymous',
        email: body.email || '',
        phone: body.phone || '',
        company: body.company || null,
        website: body.website || null,
        budget: body.budget || null,
        service: body.service || null,
        message: body.message || null,
        sourcePage: body.sourcePage || 'Website Form',
      }
    });

    // Send email notification
    import('@/lib/email').then(({ sendEmail }) => {
      sendEmail({
        to: 'digitalmarketingtenx@gmail.com',
        subject: `New Lead: ${lead.fullName}`,
        html: `
          <h3>New Lead Submission</h3>
          <p><strong>Name:</strong> ${lead.fullName}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
          <p><strong>Service:</strong> ${lead.service || 'N/A'}</p>
          <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
        `
      }).catch(err => console.error("Email notification error:", err));
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // 1. Authenticate and Authorize
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin' && session.user.role !== 'superadmin') {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    const adminId = session.user.id;
    const adminName = session.user.name || session.user.email;

    // 2. Parse Payload
    const body = await req.json();
    const { leadIds } = body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json({ success: false, error: 'No lead IDs provided for deletion.' }, { status: 400 });
    }

    // Capture IP safely
    let ipAddress = "Unknown";
    try {
      const headersList = await headers();
      ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
    } catch (e) {
      // Ignore header parsing errors
    }

    // 3. Delete from Database
    const deleteResult = await prisma.lead.deleteMany({
      where: {
        id: {
          in: leadIds,
        },
      },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json({ success: false, error: 'No records found to delete.' }, { status: 404 });
    }

    // 4. Create Audit Logs
    const auditLogs = leadIds.map(id => ({
      adminId,
      adminName,
      action: "Deleted Lead / Consultation",
      enquiryId: id, // Re-using enquiryId column for lead id in AuditLog
      ipAddress,
    }));

    await prisma.auditLog.createMany({
      data: auditLogs
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${deleteResult.count} lead(s).` 
    });

  } catch (error) {
    console.error('Lead deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while deleting leads.' },
      { status: 500 }
    );
  }
}
