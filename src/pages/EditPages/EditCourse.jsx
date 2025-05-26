import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

const EditCourse = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    async function getDataById() {
      try {
        setIsPending(true);
        const response = await Axios.get(`courses/${id}`);
        setCourseData(response.data);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    setIsLoading(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await Axios.put(`courses/update/${id}`, courseData);
      path("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const file = e.target.files[0];
      formImageData.append("images", file);
      setIsLoading(true);
      const { data } = await Axios.post("upload", formImageData);
      setCourseData((prevCourse) => ({
        ...prevCourse,
        image: data.images[0],
      }));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
                value={courseData.title}
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
                value={courseData.description}
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
                value={courseData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="courseImage" className="text-lg">
                Rasm
              </label>
              <input
                type="file"
                className="border py-1 px-5 text-lg "
                id="courseImage"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <Button
              disabled={isLoading}
              className={isLoading ? "opacity-50" : ""}
            >
              {isLoading ? "Loading..." : "Taxrirlash"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditCourse;
