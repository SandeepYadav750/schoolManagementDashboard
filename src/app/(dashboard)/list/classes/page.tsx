import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Prisma, Teacher } from "@/generated/prisma";
// import { role, classesData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Classes = {
//   id: number;
//   name: string;
//   capacity: number;
//   grade: number;
//   supervisor: string;
// };

type ClassList = Class & { supervisor: Teacher };

const classesListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined; }) => {
  
    //for actions column
    const { role } = await getUserRole();

const columns: any = [
  { header: "Class Name", accessories: "className" },
  {
    header: "Capacity",
    accessories: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessories: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Class Teacher",
    accessories: "classTeacher",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" ? [{ header: "Actions", accessories: "action" }] : []),
];

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <div className="flex flex-col">
        <h3 className="">{item.name}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    {/* <td className="hidden md:table-cell">{item.name[0]}</td> */}
    <td className="hidden md:table-cell">{item.gradeId}</td>
    <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname }</td>
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
            <FormContainer table="class" type="update" data={item} />
            <FormContainer table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // url params conditions
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }
  

  const [classData, classCount] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.class.count({ where: query }),
  ]);


  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                  <FormContainer table="class" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={classData} />
        {/* pagination section */}
        <Pagination page={p} count={classCount} />
      </div>
    </>
  );
};

export default classesListpage;
