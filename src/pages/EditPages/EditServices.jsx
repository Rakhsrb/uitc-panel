import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditService = () => {
  const path = useNavigate();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
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
        const { data } = (await axios.get(baseUrlApi + `api/services/${id}`))
          .data;
        setServiceData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setServiceData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const response = await axios.put(
        baseUrlApi + `api/services/update/${id}`,
        serviceData,
        config
      );
      path("/services");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form
        className="border p-10 rounded-md bg-white"
        onSubmit={submitUpdatedInfo}
      >
        <h1 className="text-4xl font-semibold mb-7">
          Xizmat malumotlarini taxrirlash
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceTitle" className="text-lg">
              Xizmat Nomi:
            </label>
            <input
              required
              placeholder="Xizmat nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="serviceTitle"
              name="title"
              value={serviceData.title}
              onChange={getUpdatedValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceDescription" className="text-lg">
              Xizmat haqida malumot:
            </label>
            <textarea
              required
              placeholder="Xizmat haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32"
              id="serviceDescription"
              name="description"
              value={serviceData.description}
              onChange={getUpdatedValues}
            ></textarea>
          </div>
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
        >
          {isPending ? "Loading..." : "Taxrirlash"}
        </button>
      </form>
    </section>
  );
};

export default EditService;
