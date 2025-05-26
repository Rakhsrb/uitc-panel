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
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import ErrorTitle from "../components/ErrorTitle";
import NoDataTitle from "../components/NoDataTitle";

export const Admins = () => {
  const { admins } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const { data, isError, isPending } = admins;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getAdminsPending());
        const response = (await Axios.get("admin/")).data;
        dispatch(getAdminsSuccess(response));
      } catch (err) {
        dispatch(getAdminsError());
        console.log(err);
      }
    }
    getData();
  }, []);

  const deleteAdmin = async (id, name) => {
    if (window.confirm(`Haqiqatan ham o'chirib tashlamoqchimisiz: ${name}?`)) {
      try {
        await Axios.delete("admin/delete/" + id);
        const newData = data.filter((item) => item._id !== id);
        dispatch(getAdminsSuccess(newData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="p-6 overflow-y-auto bg-blue-50">
      <div className="flex justify-between items-center mb-8">
        <PageTitle>Adminlar</PageTitle>
        <Link to={"/admins/new"}>
          <Button>Yangi Admin Qo'shish</Button>
        </Link>
      </div>

      {isPending ? (
        <LoadingAnimation>Adminstratorlar yuklanmoqda</LoadingAnimation>
      ) : isError ? (
        <ErrorTitle>{isError}</ErrorTitle>
      ) : data.length === 0 ? (
        <NoDataTitle>Adminstratorlar yo'q</NoDataTitle>
      ) : (
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="py-4 px-6 text-left font-semibold">Ism</th>
              <th className="py-4 px-6 text-left font-semibold">Email</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
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
                <td className="py-4 px-6 text-slate-600">{admin.email}</td>
                <td className="py-3 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/admins/edit/${admin._id}`}
                      className="px-2 py-2 text-blue-700 rounded-full hover:bg-blue-100 transition-colors inline-flex items-center"
                    >
                      <Pencil size={20} weight="bold" />
                    </Link>
                    <button
                      onClick={() => deleteAdmin(admin._id, admin.name)}
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
