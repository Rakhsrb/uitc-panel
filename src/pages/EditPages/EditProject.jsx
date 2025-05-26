import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import { Image, Link, Pencil, X } from "@phosphor-icons/react";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [portfolioData, setPortfolioData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    images: [],
  });

  useEffect(() => {
    async function getDataById() {
      try {
        const response = await Axios.get(`projects/${id}`);
        setPortfolioData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("images", files[i]);
      }

      setIsUploading(true);

      const { data } = await Axios.post("upload", formImageData);

      setPortfolioData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...data.images],
      }));

      setIsUploading(false);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setPortfolioData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      await Axios.put(`projects/update/${id}`, portfolioData);
      setPortfolioData({
        title: "",
        description: "",
        category: "",
        url: "",
        images: [],
      });
      navigate("/projects");
    } catch (error) {
      console.error("Error adding form:", error);
    } finally {
      setIsPending(false);
    }
  };

  const categoryOptions = [
    { value: "web", label: "Web Development", icon: "🌐" },
    { value: "modeling", label: "3D Modeling", icon: "🎨" },
    { value: "design", label: "Design", icon: "✨" },
    { value: "AI", label: "Artificial Intelligence", icon: "🤖" },
  ];

  return (
    <div className="overflow-y-auto bg-blue-50 p-6">
      <PageTitle className={"text-center"}>Yangi loyiha qo'shish</PageTitle>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 space-y-8 mt-8 border rounded-lg"
      >
        <div className="space-y-3">
          <label
            htmlFor="portfolioTitle"
            className="block text-lg font-semibold text-gray-800"
          >
            Loyiha nomi
          </label>
          <div className="relative">
            <input
              id="portfolioTitle"
              name="title"
              type="text"
              placeholder="Loyiha nomini kiriting..."
              value={portfolioData.title || ""}
              onChange={handleInputChange}
              required
              className="w-full h-14 px-4 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Pencil />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="portfolioDescription"
            className="block text-lg font-semibold text-gray-800"
          >
            Loyiha haqida ma'lumot
          </label>
          <textarea
            id="portfolioDescription"
            name="description"
            placeholder="Loyiha haqida batafsil ma'lumot bering..."
            value={portfolioData.description || ""}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-4 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none placeholder-gray-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              Loyiha kategoriyasi
            </label>
            <select
              name="category"
              value={portfolioData.category || ""}
              onChange={handleInputChange}
              className="w-full h-14 px-4 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Kategoriya tanlang
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="portfolioUrl"
              className="block text-lg font-semibold text-gray-800"
            >
              Loyiha havolasi
            </label>
            <div className="relative">
              <input
                id="portfolioUrl"
                name="url"
                type="text"
                placeholder="https://example.com"
                value={portfolioData.url || ""}
                onChange={handleInputChange}
                className="w-full h-14 px-4 pr-12 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <Link />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Loyiha rasmlari
          </label>
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              disabled={isUploading}
            />
            <label
              htmlFor="fileInput"
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                isUploading
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                ) : (
                  <Image size={30} className="text-gray-500" />
                )}
                <p className="mb-2 text-lg font-medium text-gray-700">
                  {isUploading
                    ? "Rasmlar yuklanmoqda..."
                    : "Rasmlarni yuklash uchun bosing"}
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF (maksimal 10MB)
                </p>
              </div>
            </label>
          </div>
        </div>

        {portfolioData.images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Yuklangan rasmlar ({portfolioData.images.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-md">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Portfolio Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          disabled={isPending || isUploading}
          className={isPending || isUploading ? "opacity-50" : ""}
        >
          {isPending ? "Loyiha taxrirlash... " : "Loyiha taxrirlash"}
        </Button>
      </form>
    </div>
  );
};

export default EditProject;
