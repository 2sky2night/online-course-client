import { UserInfo } from "@/types";

export interface UserState {
  /** 用户数据 */
  userInfo: UserInfo | null;
  /** 登录 */
  login: (token: string) => Promise<void>;
  /** 登出 */
  logout: () => void;
  /** 是否登录了 */
  isLogin: () => boolean;
  /** 更新用户信息 */
  updateUser: (data: {
    username: string;
    age: number | null;
    gender: boolean | null;
    avatar: string | null;
  }) => void;
}
