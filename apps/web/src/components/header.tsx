"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  id: string;
  label: string;
};

export default function Header() {
  const pathname = usePathname();

  const links: NavLink[] = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "laporan", label: "Laporan" },
    { id: "kontak", label: "Kontak" },
  ];

  const handleScroll = (id: string) => {
    // If not on home page, we might navigate home first or just let it be.
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      // 63px is approx header height
      const y = element.getBoundingClientRect().top + window.scrollY - 63;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]'] h-[70px]">
      <div className="max-w-[1336px] h-full mx-auto flex items-center justify-between px-6 md:px-10 lg:px-12">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer h-full py-2"
          onClick={() => handleScroll("beranda")}
        >
          <img
            src="/images/Logo_SaGentong.svg"
            alt="SaGentong Logo"
            className="h-full max-h-[50px] w-auto object-contain"
          />

          <img
            src="/images/Logo_SaGentong 2.svg"
            alt="SaGentong Secondary Logo"
            className="h-full max-h-[50px] w-auto object-contain"
          />
        </div>

        {/* Navigation & Login Section */}
        <div className="hidden md:flex items-center gap-8 lg:gap-[45px]">
          <nav className="flex gap-6 lg:gap-10 text-[16px] items-center">
            {links.map(({ id, label }) => {
              const isHome = id === "beranda";
              return (
                <button
                  key={id}
                  onClick={() => handleScroll(id)}
                  className={`transition ${
                    isHome
                      ? "text-[#0f374c] font-bold"
                      : "text-[#5f7586] font-medium hover:text-[#2c869a]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Login Button */}
          <Link
            href="/login"
            className="bg-[#2c869a] text-white px-8 h-[42px] flex items-center justify-center rounded-lg hover:bg-[#1f5f6e] transition font-semibold text-[16px]"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
