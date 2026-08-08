"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown IP";
}

export async function updateEnquiryStatus(id, newStatus) {
  try {
    await verifyAdmin();
    await prisma.blogEnquiry.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/admin/blog-enquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, message: error.message || "Failed to update status" };
  }
}

export async function addEnquiryNotes(id, notes) {
  try {
    await verifyAdmin();
    await prisma.blogEnquiry.update({
      where: { id },
      data: { notes },
    });
    revalidatePath("/admin/blog-enquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to add notes:", error);
    return { success: false, message: error.message || "Failed to add notes" };
  }
}

export async function deleteEnquiry(id) {
  try {
    const admin = await verifyAdmin();
    const ipAddress = await getClientIp();

    await prisma.$transaction([
      prisma.blogEnquiry.delete({
        where: { id },
      }),
      prisma.auditLog.create({
        data: {
          adminId: admin.id || "unknown",
          adminName: admin.name || admin.email || "Admin",
          action: "DELETE_BLOG_ENQUIRY",
          enquiryId: id,
          ipAddress,
        },
      }),
    ]);
    
    // We do not revalidate path here because we're using optimistic UI updates on the client.
    return { success: true };
  } catch (error) {
    console.error("Failed to delete enquiry:", error);
    return { success: false, message: error.message || "Failed to delete enquiry" };
  }
}

export async function bulkDeleteEnquiries(ids) {
  try {
    const admin = await verifyAdmin();
    const ipAddress = await getClientIp();

    const auditLogs = ids.map((id) => ({
      adminId: admin.id || "unknown",
      adminName: admin.name || admin.email || "Admin",
      action: "BULK_DELETE_BLOG_ENQUIRY",
      enquiryId: id,
      ipAddress,
    }));

    await prisma.$transaction([
      prisma.blogEnquiry.deleteMany({
        where: {
          id: { in: ids },
        },
      }),
      prisma.auditLog.createMany({
        data: auditLogs,
      }),
    ]);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to bulk delete:", error);
    return { success: false, message: error.message || "Failed to bulk delete" };
  }
}

export async function bulkUpdateEnquiryStatus(ids, status) {
  try {
    await verifyAdmin();
    await prisma.blogEnquiry.updateMany({
      where: {
        id: { in: ids },
      },
      data: { status },
    });
    revalidatePath("/admin/blog-enquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to bulk update status:", error);
    return { success: false, message: error.message || "Failed to bulk update status" };
  }
}

