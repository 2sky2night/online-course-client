import type { RouteObject } from "react-router-dom";

interface Meta {
  /** 网页标题 */
  title: string;
  /** 需要登录了才能访问? */
  needAuth?: boolean;
}

/** 路由项 */
export type RouteItem = Omit<RouteObject, "children"> & {
  meta?: Meta;
  children?: RouteItem[];
};
