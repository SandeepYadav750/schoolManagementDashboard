import Image from "next/image";
import React from "react";

const Announcement = () => {
  const announcement = () => [
    {
      id: 1,
      title: "What is Lorem Ipsum?",
      date: "2025-08-01",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      title: "Why do we use it?",
      date: "2025-08-01",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      title: "What is Lorem Ipsum?",
      date: "2025-08-01",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <>
      <div className="bg-white p-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-lg font-semibold">Announcements</span>
          <span className="text-xs text-gray-400 hover:underline hover:cursor-pointer">
            View All
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {announcement().map((annc: any) => (
            <div
              className="rounded-md p-2 odd:bg-sanikaSkyLight even:bg-sanikaPurpleLight"
              key={annc.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{annc.title}</h1>
                <h2 className="text-xs text-gray-300 bg-white p-1 rounded-md">
                  {annc.date}
                </h2>
              </div>
              <div className="mt-1 text-xs text-gray-400">{annc.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Announcement;
