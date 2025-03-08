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

export const Team = () => {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = team;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getTeamPending());
        const response = (await Axios.get("team")).data.data;
        dispatch(getTeamSuccess(response));
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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Xodimlar
            </h1>
            <p className="text-blue-600/70 mt-1 text-sm md:text-base">
              Manage your team members and staff information
            </p>
          </div>
          <Link
            to={"/add-worker"}
            className="bg-gradient-to-r from-green-600 to-green-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
          >
            Yangi xodimlar qo'shish
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-20 border border-blue-100">
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
              <p className="text-blue-600">Loading team members...</p>
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
                Failed to Load Team Members
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There was an error loading the team list. Please try again
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                No Team Members Found
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There are no team members in the system yet. Add your first team
                member to get started.
              </p>
              <Link
                to="/add-worker"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Team Member
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
                    <th className="py-4 px-6 text-left font-semibold">Name</th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Image
                    </th>
                    <th className="py-4 px-6 text-left font-semibold">Job</th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Actions
                    </th>
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
                            to={`/edit-worker/${worker._id}`}
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
        </div>
      </div>
    </section>
  );
};
