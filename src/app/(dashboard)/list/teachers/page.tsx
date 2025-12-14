import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormModal from "@/components/FormModal";
import {prisma} from "@/lib/prisma";
import { Class, Subject, Teacher } from "@/generated/prisma";
import { Console } from "console";

// type Teacher = {
//   id: number;
//   name: string;
//   teacherId: string;
//   email?: string;
//   photo: string;
//   phone: string;
//   subjects: string[];
//   classes: string[];
//   address: string;
// };

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns: any = [
  { header: "Info", accessories: "info" },
  {
    header: "Teacher ID",
    accessories: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessories: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessories: "classes",
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
  { header: "Actions", accessories: "action" },
];

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt="teacherPhoto"
        width={40}
        height={40}
        className="md:hidden lg:block rounded-full object-cover w-10 h-10"
      />
      <div className="flex flex-col">
        <h3 className="">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.subjects.map(subject => subject.name).join(", ")}</td>
    <td className="hidden md:table-cell">{item.classes.map(classItem => classItem.name).join(", ")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="rounded-full w-7 h-7 bg-sanikaSky flex items-center justify-center ">
            <Image src="/view.png" alt="" width={14} height={14} />
          </button>
        </Link>
        {role === "admin" && (
          // <button className="rounded-full w-7 h-7 bg-sanikaPurple flex items-center justify-center ">
          //   <Image src="/delete.png" alt="" width={14} height={14} />
          // </button>
          <FormModal table="teacher" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const TeachersListpage = async () => {

  const TeacherDATA = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
  });
  console.log("TeacherDATA", TeacherDATA);
  
  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            All Teachers
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
                <FormModal table="teacher" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={TeacherDATA} />
        {/* pagination section */}
        <Pagination />
      </div>
    </>
  );
};

export default TeachersListpage;
