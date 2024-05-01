import Layout from "@/layout";
import Index from "@/pages/index";
import AlipayPage from "@/pages/oauth/pages/alipay";
import GiteePage from "@/pages/oauth/pages/gitee";
import GithubPage from "@/pages/oauth/pages/github";
import type { RouteItem } from "./types";
import NotFoundPage from "@/pages/error/404";
import { Page } from "@/enums";

// TODO 去除Page的引用，因为route的path不允许出现绝对路径
export const routes: RouteItem[] = [
  {
    path: Page.Index,
    element: <Index />,
    meta: {
      title: "首页",
    },
  },
  {
    path: Page.OAuthAlipay,
    element: <AlipayPage />,
    meta: {
      title: "支付宝登录",
    },
  },
  {
    path: Page.OAuthGitee,
    element: <GiteePage />,
    meta: {
      title: "Gitee登录",
    },
  },
  {
    path: Page.OAuthGithub,
    element: <GithubPage />,
    meta: {
      title: "Github登录",
    },
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
