import { auth } from "@sagentong/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import Dashboard from "./dashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Unverified perangkat_desa users must wait for superadmin approval
  if (session.user.role === "perangkat_desa" && !session.user.verified) {
    redirect("/dashboard/pending");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user.name}</p>

      {session.user.role === "superadmin" && (
        <div className="mt-4">
          <Link
            href="/dashboard/verifikasi"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2c869a] text-white font-semibold hover:bg-[#1f5f6e] transition-all text-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Kelola Verifikasi Perangkat Desa
          </Link>
        </div>
      )}

      <Dashboard session={session} />
    </div>
  );
}
