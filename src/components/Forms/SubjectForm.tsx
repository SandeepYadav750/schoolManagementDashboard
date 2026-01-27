"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import { SubjectInputs, subjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
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
    resolver: zodResolver(subjectSchema),
  });

  const [State, FormsAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    console.log("data", data);
    FormsAction(data as SubjectInputs);
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `subject ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
  });

  const { teachers } = relatedData;

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A new Subject" : "Update Subject"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-start text-gray-500 justify-start gap-4  px-2">
          <InputFields
            label="Subject Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
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
            <label className="text-xs text-gray-700">Teachers</label>
            <select
              multiple
              className="ring-[1.5px] ring-gray-300 text-gray-500 rounded-md text-sm"
              defaultValue={data?.teachers}
              {...register("teachers")}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    key={teacher.id}
                    value={teacher.id}
                    className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  >
                    {teacher.name} {teacher.surname}
                  </option>
                )
              )}
              {/* <option value="male">Male</option>
              <option value="female">Female</option> */}
            </select>
            {errors.teachers?.message && (
              <p className="text-red-500 text-xs">
                {errors.teachers?.message.toString()}
              </p>
            )}
          </div>
        </div>
        {State.error && (
          <span className="text-red-600 text-xs">
            There was an error processing your request.
          </span>
        )}
        <button className="bg-sanikaSky text-black p-2 rounded-md font-bold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </>
  );
};

export default SubjectForm;
