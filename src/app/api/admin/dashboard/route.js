import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch exact counts
    const [
      totalLeads,
      totalContactLeads,
      totalConsultations,
      totalBlogEnquiries,
      totalSubscribers,
      totalComments,
      totalUsers,
      adminUsers,
      activeUsers,
      inactiveUsers,
      newLeads,
      contactedLeads,
      inProgressLeads,
      closedLeads
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { leadType: "Contact" } }),
      prisma.lead.count({ where: { leadType: "Consultation" } }),
      prisma.blogEnquiry.count(),
      prisma.newsletterSubscriber.count(),
      prisma.blogComment.count(),
      prisma.user.count(),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.user.count({ where: { status: "Active" } }),
      prisma.user.count({ where: { status: "Inactive" } }),
      prisma.lead.count({ where: { status: "New" } }),
      prisma.lead.count({ where: { status: "Contacted" } }),
      prisma.lead.count({ where: { status: "In Progress" } }),
      prisma.lead.count({ where: { status: "Closed" } }),
    ]);

    // 2. Fetch recent activities
    const [recentContactLeads, recentConsultations, recentBlogEnquiries, recentSubscribers, recentComments, recentUsers, recentStatusChanges] = await Promise.all([
      prisma.lead.findMany({
        where: { leadType: "Contact" },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, fullName: true, createdAt: true }
      }),
      prisma.lead.findMany({
        where: { leadType: "Consultation" },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, fullName: true, company: true, createdAt: true }
      }),
      prisma.blogEnquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, fullName: true, blogTitle: true, createdAt: true }
      }),
      prisma.newsletterSubscriber.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, createdAt: true }
      }),
      prisma.blogComment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, blogSlug: true, createdAt: true }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
      }),
      prisma.auditLog.findMany({
        where: { action: { startsWith: 'Status Change:' } },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, action: true, enquiryId: true, adminName: true, createdAt: true }
      })
    ]);

    const recentActivity = [
      ...recentContactLeads.map(l => ({
        id: l.id,
        type: 'CONTACT_LEAD',
        title: `New contact enquiry received`,
        description: `From: ${l.fullName}`,
        createdAt: l.createdAt
      })),
      ...recentConsultations.map(c => ({
        id: c.id,
        type: 'CONSULTATION',
        title: `New consultation request received`,
        description: `From: ${c.fullName}`,
        createdAt: c.createdAt
      })),
      ...recentBlogEnquiries.map(b => ({
        id: b.id,
        type: 'BLOG_ENQUIRY',
        title: `New blog enquiry`,
        description: `From: ${b.fullName} on "${b.blogTitle}"`,
        createdAt: b.createdAt
      })),
      ...recentSubscribers.map(s => ({
        id: s.id,
        type: 'SUBSCRIBER',
        title: `New newsletter subscriber`,
        description: s.email,
        createdAt: s.createdAt
      })),
      ...recentComments.map(c => ({
        id: c.id,
        type: 'COMMENT',
        title: `New blog comment`,
        description: `By: ${c.name} ${c.blogSlug ? `on ${c.blogSlug}` : ''}`,
        createdAt: c.createdAt
      })),
      ...recentUsers.map(u => ({
        id: u.id,
        type: 'USER',
        title: `New user registered`,
        description: `${u.name || 'User'} (${u.email})`,
        createdAt: u.createdAt
      })),
      ...recentStatusChanges.map(a => ({
        id: a.id,
        type: 'STATUS_CHANGE',
        title: `Lead status updated by ${a.adminName}`,
        description: `Lead ${a.enquiryId}: ${a.action.replace('Status Change: ', '')}`,
        createdAt: a.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    // 3. Generate Chart Data
    
    // a) Leads by Month (last 6 months)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Quick grouping for Leads by Month (simple approximation for Recharts)
    const leadsLast30Days = await prisma.lead.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true }
    });

    // Group leads by date
    const leadsByDate = leadsLast30Days.reduce((acc, lead) => {
      const dateStr = lead.createdAt.toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    // Create array of last 30 days
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      chartData.push({
        date: dateStr,
        leads: leadsByDate[dateStr] || 0
      });
    }

    // b) Consultation vs Contact pie chart
    const pieData = [
      { name: "Consultation", value: totalConsultations },
      { name: "Contact", value: totalContactLeads }
    ];

    // c) Status Distribution
    const statusDistribution = [
      { name: "New", value: newLeads },
      { name: "Contacted", value: contactedLeads },
      { name: "In Progress", value: inProgressLeads },
      { name: "Closed", value: closedLeads }
    ];

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalLeads,
          totalContactLeads,
          totalConsultations,
          totalBlogEnquiries,
          totalSubscribers,
          totalComments,
          totalBlogPosts: 0,
          publishedBlogs: 0,
          draftBlogs: 0,
          blogCategories: 0,
          services: 0,
          serviceCategories: 0,
          totalUsers,
          adminUsers,
          activeUsers,
          inactiveUsers,
          totalContactMessages: totalContactLeads + totalConsultations + totalBlogEnquiries,
          pipeline: {
            new: newLeads,
            contacted: contactedLeads,
            inProgress: inProgressLeads,
            closed: closedLeads
          }
        },
        recentActivity,
        chartData,
        pieData,
        statusDistribution
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ success: false, error: "Failed to load dashboard data" }, { status: 500 });
  }
}
