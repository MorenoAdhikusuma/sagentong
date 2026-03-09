import React from "react";
import { cn } from "@/lib/utils";

interface NeedCategory {
  name: string;
  percentage: number;
  count: number;
}

export default function PopularNeedsProgress({ needs }: { needs: NeedCategory[] }) {
  // Sort by percentage descending
  const sortedNeeds = [...needs].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(44,134,154,0.05)] ring-1 ring-gray-100 flex flex-col h-full">
      <h2 className="text-[17px] font-semibold text-[#0f374c] mb-6">Jenis Kebutuhan Populer</h2>

      <div className="flex flex-col gap-5 flex-1 justify-center">
        {sortedNeeds.length === 0 ? (
          <p className="text-gray-400 text-sm md:text-center">Belum ada data kebutuhan</p>
        ) : (
          sortedNeeds.map((need, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[13px]">
                <span className="font-medium text-gray-700">{need.name}</span>
                <span className="text-gray-500">
                  {need.percentage}% ({need.count})
                </span>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full bg-[#F4F7F6] rounded-full overflow-hidden">
                {/* Progress fill */}
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    i === 0 ? "bg-[#2C869A]" : i === 1 ? "bg-[#FFA918]" : "bg-[#2C9A3D]",
                  )}
                  style={{ width: `${need.percentage}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
