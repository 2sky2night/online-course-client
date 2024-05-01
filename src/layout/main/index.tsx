// import { Page } from "@/constant";
import { useAuthRoute } from "@/hooks";
import { Outlet } from "react-router-dom";
import { LoginModal } from "@/components";
import { useEffect, useState } from "react";
import { Button } from "antd";
import emitter from "@/utils/mitt";
import { MittEvent } from "@/enums";
// import { useNavigate } from "react-router-dom";

export default function Main() {
  // const navigate = useNavigate();
  // 是否展示登录的模态框
  const [show, setShow] = useState(false);
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
    // TODO 2.判断是否有权限访问页面？无权限怎么办？
    // 无权限弹出登录弹窗，页面返回首页
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
