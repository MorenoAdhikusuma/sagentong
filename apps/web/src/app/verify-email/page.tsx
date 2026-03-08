"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

import Header from "@/components/header";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const isError = !!error;

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center p-4 sm:p-8 bg-[#f4f7f6]">
        <div className="w-full max-w-md bg-white rounded-[28px] shadow-[0px_8px_32px_rgba(44,134,154,0.08)] p-10 text-center">
          {isError ? (
            <>
              <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-8 ring-1 ring-red-200/60">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>

              <h1 className="text-[24px] font-bold text-[#0f374c] mb-3">Verifikasi Gagal</h1>

              <p className="text-gray-500 text-[15px] mb-8 max-w-[320px] mx-auto leading-relaxed">
                {error === "invalid_token"
                  ? "Link verifikasi tidak valid atau sudah kedaluwarsa. Silakan minta link verifikasi baru."
                  : "Terjadi kesalahan saat memverifikasi email Anda. Silakan coba lagi."}
              </p>

              <Link
                href="/login"
                className="inline-block w-full py-3.5 rounded-xl bg-[#2c869a] hover:bg-[#1f5f6e] text-white font-semibold transition-all shadow-md hover:shadow-lg text-[15px]"
              >
                Kembali ke Halaman Masuk
              </Link>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-8 ring-1 ring-emerald-200/60">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>

              <h1 className="text-[24px] font-bold text-[#0f374c] mb-3">Email Terverifikasi!</h1>

              <p className="text-gray-500 text-[15px] mb-8 max-w-[320px] mx-auto leading-relaxed">
                Akun Anda telah berhasil diverifikasi. Anda sekarang dapat masuk ke dashboard
                SaGentong.
              </p>

              <Link
                href="/dashboard"
                className="inline-block w-full py-3.5 rounded-xl bg-[#2c869a] hover:bg-[#1f5f6e] text-white font-semibold transition-all shadow-md hover:shadow-lg text-[15px]"
              >
                Masuk ke Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <div className="flex min-h-[calc(100vh-70px)] items-center justify-center p-4 bg-[#f4f7f6]">
            <div className="w-full max-w-md bg-white rounded-[28px] shadow-[0px_8px_32px_rgba(44,134,154,0.08)] p-10 text-center">
              <Loader2 className="w-10 h-10 text-[#2c869a] animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-[15px]">Memverifikasi email...</p>
            </div>
          </div>
        </>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
