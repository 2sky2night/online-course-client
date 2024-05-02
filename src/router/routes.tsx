import Layout from "@/layout";
import Index from "@/pages/index";
import AlipayPage from "@/pages/oauth/pages/alipay";
import GiteePage from "@/pages/oauth/pages/gitee";
import GithubPage from "@/pages/oauth/pages/github";
import type { RouteItem } from "./types";
import NotFoundPage from "@/pages/error/404";
import UserPage from "@/pages/user";

export const routes: RouteItem[] = [
  {
    path: "",
    element: <Index />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/user",
    element: <UserPage />,
    meta: {
      title: "我的",
      needAuth: true,
    },
  },
  {
    path: "/oauth",
    children: [
      {
        path: "alipay",
        element: <AlipayPage />,
        meta: {
          title: "支付宝登录",
          noLogin: true,
        },
      },
      {
        path: "gitee",
        element: <GiteePage />,
        meta: {
          title: "Gitee登录",
          noLogin: true,
        },
      },
      {
        path: "github",
        element: <GithubPage />,
        meta: {
          title: "Github登录",
          noLogin: true,
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const rootRoutes: RouteItem[] = [
  {
    path: "/",
    element: <Layout />,
    children: routes,
  },
];
