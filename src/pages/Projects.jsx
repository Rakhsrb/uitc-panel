import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteProject,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from "../toolkit/Slicer";

export const Projects = () => {
  const dispatch = useDispatch();
  const { portfolio, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { data, isError, isPending } = portfolio;

  console.log(data);
  

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getProjectsPending());
        const response = (await axios.get(url + "api/projects/")).data.data;
        dispatch(getProjectsSuccess(response));
      } catch (error) {
        dispatch(getProjectsError());
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
        await axios.delete(baseUrlApi + "api/projects/delete/" + id, config);
        dispatch(deleteProject(id));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Error!",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="h-screen p-5 bg-blue-50 overflow-y-auto">
      <div className=" py-5 flex justify-between items-center">
        <h1 className="text-5xl text-blue-800 opacity-70 font-bold">Portfolio</h1>
        <Link
          to={"/add-portfolio"}
          className="bg-green-600 py-3 px-5 rounded-md text-white font-semibold"
        >
          Portfolio Qo'shish
        </Link>
      </div>
      <table className="w-full bg-white mb-32 shadow-lg">
        <thead>
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Image</th>
            <th className="p-4">Category</th>
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
                    {elem.images.length > 0 ? (
                      <img src={elem.images[0]} className="mx-auto" alt="" />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{elem.category}</td>
                  <td>
                    <Link
                      to={`/project/${elem._id}`}
                      className="bg-green-900 text-white rounded-md p-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-portfolio/${elem._id}`}
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
