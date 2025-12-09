"use client";

import Image from "next/image";
import { useState } from "react";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "update" | "create" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 w-7";
  const bgColor =
    type === "create"
      ? "bg-sanikaYellow"
      : type === "update"
      ? "bg-sanikaSky"
      : "bg-sanikaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="bg-white flex flex-col gap-4 p-4">
        <span className="text-center font-medium text-black">
          All the data will lost, Are you sure you want to delete this {table}.
        </span>
        <button className="bg-red-800 text-white py-2 px-4 self-center rounded-md">
          Delete
        </button>
      </form>
    ) : (
      "create and update in next way"
    );
  };

  return (
    <>
      <button
        className={`${bgColor} rounded-full p-2 flex items-center justify-center ${size}`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Image src={`/${type}.png`} alt="" width={14} height={14} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer">
              <Image
                src="/close.png"
                alt="close"
                width={14}
                height={14}
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
