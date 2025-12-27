import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Parent, Prisma, Student } from "@/generated/prisma";
import { parentsData, role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";

// type Parent = {
//   id: number;
//   name: string;
//   email?: string;
//   phone: string;
//   students: string[];
//   address: string;
// };

type ParentsList = Parent & { students: Student[] };


const ParentsListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined; }) => {
   
    //for actions column
      const { role } = await getUserRole();
  
  const columns: any = [
    { header: "Info", accessories: "info" },
    {
      header: "Student Name",
      accessories: "studentName",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessories: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessories: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [{ header: "Actions", accessories: "action" }] : []),
  ];
  
  const renderRow = (item: ParentsList) => (
    <tr
      key={item.id}
      className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
    >
      <td className="flex align-top gap-2 py-4">
        <div className="flex flex-col">
          <h3 className="">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/parent/${item.id}`}>
            <button className="rounded-full w-7 h-7 bg-sanikaSky flex items-center justify-center ">
              <Image src="/edit.png" alt="" width={14} height={14} />
            </button>
          </Link> */}
          {role === "admin" && (
            // <button className="rounded-full w-7 h-7 bg-sanikaPurple flex items-center justify-center ">
            //   <Image src="/delete.png" alt="" width={14} height={14} />
            // </button>
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // url params conditions
  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }

   const [parentData, parentCount] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.parent.count({ where: query }),
  ]);

  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                <FormModal table="parent" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={parentData} />
        {/* pagination section */}
        <Pagination page={p} count={parentCount} />
      </div>
    </>
  );
};

export default ParentsListpage;
