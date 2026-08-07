import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost", "Closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
    }

    const existingLead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!existingLead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status }
    });

    // Capture IP
    let ipAddress = "Unknown";
    try {
      const headersList = await headers();
      ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
    } catch (e) {
      // ignore
    }

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        adminName: session.user.name || session.user.email,
        action: `Status Change: ${existingLead.status} -> ${status}`,
        enquiryId: id,
        ipAddress,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Lead status updated successfully.',
      status: updatedLead.status
    });
  } catch (error) {
    console.error('Update status error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
  }
}
