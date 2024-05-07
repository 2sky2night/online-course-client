import { message } from "antd";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { useUserStore } from "@/store";
import { ResponseError } from "@/types";
import { Token } from "@/utils/token";

export default {
  /** 实例初始化配置 */
  instConfig: {
    baseURL: import.meta.env.VITE_SERVER_URL || "/",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60000, // 超时时间60秒
  },
  /** 请求拦截器 */
  request: {
    onFulfilled: (config: InternalAxiosRequestConfig) => {
      const token = Token.getToken();
      if (token !== null) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    onRejected: (error: AxiosError) => {
      message.error({ content: "系统错误，请稍后再试" });
      return Promise.reject(error);
    },
  },
  /** 响应拦截器 */
  response: {
    onFulfilled: (response: AxiosResponse) => {
      return response.data;
    },
    onRejected: (error: AxiosError) => {
      if (!error.response) {
        // 未知错误
        message.error({ content: "系统错误，请稍后再试" });
        return Promise.reject(error);
      }
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
  },
};
