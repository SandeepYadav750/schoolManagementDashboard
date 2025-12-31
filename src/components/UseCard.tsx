import { prisma } from "@/lib/prisma";
import Image from "next/image";

const UseCard = async ({
  type,
}: {
  type: string;
}) => {
  const ModelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await ModelMap[type].count();
  // console.log("UseCard data:", data);

  return (
    <>
      <div className="rounded-2xl odd:bg-sanikaPurple even:bg-sanikaYellow p-4 flex-1 gap-2 min-w-[130px]">
        <div className="flex items-center justify-between">
          <span className="bg-white text-xs rounded-xl p-2 text-red-500">
            2025/26
          </span>
          <Image src="/more.png" alt="" width={20} height={20} />
        </div>
        <h1 className=" text-xl my-2">{data}</h1>
        <h2 className="capitalize text-xs text-gray-500">{type}</h2>
      </div>
    </>
  );
};

export default UseCard;
