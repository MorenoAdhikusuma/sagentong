import { auth } from "@sagentong/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import StatCard from "@/components/dashboard/stat-card";
import RecentReportsTable, { type Report } from "@/components/dashboard/recent-reports-table";
import PopularNeedsProgress from "@/components/dashboard/popular-needs-progress";
import RecentActivityFeed, { type Activity } from "@/components/dashboard/recent-activity-feed";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login" as any);
  }

  if (session.user.role === "perangkat_desa" && !session.user.verified) {
    redirect("/dashboard/pending" as any);
  }

  // --- Dummy Data (Since db seed depends on env vars context) ---
  const stats = {
    total: 24,
    unprocessed: 8,
    toAdmin: 16,
  };

  const dummyReports: Report[] = [
    {
      id: "1",
      tanggal: new Date("2026-03-03"),
      lokasi: "RW 02 RT 05",
      jenisBantuan: "Bantuan Dana",
      deskripsi: "Bantuan Sembako untuk warga terdampak banjir.",
      status: "Menunggu",
    },
    {
      id: "2",
      tanggal: new Date("2026-03-03"),
      lokasi: "RW 01 RT 03",
      jenisBantuan: "Bantuan Jasa",
      deskripsi: "Perbaikan Jalan akses utama RW 01 terputus.",
      status: "Diverifikasi",
    },
    {
      id: "3",
      tanggal: new Date("2026-03-07"),
      lokasi: "RW 03 RT 01",
      jenisBantuan: "Bantuan Barang",
      deskripsi: "Bantuan Kesehatan untuk warga gatal-gatal.",
      status: "Diproses",
    },
  ];

  const popularNeeds = [
    { name: "Bantuan Sembako", percentage: 58, count: 14 },
    { name: "Perbaikan Infrastruktur", percentage: 35, count: 8 },
    { name: "Bantuan Kesehatan", percentage: 22, count: 5 },
  ];

  const recentActivities: Activity[] = [
    {
      id: "1",
      action: "Laporan Bantuan Sembako (RW 02) baru saja ditambahkan oleh Budi Santoso.",
      timeAgo: "2 menit yang lalu",
    },
    {
      id: "2",
      action: "Laporan Perbaikan Jalan (RW 01) telah diverifikasi.",
      timeAgo: "1 jam yang lalu",
    },
    {
      id: "3",
      action: "Laporan Bantuan Kesehatan sedang diproses oleh tim medis relawan.",
      timeAgo: "3 jam yang lalu",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto w-full">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Laporan Hari Ini" value={stats.total} theme="teal" />
        <StatCard title="Laporan Belum Di Proses" value={stats.unprocessed} theme="orange" />
        <StatCard title="Laporan Dikirim Ke Admin" value={stats.toAdmin} theme="green" />
      </div>

      {/* Main Table Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Table (Takes up 2/3 width on large screens) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="flex justify-end">
            <Link
              href="/dashboard/input-kebutuhan"
              className="bg-[#FFA918] hover:bg-[#e59815] text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span className="text-xl leading-none">+</span> Tambahkan Laporan
            </Link>
          </div>
          <RecentReportsTable reports={dummyReports} />
        </div>

        {/* Right Column: Side Panels */}
        <div className="flex flex-col gap-6">
          <PopularNeedsProgress needs={popularNeeds} />
          <RecentActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
