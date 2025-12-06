"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = () => [
  {
    id: 1,
    title: "What is Lorem Ipsum?",
    time: "12:00AM - 02:00PM",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    title: "Why do we use it?",
    time: "11:00AM - 03:00PM",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    title: "What is Lorem Ipsum?",
    time: "10:00AM - 02:00PM",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const EvenetCalander = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-8">
        <Calendar onChange={onChange} value={value} />
        <div className="events">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-lg font-semibold ">Events</span>
            <Image src="/moreDark.png" alt="" width={20} height={20} />
          </div>
          <div className="flex flex-col gap-4">
            {events().map((event: any) => (
              <div
                className="border-2 border-gray-300 rounded-md p-2 border-t-4 odd:border-t-sanikaSky even:border-t-sanikaPurple"
                key={event.id}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-gray-500">{event.title}</h1>
                  <h2 className="text-xs text-gray-300">{event.time}</h2>
                </div>
                <div className="mt-1 text-xs text-gray-400">{event.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvenetCalander;
