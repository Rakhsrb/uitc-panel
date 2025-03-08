import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const EditCourse = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [imgSaved, setImgSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [courseData, setCourseData] = useState({});

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function getDataById() {
      try {
        setIsPending(true);
        const response = await Axios.get(`courses/${id}`);
        setCourseData(response.data.data);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setCourseData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    setImgSaved(false);
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      setImgSaved(true);
      const response = await Axios.put(`courses/update/${id}`, courseData);
      path("/courses");
      setImgSaved(false);
    } catch (error) {
      setImgSaved(false);
      console.log(error);
    }
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

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      {isPending ? (
        <div className="h-[30vh] flex items-center justify-center">
          <h1>Loading...</h1>
        </div>
      ) : (
        <form
          className="border p-10 rounded-md bg-white"
          onSubmit={submitUpdatedInfo}
        >
          <h1 className="text-4xl font-semibold mb-7">
            Kursning malumotlarini taxrirlash
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="courseTitle" className="text-lg">
                Kurs Nomi:
              </label>
              <input
                required
                placeholder="Kurs nomini kiriting"
                type="text"
                className="border py-2 px-5 text-md"
                id="courseTitle"
                value={courseData.title}
                onChange={getUpdatedValues}
                name="title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="courseDescription" className="text-lg">
                Kurs haqida malumot:
              </label>
              <textarea
                required
                placeholder="Kurs haqida malumot kiriting"
                className="border py-2 px-5 text-md min-h-32"
                id="courseDescription"
                value={courseData.description}
                onChange={getUpdatedValues}
                name="description"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="coursePrice" className="text-lg">
                Kurs narxi:
              </label>
              <input
                required
                type="text"
                placeholder="Kurs narxini kiriting"
                className="border py-1 px-5 text-lg "
                id="price"
                name="price"
                value={courseData.price}
                onChange={getUpdatedValues}
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
            className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
          >
            {imgSaved ? "Loading..." : "Taxrirlash"}
          </button>
        </form>
      )}
    </section>
  );
};

export default EditCourse;
