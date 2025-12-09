"use client";
import Image from "next/image";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// #region Sample data
const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const PerformancePieCharts = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">Performance</span>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <div className="relative w-full ">
          <PieChart
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 2,
            }}
            responsive
          >
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="100%"
              innerRadius={70}
              outerRadius="120%"
              fill="#8884d8"
              label
              //   isAnimationActive={isAnimationActive}
            />
          </PieChart>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg md:text-sm xl:text-2xl font-bold">9.2</h1>
            <p className="text-lg md:text-xs xl:text-xs text-gray-400">
              10% of Sanika
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 w-full font-bold mt-4 md:text-sm lg:text-lg">
          <p className="w-3 h-3 bg-black rounded-full"></p> 1st semester - 2nd
          semester
        </div>
      </div>
    </>
  );
};

export default PerformancePieCharts;
