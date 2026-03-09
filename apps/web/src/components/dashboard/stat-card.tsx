import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  theme: "teal" | "orange" | "green";
}

const themeStyles = {
  teal: {
    bg: "bg-[#2C869A]/10",
    text: "text-[#2C869A]",
    border: "border-[#2C869A]/20",
  },
  orange: {
    bg: "bg-[#FFA918]/10",
    text: "text-[#FFA918]",
    border: "border-[#FFA918]/20",
  },
  green: {
    bg: "bg-[#2C9A3D]/10",
    text: "text-[#2C9A3D]",
    border: "border-[#2C9A3D]/20",
  },
};

export default function StatCard({ title, value, theme }: StatCardProps) {
  return (
    <div className="flex h-[100px] w-full items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-medium text-gray-500">{title}</span>
        <span className={cn("text-3xl font-bold", themeStyles[theme].text)}>{value}</span>
      </div>
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-2xl border",
          themeStyles[theme].bg,
          themeStyles[theme].border,
        )}
      >
        <span className={cn("text-lg font-bold", themeStyles[theme].text)}>
          {value > 99 ? "99+" : value}
        </span>
      </div>
    </div>
  );
}
