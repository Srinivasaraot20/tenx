"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, TrendingUp, Mail, FileText, Globe, Loader2, AlertCircle, 
  PhoneCall, Layout, Briefcase, Plus, UserPlus, FilePlus, Download 
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center space-x-4">
    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClass}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center space-x-2 mb-4 border-b border-slate-100 pb-2">
    <Icon className="h-5 w-5 text-slate-400" />
    <h2 className="text-lg font-bold text-slate-700">{title}</h2>
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "Unknown error occurred");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-slate-500 font-medium">Loading comprehensive dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="bg-red-50 border border-red-100 rounded-xl p-8 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { stats, recentActivity, chartData, pieData, statusDistribution } = data;
  const PIE_COLORS = ['#f97316', '#1d4ed8'];
  const STATUS_COLORS = ['#1d4ed8', '#f59e0b', '#8b5cf6', '#10b981'];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time statistics from your database.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/leads?type=Consultation" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" /> View Consultations
          </Link>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Leads & Enquiries */}
        <div className="xl:col-span-2 space-y-4">
          <SectionHeader title="Leads & Enquiries" icon={TrendingUp} />
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Total Leads" value={stats.totalLeads} icon={TrendingUp} colorClass="bg-orange-100 text-orange-600" />
            <StatCard title="Consultation Leads" value={stats.totalConsultations} icon={FileText} colorClass="bg-blue-100 text-blue-600" />
            <StatCard title="Contact Leads" value={stats.totalContactLeads} icon={PhoneCall} colorClass="bg-emerald-100 text-emerald-600" />
            <StatCard title="Blog Enquiries" value={stats.totalBlogEnquiries} icon={Mail} colorClass="bg-purple-100 text-purple-600" />
          </div>
        </div>

        {/* Website Content */}
        <div className="xl:col-span-2 space-y-4">
          <SectionHeader title="Website Content" icon={Layout} />
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Total Blogs" value={stats.totalBlogPosts} icon={FileText} colorClass="bg-slate-100 text-slate-600" />
            <StatCard title="Published Blogs" value={stats.publishedBlogs} icon={Globe} colorClass="bg-slate-100 text-slate-600" />
            <StatCard title="Total Services" value={stats.services} icon={Briefcase} colorClass="bg-slate-100 text-slate-600" />
            <StatCard title="Subscribers" value={stats.totalSubscribers} icon={Mail} colorClass="bg-pink-100 text-pink-600" />
          </div>
        </div>

        {/* User Management */}
        <div className="xl:col-span-2 space-y-4">
          <SectionHeader title="User Management" icon={Users} />
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Total Users" value={stats.totalUsers} icon={Users} colorClass="bg-indigo-100 text-indigo-600" />
            <StatCard title="Admin Users" value={stats.adminUsers} icon={Users} colorClass="bg-rose-100 text-rose-600" />
            <StatCard title="Active Users" value={stats.activeUsers} icon={Users} colorClass="bg-teal-100 text-teal-600" />
            <StatCard title="Inactive Users" value={stats.inactiveUsers} icon={Users} colorClass="bg-slate-100 text-slate-400" />
          </div>
        </div>

        {/* Sales Pipeline */}
        <div className="xl:col-span-2 space-y-4">
          <SectionHeader title="Sales Pipeline" icon={TrendingUp} />
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="New Leads" value={stats.pipeline.new} icon={TrendingUp} colorClass="bg-blue-100 text-blue-600" />
            <StatCard title="Contacted" value={stats.pipeline.contacted} icon={PhoneCall} colorClass="bg-yellow-100 text-yellow-600" />
            <StatCard title="In Progress" value={stats.pipeline.inProgress} icon={FileText} colorClass="bg-purple-100 text-purple-600" />
            <StatCard title="Closed" value={stats.pipeline.closed} icon={TrendingUp} colorClass="bg-green-100 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Leads by Month Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-[400px] flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4">Leads Over Time (Last 30 Days)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Bar dataKey="leads" name="Total Leads" fill="#f97316" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Types Pie Chart & Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-[250px] flex flex-col">
            <h3 className="font-bold text-slate-800 mb-2">Lead Types</h3>
            <div className="flex-1 min-h-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex-1">
            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/leads?type=All" className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium text-center">
                <FileText className="w-5 h-5 mb-1 text-primary" /> View All Leads
              </Link>
              <Link href="/admin/users" className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium text-center">
                <UserPlus className="w-5 h-5 mb-1 text-blue-500" /> Manage Users
              </Link>
              <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium text-center opacity-50 cursor-not-allowed">
                <FilePlus className="w-5 h-5 mb-1 text-slate-400" /> Add Blog
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium text-center opacity-50 cursor-not-allowed">
                <Plus className="w-5 h-5 mb-1 text-slate-400" /> Add Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-[500px]">
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
          
          {!recentActivity || recentActivity.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <p>No recent activity.</p>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 pb-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-primary font-medium">
                    {activity.type === 'CONTACT_LEAD' && <PhoneCall className="h-5 w-5" />}
                    {activity.type === 'CONSULTATION' && <TrendingUp className="h-5 w-5" />}
                    {activity.type === 'BLOG_ENQUIRY' && <FileText className="h-5 w-5" />}
                    {activity.type === 'SUBSCRIBER' && <Mail className="h-5 w-5" />}
                    {activity.type === 'USER' && <Users className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate" title={activity.title}>
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate" title={activity.description}>
                      {activity.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lead Status Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-[500px]">
          <h3 className="font-bold text-slate-800 mb-4">Pipeline Status</h3>
          <div className="flex-1 min-h-0 relative flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#334155', fontWeight: 500 }} width={80} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" name="Count" radius={[0, 4, 4, 0]} barSize={24}>
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

