import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditWorker = () => {
  const path = useNavigate();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const { id } = useParams();
  const [imgSaved, setImgSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [workerData, setWorkerData] = useState({
    name: "",
    job: "",
    image: "",
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
        const response = await axios.get(baseUrlApi + `api/team/${id}`);
        setWorkerData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setWorkerData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    setImgSaved(false);
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      setImgSaved(true);
      const response = await axios.put(
        baseUrlApi + `api/team/update/${id}`,
        workerData,
        config
      );
      setImgSaved(false);
      path("/team");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setImgSaved(true);
      const { data } = await axios.post(
        baseUrlApi + "api/upload",
        formImageData,
        config
      );
      setWorkerData((prevCourse) => ({
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
            Xodim malumotlarini yagilash
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="workerName" className="text-lg">
                Ism kiriting:
              </label>
              <input
                required
                placeholder="Ism Kiriting"
                type="text"
                className="border py-2 px-5 text-md"
                id="workerName"
                name="name"
                value={workerData.name}
                onChange={getUpdatedValues}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="workerJob" className="text-lg">
                Ishi:
              </label>
              <input
                required
                placeholder="ish kiriting"
                type="text"
                className="border py-2 px-5 text-md"
                id="workerJob"
                name="job"
                value={workerData.job}
                onChange={getUpdatedValues}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="workerImage" className="text-lg">
                Rasmi:
              </label>
              <input
                type="file"
                className="border py-1 px-5 text-lg"
                id="workerImage"
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
            {imgSaved ? "Loading..." : "Qo'shish"}
          </button>
        </form>
      )}
    </section>
  );
};

export default EditWorker;
