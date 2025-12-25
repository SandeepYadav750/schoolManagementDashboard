import Announcement from "@/components/Announcement";
import BigCalender from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import PerformancePieCharts from "@/components/PerformancePieCharts";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <>
      <div className="flex-1 p-4 flex flex-col gap-4 md:flex-row">
        {/* left */}
        <div className="w-full md:w-2/3">
          {/* top */}
          <div className=" flex flex-col xl:flex-row gap-4">
            <div className="bg-sanikaPurple p-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3 ">
                <Image
                  src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="profilePic"
                  width={112}
                  height={112}
                  className="w-24 md:w-32 h-24 md:h-32  rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col gap-2">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  Sandeep yadav
                  <span className="bg-sanikaPurple">
                    <FormModal
                      type="update"
                      table="teacher"
                      data={{
                        id: 1,
                        teacherId: "1234567890",
                        userName: "sandeep Yadav",
                        firstName: "sandeep",
                        lastName: "Yadav",
                        email: "san@gmail.com",
                        password: "Sandy123",
                        photo:
                          "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                        phone: "1234567890",
                        subjects: ["Math", "Geometry"],
                        classes: ["1B", "2A", "3C"],
                        address: "123 Main St, Anytown, USA",
                        bloodType: "A+",
                      }}
                    />
                  </span>
                </h1>
                <p className="text-xs text-gray-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-sm font-medium">
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/blood.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>A+</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/date.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>January 2025</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/mail.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>sandyahir339@gmail.com</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/phone.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>+91 7503667663</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex gap-2 flex-wrap justify-between ">
              {/* card */}
              <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleAttendance.png"
                  alt="singleAttendance"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h2 className="text-xl font-semibold">90%</h2>
                  <p className="text-sm text-gray-400 font-medium">
                    Attendance
                  </p>
                </div>
              </div>
              {/* card */}
              <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleBranch.png"
                  alt="singleBranch"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h2 className="text-xl font-semibold">2</h2>
                  <p className="text-sm text-gray-400 font-medium">Branches</p>
                </div>
              </div>
              {/* card */}
              <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleClass.png"
                  alt="singleClass"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h2 className="text-xl font-semibold">6</h2>
                  <p className="text-sm text-gray-400 font-medium">Classes</p>
                </div>
              </div>
              {/* card */}
              <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleLesson.png"
                  alt="singleLesson"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h2 className="text-xl font-semibold">6</h2>
                  <p className="text-sm text-gray-400 font-medium">Lessons</p>
                </div>
              </div>
            </div>
          </div>
          {/* Shedule bottom */}
          <div className="mt-4 bg-white rounded-md p-4 ">
            <h1 className="text-lg font-semibold">Teacher's Shedule</h1>
            <BigCalender />
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-lg font-semibold">Shortcut</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <Link
                href={`/list/classes?supervisorId=${"teacher12"}`}
                className="p-2 rounded-md bg-sanikaSkyLight hover:shadow-md"
              >
                Teacher's Classes
              </Link>
              <Link
                href={`/list/students?teacherId=${"teacher2"}`}
                className="p-2 rounded-md bg-sanikaPurpleLight hover:shadow-md"
              >
                Teacher's Students
              </Link>
              <Link
                href={`/list/exams?teacherId=${"teacher2"}`}
                className="p-2 rounded-md bg-sanikaPurpleLight hover:shadow-md"
              >
                Teacher's Exams
              </Link>
              <Link
                href={`/list/lessons?teacherId=${"teacher2"}`}
                className="p-2 rounded-md bg-sanikaYellowLight hover:shadow-md"
              >
                Teacher's Lessons
              </Link>
              <Link
                href={`/list/assignments?teacherId=${"teacher2"}`}
                className="p-2 rounded-md bg-sanikaSkyLight hover:shadow-md"
              >
                Teacher's Assignments
              </Link>
            </div>
          </div>
          <PerformancePieCharts />
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default SingleTeacherPage;
