import { SignOut } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navLinks = [
    {
      to: "/",
      title: "KARUSEL",
    },
    {
      to: "/admins",
      title: "ADMINLAR",
    },
    {
      to: "/courses",
      title: "KURSLAR",
    },
    {
      to: "/projects",
      title: "PORTFOLIO",
    },
    {
      to: "/services",
      title: "XIZMATLAR",
    },
    {
      to: "/team",
      title: "XODIMLAR",
    },
  ];

  return (
    <aside className="relative shadow-lg">
      <ul className="flex flex-col">
        {navLinks.map((item, index) => (
          <li key={index + 1}>
            <NavLink
              to={item.to}
              className="flex items-center gap-2 text-blue-800 opacity-70 text-xl p-5 font-bold"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className="absolute text-lg flex items-center gap-2 left-0 bottom-0 py-3 px-6"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout <SignOut />
      </button>
    </aside>
  );
};
