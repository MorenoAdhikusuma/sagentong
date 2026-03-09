"use client";

import React from "react";
import { Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-gray-100 bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-[#0f374c]">Dashboard-Perangkat desa</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex size-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[#FFA918] ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
