import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const RootLayout = () => {
  return (
    <>
      <main className="root__grid h-screen">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};
