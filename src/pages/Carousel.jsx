import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";
import { Warning, X } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

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
      mutate();
    } catch (error) {
      alert(error.response?.data.message || "Произошла ошибка");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              KARUSEL
            </h1>
          </div>
          <button
            onClick={() => setIsModalActive(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
          >
            Rasm joylash
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-blue-100">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div
                  className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
              <p className="text-blue-600">Rasmlar yuklanmoqda...</p>
            </div>
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
            <div className="py-16 flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-lg font-bold opacity-40 mb-2">
                RASMLAR YO'Q
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {data.map((image, index) => (
                <div key={index} className="relative h-52">
                  <img
                    src={image.fileName}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 absolute right-0 top-0"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalActive && (
        <div
          onClick={handleOutsideClick}
          className="modal-overlay h-screen overflow-y-auto absolute w-full left-0 top-0 p-6 bg-black/80 backdrop-blur flex items-center justify-center"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 space-y-6 w-full md:w-1/3 rounded-md"
          >
            <div className="space-y-4">
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-full min-h-52 h-full border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.fileName ? (
                  <img
                    src={URL.createObjectURL(formData.fileName)}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-sm text-gray-400">Rasm tanlash</span>
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
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Joylash
                  </button>
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
