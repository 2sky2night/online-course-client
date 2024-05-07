import axios, { AxiosRequestConfig } from "axios";

import config from "@/requestConfig";

const instance = axios.create(config.instConfig);

// 请求拦截器
instance.interceptors.request.use(
  config.request.onFulfilled,
  config.request.onRejected,
);

// 响应拦截器
instance.interceptors.response.use(
  config.response.onFulfilled,
  config.response.onRejected,
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
