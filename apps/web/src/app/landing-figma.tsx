"use client";

import {
  Megaphone,
  FileSpreadsheet,
  CheckCircle2,
  Users,
  RefreshCw,
  FileText,
  Clock,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Search,
} from "lucide-react";
import Image from "next/image";

export default function LandingFigma() {
  return (
    <div className="w-full bg-white']">
      {/* BERANDA (Hero) Section */}
      <section
        id="beranda"
        className="relative min-h-[calc(100vh-63px)] w-full overflow-hidden flex items-center"
      >
        {/* Background color placeholder/image */}
        <div className="absolute inset-0 w-full h-full bg-[#0a2636]">
          {/* Note: In production you would use next/image pointing to public/images/hero_section.svg or similar */}
          <div
            className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero_section.svg')" }}
          />
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-[100px] py-20 w-full max-w-[1336px] mx-auto z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white mb-[20px] leading-[1.2] drop-shadow-md">
            <div>Sistem bantuan darurat</div>
            <div>untuk korban banjir</div>
          </h1>

          <p className="text-lg md:text-[22px] text-white mb-[45px] max-w-2xl drop-shadow-sm font-light">
            Laporan, Verifikasi, dan Distribusi Bantuan Untuk Warga Dayeuhkolot
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-[#2c869a] hover:bg-[#1f5f6e] text-white px-8 py-4 rounded-lg font-semibold transition duration-300 whitespace-nowrap text-lg tracking-[0.5px]">
              Laporkan Banjir
            </button>
            <button className="bg-[#7cc2d1] hover:bg-[#6ab5c5] text-white px-8 py-4 rounded-lg font-semibold transition duration-300 whitespace-nowrap text-lg tracking-[0.5px]">
              Gabung Jadi Relawan
            </button>
          </div>
        </div>
      </section>

      {/* TENTANG Section */}
      <section id="tentang" className="w-full py-24 md:py-[120px] px-6 md:px-12 bg-white relative">
        <div className="max-w-[1140px] mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#2c869a] mb-2">Tentang</h2>
            <div className="h-1 w-[80px] bg-[#2c869a] mx-auto"></div>
          </div>

          <h3 className="text-2xl md:text-[32px] font-bold text-[#0f374c] text-center mb-5">
            Sistem Informasi Tanggap Banjir Berbasis Real-Time
          </h3>

          <p className="text-center text-gray-600 text-base md:text-[18px] max-w-3xl mx-auto mb-20 font-light">
            Pantau titik banjir aktif, laporkan kondisi lapangan, dan kelola distribusi bantuan
            secara terintegrasi di wilayah Dayeuhkolot.
          </p>

          {/* Process Flow */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center w-full lg:w-[200px]">
              <div className="bg-gradient-to-b from-white to-[#e5f3f6] shadow-lg rounded-2xl p-8 w-full mb-6 border border-[#2c869a]/10 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 duration-300">
                <Megaphone className="w-16 h-16 text-[#2c869a] mb-4" strokeWidth={1.5} />
                <p className="text-center text-[15px] font-medium text-[#0f374c] leading-snug">
                  Pelaporan oleh Warga
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center w-full lg:w-[200px]">
              <div className="bg-gradient-to-b from-white to-[#e5f3f6] shadow-lg rounded-2xl p-8 w-full mb-6 border border-[#2c869a]/10 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 duration-300">
                <FileSpreadsheet className="w-16 h-16 text-[#2c869a] mb-4" strokeWidth={1.5} />
                <p className="text-center text-[15px] font-medium text-[#0f374c] leading-snug">
                  Input Data
                  <br />
                  oleh Perangkat Desa
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center w-full lg:w-[200px]">
              <div className="bg-gradient-to-b from-white to-[#e5f3f6] shadow-lg rounded-2xl p-8 w-full mb-6 border border-[#2c869a]/10 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 duration-300">
                <CheckCircle2 className="w-16 h-16 text-[#2c869a] mb-4" strokeWidth={1.5} />
                <p className="text-center text-[15px] font-medium text-[#0f374c] leading-snug">
                  Verifikasi &<br />
                  Notifikasi Sistem
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center w-full lg:w-[200px]">
              <div className="bg-gradient-to-b from-white to-[#e5f3f6] shadow-lg rounded-2xl p-8 w-full mb-6 border border-[#2c869a]/10 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 duration-300">
                <Users className="w-16 h-16 text-[#2c869a] mb-4" strokeWidth={1.5} />
                <p className="text-center text-[15px] font-medium text-[#0f374c] leading-snug">
                  Aksi Relawan
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center w-full lg:w-[200px]">
              <div className="bg-gradient-to-b from-white to-[#e5f3f6] shadow-lg rounded-2xl p-8 w-full mb-6 border border-[#2c869a]/10 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 duration-300">
                <RefreshCw className="w-16 h-16 text-[#2c869a] mb-4" strokeWidth={1.5} />
                <p className="text-center text-[15px] font-medium text-[#0f374c] leading-snug">
                  Update Status
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAPORAN Section */}
      <section id="laporan" className="w-full py-24 md:py-[120px] px-6 md:px-12 bg-[#fafafa]">
        <div className="max-w-[1336px] mx-auto">
          {/* Title */}
          <div className="text-center mb-[60px]">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0f374c] mb-2">Laporan</h2>
            <div className="h-1 w-[80px] bg-[#2c869a] mx-auto"></div>
          </div>

          <p className="text-center text-gray-600 text-base md:text-[18px] max-w-3xl mx-auto mb-16 font-light">
            Kami menyediakan data terbuka yang dapat dipantau publik untuk memastikan setiap bantuan
            tersalurkan dengan tepat sasaran dan akuntabel.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[30px] mb-16">
            <div className="bg-white rounded-[20px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center hover:shadow-[0px_8px_30px_rgba(44,134,154,0.15)] transition-all">
              <div className="w-[80px] h-[80px] bg-[#e5f3f6] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-[#2c869a]" />
              </div>
              <p className="text-[40px] font-bold text-[#0f374c] mb-2 leading-none">342</p>
              <h4 className="text-[18px] font-semibold text-[#0f374c] mb-3">Pelaporan Warga</h4>
              <p className="text-[14px] text-gray-500 font-light">
                Warga menyampaikan laporan banjir melalui RT/RW.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center hover:shadow-[0px_8px_30px_rgba(44,134,154,0.15)] transition-all">
              <div className="w-[80px] h-[80px] bg-[#e5f3f6] rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[#2c869a]" />
              </div>
              <p className="text-[40px] font-bold text-[#0f374c] mb-2 leading-none">16</p>
              <h4 className="text-[18px] font-semibold text-[#0f374c] mb-3">Input Dashboard</h4>
              <p className="text-[14px] text-gray-500 font-light">
                Perangkat desa mencatat laporan ke sistem.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center hover:shadow-[0px_8px_30px_rgba(44,134,154,0.15)] transition-all">
              <div className="w-[80px] h-[80px] bg-[#e5f3f6] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-[#2c869a]" />
              </div>
              <p className="text-[40px] font-bold text-[#0f374c] mb-2 leading-none">124</p>
              <h4 className="text-[18px] font-semibold text-[#0f374c] mb-3">
                Verifikasi & Notifikasi
              </h4>
              <p className="text-[14px] text-gray-500 font-light">
                Admin memvalidasi dan sistem mengirim notifikasi relawan.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 text-center hover:shadow-[0px_8px_30px_rgba(44,134,154,0.15)] transition-all">
              <div className="w-[80px] h-[80px] bg-[#e5f3f6] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-[#2c869a]" />
              </div>
              <p className="text-[40px] font-bold text-[#0f374c] mb-2 leading-none">87</p>
              <h4 className="text-[18px] font-semibold text-[#0f374c] mb-3">Aksi Relawan</h4>
              <p className="text-[14px] text-gray-500 font-light">
                Relawan memilih bentuk bantuan sesuai kebutuhan.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-transparent via-[#7cc2d1]/30 to-transparent p-6 mb-16 text-center max-w-2xl mx-auto rounded-2xl">
            <span className="text-[16px] font-semibold text-[#0f374c] mr-2">
              Data terakhir diperbaharui:
            </span>
            <span className="text-[16px] text-[#2c869a] font-medium">2 Maret 2026 17:45 WIB</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-[40px]">
            {/* Table */}
            <div className="lg:col-span-2">
              <h4 className="text-[24px] font-bold text-[#0f374c] mb-6">
                Tracking Laporan Secara Publik
              </h4>

              <div className="flex gap-3 mb-6 relative">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari ID laporan atau lokasi"
                    className="w-full bg-white border border-gray-200 py-3 pl-12 pr-4 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2c869a]"
                  />
                </div>
                <button className="bg-[#0f374c] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#0a2636] transition shadow-md">
                  Cari
                </button>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="grid grid-cols-4 gap-4 p-5 bg-[#f8fbfa] border-b border-gray-200 font-semibold text-[15px] text-[#0f374c]">
                  <div>ID Laporan</div>
                  <div>Lokasi</div>
                  <div>Status</div>
                  <div>Update Terakhir</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-5 border-b border-gray-100 text-[15px] items-center text-gray-600 hover:bg-gray-50 transition">
                  <div className="font-medium text-[#0f374c]">03023A</div>
                  <div>RT 04/RW 01</div>
                  <div>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Menunggu
                    </span>
                  </div>
                  <div className="text-[13px]">17:55 WIB - 03/02/26</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-5 border-b border-gray-100 text-[15px] items-center text-gray-600 hover:bg-gray-50 transition">
                  <div className="font-medium text-[#0f374c]">02279B</div>
                  <div>RT 04/RW 01</div>
                  <div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Proses
                    </span>
                  </div>
                  <div className="text-[13px]">12:55 WIB - 27/02/26</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-5 text-[15px] items-center text-gray-600 hover:bg-gray-50 transition">
                  <div className="font-medium text-[#0f374c]">02257F</div>
                  <div>RT 04/RW 01</div>
                  <div>
                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Terverifikasi
                    </span>
                  </div>
                  <div className="text-[13px]">17:58 WIB - 25/02/26</div>
                </div>
              </div>
            </div>

            {/* Log */}
            <div>
              <h4 className="text-[24px] font-bold text-[#0f374c] mb-6">Log Aktivitas</h4>
              <div className="bg-[#f8fbfa] rounded-2xl p-6 border border-gray-100 space-y-6">
                <div className="flex gap-4">
                  <div className="w-[45px] font-semibold text-[#0f374c] text-[15px]">17:42</div>
                  <div className="text-[15px] text-gray-600 leading-snug flex-1">
                    Bantuan logistik tiba di Posko RW 08.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[45px] font-semibold text-[#0f374c] text-[15px]">17:07</div>
                  <div className="text-[15px] text-gray-600 leading-snug flex-1">
                    Notifikasi dikirim ke 8 relawan aktif.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[45px] font-semibold text-[#0f374c] text-[15px]">16:50</div>
                  <div className="text-[15px] text-gray-600 leading-snug flex-1">
                    Laporan dari RW 07 diverifikasi oleh admin.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[45px] font-semibold text-[#0f374c] text-[15px]">16:32</div>
                  <div className="text-[15px] text-gray-600 leading-snug flex-1">
                    Perangkat Desa input laporan baru dari RW 07.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[80px] pt-[60px] border-t border-gray-200">
            <h4 className="text-[24px] font-bold text-[#0f374c] mb-3">Komitmen Transparansi</h4>
            <p className="text-gray-600 text-[16px] mb-8 max-w-2xl font-light">
              SaGentong berkomitmen untuk menyediakan informasi yang terbuka, akurat, dan dapat
              dipantau publik demi memastikan bantuan tersalurkan secara.
            </p>
            <div className="flex flex-wrap items-center gap-10 opacity-70">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Innovillage 2025
              </span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                Telkom Indonesia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK Section */}
      <section id="kontak" className="w-full py-20 px-6 md:px-12 bg-[#7cc2d1]">
        <div className="max-w-[1336px] mx-auto text-center text-white">
          <h2 className="text-[36px] font-bold mb-16 capitalize">kontak</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] mb-16 max-w-3xl mx-auto">
            <div>
              <p className="text-[20px] font-semibold mb-2 capitalize">kepala desa Dayeuhkolot</p>
              <p className="text-[20px] font-light">+6281314738522</p>
            </div>
            <div>
              <p className="text-[20px] font-semibold mb-2 capitalize">admin SaGentong</p>
              <p className="text-[20px] font-light">+6281223455727</p>
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-16 *:w-[42px] *:h-[42px] *:rounded-full *:bg-white/10 *:flex *:items-center *:justify-center hover:*:bg-white/20 transition-all *:cursor-pointer">
            <div>
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <Facebook className="w-5 h-5" />
            </div>
            <div>
              <Youtube className="w-5 h-5" />
            </div>
            {/* Tiktok placeholder */}
            <div className="font-bold text-lg leading-none pt-1">TikTok</div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-[15px] font-light opacity-80">
              © 2026 Website Desa dayeuhkolot. Powered By NWL
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
