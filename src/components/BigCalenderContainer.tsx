import { prisma } from "@/lib/prisma";
import BigCalender from "./BigCalender";
import { adjustScheduledToCurrentWeek } from "@/lib/utils";

const BigCalenderContainer = async ({ type, id }: { type: "teacherId" | "classId"; id: string | number }) => {
    
    const dataRes = await prisma.lesson.findMany({
        where: {
           ...(type === "teacherId" ? { teacherId: id as string } : { classId: id as number }),
        },
    });

const data = dataRes.map((lesson) => ({
    id: lesson.id,
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
}));

  const sheduled = adjustScheduledToCurrentWeek(data);
  return (
    <>
      <BigCalender data={sheduled} />
    </>
  )
}

export default BigCalenderContainer;
