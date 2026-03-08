import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Mail, Lock, EyeOff, Eye, RefreshCw, ArrowLeft } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInForm({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Masuk berhasil");
          },
          onError: (error) => {
            if (error.error.status === 403) {
              // Email not verified — show verification prompt
              setUnverifiedEmail(value.email);
              setEmailNotVerified(true);
            } else {
              toast.error(error.error.message || error.error.statusText);
            }
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Format email tidak valid"),
        password: z.string().min(8, "Password minimal 8 karakter"),
      }),
    },
  });

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    try {
      await authClient.sendVerificationEmail({
        email: unverifiedEmail,
        callbackURL: "/verify-email",
      });
      toast.success("Email verifikasi telah dikirim ulang.");
      startResendCooldown();
    } catch {
      toast.error("Gagal mengirim ulang email verifikasi.");
    }
  };

  if (isPending) {
    return (
      <div className="p-10 flex justify-center min-h-[500px] items-center">
        <Loader />
      </div>
    );
  }

  // Email verification required screen
  if (emailNotVerified) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full max-w-[400px] mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center mb-8 ring-1 ring-amber-200/60">
          <Mail className="w-10 h-10 text-amber-600" />
        </div>

        <h1 className="text-[26px] font-bold text-[#0f374c] leading-tight mb-3">
          Email Belum Diverifikasi
        </h1>

        <p className="text-gray-500 font-light text-[15px] mb-2 max-w-[340px]">
          Akun Anda memerlukan verifikasi email sebelum dapat masuk. Periksa inbox Anda di:
        </p>

        <p className="text-[#2c869a] font-semibold text-[15px] mb-6 bg-[#2c869a]/5 px-4 py-2 rounded-xl border border-[#2c869a]/10">
          {unverifiedEmail}
        </p>

        <p className="text-gray-400 text-[13px] mb-8 max-w-[320px] leading-relaxed">
          Klik link verifikasi yang telah dikirim ke email Anda. Periksa juga folder spam jika tidak
          ditemukan.
        </p>

        <button
          onClick={handleResendVerification}
          disabled={resendCooldown > 0}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2c869a] hover:text-[#1f5f6e] transition disabled:opacity-40 disabled:cursor-not-allowed mb-8"
        >
          <RefreshCw className="w-4 h-4" />
          {resendCooldown > 0
            ? `Kirim ulang dalam ${resendCooldown}d`
            : "Kirim Ulang Email Verifikasi"}
        </button>

        <div className="w-full border-t border-gray-100 pt-6">
          <button
            onClick={() => {
              setEmailNotVerified(false);
              setUnverifiedEmail("");
            }}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-gray-500 hover:text-[#2c869a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke halaman masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full w-full max-w-[400px] mx-auto">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-[32px] font-bold text-[#0f374c] mb-2 leading-tight">Selamat Datang</h1>
        <p className="text-gray-500 font-medium text-[15px]">
          Masuk Ke Akun Anda Untuk Melanjutkan
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Email Field */}
        <div>
          <form.Field name="email">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-semibold text-[14px]">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="nama@gmail.com"
                    className="w-full bg-white rounded-xl border border-gray-200 focus-visible:ring-[#2c869a] py-6 pl-12 text-[15px]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs mt-1">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        {/* Password Field */}
        <div>
          <form.Field name="password">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-semibold text-[14px]">
                  Kata Sandi
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white rounded-xl border border-gray-200 focus-visible:ring-[#2c869a] py-6 pl-12 pr-12 text-[15px]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs mt-1">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        {/* Options Row */}
        <div className="flex justify-between items-center py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[5px] checked:bg-[#2c869a] checked:border-[#2c869a] transition-all cursor-pointer"
              />
              <svg
                className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[13px] font-medium text-gray-600 group-hover:text-gray-800 transition">
              ingat saya
            </span>
          </label>

          <button
            type="button"
            className="text-[13px] font-semibold text-[#2c869a] hover:text-[#1f5f6e] hover:underline transition"
          >
            lupa kata sandi?
          </button>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full h-[52px] rounded-xl bg-[#2c869a] hover:bg-[#1f5f6e] text-white font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Sedang memproses..." : "Masuk"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
      <div className="mt-8 text-center font-medium text-[14px]">
        <span className="text-gray-500">Belum Punya Akun? </span>
        <button
          onClick={onSwitchToSignUp}
          className="text-[#2c869a] font-bold hover:text-[#1f5f6e] hover:underline transition ml-1"
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
}
