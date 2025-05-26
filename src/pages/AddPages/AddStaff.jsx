import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

const AddStaff = () => {
  const navigate = useNavigate();
  const [imgSaved, setImgSaved] = useState(false);
  const [workerData, setWorkerData] = useState({
    name: "",
    job: "",
    image: "",
  });

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setWorkerData((prev) => ({ ...prev, [name]: value }));
    setImgSaved(false);
  };

  const sendWorker = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("team/create", workerData);
      setWorkerData({
        name: "",
        job: "",
        image: "",
      });
      navigate("/staffs");
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
      const { data } = await Axios.post("upload", formImageData);
      setWorkerData((prevWorker) => ({
        ...prevWorker,
        image: data.images[0],
      }));
      setImgSaved(false);
    } catch (err) {
      console.log(err);
      setImgSaved(false);
    }
  };

  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      <PageTitle className={"text-center"}>Yangi xodim qo'shish</PageTitle>
      <form
        className="border p-6 rounded-lg bg-white mt-8 space-y-8"
        onSubmit={(e) => sendWorker(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="workerName" className="text-lg">
            Ism kiriting
          </label>
          <input
            value={workerData.name || ""}
            onChange={handleGetValues}
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
            value={workerData.job || ""}
            onChange={handleGetValues}
            placeholder="Ish kiriting"
            type="text"
            className="border py-2 px-5 text-md rounded-lg"
            id="workerJob"
            name="job"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="workerImage" className="text-lg">
            Rasmi
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            className="border py-1 px-5 text-lg rounded-lg"
            id="workerImage"
            name="image"
          />
        </div>
        <Button disabled={imgSaved} className={imgSaved ? "opacity-50" : ""}>
          {imgSaved ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </form>
    </section>
  );
};

export default AddStaff;
