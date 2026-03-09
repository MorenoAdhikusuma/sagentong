import React from "react";
import { TrendingUp, PieChart as PieChartIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatistikInsightCardProps {
  title: string;
  description: string;
  type: "trend" | "distribution" | "focus";
}

const config = {
  trend: {
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  distribution: {
    icon: PieChartIcon,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  focus: {
    icon: MapPin,
    color: "text-[#2C869A]",
    bg: "bg-[#2C869A]/10",
  },
};

export default function StatistikInsightCard({
  title,
  description,
  type,
}: StatistikInsightCardProps) {
  const { icon: Icon, color, bg } = config[type];

  return (
    <div className="flex h-[100px] w-full items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <div className={cn("flex size-14 shrink-0 items-center justify-center rounded-2xl", bg)}>
        <Icon className={cn("size-7", color)} />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-[15px] font-bold text-[#0f374c]">{title}</h4>
        <p className="text-[13px] text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
