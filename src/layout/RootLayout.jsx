import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const RootLayout = () => {
  return (
    <>
      <div className="root__grid h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
