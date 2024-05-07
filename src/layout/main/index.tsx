import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { LoginModal } from "@/components";
import { Page } from "@/enums";
import { MittEvent } from "@/enums";
import { useAuthRoute } from "@/hooks";
import { AuthMeta, NoAuthMeta } from "@/router/types";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";

import { useMainStyles } from "./styles";

export default function Main() {
  const { styles } = useMainStyles();
  const navigate = useNavigate();
  // 是否展示登录的模态框
  const [show, setShow] = useState(false);
  /** 主视图dom */
  const mainDOMRef = useRef<HTMLDivElement | null>(null);
  /** 是否登录了 */
  const getIsLogin = useUserStore(s => s.isLogin);
  /** 打开登录弹窗 */
  const handleOpenLoginModal = () => {
    setShow(true);
  };
  /** mian组件滚动的回调 */
  const handleScroll: React.UIEventHandler<HTMLDivElement> = e => {
    const { clientHeight, scrollTop, scrollHeight } =
      e.target as HTMLDivElement;
    if (clientHeight + scrollTop >= scrollHeight)
      emitter.emit(MittEvent.MAIN_IS_BOTTOM_DOWN);
  };
  // 路由后置守卫
  // TODO 能不能抽离到router中
  useAuthRoute(route => {
    // 1.修改网页标题
    globalThis.document.title = [
      route?.meta?.title,
      import.meta.env.VITE_APP_NAME,
    ]
      .filter(item => item)
      .join(" - ");
    // 2.路由鉴权
    if (!route || !route?.meta) return;
    const isLogin = getIsLogin();
    if (isLogin && (route.meta as NoAuthMeta).noLogin) {
      // 登录了，访问了未登录了才能访问的页面
      // 返回首页
      navigate(Page.INDEX, { replace: true });
    } else if (!isLogin && (route.meta as AuthMeta).needAuth) {
      // 返回首页
      navigate(Page.INDEX, { replace: true });
      // 打开弹窗
      handleOpenLoginModal();
    }
    // 3.让mian组件滚动到顶部
    mainDOMRef.current?.scroll({ top: 0 });
  });
  // 订阅打开登录弹窗的事件
  useEffect(() => {
    emitter.on(MittEvent.OPEN_LOGIN_MODAL, handleOpenLoginModal);
    return () => {
      // 移除订阅
      emitter.off(MittEvent.OPEN_LOGIN_MODAL, handleOpenLoginModal);
    };
  }, []);

  return (
    <>
      <div
        className={styles.mainContainer}
        ref={mainDOMRef}
        onScroll={handleScroll}>
        <div className="max-w-7xl m-auto py-3 px-2">
          <Outlet />
        </div>
      </div>
      <LoginModal
        show={show}
        onClose={() => setShow(false)}
      />
    </>
  );
}
