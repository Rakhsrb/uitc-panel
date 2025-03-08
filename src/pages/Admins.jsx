import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../toolkit/Slicer";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export const Admins = () => {
  const { admins } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const { data, isError, isPending } = admins;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getAdminsPending());
        const response = (await Axios.get("admin/")).data.data;
        dispatch(getAdminsSuccess(response));
      } catch (err) {
        dispatch(getAdminsError());
        console.log(err);
      }
    }
    getData();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      await Axios.delete("admin/delete/" + id);
      const newData = data.filter((item) => item._id !== id);
      dispatch(getAdminsSuccess(newData));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteAdmin(id);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Adminlar
            </h1>
            <p className="text-blue-600/70 mt-1 text-sm md:text-base">
              Manage administrator accounts and permissions
            </p>
          </div>
          <Link
            to={"/add-admin"}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 px-5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
          >
            Yangi Admin Qo'shish
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
              <p className="text-blue-600">Loading administrators...</p>
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
                Failed to Load Administrators
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There was an error loading the administrator list. Please try
                again later.
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">
                No Administrators Found
              </h3>
              <p className="text-slate-600 mb-4 max-w-md">
                There are no administrators in the system yet. Add your first
                administrator to get started.
              </p>
              <Link
                to="/add-admin"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add Administrator
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
                    <th className="py-4 px-6 text-left font-semibold">Name</th>
                    <th className="py-4 px-6 text-left font-semibold">Email</th>
                    <th className="py-4 px-6 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((admin) => (
                    <tr
                      key={admin._id}
                      className="border-t border-blue-50 hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {admin.name}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {admin.email}
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/edit-admin/${admin._id}`}
                            className="px-2 py-2 text-blue-700 rounded-full hover:bg-blue-100 transition-colors inline-flex items-center"
                          >
                            <Pencil size={20} weight="bold" />
                          </Link>
                          <button
                            onClick={() => confirmDelete(admin._id, admin.name)}
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
