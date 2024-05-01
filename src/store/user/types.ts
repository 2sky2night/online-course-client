import { UserInfo } from "@/types";

export interface UserState {
  /** 用户数据 */
  userInfo: UserInfo | null;
  /** 登录 */
  login: (token: string) => Promise<void>;
  /** 登出 */
  logout: () => void;
}
