"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "Mon",
    Presant: 67,
    Absent: 1,
  },
  {
    name: "Tue",
    Presant: 34,
    Absent: 44,
  },
  {
    name: "Wed",
    Presant: 56,
    Absent: 21,
  },
  {
    name: "Thur",
    Presant: 56,
    Absent: 12,
  },
  {
    name: "Fri",
    Presant: 34,
    Absent: 34,
  },
  {
    name: "Sat",
    Presant: 45,
    Absent: 23,
  },
];

// #endregion
const Attendance = () => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg font-semibold">Attendance</span>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <BarChart
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "90%",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#ddd" }}
          tickLine={false}
        />
        <YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#ddd" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            borderColor: "lightblue",
          }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        />
        <Bar
          dataKey="Absent"
          fill="#FAE27C"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="Presant"
          fill="#C3EBFA"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
      {/* <ResponsiveContainer width="100%" height="90%">
        <BarChart
          // style={{
          //   width: "100%",
          //   height: "100%",
          //   maxHeight: "100vh",
          //   aspectRatio: 1.618,
          // }}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#ddd" }}
            tickLine={false}
          />
          <YAxis
            width="auto"
            axisLine={false}
            tick={{ fill: "#ddd" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              borderColor: "lightblue",
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          />
          <Bar
            dataKey="Absent"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Presant"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default Attendance;
