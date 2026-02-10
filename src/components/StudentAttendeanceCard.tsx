import { prisma } from "@/lib/prisma";
import React from "react";

const StudentAttendeanceCard = async ({ id }: { id: string }) => {
    
const attendenceData = await prisma.attendance.findMany({
  where: { studentId: id,
    date: {
      gte: new Date(new Date().getFullYear(), 0, 1)
        }
    },
});

    const totalDays = attendenceData.length;
    const presentDays = attendenceData.filter((record) => record.present).length;
    const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : "-";
    
  return (
    <>
      <h2 className="text-xl font-semibold">{percentage}%</h2>
      <p className="text-sm text-gray-400 font-medium">Attendance</p>
    </>
  );
};

export default StudentAttendeanceCard;
