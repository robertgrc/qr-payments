/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
/* eslint-disable space-in-parens */
import axios from "axios";

const qrApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Todo: Configurar interceptores
qrApi.interceptors.request.use((config) => {
  config.headers["x-token"] = localStorage.getItem("token");
  return config;
});

export default qrApi;
