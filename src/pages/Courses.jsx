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
import LoadingAnimation from "../components/LoadingAnimation";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";
import ErrorTitle from "../components/ErrorTitle";
import NoDataTitle from "../components/NoDataTitle";

export const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = courses;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getCoursesPending());
        const response = await Axios.get("courses/");
        dispatch(getCoursesSuccess(response.data));
      } catch (error) {
        dispatch(getCoursesError(error.response?.data?.message));
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu kursni o'chirib tashlamoqchimisiz?");
    if (confirm) {
      try {
        await Axios.delete("courses/delete/" + id);
        dispatch(deleteCourse(id));
        alert("Kurs muvaffaqiyatli o'chirildi!");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Kursni o'chirib bo'lmadi!");
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
    <section className="p-6 bg-blue-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <PageTitle>Kurslar</PageTitle>
        <Link to={"/courses/new"}>
          <Button>Yangi Kurs</Button>
        </Link>
      </div>

      {isPending ? (
        <LoadingAnimation>Kurslar yuklanmoqda</LoadingAnimation>
      ) : isError ? (
        <ErrorTitle>{isError}</ErrorTitle>
      ) : data.length === 0 ? (
        <NoDataTitle>Kurslar yo'q</NoDataTitle>
      ) : (
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-4 px-6 text-left font-semibold">Nomi</th>
              <th className="py-4 px-6 text-center font-semibold">Rasm</th>
              <th className="py-4 px-6 text-center font-semibold">Narx</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
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
                      to={`/courses/edit/${course._id}`}
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
      )}
    </section>
  );
};
