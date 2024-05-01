import { Page } from "@/enums";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * 第三方登录的钩子(在严格模式下会导致登录两次问题)
 * @param codeKey 要解析的授权码code
 * @param handleLogin 登录回调
 */
export const useOAuthLogin = (
  codeKey: string,
  handleLogin: (code: string) => Promise<string>,
) => {
  /** 导航 */
  const navigate = useNavigate();
  /** 获取查询参数 */
  const [search] = useSearchParams();
  /** 登录接口 */
  const login = useUserStore(s => s.login);
  /** 完整逻辑 */
  const oauthLogin = async () => {
    const code = search.get(codeKey);
    if (!code) {
      // TODO 没有解析出授权码，返回首页,弹出登录框(后续会修改)
      return navigate(Page.Index, { replace: true });
    }
    try {
      // 第三方登录
      const token = await handleLogin(code);
      // 获取用户信息
      await login(token);
      // TODO 登录成功，返回首页(后续会修改)
      navigate(Page.Index, { replace: true });
    } catch (error) {
      // TODO 登录失败，返回首页,弹出登录框(后续会修改)
      navigate(Page.Index, { replace: true });
    }
  };
  useEffect(() => {
    oauthLogin();
  }, []);
};
