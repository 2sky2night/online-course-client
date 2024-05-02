import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ZustandKey } from "@/enums";
import { userControllerInfo as getUserInfo } from "@/servers/go_study_server/user";
import { Token } from "@/utils/token";

import type { UserState } from "./types";

/** 用户数据的仓库 */
export const useUserStore = create(
  persist<UserState, [], [], Pick<UserState, "userInfo">>(
    (set, get) => {
      return {
        userInfo: null,
        async login(token) {
          Token.setToken(token);
          try {
            // 获取用户信息
            const res = await getUserInfo();
            set({ userInfo: res.data });
          } catch (error) {
            // 获取用户信息失败，登出账号
            this.logout();
            return Promise.reject();
          }
        },
        logout() {
          Token.removeToken();
          set(() => {
            return {
              userInfo: null,
            };
          });
        },
        isLogin() {
          const userInfo = get().userInfo;
          return Boolean(userInfo && Token.getToken());
        },
      };
    },
    {
      name: ZustandKey.User,
      storage: createJSONStorage(() => globalThis.localStorage),
      partialize: state => ({ userInfo: state.userInfo }),
    },
  ),
);
