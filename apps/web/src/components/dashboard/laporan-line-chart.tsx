"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Senin", value: 15 },
  { name: "Selasa", value: 40 },
  { name: "Rabu", value: 35 },
  { name: "Kamis", value: 65 },
  { name: "Jumat", value: 45 },
  { name: "Sabtu", value: 50 },
  { name: "Minggu", value: 55 },
];

export default function LaporanLineChart() {
  return (
    <div className="h-[300px] w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="mb-6 text-[17px] font-semibold text-[#0f374c]">
        Jumlah Laporan 7 Hari Terakhir
      </h3>
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2C869A"
              strokeWidth={3}
              dot={{ fill: "#2C869A", strokeWidth: 2, r: 4, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
