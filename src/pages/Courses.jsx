import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCourse,
  getCoursesError,
  getCoursesPending,
  getCoursesSuccess,
} from "../toolkit/Slicer";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = courses;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getCoursesPending());
        const response = (await Axios.get("courses/")).data.data;
        dispatch(getCoursesSuccess(response));
      } catch (error) {
        dispatch(getCoursesError());
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirm) {
      try {
        await Axios.delete("courses/delete/" + id);
        dispatch(deleteCourse(id));
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course!");
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Kurslar
            </h1>
            <p className="text-blue-600/70 mt-1 text-sm md:text-base">
              Manage your educational courses and pricing
            </p>
          </div>
          <Link
            to={"/add-course"}
            className="bg-gradient-to-r from-green-600 to-green-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
          >
            Yangi Kurs Qo'shish
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
              <p className="text-blue-600">Loading courses...</p>
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
                Failed to Load Courses
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There was an error loading the course list. Please try again
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                No Courses Found
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There are no courses in the system yet. Add your first course to
                get started.
              </p>
              <Link
                to="/add-course"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
                    <th className="py-4 px-6 text-left font-semibold">Title</th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Image
                    </th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Price
                    </th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((course) => (
                    <tr
                      key={course._id}
                      className="border-t border-blue-50 hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {course.title}
                      </td>
                      <td className="py-4 px-6">
                        {course.image ? (
                          <div className="flex justify-center">
                            <img
                              src={course.image || "/placeholder.svg"}
                              className="w-16 h-12 object-cover rounded-md shadow-sm border border-slate-200"
                              alt={course.title}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-16 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">
                              No image
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                          {formatPrice(course.price)}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/edit-course/${course._id}`}
                            className="px-2 py-2 text-blue-700 rounded-full hover:bg-blue-100 transition-colors inline-flex items-center"
                          >
                            <Pencil size={20} weight="bold" />
                          </Link>
                          <button
                            onClick={() => handleDelete(course._id)}
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
