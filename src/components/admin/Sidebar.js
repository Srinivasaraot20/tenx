"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  PhoneCall, 
  FileText, 
  BarChart, 
  Globe, 
  Mail, 
  Users, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Enquiries", href: "/admin/blog-enquiries", icon: FileText },
    { name: "Consultations", href: "/admin/leads?type=Consultation", icon: PhoneCall },
    { name: "Contact Requests", href: "/admin/leads?type=Contact", icon: MessageSquare },
    { name: "Quote Requests", href: "/admin/leads?type=Quote", icon: FileText },
    { name: "SEO Audit Requests", href: "/admin/leads?type=SEO Audit", icon: BarChart },
    { name: "Website Audit Requests", href: "/admin/leads?type=Website Audit", icon: Globe },
    { name: "Newsletter Subscribers", href: "/admin/newsletter", icon: Mail },
    { name: "Blog Comments", href: "/admin/comments", icon: MessageSquare },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed top-0 left-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-xl font-bold text-white tracking-tight">TenX<span className="text-primary">Admin</span></h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/admin/leads') && item.href.startsWith('/admin/leads?'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
