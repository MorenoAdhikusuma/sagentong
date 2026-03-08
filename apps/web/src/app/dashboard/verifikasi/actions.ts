"use server";

import { auth } from "@sagentong/auth";
import { db } from "@sagentong/db";
import { user } from "@sagentong/db/schema/auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireSuperadmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "superadmin") {
    throw new Error("Unauthorized: Only superadmin can perform this action.");
  }

  return session;
}

export async function approveUser(userId: string) {
  await requireSuperadmin();

  await db
    .update(user)
    .set({ verified: true })
    .where(and(eq(user.id, userId), eq(user.role, "perangkat_desa")));

  revalidatePath("/dashboard/verifikasi");
  return { success: true, message: "Pengguna berhasil diverifikasi." };
}

export async function rejectUser(userId: string) {
  await requireSuperadmin();

  // Delete the user account entirely (cascades to sessions and accounts)
  await db.delete(user).where(and(eq(user.id, userId), eq(user.role, "perangkat_desa")));

  revalidatePath("/dashboard/verifikasi");
  return { success: true, message: "Pengguna berhasil ditolak dan dihapus." };
}

export async function revokeVerification(userId: string) {
  await requireSuperadmin();

  await db
    .update(user)
    .set({ verified: false })
    .where(and(eq(user.id, userId), eq(user.role, "perangkat_desa")));

  revalidatePath("/dashboard/verifikasi");
  return { success: true, message: "Verifikasi pengguna berhasil dicabut." };
}
