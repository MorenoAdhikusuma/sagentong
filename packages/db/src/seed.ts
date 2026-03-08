import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import * as schema from "./schema";

async function seed() {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD environment variables are required for seeding.",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("SUPERADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required.");
    process.exit(1);
  }

  const db = drizzle(databaseUrl, { schema });

  console.log("Seeding superadmin user...");

  // Check if superadmin already exists
  const existingUsers = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1);

  const existingUser = existingUsers[0];

  if (existingUser) {
    // Update existing user to superadmin role if needed
    if (existingUser.role !== "superadmin") {
      await db
        .update(schema.user)
        .set({ role: "superadmin", verified: true, emailVerified: true })
        .where(eq(schema.user.email, email));
      console.log(`Updated existing user ${email} to superadmin role.`);
    } else {
      console.log(`Superadmin user ${email} already exists. Skipping.`);
    }
    process.exit(0);
  }

  // Hash password using better-auth's built-in hasher
  const hashedPassword = await hashPassword(password);

  // Generate a unique ID
  const userId = crypto.randomUUID();

  // Create the superadmin user
  await db.insert(schema.user).values({
    id: userId,
    name: "Super Admin",
    email: email,
    emailVerified: true,
    role: "superadmin",
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create the credential account (better-auth stores password in the account table)
  await db.insert(schema.account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log(`Superadmin user created successfully: ${email}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
