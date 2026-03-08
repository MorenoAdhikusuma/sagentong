import { auth } from "@sagentong/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Clock } from "lucide-react";

import PendingActions from "./pending-actions";

export default async function PendingVerificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // If the user is already verified or not perangkat_desa, redirect to dashboard
  if (session.user.role !== "perangkat_desa" || session.user.verified) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-[#0f374c] mb-3">Menunggu Verifikasi</h1>

        <p className="text-gray-500 mb-2">
          Akun Anda sebagai <span className="font-semibold text-[#2c869a]">Perangkat Desa</span>{" "}
          sedang menunggu verifikasi dari administrator.
        </p>

        <p className="text-gray-400 text-sm mb-8">
          Anda akan mendapatkan akses ke dashboard setelah akun Anda diverifikasi oleh Super Admin.
          Silakan cek kembali secara berkala.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Nama:</span> {session.user.name}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Email:</span> {session.user.email}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Status:</span>{" "}
            <span className="text-amber-600 font-medium">Menunggu Verifikasi</span>
          </p>
        </div>

        <PendingActions />
      </div>
    </div>
  );
}
