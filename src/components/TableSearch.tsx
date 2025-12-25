"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-auto md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-400 px-2 "
      >
        <Image
          src="/search.png"
          alt="searchbar"
          width={14}
          height={14}
          className="inline-block"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none "
        />
      </form>
    </>
  );
};

export default TableSearch;
