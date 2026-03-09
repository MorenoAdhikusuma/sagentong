import React from "react";
import { cn } from "@/lib/utils";

export type ReportStatus = "Menunggu" | "Diverifikasi" | "Diproses";

export interface Report {
  id: string;
  tanggal: Date;
  lokasi: string;
  jenisBantuan: string;
  deskripsi: string;
  status: ReportStatus;
}

const statusStyles: Record<ReportStatus, { bg: string; text: string; dot: string }> = {
  Menunggu: {
    bg: "bg-[#FFA918]/10",
    text: "text-[#FFA918]",
    dot: "bg-[#FFA918]",
  },
  Diverifikasi: {
    bg: "bg-[#2C869A]/10",
    text: "text-[#2C869A]",
    dot: "bg-[#2C869A]",
  },
  Diproses: {
    bg: "bg-[#2C9A3D]/10",
    text: "text-[#2C9A3D]",
    dot: "bg-[#2C9A3D]",
  },
};

export default function RecentReportsTable({ reports }: { reports: Report[] }) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(44,134,154,0.05)] ring-1 ring-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[17px] font-semibold text-[#0f374c]">Laporan Terbaru</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-inter text-[14px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500">
              <th className="pb-4 pr-4 font-medium">Tanggal</th>
              <th className="pb-4 px-4 font-medium">Lokasi (RW/RT)</th>
              <th className="pb-4 px-4 font-medium">Jenis Bantuan</th>
              <th className="pb-4 px-4 font-medium">Deskripsi</th>
              <th className="pb-4 pl-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Belum ada laporan
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 pr-4 text-gray-600">
                    {report.tanggal.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-medium">{report.lokasi}</td>
                  <td className="py-4 px-4 text-gray-600">{report.jenisBantuan}</td>
                  <td
                    className="py-4 px-4 text-gray-500 max-w-[200px] truncate"
                    title={report.deskripsi}
                  >
                    {report.deskripsi}
                  </td>
                  <td className="py-4 pl-4 flex justify-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium",
                        statusStyles[report.status].bg,
                        statusStyles[report.status].text,
                      )}
                    >
                      <span
                        className={cn("size-1.5 rounded-full", statusStyles[report.status].dot)}
                      />
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
