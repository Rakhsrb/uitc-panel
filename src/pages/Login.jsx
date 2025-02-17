import { Eye, EyeClosed } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const { baseUrlApi } = useSelector((state) => state.mainSlice);
  const { isAuth } = useSelector((state) => state.user);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuth) {
      window.location.href = "/";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await axios.post(
        `${baseUrlApi}api/admin/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.message || "login error");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen ">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full lg:w-1/2 xl:w-1/3 p-10 gap-4"
      >
        <h1 className="font-bold text-center text-2xl">ADMIN PANEL LOGIN</h1>
        {error && <h1 className="text-red-600">{error}</h1>}
        <input
          type="email"
          placeholder="Email kiriting"
          name="email"
          className="outline-none p-2 rounded-md text-lg border"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="bg-white text-lg flex items-center gap-3 p-2 rounded-md border">
          <input
            required
            type={showPass ? "text" : "password"}
            placeholder="Parol kiriting"
            className="outline-none w-full"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span
            onClick={() => (showPass ? setShowPass(false) : setShowPass(true))}
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </span>
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-md font-bold"
        >
          {isPending ? "Yuklanmoqda..." : "Kirish"}
        </button>
      </form>
    </section>
  );
};

export default Login;
