import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteCourse,
  getCoursesError,
  getCoursesPending,
  getCoursesSuccess,
} from "../toolkit/Slicer";

export const Courses = () => {
  const dispatch = useDispatch();
  const { courses, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { data, isError, isPending } = courses;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getCoursesPending());
        const response = (await axios.get(url + "api/courses/")).data.data;
        dispatch(getCoursesSuccess(response));
      } catch (error) {
        dispatch(getCoursesError());
        console.log(error);
      }
    }
    getData(baseUrlApi);
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        dispatch(deleteCourse(id));
        await axios.delete(baseUrlApi + "api/courses/delete/" + id, config);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Failed to delete project!",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="h-full p-5 bg-blue-50">
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-5xl text-blue-800 opacity-70 font-bold">Kurslar</h1>
        <Link
          to={"/add-course"}
          className="bg-green-600 py-3 px-5 rounded-md text-white font-semibold"
        >
          Yangi Kurs Qo'shish
        </Link>
      </div>
      <table className="w-full bg-white shadow-lg">
        <thead>
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Image</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {!isError ? (
            isPending ? (
              <tr className="text-center">
                <td>Loading...</td>
              </tr>
            ) : data.length > 0 ? (
              data.map((elem) => (
                <tr key={elem._id} className="text-center">
                  <td>{elem.title}</td>
                  <td>
                    {elem.image ? (
                      <img src={elem.image} className="mx-auto" alt="" />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{elem.price}</td>
                  <td>
                    <Link
                      to={`/course/${elem._id}`}
                      className="bg-green-900 text-white rounded-md p-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-course/${elem._id}`}
                      className="bg-cyan-900 text-white rounded-md p-2 mx-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(elem._id)}
                      className="bg-red-800 text-white rounded-md p-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td>No Data...</td>
              </tr>
            )
          ) : (
            <tr className="text-center">
              <td>Not Found. Some thing went wrong</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
