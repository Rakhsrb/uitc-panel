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
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import ErrorTitle from "../components/ErrorTitle";
import NoDataTitle from "../components/NoDataTitle";

export const Services = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = services;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getServicesPending());
        const response = await Axios.get("services");
        dispatch(getServicesSuccess(response.data));
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
    <section className="bg-blue-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <PageTitle>Xizmatlar</PageTitle>
        <Link to={"/services/new"}>
          <Button>Yangi xizmat</Button>
        </Link>
      </div>

      {isPending ? (
        <LoadingAnimation>Xizmatlar yuklanmoqda...</LoadingAnimation>
      ) : isError ? (
        <ErrorTitle>{isError}</ErrorTitle>
      ) : data.length === 0 ? (
        <NoDataTitle>Xizmatlar yo'q</NoDataTitle>
      ) : (
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-4 px-6 text-left font-semibold">Title</th>
              <th className="py-4 px-6 text-left font-semibold">Description</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
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
                      to={`/services/edit/${service._id}`}
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
      )}
    </section>
  );
};
