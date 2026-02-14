"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import { AssignmentInputs, assignmentSchema, ExamInputs, examSchema } from "@/lib/formValidationSchema";
import { createAssignment, createExam, updateAssignment, updateExam } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AssignmentForm = ({
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
    resolver: zodResolver(assignmentSchema),
  });

  const [State, FormsAction] = useFormState(
    type === "create" ? createAssignment : updateAssignment,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    FormsAction(data as AssignmentInputs);
    console.log("Assignment data", data);
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `Assignment ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
    if (State.error) {
    toast.error("assignment not created");   // ✅ error toast show karega
  }
  },[State, router, setOpen,type]);

  // const { lessons } = relatedData;
  const lessons = relatedData?.lessons ?? [];

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A new Assignment" : "Update the Assignment"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-start justify-start text-gray-500 gap-4  px-2">
          <InputFields
            label="Assignment title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors?.title as any}
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
            <label className="text-xs text-gray-700">Lesson</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.lessonId}
              {...register("lessonId")}
            >
              {lessons.map((lesson: { id: number; name: string }) => (
                <option
                  key={lesson.id}
                  value={lesson.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.supervisorId === lesson.id}
                >
                  {lesson.name}
                </option>
              ))}
            </select>
            {errors.lessonId?.message && (
              <p className="text-red-500 text-xs">
                {errors.lessonId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <InputFields
              label="Start Date"
              name="startDate"
              type={type === "create" ? "datetime-local" : "date"}
              defaultValue={data?.startDate.toISOString().split("T")[0]}
              register={register}
              error={errors?.startDate as any}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Due Date</label>
            <input
              type={type === "create" ? "datetime-local" : "date"}
              className="ring-[1.5px] ring-gray-300 h-9 px-2 text-gray-500 rounded-md text-sm"
              {...register("dueDate")}
              defaultValue={data?.dueDate.toISOString().split("T")[0]}
            />
            {errors.dueDate?.message && (
              <p className="text-red-500 text-xs">
                {errors.dueDate.message.toString()}
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

export default AssignmentForm;
