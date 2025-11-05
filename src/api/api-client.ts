import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8000/";

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);

export default api;
