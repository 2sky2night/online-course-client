import type { RouteObject } from "react-router-dom";

export type Meta = AuthMeta | NoAuthMeta;

export interface AuthMeta {
  /** 网页标题 */
  title: string;
  /** 需要登录了才能访问? */
  needAuth?: boolean;
}

export interface NoAuthMeta {
  /** 网页标题 */
  title: string;
  /** 登录了不能访问 */
  noLogin?: boolean;
}

/** 路由项 */
export type RouteItem = Omit<RouteObject, "children"> & {
  meta?: Meta;
  children?: RouteItem[];
};
