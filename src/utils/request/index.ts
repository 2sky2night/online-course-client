import axios, { AxiosRequestConfig } from "axios";
import { Token } from "../token";
import { ResponseError } from "./types";
import { useUserStore } from "@/store";
import { message } from "antd";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 超时时间60秒
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = Token.getToken();
    if (token !== null) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    message.error({ content: "系统错误，请稍后再试" });
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const status = error.response.status;
    const res = error.response.data as ResponseError;
    const { logout } = useUserStore.getState();
    if (status === 401) {
      // 退出账户
      logout();
    }
    message.error({ content: res?.msg || "系统错误，请稍后再试" });
    return Promise.reject(error);
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async <T = any>(
  url: string,
  options: AxiosRequestConfig & { requestType?: "json" | "form" } = {},
) => {
  // 兼容from data文件上传的情况
  const { requestType, ...rest } = options;
  if (requestType === "form") {
    return await instance.request<T, T>({
      url,
      ...rest,
      headers: {
        ...(rest.headers || {}),
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return await instance.request<T, T>({
      url,
      ...rest,
    });
  }
};

export default request;
