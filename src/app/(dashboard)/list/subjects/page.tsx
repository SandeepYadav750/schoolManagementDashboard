import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const SubjectsListpage = () => {
  const columns: any = [
    { header: "Subject Name", accessories: "subjectName" },
    {
      header: "Teachers",
      accessories: "teachers",
      // className: "hidden md:table-cell",
    },
    { header: "Actions", accessories: "action" },
  ];

  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
    >
      <td className="flex align-top gap-2 py-4">
        <div className="flex flex-col">
          <h3 className="text-xs md:text-sm">{item.name}</h3>
        </div>
      </td>
      <td className="text-xs md:text-sm">{item.teachers.join(", ")}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/student/${item.id}`}>
            <button className="rounded-full w-7 h-7 bg-sanikaSky flex items-center justify-center ">
              <Image src="/edit.png" alt="" width={14} height={14} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="rounded-full w-7 h-7 bg-sanikaPurple flex items-center justify-center ">
              <Image src="/delete.png" alt="" width={14} height={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            All Subjects
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
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sanikaYellow">
                  <Image src="/plus.png" alt="filter" width={14} height={14} />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={subjectsData} />
        {/* pagination section */}
        <Pagination />
      </div>
    </>
  );
};

export default SubjectsListpage;
