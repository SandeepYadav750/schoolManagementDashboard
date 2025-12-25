import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Lesson, Prisma, Subject, Teacher } from "@/generated/prisma";
import { role, lessonsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Lessons = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
// };

type LessonList = Lesson & { subject: Subject} & { class: Class} & { teacher: Teacher}

const columns: any = [
  { header: "Subject Name", accessories: "subjectName" },
  {
    header: "Class",
    accessories: "class",
  },
  {
    header: "Teacher",
    accessories: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessories: "action" },
];

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <div className="flex flex-col">
        <h3 className="text-xs md:text-sm">{item.subject.name}</h3>
      </div>
    </td>
    <td className="text-xs md:text-sm">{item.class.name}</td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {item.teacher.name} {item.teacher.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {/* <Link href={`/list/student/${item.id}`}>
          <button className="rounded-full w-7 h-7 bg-sanikaSky flex items-center justify-center ">
            <Image src="/edit.png" alt="" width={14} height={14} />
          </button>
        </Link> */}
        {role === "admin" && (
          // <button className="rounded-full w-7 h-7 bg-sanikaPurple flex items-center justify-center ">
          //   <Image src="/delete.png" alt="" width={14} height={14} />
          // </button>
          <>
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const LessonsListpage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};

  const p = page ? parseInt(page) : 1;

  // url params conditions

  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              {subject: {name:{ contains: value, mode: "insensitive" }}},
              {teacher: {name:{ contains: value, mode: "insensitive" }}},
            ]
            break;
          default:
            break;
        }
      }
    }
  }

  const [lessonData, lessonCount] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: {select: {name:true}},
        class: {select: {name:true}},
        teacher: {select: {name:true,surname:true}},
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.lesson.count({ where: query }),
  ]);


  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center justify-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                <Image src="/filter.png" alt="filter" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                <Image src="/sort.png" alt="filter" width={14} height={14} />
              </button>
              {role === "admin" && (
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                //   <Image src="/plus.png" alt="filter" width={14} height={14} />
                // </button>
                <>
                  <FormModal table="lesson" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={lessonData} />
        {/* pagination section */}
        <Pagination page={p} count={lessonCount} />
      </div>
    </>
  );
};

export default LessonsListpage;
