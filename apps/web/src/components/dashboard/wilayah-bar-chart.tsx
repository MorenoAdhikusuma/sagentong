"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "RW 01", value: 25 },
  { name: "RW 02", value: 30 },
  { name: "RW 03", value: 45 },
  { name: "RW 04", value: 20 },
  { name: "RW 05", value: 35 },
  { name: "RW 06", value: 15 },
];

export default function WilayahBarChart() {
  return (
    <div className="h-[300px] w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="mb-6 text-[17px] font-semibold text-[#0f374c]">
        Wilayah Dengan Kebutuhan Terbanyak
      </h3>
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              width={60}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === "RW 03" ? "#2C869A" : "#DDEBEE"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
