import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const unreadNotifications = await prisma.adminNotification.findMany({
      where: { status: 'Unread' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const unreadCount = await prisma.adminNotification.count({
      where: { status: 'Unread' },
    });

    return NextResponse.json({ success: true, notifications: unreadNotifications, unreadCount });
  } catch (error) {
    console.error('Fetch notifications error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id, markAllRead } = await req.json();

    if (markAllRead) {
      await prisma.adminNotification.updateMany({
        where: { status: 'Unread' },
        data: { status: 'Read' }
      });
      return NextResponse.json({ success: true, message: 'All marked as read' });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const updated = await prisma.adminNotification.update({
      where: { id },
      data: { status: 'Read' }
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update notification' }, { status: 500 });
  }
}
