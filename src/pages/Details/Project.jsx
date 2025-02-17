import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Project = () => {
  const { id } = useParams();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const [onePortfolio, setOnePortfolio] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getPortfolioById() {
      try {
        setIsPending(true);
        const response = await axios.get(
          baseUrlApi + `api/projects/${id}`,
          config
        );
        setOnePortfolio(response.data.data);
        setIsPending(false);
      } catch (error) {
        setIsError(true);
        setIsPending(false);
        console.log(error);
      }
    }
    getPortfolioById();
  }, [id]);

  return (
    <section className="h-full">
      <div className="flex flex-col gap-0">
        {isPending ? (
          "Loadong"
        ) : (
          <>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Title:</span> {onePortfolio.title}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Description:</span> {onePortfolio.description}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>Category:</span> {onePortfolio.category}
            </h1>
            <h1 className="p-10 text-2xl text-white odd">
              <span>URL:</span>{" "}
              <a className="underline" href={`https://${onePortfolio.url}`}>
                {onePortfolio.url}
              </a>
            </h1>
            <div className="grid grid-cols-3">
              {onePortfolio.images?.map((item, index) => (
                <div key={index} className="h-[300px]">
                  <img
                    src={item}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
