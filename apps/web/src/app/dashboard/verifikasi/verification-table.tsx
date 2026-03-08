"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle, ShieldOff } from "lucide-react";

import { approveUser, rejectUser, revokeVerification } from "./actions";

type PerangkatDesaUser = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  createdAt: Date;
};

export default function VerificationTable({ users }: { users: PerangkatDesaUser[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (
    action: (userId: string) => Promise<{ success: boolean; message: string }>,
    userId: string,
    confirmMessage: string,
  ) => {
    if (!confirm(confirmMessage)) return;

    setLoadingId(userId);
    try {
      const result = await action(userId);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally {
      setLoadingId(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg font-medium">Tidak ada pengguna Perangkat Desa.</p>
        <p className="text-sm mt-1">Belum ada pengguna yang mendaftar sebagai Perangkat Desa.</p>
      </div>
    );
  }

  const pendingUsers = users.filter((u) => !u.verified);
  const verifiedUsers = users.filter((u) => u.verified);

  return (
    <div className="space-y-8">
      {/* Pending Users Section */}
      <div>
        <h2 className="text-lg font-semibold text-[#0f374c] mb-4">
          Menunggu Verifikasi{" "}
          <span className="text-sm font-normal text-gray-400">({pendingUsers.length})</span>
        </h2>
        {pendingUsers.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">Tidak ada pengguna yang menunggu verifikasi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Nama</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Tanggal Daftar</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-sm font-medium text-[#0f374c]">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() =>
                            handleAction(
                              approveUser,
                              user.id,
                              `Verifikasi ${user.name} sebagai Perangkat Desa?`,
                            )
                          }
                          disabled={loadingId === user.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition disabled:opacity-50"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Setujui
                        </button>
                        <button
                          onClick={() =>
                            handleAction(
                              rejectUser,
                              user.id,
                              `Tolak dan hapus akun ${user.name}? Tindakan ini tidak dapat dibatalkan.`,
                            )
                          }
                          disabled={loadingId === user.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Verified Users Section */}
      <div>
        <h2 className="text-lg font-semibold text-[#0f374c] mb-4">
          Sudah Diverifikasi{" "}
          <span className="text-sm font-normal text-gray-400">({verifiedUsers.length})</span>
        </h2>
        {verifiedUsers.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">Belum ada pengguna yang diverifikasi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Nama</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">Tanggal Daftar</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {verifiedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-sm font-medium text-[#0f374c]">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          handleAction(
                            revokeVerification,
                            user.id,
                            `Cabut verifikasi ${user.name}? Pengguna tidak akan bisa mengakses dashboard.`,
                          )
                        }
                        disabled={loadingId === user.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 transition disabled:opacity-50"
                      >
                        <ShieldOff className="w-3.5 h-3.5" />
                        Cabut Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
