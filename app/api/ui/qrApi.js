/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
/* eslint-disable space-in-parens */

import axios from "axios";

const qrApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Todo: Configurar interceptores
qrApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default qrApi;
