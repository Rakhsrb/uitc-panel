import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";
import { Warning, X } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import NoDataTitle from "../components/NoDataTitle";
import ErrorTitle from "../components/ErrorTitle";

function Carousel() {
  const { data, error, isLoading, mutate } = useSWR("/carousel", fetcher);

  const [formData, setFormData] = useState({ fileName: "" });

  const [isModalActive, setIsModalActive] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalActive(false);
      setFormData((prevData) => ({ ...prevData, fileName: "" }));
    }
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileName: "Файл должен быть изображением.",
      }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, fileName: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.fileName)
        formDataToSend.append("fileName", formData.fileName);
      await Axios.post("/carousel", formDataToSend);
      setFormData((prevData) => ({ ...prevData, fileName: "" }));
      setIsModalActive(false);
      mutate();
    } catch (error) {
      alert(error.response?.data.message || "Произошла ошибка");
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Rostdan ham bu rasmni o'chirmoqchimisiz?")) return;
    try {
      await Axios.delete(`carousel/${id}`);
      mutate((prevData) => prevData.filter((image) => image._id !== id));
    } catch (error) {
      alert(error.response?.data.message || "Произошла ошибка");
    }
  };

  if (!isLoading && !data) {
    return <ErrorTitle />;
  }

  return (
    <section className="p-6 overflow-y-auto bg-blue-50">
      <div className="flex justify-between items-center mb-6">
        <PageTitle>Karusel</PageTitle>
        <Button event={() => setIsModalActive(true)}>Rasm joylash</Button>
      </div>

      {isLoading ? (
        <LoadingAnimation>Rasmlar yuklanmoqda...</LoadingAnimation>
      ) : error ? (
        <div className="py-16 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <Warning className="text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : data.length === 0 ? (
        <NoDataTitle>RASMLAR YO'Q</NoDataTitle>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((image, index) => (
            <div key={index} className="relative h-52">
              <img
                src={image.fileName}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(image._id)}
                className="p-2 text-sm rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 absolute right-2 top-2"
              >
                <X />
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalActive && (
        <div
          onClick={handleOutsideClick}
          className="modal-overlay h-screen overflow-y-auto absolute w-full left-0 top-0 p-6 bg-black/80 backdrop-blur flex items-center justify-center"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 space-y-6 w-full md:w-1/3 rounded-md"
          >
            <div className="space-y-4">
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-full min-h-52 h-full rounded-lg cursor-pointer bg-gray-300"
              >
                {formData.fileName ? (
                  <img
                    src={URL.createObjectURL(formData.fileName)}
                    alt="Preview"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-gray-700">
                    Rasm joylash uchun fayl tanlang
                  </p>
                )}
                <input
                  id="photo"
                  type="file"
                  name="fileName"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.fileName && (
                <div className="flex justify-end items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, fileName: "" })}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Olib tashlash
                  </button>
                  <Button>Joylash</Button>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Carousel;
