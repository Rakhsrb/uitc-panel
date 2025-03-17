import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProject,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from "../toolkit/Slicer";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export const Projects = () => {
  const dispatch = useDispatch();
  const { portfolio } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = portfolio;

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getProjectsPending());
        const response = await Axios.get(
          `projects/?page=${page}&pageSize=${pageSize}`
        );
        dispatch(getProjectsSuccess(response.data.data));
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        dispatch(getProjectsError());
        console.log(error);
      }
    }
    getData();
  }, [page]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirm) {
      try {
        await Axios.delete("projects/delete/" + id);
        dispatch(deleteProject(id));
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project!");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Portfolio
            </h1>
            <p className="text-blue-600/70 mt-1 text-sm md:text-base">
              Manage and showcase your best work
            </p>
          </div>
          <Link
            to={"/add-portfolio"}
            className="bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Portfolio Qo'shish
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
                  <th className="py-4 px-6 text-left font-semibold">Title</th>
                  <th className="py-4 px-6 text-center font-semibold">Image</th>
                  <th className="py-4 px-6 text-center font-semibold">
                    Category
                  </th>
                  <th className="py-4 px-6 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isError ? (
                  isPending ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8">
                        <div className="flex justify-center items-center space-x-2">
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
                        <p className="text-blue-500 mt-2">
                          Loading projects...
                        </p>
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((elem) => (
                      <tr
                        key={elem._id}
                        className="border-t border-blue-50 hover:bg-blue-50/50 transition-colors duration-150"
                      >
                        <td className="py-2 px-6 text-slate-700 font-medium">
                          {elem.title}
                        </td>
                        <td className="py-2 px-6">
                          {elem.images.length > 0 ? (
                            <div className="flex justify-center">
                              <img
                                src={elem.images[0] || "/placeholder.svg"}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm border border-blue-100"
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className="text-center text-slate-400 text-sm">
                              No image
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-6 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                            {elem.category}
                          </span>
                        </td>
                        <td className="py-2 px-6">
                          <div className="flex justify-center items-center gap-3">
                            <Link
                              to={`/edit-portfolio/${elem._id}`}
                              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                              title="Edit Project"
                            >
                              <Pencil size={20} weight="bold" />
                            </Link>
                            <button
                              onClick={() => handleDelete(elem._id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Project"
                            >
                              <Trash size={20} weight="bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-12">
                        <p className="text-slate-500 text-lg">
                          No projects found
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Add your first project to get started
                        </p>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12">
                      <p className="text-red-500 text-lg">
                        Something went wrong
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        Please try again later
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!isPending && !isError && data.length > 0 && (
          <div className="flex items-center justify-center mt-8 mb-12">
            <div className="inline-flex items-center rounded-lg bg-white shadow-md border border-blue-100 overflow-hidden">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2.5 flex items-center justify-center gap-1 transition-colors ${
                  page === 1
                    ? "text-slate-400 bg-slate-50 cursor-not-allowed"
                    : "text-blue-700 hover:bg-blue-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="hidden sm:flex border-x border-blue-100">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                        page === pageNum
                          ? "bg-blue-600 text-white"
                          : "text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center justify-center px-4 sm:px-3 font-medium text-blue-700 border-x border-blue-100 sm:border-0">
                <span className="sm:hidden">
                  {page} / {totalPages}
                </span>
              </div>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2.5 flex items-center justify-center gap-1 transition-colors ${
                  page === totalPages
                    ? "text-slate-400 bg-slate-50 cursor-not-allowed"
                    : "text-blue-700 hover:bg-blue-50"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
