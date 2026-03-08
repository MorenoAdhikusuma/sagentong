import { db } from "@sagentong/db";
import * as schema from "@sagentong/db/schema/auth";
import { env } from "@sagentong/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["perangkat_desa", "relawan"],
        required: true,
        input: true,
      },
    },
  },
  plugins: [nextCookies()],
});
