import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen p-4 rounded-md flex flex-col items-center justify-center">
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm ">Loading...</p>
    </div>
  );
};

export default Loader;
