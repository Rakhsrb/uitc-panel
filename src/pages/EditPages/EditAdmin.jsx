import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import Button from "../../components/Button";

const EditAdmin = () => {
  const path = useNavigate();
  const { id } = useParams();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(`admin/${id}`);
        setFormData({ ...response.data, password: "" });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`admin/update/${id}`, formData);
      path("/admins");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-blue-50 overflow-y-auto p-6">
      <form onSubmit={submitUpdatedInfo}>
        <PageTitle className={"text-center"}>Admin taxrirlash</PageTitle>
        <div className="bg-white p-6 mt-8 space-y-5 border rounded-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="adminName" className="text-lg">
              To'liq ism kiriting:
            </label>
            <input
              required
              placeholder="Suhrob Rahmatullayev"
              type="text"
              className="border py-2 px-5 text-md rounded-lg"
              id="adminName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminEmail" className="text-lg">
              Email:
            </label>
            <input
              required
              placeholder="Email kiriting"
              type="email"
              className="border py-2 px-5 text-md rounded-lg"
              id="adminEmail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminPassword" className="text-lg">
              Parol
            </label>
            <div className="border py-1 px-5 text-lg flex items-center gap-3 rounded-lg">
              <input
                required
                value={formData.password}
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
          <Button>Taxrirlash</Button>
        </div>
      </form>
    </section>
  );
};

export default EditAdmin;
