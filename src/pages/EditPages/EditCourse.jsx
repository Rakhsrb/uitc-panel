import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ButtonRed from "../../components/ButtonRed";
import { X } from "@phosphor-icons/react";

const EditCourse = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function getDataById() {
      try {
        setIsLoading(true);
        const response = await Axios.get(`courses/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getDataById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      await Axios.put(`courses/update/${id}`, formData);
      path("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setImageLoading(true);
      const { data } = await Axios.post("upload", formImageData);
      setFormData((prevCourse) => ({
        ...prevCourse,
        image: data.images[0],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      {isPending ? (
        <LoadingAnimation>Kurs yuklanmoqda</LoadingAnimation>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <PageTitle className={"text-center"}>
            Kursning malumotlarini taxrirlash
          </PageTitle>
          <div className="bg-white space-y-8 mt-8 p-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="courseTitle" className="text-lg">
                Kurs Nomi
              </label>
              <input
                required
                placeholder="Kurs nomini kiriting"
                type="text"
                className="border py-2 px-5 text-md"
                id="courseTitle"
                value={formData.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="courseDescription" className="text-lg">
                Kurs haqida malumot
              </label>
              <textarea
                required
                placeholder="Kurs haqida malumot kiriting"
                className="border py-2 px-5 text-md min-h-32"
                id="courseDescription"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="coursePrice" className="text-lg">
                Kurs narxi
              </label>
              <input
                required
                type="text"
                placeholder="Kurs narxini kiriting"
                className="border py-1 px-5 text-lg "
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
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
                  x
                />
                <ButtonRed
                  event={() =>
                    setFormData((prevData) => ({ ...prevData, image: "" }))
                  }
                  type="button"
                  className="absolute right-2 top-2"
                >
                  <X />
                </ButtonRed>
              </div>
            ) : (
              <h2 className="text-center text-lg opacity-60">
                Rasm tanlanmagan
              </h2>
            )}
            <Button
              disabled={isPending || imageLoading}
              className={isPending ? "opacity-50" : ""}
            >
              {isPending ? "Loading..." : "Taxrirlash"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditCourse;
