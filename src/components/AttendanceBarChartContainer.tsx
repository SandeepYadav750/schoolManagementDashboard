import Image from "next/image";
import AttendanceBarChart from "./AttendanceBarChart";
import { prisma } from "@/lib/prisma";

const AttendanceBarChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

  // Calculate how many days to subtract to get to Monday
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToMonday);

  // Generate dates for the week (Monday to Saturday)

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceData: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Only consider Mon-Fri
      const dayName = daysOfWeek[dayOfWeek - 1]; // Get day name
      if (item.present) {
        attendanceData[dayName].present += 1;
      } else {
        attendanceData[dayName].absent += 1;
      }
    }

    // console.log("attendanceData:", attendanceData);
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    Present: attendanceData[day].present,
    Absent: attendanceData[day].absent,
  }));

  const totals = data.reduce(
    (acc, day) => {
      acc.present += day.Present;
      acc.absent += day.Absent;
      return acc;
    },
    { present: 0, absent: 0 }
  );


  return (
    <>
      <div className="w-full h-full bg-white rounded-xl p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">Attendance</span>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <div className="w-full ">
          <div className="flex flex-row md:flex-col items-end justify-end gap-2">
            <span className="text-sm font-semibold text-sanikaSky">
              Today's Present: {totals.present}
            </span>
            <span className="text-sm font-semibold text-sanikaYellow">
              Today's Absent:{totals.absent}
            </span>
          </div>
        </div>
        <AttendanceBarChart data={data} />
      </div>
    </>
  );
};

export default AttendanceBarChartContainer;
