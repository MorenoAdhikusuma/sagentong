import React from "react";
import LaporanLineChart from "@/components/dashboard/laporan-line-chart";
import AssistancePieChart from "@/components/dashboard/assistance-pie-chart";
import WilayahBarChart from "@/components/dashboard/wilayah-bar-chart";
import StatistikInsightCard from "@/components/dashboard/statistik-insight-card";

export default function StatistikLaporanPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto w-full px-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#0f374c]">Statistik Laporan</h2>
        <p className="text-gray-500 text-[14px]">
          Analisis data laporan kebutuhan warga Desa Gentong Balap.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Charts Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <LaporanLineChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AssistancePieChart />
            <WilayahBarChart />
          </div>
        </div>

        {/* insights Column */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[17px] font-semibold text-[#0f374c]">Insight Statistik</h3>
          <StatistikInsightCard
            type="trend"
            title="Tren Meningkat"
            description="Terdapat kenaikan laporan sebesar 15% dibandingkan minggu sebelumnya."
          />
          <StatistikInsightCard
            type="distribution"
            title="Bantuan Dana Dominan"
            description="45% dari total laporan warga membutuhkan bantuan berupa dana tunai untuk pemulihan."
          />
          <StatistikInsightCard
            type="focus"
            title="Fokus RW 03"
            description="RW 03 terdeteksi sebagai wilayah dengan kepadatan laporan tertinggi saat ini."
          />
        </div>
      </div>
    </div>
  );
}
