import Announcement from "@/components/Announcement";
import BigCalender from "@/components/BigCalender";
import EventCalander from "@/components/EventCalander";
import "react-big-calendar/lib/css/react-big-calendar.css";

const StudentPage = () => {
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        <div className="w-full md:w-2/3 h-full flex flex-col gap-8 bg-white rounded-md p-4">
          <div className="mb-4 ">
            <span className="text-lg font-semibold">Shedule (6A)</span>
            <BigCalender />
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
