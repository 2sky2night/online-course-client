import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 超时时间60秒
});

// 请求拦截器
instance.interceptors.request.use(config => {
  return config;
});

// 响应拦截器
instance.interceptors.response.use(response => {
  return response;
});

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
