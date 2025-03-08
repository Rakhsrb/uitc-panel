"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export const Project = () => {
  const { id } = useParams();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const [onePortfolio, setOnePortfolio] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </Link>

        {isPending ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
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
            <p className="text-blue-600">Loading project details...</p>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-red-500 mb-4"
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
            <h3 className="text-red-800 text-xl font-medium mb-2">
              Error Loading Project
            </h3>
            <p className="text-red-600 mb-4">
              We couldn't load the project details. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                {onePortfolio.images && onePortfolio.images.length > 0 ? (
                  <div>
                    {/* Main image */}
                    <div className="h-[300px] md:h-[400px] bg-slate-100 relative overflow-hidden">
                      <img
                        src={
                          onePortfolio.images[activeImage] || "/placeholder.svg"
                        }
                        alt={onePortfolio.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Thumbnails */}
                    {onePortfolio.images.length > 1 && (
                      <div className="flex overflow-x-auto p-2 bg-slate-50 gap-2">
                        {onePortfolio.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                              activeImage === index
                                ? "ring-2 ring-blue-500 ring-offset-2"
                                : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-[300px] md:h-[400px] bg-slate-100 flex items-center justify-center">
                    <p className="text-slate-400">No images available</p>
                  </div>
                )}
              </div>

              {/* Project details */}
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    {onePortfolio.title}
                  </h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {onePortfolio.category}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm uppercase tracking-wider text-slate-500 font-medium mb-2">
                      Description
                    </h2>
                    <p className="text-slate-700 leading-relaxed">
                      {onePortfolio.description}
                    </p>
                  </div>

                  {onePortfolio.url && (
                    <div>
                      <h2 className="text-sm uppercase tracking-wider text-slate-500 font-medium mb-2">
                        Project URL
                      </h2>
                      <a
                        href={`https://${onePortfolio.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {onePortfolio.url}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
