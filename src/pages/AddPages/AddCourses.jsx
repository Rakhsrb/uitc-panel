import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const AddCourses = () => {
  const { isAuth } = useSelector((state) => state.user);

  const [imgSaved, setImgSaved] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
    setImgSaved(false);
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setImgSaved(true);
      const { data } = await Axios.post("upload", formImageData);
      setCourseData((prevCourse) => ({
        ...prevCourse,
        image: data.images[0],
      }));
      setImgSaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewCourse = async (e) => {
    e.preventDefault();
    const courseForm = {
      title: courseData.title,
      description: courseData.description,
      image: courseData.image,
      price: courseData.price,
    };
    try {
      const response = await Axios.post("courses/create", courseForm);
      setCourseData({
        title: "",
        description: "",
        image: "",
        price: "",
      });
      navigate("/courses");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form className="border p-10 rounded-md bg-white" onSubmit={addNewCourse}>
        <h1 className="text-4xl font-semibold mb-7">Yangi Kurs Qo'shish</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="courseTitle" className="text-lg">
              Kurs Nomi:
            </label>
            <input
              value={courseData.title}
              onChange={handleGetValues}
              placeholder="Kurs nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="courseTitle"
              name="title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="courseDescription" className="text-lg">
              Kurs haqida malumot:
            </label>
            <textarea
              value={courseData.description}
              onChange={handleGetValues}
              placeholder="Kurs haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32"
              id="courseDescription"
              name="description"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coursePrice" className="text-lg">
              Kurs narxi:
            </label>
            <input
              value={courseData.price}
              onChange={handleGetValues}
              type="number"
              placeholder="Kurs narxini kiriting"
              className="border py-1 px-5 text-lg "
              id="coursePrice"
              name="price"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="courseImage" className="text-lg">
              Rasm:
            </label>
            <input
              type="file"
              className="border py-1 px-5 text-lg "
              id="courseImage"
              name="image"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={imgSaved}
          className={`py-2 px-10 mt-10 w-full rounded-sm text-white font-medium ${
            imgSaved ? "bg-green-900" : "bg-green-700"
          }`}
        >
          {imgSaved ? "Loading..." : "Qo'shish"}
        </button>
      </form>
    </section>
  );
};

export default AddCourses;
