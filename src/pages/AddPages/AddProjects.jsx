import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProject = () => {
  const navigate = useNavigate();

  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);

  const { isAuth } = useSelector((state) => state.user);

  const [isPending, setIsPending] = useState(false);

  const [portfolioData, setPortfolioData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    images: [],
  });

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("images", files[i]);
      }

      setIsPending(true);

      const { data } = await axios.post(
        baseUrlApi + "api/upload",
        formImageData,
        config
      );

      setPortfolioData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...data.images],
      }));

      setIsPending(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseUrlApi + "api/projects/create",
        portfolioData,
        config
      );
      setPortfolioData({
        title: "",
        description: "",
        category: "",
        url: "",
        images: [],
      });
      navigate("/projects");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Yangi Loyiha Qo'shildi",
        showConfirmButton: false,
        timer: 3500,
      });
    } catch (error) {
      console.error("Error adding form:", error);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center overflow-auto py-32">
      <form
        onSubmit={handleFormSubmit}
        className="border p-10 rounded-md bg-white"
      >
        <h1 className="text-4xl font-semibold mb-7">Portfolio Qo'shish</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="portfolioTitle" className="text-lg">
              Portfolio nomi:
            </label>
            <input
              required
              placeholder="Portfolio nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="portfolioTitle"
              name="title"
              value={portfolioData.title || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="portfolioDescription" className="text-lg">
              Portfolio haqida malumot:
            </label>
            <textarea
              required
              placeholder="Portfolio haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32"
              id="portfolioDescription"
              name="description"
              value={portfolioData.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="portfolioCategory" className="text-lg">
                Portfolio kategoriyasi:
              </label>
              <select
                className="border py-2 px-2"
                name="category"
                id="portfolioCategory"
                value={portfolioData.category || ""}
                onChange={handleInputChange}
              >
                <option value="" hidden>
                  Kategoriya tanlang
                </option>
                <option value="web">Web</option>
                <option value="modeling">3D Modeling</option>
                <option value="design">Design</option>
                <option value="AI">AI</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="courseUrl" className="text-lg">
                Porfolio havolasi:
              </label>
              <input
                type="text"
                className="border py-1 px-5 text-lg "
                id="courseUrl"
                name="url"
                value={portfolioData.url || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="courseImage" className="text-lg">
              Rasm:
            </label>
            <input
              multiple
              type="file"
              className="border py-1 px-5 text-lg "
              id="courseImage"
              name="images"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Yuklangan rasmlar:</label>
            <div className="grid grid-cols-3 gap-2">
              {portfolioData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Portfolio Image ${index + 1}`}
                  className="border p-1"
                />
              ))}
            </div>
          </div>
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
        >
          {isPending ? "Loading..." : "Qo'shish"}
        </button>
      </form>
    </section>
  );
};

export default EditProject;
