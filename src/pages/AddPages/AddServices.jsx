import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const AddServices = () => {
  const [imgSaved, setImgSaved] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const handleGetValues = async (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const sendService = async (e) => {
    e.preventDefault();
    try {
      setImgSaved(true);
      await Axios.post("services/create", serviceData);
      setServiceData({
        title: "",
        description: "",
      });
      setImgSaved(false);
      navigate("/services");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form className="border p-10 rounded-md bg-white" onSubmit={sendService}>
        <h1 className="text-4xl font-semibold mb-7">Yangi Xizmat Qo'shish</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceTitle" className="text-lg">
              Xizmat Nomi:
            </label>
            <input
              placeholder="Xizmat nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="serviceTitle"
              name="title"
              value={serviceData.title || ""}
              onChange={handleGetValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceDescription" className="text-lg">
              Xizmat haqida malumot:
            </label>
            <textarea
              placeholder="Xizmat haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32"
              id="serviceDescription"
              onChange={handleGetValues}
              value={serviceData.description || ""}
              name="description"
            ></textarea>
          </div>
        </div>
        <button
          disabled={imgSaved}
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
        >
          {imgSaved ? "Loading..." : " Qo'shish"}
        </button>
      </form>
    </section>
  );
};

export default AddServices;
