import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ButtonRed from "../../components/ButtonRed";
import { X } from "@phosphor-icons/react";
import LoadingAnimation from "../../components/LoadingAnimation";

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    image: "",
  });

  useEffect(() => {
    async function getDataById() {
      setIsLoading(true);
      try {
        const response = await Axios.get(`team/${id}`);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.put(`team/update/${id}`, formData);
      setFormData({
        name: "",
        job: "",
        image: "",
      });
      navigate("/staffs");
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
      setFormData((prevWorker) => ({
        ...prevWorker,
        image: data.images[0],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setImageLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      <PageTitle className={"text-center"}>Xodimni taxrirlash</PageTitle>
      <form
        className="border p-6 rounded-lg bg-white mt-8 space-y-8"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="workerName" className="text-lg">
            Ism kiriting
          </label>
          <input
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Ism Kiriting"
            type="text"
            className="border py-2 px-5 text-md rounded-lg"
            id="workerName"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="workerJob" className="text-lg">
            Ishi
          </label>
          <input
            value={formData.job || ""}
            onChange={handleInputChange}
            placeholder="Ish kiriting"
            type="text"
            className="border py-2 px-5 text-md rounded-lg"
            id="workerJob"
            name="job"
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
          <h2 className="text-center text-lg opacity-60">Rasm tanlanmagan</h2>
        )}
        <Button
          disabled={isPending || imageLoading}
          className={isPending ? "opacity-50" : ""}
        >
          {isPending ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </form>
    </section>
  );
};

export default EditStaff;
