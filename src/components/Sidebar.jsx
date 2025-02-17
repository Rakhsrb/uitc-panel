import {
  Books,
  Circuitry,
  Command,
  SignOut,
  UserCircleGear,
  Users,
} from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navLinks = [
    {
      to: "/admins",
      title: "ADMINLAR",
      icon: <UserCircleGear weight="bold" />,
    },
    {
      to: "/courses",
      title: "KURSLAR",
      icon: <Books weight="bold" />,
    },
    {
      to: "/projects",
      title: "PORTFOLIO",
      icon: <Circuitry weight="bold" />,
    },
    {
      to: "/services",
      title: "XIZMATLAR",
      icon: <Command weight="bold" />,
    },
    {
      to: "/team",
      title: "XODIMLAR",
      icon: <Users weight="bold" />,
    },
  ];

  return (
    <aside className="relative">
      <ul className="flex flex-col">
        {navLinks.map((item, index) => (
          <li key={index + 1}>
            <NavLink
              to={item.to}
              className="flex items-center gap-2 text-blue-800 opacity-70 text-xl p-5 font-bold"
            >
              {item.title} {item.icon}
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
