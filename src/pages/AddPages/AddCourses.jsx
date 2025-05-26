import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

const AddCourses = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsLoading(false);
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setIsLoading(true);
      const response = await Axios.post("upload", formImageData);
      setFormData((prevCourse) => ({
        ...prevCourse,
        image: response.data.images[0],
      }));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewCourse = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("courses/create", formData);
      setFormData({
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
    <section className="bg-blue-50 overflow-y-auto p-6">
      <form onSubmit={addNewCourse}>
        <PageTitle className={"text-center"}>Yangi kurs</PageTitle>
        <div className="space-y-8 mt-8 bg-white border p-6 rounded-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="courseTitle" className="text-lg">
              Kurs Nomi
            </label>
            <input
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Kurs nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md rounded-lg"
              id="courseTitle"
              name="title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="courseDescription" className="text-lg">
              Kurs haqida malumot
            </label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Kurs haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32 rounded-lg"
              id="courseDescription"
              name="description"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coursePrice" className="text-lg">
              Kurs narxi
            </label>
            <input
              value={formData.price}
              onChange={handleInputChange}
              type="number"
              placeholder="Kurs narxini kiriting"
              className="border py-1 px-5 text-lg rounded-lg"
              id="coursePrice"
              name="price"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="courseImage" className="text-lg">
              Rasm
            </label>
            <input
              type="file"
              className="border py-1 px-5 text-lg rounded-lg"
              id="courseImage"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <Button
            disabled={isLoading}
            className={isLoading ? "opacity-50" : ""}
          >
            {isLoading ? "Yuklanmoqda..." : "Yaratish"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCourses;
