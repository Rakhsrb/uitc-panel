import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteWorker,
  getTeamError,
  getTeamPending,
  getTeamSuccess,
} from "../toolkit/Slicer";

export const Team = () => {
  const dispatch = useDispatch();
  const { team, baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = team;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getTeamPending());
        const response = (await axios.get(url + "api/team/")).data.data;
        dispatch(getTeamSuccess(response));
      } catch (error) {
        dispatch(getTeamError());
        console.log(error);
      }
    }
    getData(baseUrlApi);
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        dispatch(deleteWorker(id));
        await axios.delete(baseUrlApi + "api/team/delete/" + id, config);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete project.",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="h-screen overflow-auto p-5 bg-blue-50">
      <div className=" py-5 flex justify-between items-center">
        <h1 className="text-5xl text-blue-800 opacity-70 font-bold">
          Xodimlar
        </h1>
        <Link
          to={"/add-worker"}
          className="bg-green-600 py-3 px-5 rounded-md text-white font-semibold"
        >
          Yangi xodimlar qo'shish
        </Link>
      </div>
      <div className="pb-20">
        <table className="w-full bg-white shadow-lg">
          <thead className="">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Image</th>
              <th className="p-4">Job</th>
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
                    <td>{elem.name}</td>
                    <td className="flex justify-center">
                      <img src={elem.image} alt="" />
                    </td>
                    <td>{elem.job}</td>
                    <td>
                      <Link
                        to={`/worker/${elem._id}`}
                        className="bg-green-900 text-white rounded-md p-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-worker/${elem._id}`}
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
      </div>
    </section>
  );
};
