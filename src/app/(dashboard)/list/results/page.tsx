import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Prisma, Result } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type ResultWithRelations = Result & {
  student: { name: string; surname: string };
  exam: any;
  assignment: any;
};

const ResultsListpage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  const { role, userId } = await getUserRole();

  const query: Prisma.ResultWhereInput = {};

  // ---------------- Search & Filters ----------------
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value || value === "undefined") continue;

      switch (key) {
        case "studentId":
          query.studentId = value;
          break;

        case "search":
          query.OR = [
            { exam: { title: { contains: value, mode: "insensitive" } } },
            { assignment: { title: { contains: value, mode: "insensitive" } } },
            { student: { name: { contains: value, mode: "insensitive" } } },
          ];
          break;
      }
    }
  }

  // ---------------- Role Based Filtering ----------------
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

  // ---------------- Data Mapping ----------------
  const dataRes = resultData
    .map((item: ResultWithRelations) => {
      const assessment = item.exam ?? item.assignment;
      if (!assessment) return null;

      const isExam = !!item.exam;

      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        className: assessment.lesson.class.name,
        score: item.score,
        date: isExam ? assessment.startTime : assessment.startDate,
      };
    })
    .filter(Boolean);

  // ---------------- Table Columns ----------------
  const columns: any = [
    { header: "Title", accessories: "title" },
    { header: "Student", accessories: "student" },
    { header: "Score", accessories: "score", className: "hidden md:table-cell" },
    { header: "Teacher", accessories: "teacher", className: "hidden md:table-cell" },
    { header: "Class", accessories: "class", className: "hidden md:table-cell" },
    { header: "Date", accessories: "date", className: "hidden md:table-cell" },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessories: "action" }]
      : []),
  ];

  const renderRow = (item: any) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
    >
      <td className="py-4 text-xs md:text-sm">{item.title}</td>
      <td className="text-xs md:text-sm">
        {item.studentName} {item.studentSurname}
      </td>
      <td className="hidden md:table-cell text-xs md:text-sm">{item.score}</td>
      <td className="hidden md:table-cell text-xs md:text-sm">
        {item.teacherName} {item.teacherSurname}
      </td>
      <td className="hidden md:table-cell text-xs md:text-sm">
        {item.className}
      </td>
      <td className="hidden md:table-cell text-xs md:text-sm">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>
        {(role === "admin" || role === "teacher") && (
          <div className="flex gap-2">
            <FormContainer table="result" type="update" data={item} />
            <FormContainer table="result" type="delete" id={item.id} />
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md m-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Results
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4">
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
                  <FormContainer table="result" type="create" />
                </>
              )}
            </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={dataRes} />
      <Pagination page={p} count={resultCount} />
    </div>
  );
};

export default ResultsListpage;
