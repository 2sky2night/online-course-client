import Layout from "@/layout";
import Index from "@/pages/index";
import type { RouteItem } from "./types";
import NotFoundPage from "@/pages/error/404";
import { Page } from "@/constant";

export const routes: RouteItem[] = [
  {
    path: Page.Index,
    element: <Index />,
    meta: {
      title: "首页",
      needAuth: true,
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
