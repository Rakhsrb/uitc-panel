export const BASE_URL = "https:server.uitc.uz/api";
const token = localStorage.getItem("uitctoken") || "";

export const fetcher = (url) =>
  fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `${token}`,
    },
  }).then((res) => res.json());
