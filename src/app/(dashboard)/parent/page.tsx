import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/utils";
import "react-big-calendar/lib/css/react-big-calendar.css";

const ParentPage = async () => {
  
  const { userId } = await getUserRole();

  const students = await prisma.student.findMany({
    where: { parentId: userId! },

  });
  
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        {students.map((student) => (
          <div key={student.id} className="w-full md:w-2/3 h-full flex flex-col gap-8 bg-white rounded-md p-4">
            <div className="mb-4 ">
              <span className="text-lg font-semibold">Shedule ({student.name} {student.surname})</span>
              <BigCalenderContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
        {/* right side */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default ParentPage;
