import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async () => {

  const { userId } = await auth();
  console.log("teacher userId", userId);

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        <div className="w-full md:w-2/3 h-full flex flex-col gap-8 bg-white rounded-md p-4">
          <div className="mb-4 ">
            <span className="text-lg font-semibold">Shedule</span>
            <BigCalenderContainer type="teacherId" id={userId!} />
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
