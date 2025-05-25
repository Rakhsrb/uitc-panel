import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";

const AddProject = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);
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
    if (!isAuth) {
      navigate("/");
    }
  }, []);

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
      await Axios.post("projects/create", portfolioData);
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
    <div className="overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Portfolio Qo'shish
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Yangi portfolio loyihasini yarating va o'z ishlaringizni namoyish
          qiling
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="p-8 md:p-12 space-y-8">
        <div className="space-y-3">
          <label
            htmlFor="portfolioTitle"
            className="block text-lg font-semibold text-gray-800"
          >
            Portfolio nomi
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
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="portfolioDescription"
            className="block text-lg font-semibold text-gray-800"
          >
            Portfolio haqida ma'lumot
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
              Portfolio kategoriyasi
            </label>
            <div className="relative">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="portfolioUrl"
              className="block text-lg font-semibold text-gray-800"
            >
              Portfolio havolasi
            </label>
            <div className="relative">
              <input
                id="portfolioUrl"
                name="url"
                type="url"
                placeholder="https://example.com"
                value={portfolioData.url || ""}
                onChange={handleInputChange}
                className="w-full h-14 px-4 pr-12 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Portfolio rasmlari
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
                  <svg
                    className="w-12 h-12 mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
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
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            disabled={isPending || isUploading}
            className={`w-full h-16 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
              isPending || isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5"
            } text-white`}
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Portfolio yaratilmoqda...
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Portfolio qo'shish
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
