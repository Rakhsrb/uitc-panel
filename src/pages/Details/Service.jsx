import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Service = () => {
  const { id } = useParams();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const [oneService, setOneService] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getServiceById() {
      try {
        setIsPending(true);
        const response = await axios.get(
          baseUrlApi + `api/services/${id}`,
          config
        );
        setOneService(response.data.data);
        setIsPending(false);
      } catch (error) {
        setIsError(true);
        setIsPending(false);
        console.log(error);
      }
    }
    getServiceById();
  }, [id]);

  return (
    <section className="h-screen overflow-y-auto">
      <div className="flex flex-col gap-0">
        {isPending ? (
          "Loading"
        ) : (
          <>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Title:</span> {oneService.title}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Description:</span> {oneService.description}
            </h1>
          </>
        )}
      </div>
    </section>
  );
};

export default Service;
