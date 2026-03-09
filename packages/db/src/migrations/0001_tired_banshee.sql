CREATE TABLE "laporan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pelapor_name" text NOT NULL,
	"contact_number" text NOT NULL,
	"rw" text NOT NULL,
	"rt" text NOT NULL,
	"address_detail" text NOT NULL,
	"affected_count" integer NOT NULL,
	"needs_type" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'Menunggu' NOT NULL,
	"perangkat_desa_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_perangkat_desa_id_user_id_fk" FOREIGN KEY ("perangkat_desa_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;