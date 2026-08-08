import React from "react";
import prisma from "@/lib/prisma";
import BlogEnquiriesTable from "./BlogEnquiriesTable";

export const dynamic = "force-dynamic";

export default async function BlogEnquiriesPage({ searchParams }) {
  // Parsing search params
  const { q, status } = await searchParams;
  
  const where = {};
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { subject: { contains: q } },
      { blogTitle: { contains: q } },
    ];
  }
  if (status) {
    where.status = status;
  }

  // Fetch data
  const enquiries = await prisma.blogEnquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Calculate analytics
  const total = await prisma.blogEnquiry.count();
  const today = await prisma.blogEnquiry.count({
    where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Blog Enquiries</h1>
        <div className="flex gap-2">
          {/* Export buttons placeholder */}
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded shadow-sm hover:bg-slate-50 text-sm font-medium">
            Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Enquiries</p>
          <p className="text-3xl font-bold text-slate-800">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Today</p>
          <p className="text-3xl font-bold text-slate-800">{today}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">New / Unread</p>
          <p className="text-3xl font-bold text-slate-800">
            {enquiries.filter(e => e.status === "New").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Conversion Rate (Est.)</p>
          <p className="text-3xl font-bold text-slate-800">
            {total > 0 ? Math.round((enquiries.filter(e => e.status === "Converted").length / total) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <form className="flex items-center space-x-3 w-full max-w-2xl">
            <input
              type="text"
              name="q"
              placeholder="Search by name, email, subject..."
              defaultValue={q}
              className="px-4 py-2 border border-slate-300 rounded text-sm w-full outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              name="status"
              defaultValue={status}
              className="px-4 py-2 border border-slate-300 rounded text-sm bg-white outline-none"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded text-sm font-medium hover:bg-slate-700">
              Filter
            </button>
          </form>
        </div>

        {/* Client Component Table */}
        <BlogEnquiriesTable initialEnquiries={enquiries} />
      </div>
    </div>
  );
}

