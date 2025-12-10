"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFields from "../InputFields";
import Image from "next/image";

const schema = z.object({
  userName: z
    .string()
    .min(3, { message: "UserName must be atleast 3 char long." })
    .max(255, { message: "UserName must be atmost 255 char long." }),
  email: z.string().email({ message: "Invalid Email address." }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 char long." }),
  firstName: z
    .string()
    .min(3, { message: "firstName must be atleast 3 char long." })
    .max(255, { message: "firstName must be atmost 255 char long." }),
  lastName: z
    .string()
    .min(3, { message: "lastName must be atleast 3 char long." })
    .max(255, { message: "lastName must be atmost 255 char long." }),
  phone: z
    .string()
    .min(10, { message: "Phone No. must be atleast 10 char long." })
    .max(12, { message: "Phone No. must be atmost 12 length." }),
  address: z
    .string()
    .min(3, { message: "Address must be atleast 3 char long." })
    .max(255, { message: "Address must be atmost 255 char long." }),
  bloodType: z.string().min(1, { message: "BloodType is required." }),
  birthday: z.string().date({ message: "Birthday is required." }),
  sex: z.enum(["male", "female"], { message: "sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
  data,
  type,
}: {
  data?: any;
  type: "create" | "update";
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onsubmit = handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <>
      <form
        onSubmit={onsubmit}
        className="flex flex-col gap-4 h-[600px] md:h-auto overflow-auto"
      >
        <h1 className="text-xl font-semibold">Create A new Parent</h1>
        <span className="text-sm font-medium text-gray-400">
          Additional Information
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 px-2">
          <InputFields
            label="UserName"
            name="userName"
            defaultValue={data?.userName}
            register={register}
            error={errors?.userName}
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
            name="firstName"
            defaultValue={data?.firstName}
            register={register}
            error={errors?.firstName}
          />
          <InputFields
            label="Last Name"
            name="lastName"
            defaultValue={data?.lastName}
            register={register}
            error={errors?.lastName}
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
            defaultValue={data?.birthday}
            register={register}
            error={errors?.birthday}
            type="date"
          />
          <div className="w-full flex md:items-center md:justify-between md:flex-row gap-2">
            <div className=" flex flex-col gap-2">
              <label className="text-xs text-gray-700 ">Sex</label>
              <select
                id="cars"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                defaultValue={data?.sex}
                {...register("sex")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex?.message && (
                <p className="text-red-500 text-xs">
                  {errors.sex?.message.toString()}
                </p>
              )}
            </div>
            <div className=" flex flex-col gap-2 mt-4 md:mt-0">
              <label
                className="text-xs text-gray-700 mb-2 flex item-center gap-4 cursor-pointer "
                htmlFor="img"
              >
                <Image
                  src="/upload.png"
                  alt="upload file"
                  width={28}
                  height={28}
                />
                <span>Upload a photo</span>
              </label>
              <input
                id="img"
                type="file"
                {...register("img")}
                className="hidden"
              />
              {errors.img?.message && (
                <p className="text-red-500 text-xs">
                  {errors.img?.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
        <button className="bg-sanikaSky text-black p-2 rounded-md font-bold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </>
  );
};

export default ParentForm;
