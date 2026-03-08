"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function PendingActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => router.push("/")}
        className="w-full py-3 rounded-xl bg-[#2c869a] hover:bg-[#1f5f6e] text-white font-semibold transition-all"
      >
        Kembali ke Beranda
      </button>
      <button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
              },
            },
          });
        }}
        className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold hover:border-red-300 hover:text-red-500 transition-all"
      >
        Keluar
      </button>
    </div>
  );
}
