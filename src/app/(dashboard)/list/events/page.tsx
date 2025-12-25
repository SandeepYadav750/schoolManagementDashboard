import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Event, Prisma } from "@/generated/prisma";
import { role, eventsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Events = {
//   id: number;
//   title: string;
//   class: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// };

type EventList = Event & {class: Class}

const columns: any = [
  { header: "Title", accessories: "title" },
  {
    header: "Class",
    accessories: "class",
  },
  {
    header: "Date",
    accessories: "date",
  },
  {
    header: "Start Time",
    accessories: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessories: "endTime",
    className: "hidden md:table-cell",
  },

  { header: "Actions", accessories: "action" },
];

const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="boder-b border-b-gray-200 text-sm even:bg-slate-50 hover:bg-sanikaPurpleLight"
  >
    <td className="flex align-top gap-2 py-4">
      <div className="flex flex-col">
        <h3 className="text-xs md:text-sm">{item.title}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell text-xs md:text-sm">{item.class.name}</td>

    <td className="text-xs md:text-sm">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {item.startTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}
    </td>
    <td className="hidden md:table-cell text-xs md:text-sm">
      {item.endTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}
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
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const EventsListpage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page, ...queryParams } = searchParams || {};

  const p = page ? parseInt(page) : 1;

  // url params conditions

  const query: Prisma.EventWhereInput = {};

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

  const [eventData, eventCount] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),

    prisma.event.count({ where: query }),
  ]);

  return (
    <>
      <div className="bg-white p-4 rounded-md m-4">
        {/* top section */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                  <FormModal table="event" type="create" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* list section */}
        <Table columns={columns} renderRow={renderRow} data={eventData} />
        {/* pagination section */}
        <Pagination page={p} count={eventCount} />
      </div>
    </>
  );
};

export default EventsListpage;
