import React from "react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      image: true,
      lastLogin: true,
      createdAt: true,
    }
  });

  // Calculate statistics
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    admins: users.filter((u) => u.role === "admin" || u.role === "Super Admin").length,
    newUsers: users.filter((u) => new Date(u.createdAt) >= thirtyDaysAgo).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <nav className="text-sm text-slate-500 mt-1 flex items-center space-x-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-slate-700">Users</span>
          </nav>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Active Users</p>
          <p className="text-2xl font-bold text-slate-800">{stats.active}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Inactive</p>
          <p className="text-2xl font-bold text-slate-800">{stats.inactive}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Admin Roles</p>
          <p className="text-2xl font-bold text-slate-800">{stats.admins}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">New (30 Days)</p>
          <p className="text-2xl font-bold text-slate-800">{stats.newUsers}</p>
        </div>
      </div>

      <UsersClient initialUsers={users} />
    </div>
  );
}
