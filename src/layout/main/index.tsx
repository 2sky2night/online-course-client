// import { Page } from "@/constant";
import { useAuthRoute } from "@/hooks";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Main() {
  // const navigate = useNavigate();
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
  return (
    <div>
      <div className="max-w-7xl m-auto">
        <Outlet />
      </div>
    </div>
  );
}
