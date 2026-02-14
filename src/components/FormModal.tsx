"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import TeacherForm from "./Forms/TeacherForm";
// import StudentForm from "./Forms/StudentForm";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteAssignment, deleteClass,  deleteExam,  deleteLesson,  deleteResult,  deleteStudent,  deleteSubject, deleteTeacher } from "@/lib/action";


const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  parent: deleteSubject,
  student: deleteStudent,
  lesson: deleteLesson,
  exam: deleteExam,
  assignment: deleteAssignment,
  result: deleteResult,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./Forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>
});
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>
});
const ParentForm = dynamic(() => import("./Forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>
});
const SubjectForm = dynamic(() => import("./Forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>
});
const ClassForm = dynamic(() => import("./Forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>
});
const LessonForm = dynamic(() => import("./Forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>
});
const ExamForm = dynamic(() => import("./Forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>
});
const AssignmentForm = dynamic(() => import("./Forms/AssignmentForm"), {
  loading: () => <h1>Loading...</h1>
});
const ResultForm = dynamic(() => import("./Forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>
});


// Mapping table → form component
const formMapper: Record<
  string,
  (setOpen: Dispatch<SetStateAction<boolean>>, type: "update" | "create", data?: any, relatedData?: any) => JSX.Element
> = {
  teacher: (setOpen, type, data, relatedData) => <TeacherForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  student: (setOpen, type, data, relatedData) => <StudentForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  // parent: (setOpen, type, data, relatedData) => <ParentForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  subject: (setOpen, type, data, relatedData) => <SubjectForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  class: (setOpen, type, data, relatedData) => <ClassForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  lesson: (setOpen, type, data, relatedData) => <LessonForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  exam: (setOpen, type, data, relatedData) => <ExamForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  assignment: (setOpen, type, data, relatedData) => <AssignmentForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
  result: (setOpen, type, data, relatedData) => <ResultForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
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
  relatedData?: any;
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

  const [State, FormsAction] = useFormState(deleteActionMap[table], {
    success: false,
    error: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `${table} deleted successfully`
      );
      router.refresh();
      setOpen(false);
    }
  },[State, router]);

    // Delete modal
    if (type === "delete" && id) {
      return (
        <form action={FormsAction} className="bg-white flex flex-col gap-4 p-4">
          <input type="text | number" hidden name="id" value={id} />
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
      return formMapper[table](setOpen, type, data, relatedData);
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
