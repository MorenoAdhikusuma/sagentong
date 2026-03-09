import { db } from "@sagentong/db";
import { laporan } from "@sagentong/db/schema/laporan";
import { user } from "@sagentong/db/schema/auth";
import { eq } from "drizzle-orm";

async function addDummyLaporan() {
  console.log("Seeding dummy reports...");

  // Get superadmin user to attach as verifier
  const superadmins = await db.select().from(user).where(eq(user.role, "superadmin")).limit(1);
  const adminId = superadmins.length > 0 ? superadmins[0].id : null;

  const dummyData = [
    {
      pelaporName: "Budi Santoso",
      contactNumber: "081234567890",
      rw: "02",
      rt: "05",
      addressDetail: "Jl. Merdeka No. 10",
      affectedCount: 15,
      needsType: "Bantuan Sembako",
      description: "Warga membutuhkan sembako karena rumah terendam banjir 1 meter.",
      status: "Menunggu",
      category: "Bantuan Dana",
      createdAt: new Date("2026-03-03T10:00:00"),
    },
    {
      pelaporName: "Siti Aminah",
      contactNumber: "081987654321",
      rw: "01",
      rt: "03",
      addressDetail: "Gg. Kenangan, dekat masjid",
      affectedCount: 20,
      needsType: "Perbaikan Jalan",
      description: "Jalan akses utama rw 01 terputus akibat genangan air.",
      status: "Diverifikasi",
      category: "Bantuan Jasa",
      perangkatDesaId: adminId,
      createdAt: new Date("2026-03-03T14:30:00"),
    },
    {
      pelaporName: "Agus Supriyadi",
      contactNumber: "085512344321",
      rw: "03",
      rt: "01",
      addressDetail: "Perumahan Indah Blok C",
      affectedCount: 50,
      needsType: "Bantuan Kesehatan",
      description: "Banyak warga mulai mengalami gatal-gatal dan demam, butuh posko medis.",
      status: "Diproses",
      category: "Bantuan Barang",
      perangkatDesaId: adminId,
      createdAt: new Date("2026-03-07T09:15:00"),
    },
    {
      pelaporName: "Rina Wati",
      contactNumber: "081122334455",
      rw: "04",
      rt: "02",
      addressDetail: "Jl. Diponegoro ujung",
      affectedCount: 10,
      needsType: "Bantuan Sembako",
      description: "Persediaan makanan menipis untuk balita dan lansia.",
      status: "Menunggu",
      category: "Bantuan Dana",
      createdAt: new Date("2026-03-08T16:45:00"),
    },
  ];

  for (const data of dummyData) {
    await db.insert(laporan).values(data);
  }

  console.log("Successfully seeded dummy reports!");
  process.exit(0);
}

addDummyLaporan().catch((e) => {
  console.error("Failed to seed reports:", e);
  process.exit(1);
});
