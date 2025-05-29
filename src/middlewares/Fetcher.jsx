import { API_URL } from "../lib/config";

const token = localStorage.getItem("uitctoken") || "";

export const fetcher = (url) =>
  fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: `${token}`,
    },
  }).then((res) => res.json());
