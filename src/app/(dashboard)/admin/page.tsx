import Attendance from "@/components/AttendanceBarChartContainer";
import Announcement from "@/components/Announcement";
import CountRadialChartContainer from "@/components/CountRadialChartContainer";
import EventCalanderContainer from "@/components/EventCalanderContainer";
import FinanceChart from "@/components/FinanceLineChart";
import UseCard from "@/components/UseCard";

const AdminPage = ({ searchParams }: { searchParams: { [keys: string]: string | undefined } }) => {
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row p-4">
        {/* left side */}
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          {/* upper */}
          <div className="flex gap-4 flex-wrap">
            <UseCard type="admin" />
            <UseCard type="student" />
            <UseCard type="teacher" />
            <UseCard type="parent" />
          </div>
          {/* middle */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* count chart */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountRadialChartContainer />
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
          <EventCalanderContainer searchParams={searchParams} />
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
