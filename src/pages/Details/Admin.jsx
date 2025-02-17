import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Admin = () => {
  const { id } = useParams();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const [oneAdmin, setOneAdmin] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getAdminById() {
      try {
        setIsPending(true);
        const response = await axios.get(
          baseUrlApi + `api/admin/${id}`,
          config
        );
        setOneAdmin(response.data.data);
        setIsPending(false);
      } catch (error) {
        setIsError(true);
        setIsPending(false);
        console.log(error);
      }
    }
    getAdminById();
  }, [id]);

  return (
    <section className="h-full">
      <div className="flex flex-col gap-0">
        {isPending ? (
          "Loading"
        ) : (
          <>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Admin name:</span> {oneAdmin.name}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Admin Email:</span> {oneAdmin.email}
            </h1>
          </>
        )}
      </div>
    </section>
  );
};

export default Admin;
