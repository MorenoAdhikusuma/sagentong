import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SignUpFormProps = {
  onSwitchToSignIn: () => void;
  role?: "perangkat_desa" | "relawan" | null;
  onBack?: () => void;
};

export default function SignUpForm({ onSwitchToSignIn, role, onBack }: SignUpFormProps) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [emailSent, setEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const titleText =
    role === "perangkat_desa"
      ? "Daftar Perangkat Desa"
      : role === "relawan"
        ? "Daftar Relawan"
        : "Daftar Akun";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
          role: role ?? "relawan",
          callbackURL: "/verify-email",
        },
        {
          onSuccess: () => {
            if (role === "relawan") {
              // Relawan needs email verification — show confirmation screen
              setRegisteredEmail(value.email);
              setEmailSent(true);
              toast.success("Akun berhasil dibuat! Cek email Anda untuk verifikasi.");
            } else {
              // perangkat_desa goes to dashboard (then gets redirected to pending)
              router.push("/dashboard");
              toast.success("Pendaftaran berhasil");
            }
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z
        .object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.email("Invalid email address"),
          password: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string().min(1, "Please confirm your password"),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
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
        email: registeredEmail,
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

  // Email verification sent screen for relawan
  if (emailSent) {
    return (
      <div className="p-8 sm:p-10 min-h-[500px] flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2c869a]/10 to-[#1f5f6e]/10 flex items-center justify-center mb-8 ring-1 ring-[#2c869a]/20">
          <Mail className="w-10 h-10 text-[#2c869a]" />
        </div>

        <h1 className="text-[26px] font-bold text-[#0f374c] leading-tight mb-3">Cek Email Anda</h1>

        <p className="text-gray-500 font-light text-[15px] mb-2 max-w-[340px]">
          Kami telah mengirim link verifikasi ke:
        </p>

        <p className="text-[#2c869a] font-semibold text-[15px] mb-6 bg-[#2c869a]/5 px-4 py-2 rounded-xl border border-[#2c869a]/10">
          {registeredEmail}
        </p>

        <p className="text-gray-400 text-[13px] mb-8 max-w-[320px] leading-relaxed">
          Klik link dalam email tersebut untuk mengaktifkan akun Anda. Periksa juga folder spam jika
          tidak ditemukan.
        </p>

        <button
          onClick={handleResendVerification}
          disabled={resendCooldown > 0}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2c869a] hover:text-[#1f5f6e] transition disabled:opacity-40 disabled:cursor-not-allowed mb-6"
        >
          <RefreshCw
            className={`w-4 h-4 ${resendCooldown > 0 ? "" : "group-hover:rotate-180 transition-transform"}`}
          />
          {resendCooldown > 0
            ? `Kirim ulang dalam ${resendCooldown}d`
            : "Kirim Ulang Email Verifikasi"}
        </button>

        <div className="w-full border-t border-gray-100 pt-6">
          <button
            onClick={onSwitchToSignIn}
            className="text-[14px] font-medium text-gray-500 hover:text-[#2c869a] transition"
          >
            Kembali ke halaman masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-10 min-h-[500px] flex flex-col justify-center relative">
      <div className="mb-6 flex flex-col">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-[#2c869a] transition mb-4 self-start flex items-center gap-1 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        )}
        <h1 className="text-[28px] font-bold text-[#0f374c] leading-tight mb-2">{titleText}</h1>
        <p className="text-gray-500 font-light text-[15px]">
          Lengkapi data di bawah ini untuk menjadi bagian dari SaGentong.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4 pt-2"
      >
        <div>
          <form.Field name="name">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-medium text-[15px]">
                  Nama Lengkap
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="John Doe"
                  className="rounded-xl border-gray-200 focus-visible:ring-[#2c869a] py-[22px]"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="email">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-medium text-[15px]">
                  Email
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="admin@sagentong.id"
                  className="rounded-xl border-gray-200 focus-visible:ring-[#2c869a] py-[22px]"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="password">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-medium text-[15px]">
                  Password
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="********"
                  className="rounded-xl border-gray-200 focus-visible:ring-[#2c869a] py-[22px]"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="confirmPassword">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-[#0f374c] font-medium text-[15px]">
                  Konfirmasi Password
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="********"
                  className="rounded-xl border-gray-200 focus-visible:ring-[#2c869a] py-[22px]"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500 text-xs">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div className="pt-4">
          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full py-6 rounded-xl bg-[#2c869a] hover:bg-[#1f5f6e] text-white font-semibold text-lg transition-all shadow-md"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Sedang memproses..." : "Daftar Sekarang"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <div className="mt-8 text-center font-medium text-[15px]">
        <span className="text-gray-500">Sudah punya akun? </span>
        <button
          onClick={onSwitchToSignIn}
          className="text-[#2c869a] hover:text-[#1f5f6e] hover:underline transition"
        >
          Masuk Sekarang
        </button>
      </div>
    </div>
  );
}
