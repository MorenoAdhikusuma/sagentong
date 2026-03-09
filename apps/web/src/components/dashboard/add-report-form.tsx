"use client";

import React, { useState } from "react";
import {
  MapPin,
  AlertTriangle,
  Package,
  Upload,
  ChevronDown,
  CreditCard,
  Wrench,
  Box,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddReportFormProps {
  onClose?: () => void;
}

export default function AddReportForm({ onClose }: AddReportFormProps) {
  const [assistanceCategory, setAssistanceCategory] = useState<string>("Dana");

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="bg-[#2C869A] p-8 text-white relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="size-6" />
          </button>
        )}
        <div className="flex flex-col gap-2 pt-4">
          <h2 className="text-2xl font-bold">Tambah Laporan Kebutuhan Warga</h2>
          <p className="text-white/80 text-sm">
            Laporkan kondisi banjir dan kebutuhan bantuan untuk warga terdampak.
          </p>
        </div>
      </div>

      <form className="p-8 flex flex-col gap-8 bg-[#F4F7F6]/30 overflow-y-auto max-h-[80vh]">
        {/* Section 1: Informasi Lokasi */}
        <section className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="p-2 bg-[#2C869A]/10 rounded-lg">
              <MapPin className="size-5 text-[#2C869A]" />
            </div>
            <h3 className="font-bold text-[#0f374c]">Informasi Lokasi</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nama Pelapor</label>
              <input
                type="text"
                placeholder="masukkan nama lengkap"
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nomor Kontak</label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">RW</label>
              <div className="relative">
                <select className="appearance-none w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]">
                  <option>Pilih RW</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">RT</label>
              <div className="relative">
                <select className="appearance-none w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]">
                  <option>Pilih RT</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Detail Alamat</label>
              <textarea
                placeholder="masukkan detail alamat"
                rows={3}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB] resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Informasi Kondisi */}
        <section className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="p-2 bg-[#FFA918]/10 rounded-lg">
              <AlertTriangle className="size-5 text-[#FFA918]" />
            </div>
            <h3 className="font-bold text-[#0f374c]">Informasi Kondisi</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Jumlah Warga Terdampak</label>
              <input
                type="number"
                defaultValue={0}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Jumlah Rumah Terdampak</label>
              <input
                type="number"
                defaultValue={0}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Ketinggian Air</label>
              <div className="relative">
                <select className="appearance-none w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB]">
                  <option>Pilih Ketinggian</option>
                  <option>10 - 30 cm</option>
                  <option>30 - 60 cm</option>
                  <option>60 - 100 cm</option>
                  <option>di atas 100 cm</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Deskripsi Kondisi</label>
              <textarea
                placeholder="air mulai masuk ke rumah warga, akses jalan terputus..."
                rows={3}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C869A]/20 focus:border-[#2C869A] transition-all bg-[#F9FAFB] resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Jenis Kebutuhan Bantuan */}
        <section className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="p-2 bg-[#2C9A3D]/10 rounded-lg">
              <Package className="size-5 text-[#2C9A3D]" />
            </div>
            <h3 className="font-bold text-[#0f374c]">Jenis Kebutuhan Bantuan</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setAssistanceCategory("Dana")}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all group",
                assistanceCategory === "Dana"
                  ? "border-[#2C869A] bg-[#2C869A]/5 shadow-inner"
                  : "border-gray-100 hover:border-[#2C869A]/30 hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    assistanceCategory === "Dana"
                      ? "bg-[#2C869A] text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-[#2C869A]/10 group-hover:text-[#2C869A]",
                  )}
                >
                  <CreditCard className="size-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-sm text-[#0f374c]">Bantuan Dana</span>
                  <span className="text-[10px] text-gray-500">
                    Bantuan Finansial untuk Pemulihan
                  </span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAssistanceCategory("Jasa")}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all group",
                assistanceCategory === "Jasa"
                  ? "border-[#2C869A] bg-[#2C869A]/5 shadow-inner"
                  : "border-gray-100 hover:border-[#2C869A]/30 hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    assistanceCategory === "Jasa"
                      ? "bg-[#2C869A] text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-[#2C869A]/10 group-hover:text-[#2C869A]",
                  )}
                >
                  <Wrench className="size-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-sm text-[#0f374c]">Bantuan Jasa</span>
                  <span className="text-[10px] text-gray-500">Tenaga Relawan & Infrastruktur</span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAssistanceCategory("Barang")}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all group",
                assistanceCategory === "Barang"
                  ? "border-[#2C869A] bg-[#2C869A]/5 shadow-inner"
                  : "border-gray-100 hover:border-[#2C869A]/30 hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    assistanceCategory === "Barang"
                      ? "bg-[#2C869A] text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-[#2C869A]/10 group-hover:text-[#2C869A]",
                  )}
                >
                  <Box className="size-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-sm text-[#0f374c]">Bantuan Barang</span>
                  <span className="text-[10px] text-gray-500">Makanan, Alat Kebersihan, Dll</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Section 4: Upload Evidence */}
        <section className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="p-2 bg-[#2C869A]/10 rounded-lg">
              <Upload className="size-5 text-[#2C869A]" />
            </div>
            <h3 className="font-bold text-[#0f374c]">Upload Evidence</h3>
          </div>

          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-[#F9FAFB] hover:border-[#2C869A]/50 transition-all cursor-pointer group">
            <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Upload className="size-8 text-[#2C869A]" />
            </div>
            <p className="font-bold text-gray-700">Upload Foto Kondisi</p>
            <p className="text-gray-400 text-sm mb-4 text-center">
              Drag & Drop atau Klik Untuk Memilih File
            </p>
            <button
              type="button"
              className="px-6 py-2 bg-[#2C869A] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#2C869A]/20"
            >
              Pilih File
            </button>
            <p className="mt-4 text-[11px] text-gray-400">
              Upload Foto Kondisi Lapangan Sebagai Bukti Laporan
              <br />
              Format: JPG, PNG, JPEG (Max: 5MB Per File)
            </p>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-12 py-4 bg-[#2C869A] hover:bg-[#236e7f] text-white font-bold rounded-2xl shadow-xl shadow-[#2C869A]/20 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <MapPin className="size-5" />
            Submit Laporan
          </button>
        </div>
      </form>
    </div>
  );
}
