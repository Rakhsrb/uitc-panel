import {
  SignOut,
  House,
  Users,
  BookOpen,
  Briefcase,
  Wrench,
  UserList,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navLinks = [
    { to: "/", title: "KARUSEL", icon: <House size={20} /> },
    { to: "/admins", title: "ADMINLAR", icon: <Users size={20} /> },
    { to: "/courses", title: "KURSLAR", icon: <BookOpen size={20} /> },
    { to: "/projects", title: "PORTFOLIO", icon: <Briefcase size={20} /> },
    { to: "/services", title: "XIZMATLAR", icon: <Wrench size={20} /> },
    { to: "/team", title: "XODIMLAR", icon: <UserList size={20} /> },
  ];

  return (
    <aside className="min-h-screen   bg-white border-r border-gray-200 shadow-md flex flex-col justify-between p-6">
      <ul className="space-y-2">
        {navLinks.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg ring-2 ring-indigo-300"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="flex items-center gap-3 mt-10 text-red-600 font-semibold px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <SignOut size={20} />
        Chiqish
      </button>
    </aside>
  );
};
