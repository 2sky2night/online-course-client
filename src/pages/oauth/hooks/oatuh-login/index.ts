import { MittEvent, Page } from "@/enums";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PagesRecall } from "../../utils/pages-recall";

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
  /** 恢复上一次浏览的页面 */
  const handleRecallPage = () => {
    const path = PagesRecall.getKey() || Page.Index;
    navigate(path, { replace: true });
    // 清除记录
    PagesRecall.removeKey();
  };
  /** 登录失败的回调 */
  const handleLoginFail = () => {
    // 1.返回到上一次浏览的页面
    handleRecallPage();
    // 2.弹出登录模态框
    emitter.emit(MittEvent.OPEN_LOGIN_MODAL);
  };
  /** 完整逻辑 */
  const oauthLogin = async () => {
    const code = search.get(codeKey);
    if (!code) {
      // 没有解析出授权码
      return handleLoginFail();
    }
    try {
      // 第三方登录
      const token = await handleLogin(code);
      // 获取用户信息
      await login(token);
      // 登录成功
      handleRecallPage();
    } catch (error) {
      // 登录失败
      handleLoginFail();
    }
  };
  useEffect(() => {
    oauthLogin();
  }, []);
};
