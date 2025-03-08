import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const EditAdmin = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
  });

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function getDataById() {
      try {
        const response = await Axios.get(`admin/${id}`);
        setAdminData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setAdminData((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`admin/update/${id}`, adminData);
      path("/admins");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form
        className="border p-10 rounded-md bg-white"
        onSubmit={submitUpdatedInfo}
      >
        <h1 className="text-4xl font-semibold mb-7">
          Admin malumotlarini taxrirlash
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="adminName" className="text-lg">
              Ism kiriting:
            </label>
            <input
              required
              placeholder="Ism Kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="adminName"
              name="name"
              value={adminData.name}
              onChange={getUpdatedValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminEmail" className="text-lg">
              Email:
            </label>
            <input
              required
              placeholder="Email kiriting"
              type="email"
              className="border py-2 px-5 text-md"
              id="adminEmail"
              name="email"
              value={adminData.email}
              onChange={getUpdatedValues}
            />
          </div>
        </div>
        <button
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white uppercase font-medium"
        >
          taxrirlash
        </button>
      </form>
    </section>
  );
};

export default EditAdmin;
