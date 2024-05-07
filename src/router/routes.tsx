import Layout from "@/layout";
import CollectionInfo from "@/pages/collection-info";
import NotFoundPage from "@/pages/error/404";
import Index from "@/pages/index";
import MyPage from "@/pages/my";
import EditUser from "@/pages/my/pages/edit";
import AlipayPage from "@/pages/oauth/pages/alipay";
import GiteePage from "@/pages/oauth/pages/gitee";
import GithubPage from "@/pages/oauth/pages/github";
import { PartitionInfo } from "@/pages/partition-info";
import Partitions from "@/pages/partitions";
import VideoInfo from "@/pages/video-info";

import type { RouteItem } from "./types";

export const routes: RouteItem[] = [
  {
    path: "",
    element: <Index />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/my",
    children: [
      {
        index: true,
        element: <MyPage />,
        meta: {
          title: "个人中心",
          needAuth: true,
        },
      },
      {
        path: "edit",
        element: <EditUser />,
        meta: {
          title: "编辑信息",
          needAuth: true,
        },
      },
    ],
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
    path: "/partition/:pid",
    element: <PartitionInfo />,
    meta: {
      title: "课程详情",
    },
  },
  {
    path: "/collection/:cid",
    element: <CollectionInfo />,
    meta: {
      title: "章节详情",
    },
  },
  {
    path: "/partitions",
    element: <Partitions />,
    meta: {
      title: "全部课程",
    },
  },
  {
    path: "/video/:vid",
    element: <VideoInfo />,
    meta: {
      title: "视频详情",
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
