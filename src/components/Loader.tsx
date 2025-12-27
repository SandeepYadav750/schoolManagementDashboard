import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start md:items-center justify-center">
      <div className="p-4 rounded-md relative top-2 flex flex-col items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-white">Checking session...</p>
      </div>
    </div>
  )
}

export default Loader;
