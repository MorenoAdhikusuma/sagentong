"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Clock, Users } from "lucide-react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

type AuthMode = "role_selection" | "signin" | "signup";
type Role = "perangkat_desa" | "relawan" | null;

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<Role>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setMode("signup");
  };

  return (
    <div className="flex min-h-[calc(100vh-70px)] bg-[#f4f7f6]'] items-center justify-center p-4 sm:p-8">
      {/* Centralized Card Container */}
      <div
        className={`w-full max-w-[1100px] min-h-[650px] bg-white rounded-[32px] shadow-[0px_10px_40px_rgba(44,134,154,0.1)] flex flex-col overflow-hidden transition-all duration-500 ${mode === "signin" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        {/* Form Side */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-6 md:p-12 relative z-10 bg-white">
          <div className="w-full max-w-[450px]">
            {mode === "signin" && <SignInForm onSwitchToSignUp={() => setMode("role_selection")} />}

            {mode === "role_selection" && (
              <div className="py-10 flex flex-col justify-center h-full">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-[28px] font-bold text-[#0f374c]">Daftar Sekarang</h2>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-center mb-1 text-gray-800">
                    Ingin Daftar Sebagai Apa?
                  </h3>
                  <p className="text-center text-gray-500 text-sm mb-6">
                    Pilih salah satu sesuai peran anda
                  </p>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => handleRoleSelect("perangkat_desa")}
                      className="w-full py-4 px-6 rounded-2xl border-2 border-[#2c869a] text-[#2c869a] font-semibold text-lg hover:bg-[#2c869a] hover:text-white transition-all text-left flex justify-between items-center group shadow-sm hover:shadow-md"
                    >
                      Perangkat Desa
                      <div className="w-8 h-8 rounded-full bg-[#2c869a]/10 flex items-center justify-center group-hover:bg-white/20">
                        →
                      </div>
                    </button>
                    <button
                      onClick={() => handleRoleSelect("relawan")}
                      className="w-full py-4 px-6 rounded-2xl border-2 border-[#2c869a] bg-[#2c869a] text-white font-semibold text-lg hover:bg-[#1f5f6e] hover:border-[#1f5f6e] transition-all text-left flex justify-between items-center shadow-md hover:shadow-lg"
                    >
                      Relawan
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        →
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-auto text-center font-medium text-[15px] pt-8">
                  <span className="text-gray-500">Sudah punya akun? </span>
                  <button
                    onClick={() => setMode("signin")}
                    className="text-[#2c869a] hover:text-[#1f5f6e] hover:underline transition"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <SignUpForm
                onSwitchToSignIn={() => setMode("signin")}
                role={role}
                onBack={() => setMode("role_selection")}
              />
            )}
          </div>
        </div>

        {/* Branding Side (Blue) */}
        <div className="hidden lg:flex w-[45%] bg-[#7cc2d1] relative overflow-hidden flex-col justify-center px-12 py-16 text-white transition-all duration-500">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c869a]/90 to-[#1f5f6e]/95 z-0"></div>

          {/* Decor circles */}
          <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[50px] z-0"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#2c869a]/40 blur-[80px] z-0"></div>
          <div className="relative z-10 max-w-md mx-auto mb-12">
            <div className="flex flex-row items-center gap-4 mb-6">
              <div className="bg-white/10 w-17 h-16 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/Logo_SaGentong.svg"
                  alt="SaGentong Logo"
                  className="w-full h-[200%] object-cover object-top brightness-0 invert filter drop-shadow-sm mt-3 scale-110 -translate-y-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[32px] font-bold leading-none tracking-tight">SaGentong</span>
                <span className="text-[13px] opacity-90 mt-1 font-light tracking-wide">
                  Langkah Cepat, Aksi Tepat!
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-[42px] h-[42px] shrink-0 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[17px] mb-1">Transparansi Penyaluran</h4>
                  <p className="text-[13px] opacity-80 font-light leading-relaxed">
                    Pantau jalannya bantuan hingga sampai ke tangan yang tepat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-[42px] h-[42px] shrink-0 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[17px] mb-1">Informasi Terkini</h4>
                  <p className="text-[13px] opacity-80 font-light leading-relaxed">
                    Dapatkan data dan laporan banjir tercepat secara real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-[42px] h-[42px] shrink-0 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[17px] mb-1">Kolaborasi Komunitas</h4>
                  <p className="text-[13px] opacity-80 font-light leading-relaxed">
                    Bergabung bersama relawan dan aparat untuk penanganan efektif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
