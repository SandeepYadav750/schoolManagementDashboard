import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import FormContainer from "@/components/FormContainer";
import PerformancePieCharts from "@/components/PerformancePieCharts";
import StudentAttendeanceCard from "@/components/StudentAttendeanceCard";
import { Class, Student } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SingleStudentPage = async (params: { params: { id: string } }) => {
  const student: (Student & { class: Class & { _count: {  lessons: number; } } }) | null = await prisma.student.findUnique({
    where: { id: params.params.id },
    include: { class: { include: { _count: { select: {  lessons: true } } } }, }
  });

  if (!student) {
    return notFound();
  }
  
  const { role } = await getUserRole();
  
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
                  src={student.img || "/noAvatar.png"}
                  alt="profilePic"
                  width={112}
                  height={112}
                  className="w-24 md:w-32 h-24 md:h-32  rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col gap-2">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  {student.name} {student.surname}
                  <span className="bg-sanikaPurple">
                    {role === "admin" && (
                      <FormContainer
                        type="update"
                        table="student"
                        data={student}
                      />
                    )}
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
                    <p>{student.bloodType}</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/date.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>{new Intl.DateTimeFormat("en-US").format(student.birthday)}</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/mail.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>{student.email || "-"}</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full flex gap-2">
                    <Image
                      src="/phone.png"
                      alt="profileicons"
                      width={14}
                      height={12}
                    />
                    <p>{student.phone || "XXXXXXXXXX"}</p>
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
                  <Suspense>
                    <StudentAttendeanceCard id={student.id} />
                  </Suspense>
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
                  <h2 className="text-xl font-semibold">{student.class.name.charAt(0)}{student.class.name.charAt(0) === "1"? "st" : student.class.name.charAt(0) === "2"? "nd" : student.class.name.charAt(0) === "3"? "rd" : "th"} </h2>
                  <p className="text-sm text-gray-400 font-medium">Grads</p>
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
                  <h2 className="text-xl font-semibold">{student.class.name}</h2>
                  <p className="text-sm text-gray-400 font-medium">
                    Class Name
                  </p>
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
                  <h2 className="text-xl font-semibold">{student.class._count.lessons}</h2>
                  <p className="text-sm text-gray-400 font-medium">Lessons</p>
                </div>
              </div>
            </div>
          </div>
          {/* Shedule bottom */}
          <div className="mt-4 bg-white rounded-md p-4 ">
            <h1 className="text-lg font-semibold">Student's Shedule</h1>
            <BigCalenderContainer type="classId" id={student.class.id} />
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-lg font-semibold">Shortcut</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <Link
                href={`/list/lessons?classId=${2}`}
                className="p-2 rounded-md bg-sanikaSkyLight hover:shadow-md"
              >
                Student's Lessons
              </Link>
              <Link
                href={`/list/exams?classId=${2}`}
                className="p-2 rounded-md bg-sanikaYellowLight hover:shadow-md"
              >
                Student's Exams
              </Link>
              <Link
                href={`/list/results?classId=${2}`}
                className="p-2 rounded-md bg-sanikaPurpleLight hover:shadow-md"
              >
                Student's Results
              </Link>
              <Link
                href={`/list/teachers?classId=${2}`}
                className="p-2 rounded-md bg-sanikaPurpleLight hover:shadow-md"
              >
                Student's Teachers
              </Link>
              <Link
                href={`/list/assignments?classId=${2}`}
                className="p-2 rounded-md bg-sanikaSkyLight hover:shadow-md"
              >
                Student's Assignments
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

export default SingleStudentPage;
