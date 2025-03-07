import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-blue-50 fixed w-screen gap-7">
      <h1 className="text-5xl text-white">Page not found</h1>
      <Link
        className="underline text-lg text-white bg-cyan-600 py-2 px-5 rounded-xl"
        to={"/"}
      >
        Go back
      </Link>
    </section>
  );
};

export default NotFound;
