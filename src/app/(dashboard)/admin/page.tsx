import Attendance from "@/components//AttendanceBarChart";
import Announcement from "@/components/Announcement";
import CountRadialChart from "@/components/CountRadialChart";
import EvenetCalander from "@/components/EventCalander";
import FinanceChart from "@/components/FinanceLineChart";
import UseCard from "@/components/UseCard";

const AdminPage = () => {
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          {/* upper */}
          <div className="flex gap-4 flex-wrap">
            <UseCard type="students" />
            <UseCard type="teachers" />
            <UseCard type="parents" />
            <UseCard type="staff's" />
          </div>
          {/* middle */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* count chart */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountRadialChart />
            </div>
            {/* Attendance chart */}
            <div className="w-full lg:w-2/3 h-[100%] lg:h-[450px]">
              <Attendance />
            </div>
          </div>
          {/* bottom */}
          <div className="w-full h-[100%] lg:h-[550px]">
            <FinanceChart />
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <EvenetCalander />
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
