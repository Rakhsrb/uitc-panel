import { Eye, EyeClosed } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const AddAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const { isAuth } = useSelector((state) => state.user);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const AddNewAdmin = async (e) => {
    e.preventDefault();
    const adminForm = {
      name: adminData.name,
      email: adminData.email,
      password: adminData.password,
    };
    try {
      const response = await Axios.post("admin/create", adminForm);
      setAdminData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/admins");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form className="border p-10 rounded-md bg-white" onSubmit={AddNewAdmin}>
        <h1 className="text-4xl font-semibold mb-7">Yangi admin qo'shish</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="adminName" className="text-lg">
              Ism kiriting:
            </label>
            <input
              required
              value={adminData.name || ""}
              onChange={handleGetValues}
              placeholder="Ism Kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="adminName"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminEmail" className="text-lg">
              Email:
            </label>
            <input
              required
              value={adminData.email || ""}
              onChange={handleGetValues}
              placeholder="Email kiriting"
              type="email"
              className="border py-2 px-5 text-md"
              id="adminEmail"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminPassword" className="text-lg">
              Parol
            </label>
            <div className="border py-1 px-5 text-lg flex items-center gap-3">
              <input
                required
                value={adminData.password || ""}
                onChange={handleGetValues}
                type={showPass ? "text" : "password"}
                placeholder="Parol kiriting"
                className="outline-none w-full"
                id="adminPassword"
                name="password"
              />
              <span
                onClick={() =>
                  showPass ? setShowPass(false) : setShowPass(true)
                }
              >
                {showPass ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white uppercase font-medium"
        >
          Qo'shish
        </button>
      </form>
    </section>
  );
};

export default AddAdmin;
