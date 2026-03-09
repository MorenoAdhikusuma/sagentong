import React from "react";
import { Clock } from "lucide-react";

export interface Activity {
  id: string;
  action: string;
  timeAgo: string;
}

export default function RecentActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(44,134,154,0.05)] ring-1 ring-gray-100 flex flex-col h-full">
      <h2 className="text-[17px] font-semibold text-[#0f374c] mb-6">Aktivitas Terbaru</h2>

      <div className="flex flex-col gap-6 flex-1">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">Belum ada aktivitas</p>
        ) : (
          activities.map((activity, i) => (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Connector line */}
              {i !== activities.length - 1 && (
                <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-gray-100" />
              )}

              {/* Icon circle */}
              <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f7f6] ring-4 ring-white">
                <Clock className="size-4 text-gray-400" />
              </div>

              {/* Content */}
              <div className="flex flex-col pt-1">
                <p className="text-[13px] text-gray-700 leading-snug">{activity.action}</p>
                <span className="mt-1 text-[11px] font-medium text-gray-400">
                  {activity.timeAgo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
