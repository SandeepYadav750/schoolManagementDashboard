import Image from "next/image";
import CountRadialChart from "./CountRadialChart";
import { prisma } from "@/lib/prisma";

const CountRadialChartContainer = async () => {

const data = await prisma.student.groupBy({
  by: ['sex'],
  _count:  true,
});
    
    const boysCount = data.find(d=>d.sex === "MALE")?._count || 0;
    const girlsCount = data.find(d=>d.sex === "FEMALE")?._count || 0;

  return (
    <>
      <div className="w-full h-full bg-white rounded-xl p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">Students</span>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
              <CountRadialChart boys={boysCount} girls={girlsCount} />
        <div className="flex gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-sanikaSky"></div>
            <h1 className="text-lg font-bold font-2xl">{boysCount}</h1>
                      <h2 className="text-xs text-gray-400">Boys {Math.round(boysCount/(boysCount+girlsCount)*100)}%</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-sanikaYellow"></div>
            <h1 className="text-lg font-bold font-2xl">{girlsCount}</h1>
            <h2 className="text-xs text-gray-400">Girls {Math.round(girlsCount/(boysCount+girlsCount)*100)}%</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountRadialChartContainer
