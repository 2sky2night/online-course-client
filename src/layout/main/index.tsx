import { Button } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { LoginModal } from "@/components";
import { Page } from "@/enums";
import { MittEvent } from "@/enums";
import { useAuthRoute } from "@/hooks";
import { AuthMeta, NoAuthMeta } from "@/router/types";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";

export default function Main() {
  const navigate = useNavigate();
  // 是否展示登录的模态框
  const [show, setShow] = useState(false);
  /** 是否登录了 */
  const getIsLogin = useUserStore(s => s.isLogin);
  /** 打开登录弹窗 */
  const handleOpenLoginModal = () => {
    setShow(true);
  };
  // 路由后置守卫
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
      navigate(Page.Index, { replace: true });
    } else if (!isLogin && (route.meta as AuthMeta).needAuth) {
      // 返回首页
      navigate(Page.Index, { replace: true });
      // 打开弹窗
      handleOpenLoginModal();
    }
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
      <div>
        <div className="max-w-7xl m-auto">
          <Button onClick={handleOpenLoginModal}>打开登录弹窗</Button>
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
