/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import axios from "axios";

const qrApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Todo: Configurar interceptores
/* eslint-disable no-param-reassign */

// qrApi.interceptors.request.use((config) => {
//   config.headers["x-token"] = localStorage.getItem("token");
//   return config;
// });

export default qrApi;
