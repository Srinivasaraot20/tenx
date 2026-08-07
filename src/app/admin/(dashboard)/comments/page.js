import CommentsClient from "./CommentsClient";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - Blog Comments",
};

export const dynamic = "force-dynamic";

export default async function CommentsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'superadmin')) {
    redirect("/login");
  }

  const comments = await prisma.blogComment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog Comments</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and moderate user comments on your blog posts.</p>
        </div>
      </div>

      <CommentsClient initialComments={comments} />
    </div>
  );
}
