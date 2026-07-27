import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, subscribers });
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and Status are required' }, { status: 400 });
    }

    const updatedSubscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, subscriber: updatedSubscriber });
  } catch (error) {
    console.error('Update subscriber error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update subscriber' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, error: 'No IDs provided' }, { status: 400 });
    }

    const result = await prisma.newsletterSubscriber.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({ success: true, message: `Deleted ${result.count} subscribers` });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete subscribers' }, { status: 500 });
  }
}
