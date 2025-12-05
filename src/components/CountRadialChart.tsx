"use client";

import Image from "next/image";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const data = [
  {
    name: "Boys",
    count: 100,
    fill: "#fff",
  },
  {
    name: "Boys",
    count: 43,
    fill: "#C3EBFA",
  },
  {
    name: "Girls",
    count: 57,
    fill: "#FAE27C",
  },
];

const CountRadialChart = () => {
  return (
    <>
      <div className="w-full h-full bg-white rounded-xl p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">Students</span>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <div className="w-full h-[75%] relative">
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="35%"
              outerRadius="100%"
              barSize={26}
              data={data}
            >
              <RadialBar background dataKey="count" />
            </RadialBarChart>
          </ResponsiveContainer>
          <Image
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="/malefemale.png"
            alt=""
            width={50}
            height={50}
          />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-sanikaSky"></div>
            <h1 className="text-lg font-bold font-2xl">1,234</h1>
            <h2 className="text-xs text-gray-400">Boys (55%)</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-sanikaYellow"></div>
            <h1 className="text-lg font-bold font-2xl">1,234</h1>
            <h2 className="text-xs text-gray-400">Girls (45%)</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountRadialChart;
