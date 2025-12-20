"use client";

import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./Forms/TeacherForm";
// import StudentForm from "./Forms/StudentForm";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("./Forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>
});
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>
});
const ParentForm = dynamic(() => import("./Forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>
});


// Mapping table → form component
const formMapper: Record<
  string,
  (type: "update" | "create", data?: any) => JSX.Element
> = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
};

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
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-sanikaYellow"
      : type === "update"
      ? "bg-sanikaSky"
      : "bg-sanikaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    // Delete modal
    if (type === "delete" && id) {
      return (
        <form className="bg-white flex flex-col gap-4 p-4">
          <span className="text-center font-medium text-black">
            All the data will be lost. Are you sure you want to delete this{" "}
            {table}?
          </span>
          <button className="bg-red-800 text-white py-2 px-4 self-center rounded-md">
            Delete
          </button>
        </form>
      );
    }

    // Create / Update Form
    if ((type === "create" || type === "update") && formMapper[table]) {
      return formMapper[table](type, data);
    }

    return <p className="text-center text-gray-600">Form not found</p>;
  };

  return (
    <>
      <button
        className={`${bgColor} rounded-full p-2 flex items-center justify-center ${size}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={14} height={14} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start md:items-center justify-center">
          <div className="bg-white p-4 rounded-md relative top-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer">
              <Image
                src="/close.png"
                alt="close"
                width={14}
                height={14}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
