const Pagination = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-8 text-gray-500 my-4">
        <button className="py-2 px-4 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed ">
          Prev
        </button>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-sanikaSky px-2 rounded-full">1</button>
          <button className=" px-2 rounded-full">2</button>
          <button className=" px-2 rounded-full">3</button>
          <button className=" px-2 rounded-full">...</button>
          <button className=" px-2 rounded-full">10</button>
        </div>
        <button className="py-2 px-4 rounded-md text-xs font-semibold bg-sanikaPurple ">
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
