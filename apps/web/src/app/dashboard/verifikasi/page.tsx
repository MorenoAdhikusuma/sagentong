import { auth } from "@sagentong/auth";
import { db } from "@sagentong/db";
import { user } from "@sagentong/db/schema/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import VerificationTable from "./verification-table";

export default async function VerifikasiPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Only superadmin can access this page
  if (session.user.role !== "superadmin") {
    redirect("/dashboard");
  }

  // Fetch all perangkat_desa users
  const perangkatDesaUsers = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.role, "perangkat_desa"))
    .orderBy(user.createdAt);

  return (
    <div className="min-h-screen bg-[#f4f7f6]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#2c869a] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2c869a]/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#2c869a]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0f374c]">Verifikasi Perangkat Desa</h1>
              <p className="text-sm text-gray-400">
                Kelola dan verifikasi akun Perangkat Desa yang terdaftar.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <VerificationTable users={perangkatDesaUsers} />
        </div>
      </div>
    </div>
  );
}
