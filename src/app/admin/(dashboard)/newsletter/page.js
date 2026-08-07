import NewsletterClient from "./NewsletterClient";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Newsletter Subscribers",
};

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
    redirect("/login");
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Newsletter Subscribers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your mailing list, view details, and export subscribers.</p>
        </div>
      </div>

      <NewsletterClient initialSubscribers={subscribers} />
    </div>
  );
}
