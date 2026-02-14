"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import { ResultInputs, resultSchema } from "@/lib/formValidationSchema";
import { createResult, updateResult } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResultForm = ({
  data,
  type,
  setOpen,
  relatedData,
}: {
  data?: any;
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resultSchema),
  });

  const [State, FormsAction] = useFormState(
    type === "create" ? createResult : updateResult,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    FormsAction(data as ResultInputs);
    console.log("Result data", data);
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `Result ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
    if (State.error) {
    toast.error("Result not created");   // ✅ error toast show karega
  }
  },[State, router, setOpen,type]);

  const { exams, students, assignments } = relatedData;

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A new Result" : "Update the Result"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-start justify-start text-gray-500 gap-4  px-2">
          <InputFields
            label="score"
            name="score"
            type="number"
            defaultValue={data?.score}
            register={register}
            error={errors?.score as any}
          />
          {data && (
            <InputFields
              label="id"
              name="id"
              defaultValue={data?.id}
              register={register}
              error={errors?.id as any}
              hidden
            />
          )}
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Exam</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.examId}
              {...register("examId")}
            >
              <option value="">Nil</option>
              {exams.map((exam: { id: number; title: string }) => (
                <option
                  key={exam.id}
                  value={exam.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.supervisorId === exam.id}
                >
                  {exam.title}
                </option>
              ))}
            </select>
            {errors.examId?.message && (
              <p className="text-red-500 text-xs">
                {errors.examId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Student</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.studentId}
              {...register("studentId")}
            >
              {students.map((student: { id: number; name: string }) => (
                <option
                  key={student.id}
                  value={student.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.supervisorId === exam.id}
                >
                  {student.name}
                </option>
              ))}
            </select>
            {errors.studentId?.message && (
              <p className="text-red-500 text-xs">
                {errors.studentId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Assignment</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.assignmentId}
              {...register("assignmentId")}
            >
              <option value="">Nil</option>
              {assignments.map((assignment: { id: number; title: string }) => (
                <option
                  key={assignment.id}
                  value={assignment.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.supervisorId === exam.id}
                >
                  {assignment.title}
                </option>
              ))}
            </select>
            {errors.assignmentId?.message && (
              <p className="text-red-500 text-xs">
                {errors.assignmentId?.message.toString()}
              </p>
            )}
          </div>
        </div>
        {State.error && (
          <span className="text-red-600 text-xs">
            There was an error processing your Actions.
          </span>
        )}
        <button className="bg-sanikaSky text-black p-2 rounded-md font-bold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </>
  );
};

export default ResultForm;
