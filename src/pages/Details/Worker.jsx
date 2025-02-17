import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Worker = () => {
  const { id } = useParams();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const [oneWorker, setOneWorker] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getWorkerById() {
      try {
        setIsPending(true);
        const response = await axios.get(baseUrlApi + `api/team/${id}`, config);
        setOneWorker(response.data.data);
        setIsPending(false);
      } catch (error) {
        setIsError(true);
        setIsPending(false);
        console.log(error);
      }
    }
    getWorkerById();
  }, [id]);

  return (
    <section className="h-full">
      <div className="flex flex-col gap-0">
        {isPending ? (
          "Loading"
        ) : (
          <>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Name:</span> {oneWorker.name}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Job:</span> {oneWorker.job}
            </h1>
            <div className="grid grid-cols-3">
              <img src={oneWorker?.image} alt="Member photo" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Worker;
