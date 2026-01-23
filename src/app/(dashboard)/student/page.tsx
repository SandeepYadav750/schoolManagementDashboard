import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import EventCalander from "@/components/EventCalander";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "react-big-calendar/lib/css/react-big-calendar.css";

const StudentPage = async () => {

  const { userId } = await auth();
  console.log("student userId", userId);

  const classItem = await prisma.class.findMany({
    where: {
      students: {some: {id: userId!}},
    },
  });
  console.log("student classItem", classItem);

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        <div className="w-full md:w-2/3 h-full flex flex-col gap-8 bg-white rounded-md p-4">
          <div className="mb-4 ">
            <span className="text-lg font-semibold">Shedule (6A)</span>
            <BigCalenderContainer type="classId" id={classItem[0].id}/>
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <EventCalander />
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default StudentPage;
