import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteService,
  getServicesError,
  getServicesPending,
  getServicesSuccess,
} from "../toolkit/Slicer";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export const Services = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = services;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getServicesPending());
        const response = (await Axios.get("services")).data.data;
        dispatch(getServicesSuccess(response));
      } catch (error) {
        dispatch(getServicesError());
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await Axios.delete(`${baseUrlApi}api/services/delete/${id}`);
        dispatch(deleteService(id));
        alert("Service deleted successfully!");
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Xizmatlar
            </h1>
            <p className="text-blue-600/70 mt-1 text-sm md:text-base">
              Manage your service offerings and descriptions
            </p>
          </div>
          <Link
            to={"/add-service"}
            className="bg-gradient-to-r from-green-600 to-green-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
          >
            Xizmatlar qo'shish
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-blue-100">
          {isPending ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div
                  className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
              <p className="text-blue-600">Loading services...</p>
            </div>
          ) : isError ? (
            <div className="py-16 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Failed to Load Services
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There was an error loading the service list. Please try again
                later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : data.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                No Services Found
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There are no services in the system yet. Add your first service
                to get started.
              </p>
              <Link
                to="/add-service"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Service
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
                    <th className="py-4 px-6 text-left font-semibold">Title</th>
                    <th className="py-4 px-6 text-left font-semibold">
                      Description
                    </th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((service) => (
                    <tr
                      key={service._id}
                      className="border-t border-blue-50 hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {service.title}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <p className="line-clamp-2 text-sm max-w-md">
                          {service.description}
                        </p>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/edit-service/${service._id}`}
                            className="px-2 py-2 text-blue-700 rounded-full hover:bg-blue-100 transition-colors inline-flex items-center"
                          >
                            <Pencil size={20} weight="bold" />
                          </Link>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="px-2 py-2 text-red-700 rounded-full hover:bg-red-100 transition-colors inline-flex items-center"
                          >
                            <Trash size={20} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
