import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";

const AddAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const AddNewAdmin = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("admin/create", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/admins");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="overflow-y-auto p-6 bg-blue-50">
      <form onSubmit={AddNewAdmin}>
        <PageTitle className="text-center">Yangi admin</PageTitle>
        <div className="space-y-5 bg-white border mt-8 p-6 rounded-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="adminName" className="text-lg">
              To'liq ism kiriting:
            </label>
            <input
              required
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Suhrob Rahmatullayev"
              type="text"
              className="border py-2 px-5 text-md rounded-lg"
              id="adminName"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminEmail" className="text-lg">
              Email:
            </label>
            <input
              required
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="Email kiriting"
              type="email"
              className="border py-2 px-5 text-md rounded-lg"
              id="adminEmail"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminPassword" className="text-lg">
              Parol
            </label>
            <div className="border py-1 px-5 text-lg flex items-center gap-3 rounded-lg">
              <input
                required
                value={formData.password || ""}
                onChange={handleInputChange}
                type={showPass ? "text" : "password"}
                placeholder="Parol kiriting"
                className="outline-none w-full"
                id="adminPassword"
                name="password"
              />
              <span
                onClick={() =>
                  showPass ? setShowPass(false) : setShowPass(true)
                }
              >
                {showPass ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>
          <Button>Yaratish</Button>
        </div>
      </form>
    </section>
  );
};

export default AddAdmin;
