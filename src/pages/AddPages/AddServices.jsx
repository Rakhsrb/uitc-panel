import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

const AddServices = () => {
  const [imgSaved, setImgSaved] = useState(false);
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
  });

  const handleGetValues = async (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const sendService = async (e) => {
    e.preventDefault();
    try {
      setImgSaved(true);
      await Axios.post("services/create", serviceData);
      setServiceData({
        title: "",
        description: "",
      });
      setImgSaved(false);
      navigate("/services");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      <PageTitle className={"text-center"}>Yanga xizmat qo'shish</PageTitle>
      <form
        onSubmit={sendService}
        className="mt-8 bg-white p-6 border rounded-lg"
      >
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceTitle" className="text-lg">
              Xizmat Nomi
            </label>
            <input
              placeholder="Xizmat nomini kiriting"
              type="text"
              className="border py-2 px-5 text-md rounded-lg"
              id="serviceTitle"
              name="title"
              value={serviceData.title || ""}
              onChange={handleGetValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceDescription" className="text-lg">
              Xizmat haqida malumot
            </label>
            <textarea
              placeholder="Xizmat haqida malumot kiriting"
              className="border py-2 px-5 text-md min-h-32 rounded-lg"
              id="serviceDescription"
              onChange={handleGetValues}
              value={serviceData.description || ""}
              name="description"
            />
          </div>
          <Button disabled={imgSaved} className={imgSaved ? "opacity-50" : ""}>
            {imgSaved ? "Yaratilmoqda..." : "Yaratish"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddServices;
