import React from 'react';

const Loading2 = () => {
  return (
    <div className="fixed inset-0 flex items-center bg-white justify-center z-50">
      <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading2;