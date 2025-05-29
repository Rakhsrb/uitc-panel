import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProject,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from "../toolkit/Slicer";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import NoDataTitle from "../components/NoDataTitle";
import ErrorTitle from "../components/ErrorTitle";

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
        dispatch(getProjectsSuccess(response.data.projects));
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
    <section className="bg-blue-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <PageTitle>Loyihalar</PageTitle>
        <Link to={"/projects/new"}>
          <Button>Yangi loyiha</Button>
        </Link>
      </div>
      {isPending ? (
        <LoadingAnimation>Loyihalar yuklanmoqda</LoadingAnimation>
      ) : isError ? (
        <ErrorTitle>{isError}</ErrorTitle>
      ) : data.length === 0 ? (
        <NoDataTitle>Loyihalar yo'q</NoDataTitle>
      ) : (
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-4 px-6 text-left font-semibold">Title</th>
              <th className="py-4 px-6 text-center font-semibold">Image</th>
              <th className="py-4 px-6 text-center font-semibold">Category</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem) => (
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
                      to={`/projects/edit/${elem._id}`}
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
            ))}
          </tbody>
        </table>
      )}

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
    </section>
  );
};
