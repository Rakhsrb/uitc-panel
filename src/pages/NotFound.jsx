import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-blue-50 fixed w-screen gap-7">
      <h1 className="text-8xl">404</h1>
      <h1 className="text-5xl">Page not found</h1>
      <Link
        className="text-lg text-white bg-cyan-600 py-2 px-5 rounded-xl"
        to={"/"}
      >
        Ortga qaytish
      </Link>
    </section>
  );
};

export default NotFound;
