"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import { LessonInputs, lessonSchema } from "@/lib/formValidationSchema";
import { createLesson, updateLesson } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LessonForm = ({
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
    resolver: zodResolver(lessonSchema),
  });

  const [State, FormsAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    console.log("data", data);
    FormsAction(data as LessonInputs);
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `Lesson ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
  });

  const { teachers, classes, subjects } = relatedData;

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A new Lesson" : "Update the Lesson"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-start justify-start text-gray-500 gap-4  px-2">
          <InputFields
            label="Lesson Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name as any}
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
            <label className="text-xs text-gray-700">Day</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              {...register("day")}
              defaultValue={data?.day}
            >
              <option value="">Select Day</option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
            </select>

            {errors.day?.message && (
              <p className="text-red-500 text-xs">
                {errors.day.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Supervisor</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.teacherId}
              {...register("teacherId")}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    key={teacher.id}
                    value={teacher.id}
                    className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                    // selected={data && data?.supervisorId === teacher.id}
                  >
                    {teacher.name} {teacher.surname}
                  </option>
                )
              )}
              {/* <option value="male">Male</option>
              <option value="female">Female</option> */}
            </select>
            {errors.teacherId?.message && (
              <p className="text-red-500 text-xs">
                {errors.teacherId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.classId}
              {...register("classId")}
            >
              {classes.map((classe: { id: string; name: string }) => (
                <option
                  key={classe.id}
                  value={classe.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.classeId === classe.id}
                >
                  {classe.name}
                </option>
              ))}
              {/* <option value="male">Male</option>
              <option value="female">Female</option> */}
            </select>
            {errors.classId?.message && (
              <p className="text-red-500 text-xs">
                {errors.classId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Subject</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.subjectId}
              {...register("subjectId")}
            >
              {subjects.map((subject: { id: string; name: string }) => (
                <option
                  key={subject.id}
                  value={subject.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.classeId === classe.id}
                >
                  {subject.name}
                </option>
              ))}
              {/* <option value="male">Male</option>
              <option value="female">Female</option> */}
            </select>
            {errors.subjectId?.message && (
              <p className="text-red-500 text-xs">
                {errors.subjectId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Start Time</label>
            <input
              type="date"
              className="ring-[1.5px] ring-gray-300 h-9 px-2 text-gray-500 rounded-md text-sm"
              {...register("startTime")}
              defaultValue={data?.startTime.toISOString().split("T")[0]}
            />

            {errors.startTime?.message && (
              <p className="text-red-500 text-xs">
                {errors.startTime.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">End Time</label>
            <input
              type="date"
              className="ring-[1.5px] ring-gray-300 h-9 px-2 text-gray-500 rounded-md text-sm"
              {...register("endTime")}
              defaultValue={data?.endTime.toISOString().split("T")[0]}
            />

            {errors.endTime?.message && (
              <p className="text-red-500 text-xs">
                {errors.endTime.message.toString()}
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

export default LessonForm;
