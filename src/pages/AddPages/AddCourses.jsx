import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import { X } from "@phosphor-icons/react";
import ButtonRed from "../../components/ButtonRed";

const AddCourses = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsPending(false);
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setImageLoading(true);
      const response = await Axios.post("upload", formImageData);
      setFormData((prevCourse) => ({
        ...prevCourse,
        image: response.data.images[0],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async (image) => {
    try {
      await Axios.post("/removeFile", { image });
      setFormData((prevData) => ({ ...prevData, image: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCourse = async (e) => {
    e.preventDefault();
    setIsPending(true);
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
    } finally {
      setIsPending(false);
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
          {!formData.image && (
            <div className="flex flex-col gap-2">
              <label htmlFor="courseImage" className="text-lg">
                Rasm
              </label>
              <input
                type="file"
                id="courseImage"
                name="image"
                onChange={handleFileChange}
              />
            </div>
          )}
          {imageLoading && (
            <div className="bg-blue-200 py-2 text-center text-blue-600 font-medium border-2 rounded-lg border-blue-600">
              <h1>Rasm yuklanmoqda</h1>
            </div>
          )}
          {formData.image && !imageLoading ? (
            <div className="relative w-full md:w-1/2 mx-auto">
              <img
                src={formData.image}
                alt={formData.title}
                className="h-[300px] object-cover w-full"
              />
              <ButtonRed
                event={() => handleRemoveImage(formData.image)}
                type="button"
                className="absolute right-2 top-2"
              >
                <X />
              </ButtonRed>
            </div>
          ) : (
            <h2 className="text-center text-lg opacity-60">Rasm tanlanmagan</h2>
          )}
          <Button
            disabled={isPending || imageLoading}
            className={isPending ? "opacity-50" : ""}
          >
            {isPending ? "Yuklanmoqda..." : "Yaratish"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCourses;
