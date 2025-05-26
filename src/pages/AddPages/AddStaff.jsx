import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ButtonRed from "../../components/ButtonRed";

const AddStaff = () => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.post("team/create", formData);
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

  const handleRemoveImage = async (image) => {
    try {
      const response = await Axios.post("/removeFile", { image });
      setFormData((prevData) => ({ ...prevData, image: "" }));
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      <PageTitle className={"text-center"}>Yangi xodim qo'shish</PageTitle>
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
          <div className="space-y-2">
            <h3 className="text-lg">Yulkangan rasm</h3>
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

export default AddStaff;
