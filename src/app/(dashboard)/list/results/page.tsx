import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Prisma } from "@/generated/prisma";
import { role, resultsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ResultList = {
      id: number,
      title: string,
      studentName: string,
      studentSurname: string,
      teacherName:string,
      teacherSurname:string,
      className: string,
      score: number,
      startTime: Date,
};


const ResultsListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined; }) => {
    
      //for actions column
  const { role, userId } = await getUserRole();
  
  const columns: any = [
    { header: "Title", accessories: "title" },
    {
      header: "Student",
      accessories: "student",
    },
    {
      header: "Score",
      accessories: "core",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessories: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessories: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessories: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher" ? [{ header: "Actions", accessories: "action" }] : []),
  ];
  
  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
    >
      <td className="flex align-top gap-2 py-4">
        <div className="flex flex-col">
          <h3 className="text-xs md:text-sm">{item.title}</h3>
        </div>
      </td>
      <td className=" text-xs md:text-sm">{item.studentName} {item.studentSurname}</td>
      <td className="hidden md:table-cell text-xs md:text-sm">{item.score}</td>
      <td className="hidden md:table-cell text-xs md:text-sm">{item.teacherName} {item.teacherSurname}</td>
      <td className="hidden md:table-cell text-xs md:text-sm">{item.className}</td>
      <td className="hidden md:table-cell text-xs md:text-sm">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/student/${item.id}`}>
            <button className="rounded-full w-7 h-7 bg-sanikaSky flex items-center justify-center ">
              <Image src="/edit.png" alt="" width={14} height={14} />
            </button>
          </Link> */}
          {(role === "admin" || role === "teacher") && (
            // <button className="rounded-full w-7 h-7 bg-sanikaPurple flex items-center justify-center ">
            //   <Image src="/delete.png" alt="" width={14} height={14} />
            // </button>
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // url params conditions
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              {exam: {title:{ contains: value, mode: "insensitive" }}},
              {student: {name:{ contains: value, mode: "insensitive" }}},
            ]
            break;
          default:
            break;
        }
      }
    }
  }

//role based condition

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: {lesson: {teacherId: userId! }}},
        { assignment: {lesson: {teacherId: userId! }}},
      ]
      break;
    case "student":
      query.studentId = userId!;
      break;
    case "parent":
      query.student = { parentId: userId! };
      break;
    default:
      break;
  }


  const [resultData, resultCount] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.result.count({ where: query }),
  ]);

  const dataRes = resultData.map((item) => { 
    const assessment = item.exam || item.assignment;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName:assessment.lesson.teacher.name,
      teacherSurname:assessment.lesson.teacher.surname,
      className: assessment.lesson.class.name,
      score: item.score,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    }
  })
 
  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center justify-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                <Image src="/filter.png" alt="filter" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                <Image src="/sort.png" alt="filter" width={14} height={14} />
              </button>
              {(role === "admin" || role === "teacher") && (
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                //   <Image src="/plus.png" alt="filter" width={14} height={14} />
                // </button>
                <>
                  <FormModal table="result" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={dataRes} />
        {/* pagination section */}
        <Pagination page={p} count={resultCount} />
      </div>
    </>
  );
};

export default ResultsListpage;
