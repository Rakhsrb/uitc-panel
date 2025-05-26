import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <section className="h-screen flex p-6 justify-center items-center bg-blue-200 fixed w-screen gap-7">
      <div className="flex flex-col justify-center overflow-hidden items-center text-center gap-5 relative rounded-2xl w-full py-20 md:w-[600px] bg-white">
        <div className="absolute left-0 top-0 h-[20px] bg-blue-600 w-full flex gap-1 items-center pl-4">
          <span className="w-[8px] h-[8px] rounded-full bg-white"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-white"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-white"></span>
        </div>
        <h1 className="text-6xl md:text-8xl">404</h1>
        <h1 className="text-3xl md:text-5xl">Page not found</h1>
        <Link to={"/"}>
          <Button>Ortga qaytish</Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
