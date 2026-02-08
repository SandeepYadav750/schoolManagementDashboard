"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import { classInputs, classSchema } from "@/lib/formValidationSchema";
import { createclass, updateclass } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
    resolver: zodResolver(classSchema),
  });

  const [State, FormsAction] = useFormState(
    type === "create" ? createclass : updateclass,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    console.log("data", data);
    FormsAction(data as classInputs);
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `Class ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
  });

  const { teachers, grades } = relatedData;

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A new Class" : "Update the Class"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-start text-gray-500justify-start gap-4  px-2">
          <InputFields
            label="Class Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name as any}
          />
          <InputFields
            label="Capacity Name"
            name="capacity"
            defaultValue={data?.capacity}
            register={register}
            error={errors?.capacity as any}
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
            <label className="text-xs text-gray-700">Supervisor</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.supervisorId}
              {...register("supervisorId")}
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
            {errors.supervisorId?.message && (
              <p className="text-red-500 text-xs">
                {errors.supervisorId?.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs text-gray-700">Grades</label>
            <select
              className="ring-[1.5px] ring-gray-300 h-9 text-gray-500 rounded-md text-sm"
              defaultValue={data?.gradeId}
              {...register("gradeId")}
            >
              {grades.map((grade: { id: string; level: number }) => (
                <option
                  key={grade.id}
                  value={grade.id}
                  className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  // selected={data && data?.gradeId === grade.id}
                >
                  {grade.level}
                </option>
              ))}
              {/* <option value="male">Male</option>
              <option value="female">Female</option> */}
            </select>
            {errors.gradeId?.message && (
              <p className="text-red-500 text-xs">
                {errors.gradeId?.message.toString()}
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

export default ClassForm;
