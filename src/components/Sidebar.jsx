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
      title: "LOYIHALAR",
    },
    {
      to: "/services",
      title: "XIZMATLAR",
    },
    {
      to: "/staffs",
      title: "XODIMLAR",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="relative shadow-lg">
      <ul className="flex flex-col gap-2 p-2">
        {navLinks.map((item, index) => (
          <li key={index + 1}>
            <NavLink
              to={item.to}
              className="flex items-center gap-2 text-blue-800 opacity-70 p-2 rounded-lg font-bold"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="absolute text-lg flex items-center gap-2 left-0 bottom-0 py-3 px-6"
        onClick={handleLogout}
      >
        Chiqish
      </button>
    </aside>
  );
};
