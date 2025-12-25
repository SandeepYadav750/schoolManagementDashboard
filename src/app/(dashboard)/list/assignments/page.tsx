import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Assignment, Class, Prisma, Subject, Teacher } from "@/generated/prisma";
import { role, assignmentsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Assignments = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   dueDate: string;
// };

type AssignmentList = Assignment & {
  lesson: { subject: Subject, class: Class, teacher: Teacher };
};

const columns: any = [
  { header: "Subject", accessories: "subject" },
  {
    header: "Class",
    accessories: "class",
  },
  {
    header: "Teacher",
    accessories: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessories: "dueDate",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessories: "action" },
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <div className="flex flex-col">
        <h3 className="text-xs md:text-sm">{item.lesson.subject.name}</h3>
      </div>
    </td>
    <td className="text-xs md:text-sm">{item.lesson.class.name}</td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {item.lesson.teacher.name} {item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {/* {item.dueDate} */}
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
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
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentsListpage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};

  const p = page ? parseInt(page) : 1;

  // url params conditions

  const query: Prisma.AssignmentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;
          case "search":
            query.lesson = { subject: { name: { contains: value, mode: "insensitive" } } };
            break;
          default:
            break;
        }
      }
    }
  }

  const [assignmentData, assignmentCount] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select:{
          subject: { select: { name: true } },
          class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.assignment.count({ where: query }),
  ]);

  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            All Assignments
          </h1>
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
                  <FormModal table="assignment" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={assignmentData} />
        {/* pagination section */}
        <Pagination page={p} count={assignmentCount} />
      </div>
    </>
  );
};

export default AssignmentsListpage;
