import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const laporan = pgTable("laporan", {
  id: uuid("id").primaryKey().defaultRandom(),
  pelaporName: text("pelapor_name").notNull(),
  contactNumber: text("contact_number").notNull(),
  rw: text("rw").notNull(),
  rt: text("rt").notNull(),
  addressDetail: text("address_detail").notNull(),
  affectedCount: integer("affected_count").notNull(),
  affectedHouses: integer("affected_houses"),
  waterHeight: text("water_height"),
  needsType: text("needs_type").notNull(), // Specific need like 'Bantuan Sembako'
  assistanceCategory: text("assistance_category"), // General category like 'Dana', 'Jasa', 'Barang'
  description: text("description").notNull(),
  evidenceImage: text("evidence_image"),
  status: text("status").notNull().default("Menunggu"), // 'Menunggu', 'Diverifikasi', 'Diproses'
  perangkatDesaId: text("perangkat_desa_id").references(() => user.id, { onDelete: "set null" }), // User who verified/manages this
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
