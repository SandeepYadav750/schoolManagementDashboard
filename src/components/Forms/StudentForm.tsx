"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFields from "../InputFields";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createStudent, updateStudent } from "@/lib/action";
import { studentSchema } from "@/lib/formValidationSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const StudentForm = ({
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
    resolver: zodResolver(studentSchema),
  });

  const [img, setImg] = useState<any>();

  const [State, FormsAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    console.log("data", data);
    FormsAction({ ...data, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (State.success) {
      // Reset form or show success message
      toast.success(
        `student ${type === "create" ? "created" : "updated"} successfully`
      );
      router.refresh();
      setOpen(false);
    }
  });

  const { grades, classes, parents } = relatedData;

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">
          {" "}
          {type === "create" ? "Create A new Student" : "Update Student"}
        </h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4  px-2">
          <InputFields
            label="UserName"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          <InputFields
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          <InputFields
            label="Password"
            name="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
            type="password"
          />
        </div>
        <span className="text-sm font-medium text-gray-400">
          Personnel Information
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4  px-2">
          <InputFields
            label="First Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <InputFields
            label="Last Name"
            name="surname"
            defaultValue={data?.surname}
            register={register}
            error={errors?.surname}
          />
          <InputFields
            label="Phone No."
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors?.phone}
          />
          <InputFields
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors?.address}
          />
          <InputFields
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={register}
            error={errors?.bloodType}
          />
          <InputFields
            label="Birthday"
            name="birthday"
            defaultValue={data?.birthday.toISOString().split("T")[0]}
            register={register}
            error={errors?.birthday as any}
            type="date"
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
          <div className="w-full flex items-center justify-between md:flex-row gap-2">
            <div className=" flex flex-col gap-2">
              <label className="text-xs text-gray-700">Sex</label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                defaultValue={data?.sex}
                {...register("sex")}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.sex?.message && (
                <p className="text-red-500 text-xs">
                  {errors.sex?.message.toString()}
                </p>
              )}
            </div>
            <div className=" flex flex-col gap-2">
              <label className="text-xs text-gray-700">Grade</label>
              <select
                id="grades"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                defaultValue={data?.gradeId}
                {...register("gradeId")}
              >
                {grades.map((grade: { id: number; level: string }) => (
                  <option
                    key={grade.id}
                    value={grade.id}
                    className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  >
                    {grade.level}
                  </option>
                ))}
              </select>
              {errors.gradeId?.message && (
                <p className="text-red-500 text-xs">
                  {errors.gradeId?.message.toString()}
                </p>
              )}
            </div>
            <div className=" flex flex-col gap-2">
              <label className="text-xs text-gray-700">Class</label>
              <select
                id="classes"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                defaultValue={data?.classId}
                {...register("classId")}
              >
                {classes.map((cls: { id: number; name: string; capacity: number; _count: {students: number}; }) => (
                  <option
                    key={cls.id}
                    value={cls.id}
                    className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                  >
                    {"(" +cls.name} - {cls._count.students + "/" + cls.capacity + " Capacity)"}
                  </option>
                ))}
              </select>
              {errors.classId?.message && (
                <p className="text-red-500 text-xs">
                  {errors.classId?.message.toString()}
                </p>
              )}
            </div>
            <div className=" flex flex-col gap-2">
              <label className="text-xs text-gray-700">Parents</label>
              <select
                id="parents"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                defaultValue={data?.parentId}
                {...register("parentId")}
              >
                {parents.map(
                  (parent: { id: number; name: string; surname: string }) => (
                    <option
                      key={parent.id}
                      value={parent.id}
                      className="cursor-pointer p-2 hover:bg-sanikaSkyLight "
                    >
                      {parent.name} {parent.surname}
                    </option>
                  )
                )}
              </select>
              {errors.parentId?.message && (
                <p className="text-red-500 text-xs">
                  {errors.parentId?.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, widget) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <>
                  <div
                    className="text-xs text-gray-700 mb-2 flex item-center gap-4 cursor-pointer"
                    onClick={() => open()}
                  >
                    <Image
                      src="/upload.png"
                      alt="upload file"
                      width={28}
                      height={28}
                    />
                    <span>Upload a photo</span>
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-sanikaSkyLight border-2 border-sanikaSky ">
                    <Image
                      src={img ? img.secure_url : data?.img || "/noAvatar.png"}
                      alt="Uploaded image"
                      width={100}
                      height={100}
                      className="rounded-full "
                    />
                    {/* {img && (
                        <div className="flex items-center gap-2">
                          <Image
                            src={img.secure_url}
                            alt="Uploaded image"
                            width={100}
                            height={100}
                          />
                        </div>
                      )} */}
                  </div>
                </>
              );
            }}
          </CldUploadWidget>
        </div>
        {State.error && (
          <span className="text-red-600 text-xs">
            {State.error
              ? State.error
              : "There was an error processing your Actions."}
          </span>
        )}
        <button className="bg-sanikaSky text-black p-2 rounded-md font-bold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </>
  );
};

export default StudentForm;
