"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
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
    name: "Jan",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Feb",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Mar",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Apr",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "Jun",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "July",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Aug",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Sep",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Oct",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Nov",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Dec",
    Income: 3490,
    Expense: 4300,
  },
];
// #endregion

const FinanceChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg font-semibold">Finance</span>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <LineChart
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "90%",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#ddd" }}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#ddd" }}
          tickLine={false}
          tickMargin={10}
        />
        <Tooltip />
        <Legend
          align="center"
          verticalAlign="top"
          wrapperStyle={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        />
        <Line
          type="monotone"
          dataKey="Expense"
          stroke="#C3EBFA"
          strokeWidth={5}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Income"
          stroke="#CFCEFF"
          strokeWidth={5}
        />
      </LineChart>
    </div>
  );
};

export default FinanceChart;
