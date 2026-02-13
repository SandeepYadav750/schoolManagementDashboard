"use client";

import Image from "next/image";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";


const CountRadialChart = ({boys, girls}: {boys:number, girls:number}) => {
  const data = [
    {
      name: "Boys",
      count: boys+girls,
      fill: "#fff",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
  ];
  return (
    <>
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
          alt="malefemale"
          width={50}
          height={50}
        />
      </div>
    </>
  );
};

export default CountRadialChart;
