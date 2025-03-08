import React from "react";

export const Loading = () => {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="h-[80px] w-[80px] border-dotted border-[7px] border-blue-600 rounded-full animate-spin duration-500"></div>
    </section>
  );
};
