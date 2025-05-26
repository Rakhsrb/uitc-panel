import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteWorker,
  getTeamError,
  getTeamPending,
  getTeamSuccess,
} from "../toolkit/Slicer";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import ErrorTitle from "../components/ErrorTitle";
import NoDataTitle from "../components/NoDataTitle";

export const Staffs = () => {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = team;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getTeamPending());
        const response = await Axios.get("team");
        dispatch(getTeamSuccess(response.data));
      } catch (error) {
        dispatch(getTeamError());
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await Axios.delete(`team/delete/${id}`);
        dispatch(deleteWorker(id));
        alert("Worker deleted successfully!");
      } catch (error) {
        console.error("Error deleting worker:", error);
        alert("Failed to delete worker. Please try again.");
      }
    }
  };

  return (
    <section className="bg-blue-50 p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <PageTitle>Xodimlar</PageTitle>
        <Link to={"/staffs/new"}>
          <Button>Yangi xodim</Button>
        </Link>
      </div>

      {isPending ? (
        <LoadingAnimation>Xodimlar yuklanmoqda...</LoadingAnimation>
      ) : isError ? (
        <ErrorTitle>{isError}</ErrorTitle>
      ) : data.length === 0 ? (
        <NoDataTitle>Xodimlar yo'q</NoDataTitle>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-center font-semibold">Image</th>
                <th className="py-4 px-6 text-left font-semibold">Job</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((worker) => (
                <tr
                  key={worker._id}
                  className="border-t border-blue-50 hover:bg-blue-50/50 transition-colors duration-150"
                >
                  <td className="py-2 px-6 text-slate-700 font-medium">
                    {worker.name}
                  </td>
                  <td className="py-2 px-6">
                    <div className="flex justify-center">
                      {worker.image ? (
                        <img
                          src={worker.image || "/placeholder.svg"}
                          alt={worker.name}
                          className="w-12 h-12 object-cover rounded-full border-2 border-blue-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {worker.job}
                    </span>
                  </td>
                  <td className="py-2 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/staffs/edit/${worker._id}`}
                        className="px-2 py-2 text-blue-700 rounded-full hover:bg-blue-100 transition-colors inline-flex items-center"
                      >
                        <Pencil size={20} weight="bold" />
                      </Link>
                      <button
                        onClick={() => handleDelete(worker._id)}
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
    </section>
  );
};
