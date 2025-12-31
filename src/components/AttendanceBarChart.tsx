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
// const data = [
//   {
//     name: "Mon",
//     Presant: 67,
//     Absent: 1,
//   },
//   {
//     name: "Tue",
//     Presant: 34,
//     Absent: 44,
//   },
//   {
//     name: "Wed",
//     Presant: 56,
//     Absent: 21,
//   },
//   {
//     name: "Thur",
//     Presant: 56,
//     Absent: 12,
//   },
//   {
//     name: "Fri",
//     Presant: 34,
//     Absent: 34,
//   },
//   {
//     name: "Sat",
//     Presant: 45,
//     Absent: 23,
//   },
// ];

// #endregion
const Attendance = ({
  data,
}: {
  data: { name: string; Present: number; Absent: number }[];
}) => {
  console.log("AttendanceBarChart data1:", data);

  return (
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
        dataKey="Present"
        fill="#C3EBFA"
        legendType="circle"
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default Attendance;
