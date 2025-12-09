import Image from "next/image";

const TableSearch = () => {
  return (
    <>
      <div className="w-full md:w-auto md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-400 px-2 ">
        <Image src="/search.png" alt="searchbar" width={14} height={14} className="inline-block"/>
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none "
        />
      </div>
    </>
  );
};

export default TableSearch;
