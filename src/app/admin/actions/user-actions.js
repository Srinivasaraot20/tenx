"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
import bcrypt from "bcrypt";

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

async function logAuditAction(admin, action, targetUserId) {
  const ipAddress = await getClientIp();
  await prisma.auditLog.create({
    data: {
      adminId: admin.id || "unknown",
      adminName: admin.name || admin.email || "Admin",
      action,
      targetUserId,
      ipAddress,
    },
  });
}

export async function createUser(data) {
  try {
    const admin = await verifyAdmin();
    
    // Check for unique email
    if (data.email) {
      const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingEmail) throw new Error("Email already in use.");
    }

    // Check for unique username
    if (data.username) {
      const existingUsername = await prisma.user.findUnique({ where: { username: data.username } });
      if (existingUsername) throw new Error("Username already taken.");
    }

    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role || "user",
        status: data.status || "Active",
      },
    });

    await logAuditAction(admin, "CREATE_USER", newUser.id);
    revalidatePath("/admin/users");
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, message: error.message || "Failed to create user." };
  }
}

export async function updateUser(id, data) {
  try {
    const admin = await verifyAdmin();

    // Prevent changing own role or deactivating self
    if (id === admin.id) {
      if (data.role && data.role !== admin.role) throw new Error("You cannot change your own role.");
      if (data.status && data.status !== "Active") throw new Error("You cannot deactivate your own account.");
    }

    // Check unique email (excluding self)
    if (data.email) {
      const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingEmail && existingEmail.id !== id) throw new Error("Email already in use.");
    }

    // Check unique username (excluding self)
    if (data.username) {
      const existingUsername = await prisma.user.findUnique({ where: { username: data.username } });
      if (existingUsername && existingUsername.id !== id) throw new Error("Username already taken.");
    }

    const updateData = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    let actionName = "UPDATE_USER";
    if (data.status) actionName = "UPDATE_USER_STATUS";
    if (data.role) actionName = "UPDATE_USER_ROLE";

    await logAuditAction(admin, actionName, id);
    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, message: error.message || "Failed to update user." };
  }
}

export async function deleteUser(id) {
  try {
    const admin = await verifyAdmin();

    if (id === admin.id) {
      throw new Error("You cannot delete your own account.");
    }

    await prisma.$transaction([
      prisma.user.delete({ where: { id } }),
      prisma.auditLog.create({
        data: {
          adminId: admin.id || "unknown",
          adminName: admin.name || admin.email || "Admin",
          action: "DELETE_USER",
          targetUserId: id,
          ipAddress: await getClientIp(),
        },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, message: error.message || "Failed to delete user." };
  }
}

export async function bulkDeleteUsers(ids) {
  try {
    const admin = await verifyAdmin();
    
    if (ids.includes(admin.id)) {
      throw new Error("You cannot delete your own account.");
    }

    const ipAddress = await getClientIp();

    const auditLogs = ids.map((id) => ({
      adminId: admin.id || "unknown",
      adminName: admin.name || admin.email || "Admin",
      action: "BULK_DELETE_USER",
      targetUserId: id,
      ipAddress,
    }));

    await prisma.$transaction([
      prisma.user.deleteMany({
        where: { id: { in: ids } },
      }),
      prisma.auditLog.createMany({
        data: auditLogs,
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Failed to bulk delete users:", error);
    return { success: false, message: error.message || "Failed to bulk delete users." };
  }
}

export async function bulkUpdateUserStatus(ids, status) {
  try {
    const admin = await verifyAdmin();

    if (ids.includes(admin.id) && status !== "Active") {
      throw new Error("You cannot change the status of your own account.");
    }

    const ipAddress = await getClientIp();

    const auditLogs = ids.map((id) => ({
      adminId: admin.id || "unknown",
      adminName: admin.name || admin.email || "Admin",
      action: "BULK_UPDATE_USER_STATUS",
      targetUserId: id,
      ipAddress,
    }));

    await prisma.$transaction([
      prisma.user.updateMany({
        where: { id: { in: ids } },
        data: { status },
      }),
      prisma.auditLog.createMany({
        data: auditLogs,
      }),
    ]);

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to bulk update user status:", error);
    return { success: false, message: error.message || "Failed to bulk update status." };
  }
}
