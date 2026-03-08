import { db } from "@sagentong/db";
import * as schema from "@sagentong/db/schema/auth";
import { env } from "@sagentong/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

function buildVerificationEmailHtml(userName: string, verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verifikasi Email - SaGentong</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f5f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f4;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(44,134,154,0.08);">
          <!-- Header bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #2c869a 0%, #1f5f6e 100%);padding:32px 36px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">SaGentong</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:300;letter-spacing:0.5px;">Langkah Cepat, Aksi Tepat!</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 36px 20px;">
              <p style="margin:0 0 8px;color:#0f374c;font-size:18px;font-weight:600;">Halo, ${userName}!</p>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.7;">
                Terima kasih telah mendaftar sebagai <strong style="color:#2c869a;">Relawan</strong> di SaGentong. Untuk mengaktifkan akun Anda, silakan verifikasi alamat email Anda dengan menekan tombol di bawah ini.
              </p>
              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 28px;">
                    <a href="${verifyUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#2c869a 0%,#1f5f6e 100%);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:12px;letter-spacing:0.3px;">
                      Verifikasi Email Saya
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 20px;color:#94a3b8;font-size:12px;line-height:1.6;">
                Jika tombol di atas tidak berfungsi, salin dan tempel link berikut ke browser Anda:
              </p>
              <p style="margin:0 0 28px;word-break:break-all;color:#2c869a;font-size:12px;line-height:1.5;background:#f0f9fb;padding:12px 16px;border-radius:10px;border:1px solid #e0f2f6;">
                ${verifyUrl}
              </p>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e8eef0;margin:0 0 20px;" />
              <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;text-align:center;">
                Jika Anda tidak mendaftar di SaGentong, abaikan email ini.<br />
                Link ini akan kedaluwarsa dalam 24 jam.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafb;padding:20px 36px;text-align:center;border-top:1px solid #e8eef0;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">&copy; ${new Date().getFullYear()} SaGentong. Seluruh hak dilindungi.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
      ...coreFields,
      ...additionalFields,
      id,
    }),
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Only send verification emails to relawan users
      // perangkat_desa and superadmin are auto-verified on creation
      void transporter.sendMail({
        from: `"SaGentong" <${env.SMTP_FROM}>`,
        to: user.email,
        subject: "Verifikasi Email Anda - SaGentong",
        html: buildVerificationEmailHtml(user.name, url),
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["perangkat_desa", "relawan", "superadmin"],
        required: true,
        input: true,
      },
      verified: {
        type: "boolean",
        required: false,
        input: false,
        defaultValue: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // App-level verification (superadmin approval for perangkat_desa):
          // - relawan and superadmin: auto-verified at app level
          // - perangkat_desa: requires manual superadmin approval
          const appAutoVerifiedRoles = ["relawan", "superadmin"];
          const isAppVerified = appAutoVerifiedRoles.includes(user.role as string);

          // Email verification:
          // - perangkat_desa and superadmin: skip email verification (auto emailVerified)
          // - relawan: must verify email before login
          const emailAutoVerifiedRoles = ["perangkat_desa", "superadmin"];
          const isEmailVerified = emailAutoVerifiedRoles.includes(user.role as string);

          return {
            data: {
              ...user,
              verified: isAppVerified,
              emailVerified: isEmailVerified,
            },
          };
        },
      },
    },
  },
  plugins: [nextCookies()],
});
