import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        {/* search bar */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-400 px-2">
          <Image src="/search.png" alt="searchbar" width={14} height={14}  className="inline-block"/>
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div>
        {/* icon & user */}
        <div className="flex gap-2 md:gap-4 items-center justify-end w-full">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/message.png" alt="" width={20} height={20} />
          </div>
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <Image src="/announcement.png" alt="" width={20} height={20} />
            <span className="absolute -top-2 -right-2 text-[8px] rounded-full bg-purple-500 text-white w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">Sandeep Yadav</span>
            <span className="text-[10px] text-gray-500 text-right">Admin</span>
          </div>
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image
              src="/avatar.png"
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
