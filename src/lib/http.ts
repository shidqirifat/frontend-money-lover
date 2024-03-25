import axios, { AxiosRequestConfig } from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthConfig = (config?: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  return token
    ? {
        ...config,
        headers: { Authorization: `Bearer ${token}`, ...config?.headers },
      }
    : config;
};

export type HttpResponse<T> = {
  data: T
}

export type ErrorResponse<T> = {
  error: T;
};
