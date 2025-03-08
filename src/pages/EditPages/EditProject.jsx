import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const EditProject = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [imgSaved, setImgSaved] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    images: [],
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
        const response = await Axios.get(`projects/${id}`);
        setPortfolioData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    setImgSaved(false);
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      setImgSaved(true);
      const response = await Axios.put(`projects/update/${id}`, portfolioData);
      setImgSaved(false);
      path("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("images", files[i]);
      }
      setImgSaved(true);
      const { data } = await Axios.post("upload", formImageData);
      setPortfolioData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...data.images],
      }));
      setImgSaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form
        className="border p-10 rounded-md bg-white"
        onSubmit={submitUpdatedInfo}
      >
        <h1 className="text-4xl font-semibold mb-7">Portfolio Yangilash</h1>
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
              onChange={getUpdatedValues}
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
              onChange={getUpdatedValues}
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
                onChange={getUpdatedValues}
              >
                <option value="" hidden>
                  Kategoriya tanlang
                </option>
                <option value="web">Web</option>
                <option value="3D Modeling">3D Modeling</option>
                <option value="Design">Design</option>
                <option value="AI">AI</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="courseUrl" className="text-lg">
                Porfolio havolasi:
              </label>
              <input
                required
                type="text"
                className="border py-1 px-5 text-lg "
                id="courseUrl"
                name="url"
                value={portfolioData.url || ""}
                onChange={getUpdatedValues}
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
              name="image"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button
          disabled={imgSaved}
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
        >
          {imgSaved ? "Loading..." : "Taxrirlash"}
        </button>
      </form>
    </section>
  );
};

export default EditProject;
