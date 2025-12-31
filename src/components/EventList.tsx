import { prisma } from "@/lib/prisma";
import React from "react";

const EventList = async ({ dateParam }: { dateParam?: string | undefined }) => {
  //const date = dateParam ? new Date(dateParam) : new Date();

    const baseDate = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();

  // Start & End of day (NO mutation)
  const startOfDay = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    0, 0, 0, 0
  );

  const endOfDay = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    23, 59, 59, 999
  );
    
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // ✅ NO EVENTS CASE
  if (data.length === 0) {
    return (
      <div className="text-sm text-gray-400 italic">
        No events found for this date
      </div>
    );
  }

  return (
    <>
      {data.map((event: any) => (
        <div
          className="border-2 border-gray-300 rounded-md p-2 border-t-4 odd:border-t-sanikaSky even:border-t-sanikaPurple"
          key={event.id}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-500">{event.title}</h1>
            <h2 className="text-xs text-gray-300">
              {event.startTime.toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h2>
          </div>
          <div className="mt-1 text-xs text-gray-400">{event.description}</div>
        </div>
      ))}
    </>
  );
};

export default EventList;
