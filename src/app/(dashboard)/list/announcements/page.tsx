import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Announcement, Class, Prisma } from "@/generated/prisma";
// import { role, announcementsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type AnnouncementList = Announcement & { class: Class };

const AnnouncementsListpage = async ({ searchParams,}: { searchParams: { [key: string]: string } | undefined}) => {
  const { page, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // url params conditions
  const query: Prisma.AnnouncementWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== "undefined") {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const { role } = await getUserRole();
  
  const [announcementData, announcementCount] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.announcement.count({ where: query }),
  ]);


const columns: any = [
  { header: "Title", accessories: "title" },
  {
    header: "Class",
    accessories: "class",
  },
  {
    header: "Date",
    accessories: "date",
    className: "hidden md:table-cell",
  },

  ...(role === "admin" ? [{ header: "Actions", accessories: "action" }] : []),
];

const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <div className="flex flex-col">
        <h3 className="text-xs md:text-sm">{item.title}</h3>
      </div>
    </td>
    <td className="text-xs md:text-sm">{item.class.name}</td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
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
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </>
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
            An Announcements
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
                  <FormModal table="announcement" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table
          columns={columns}
          renderRow={renderRow}
          data={announcementData}
        />
        {/* pagination section */}
        <Pagination page={p} count={announcementCount} />
      </div>
    </>
  );
};

export default AnnouncementsListpage;
