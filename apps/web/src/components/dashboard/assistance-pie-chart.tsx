"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Bantuan Dana", value: 45 },
  { name: "Bantuan Barang", value: 35 },
  { name: "Bantuan Relawan", value: 20 },
];

const COLORS = ["#2C869A", "#FFA918", "#2C9A3D"];

export default function AssistancePieChart() {
  return (
    <div className="h-[300px] w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="mb-6 text-[17px] font-semibold text-[#0f374c]">Distribusi Jenis Bantuan</h3>
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-[13px] text-gray-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
