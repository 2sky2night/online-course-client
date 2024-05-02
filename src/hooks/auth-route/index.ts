import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

import { routes } from "@/router/routes";
import { RouteItem } from "@/router/types";

type RouteChange = (activeRoute: RouteItem | null) => void;

/** 根据当前激活的路由返回路由表中匹配成功的路由对象
 * @param routeChange 路由更新的回调
 */
export const useAuthRoute = (routeChange?: RouteChange) => {
  const location = useLocation();
  const [route, setRoute] = useState<RouteItem | null>(null);
  useEffect(() => {
    const activeRoute = matchRoute(location.pathname, routes);
    setRoute(activeRoute);
    routeChange && routeChange(activeRoute);
  }, [location.pathname, location.search]);
  return {
    /** 当前激活且匹配成功的路由对象 */
    route,
  };
};

/**
 * 根据当前激活的路由去匹配路由表中的某一项路由
 * @param currentPath 当前激活的路径
 * @param routes 路由表
 * @param parentPath 父级路由路径
 * @returns
 */
function matchRoute(
  currentPath: string,
  routes: RouteItem[],
  parentPath: string = "",
): RouteItem | null {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    const children = item.children || [];
    const itemPath = item.path || "";
    // 当前完整的路径
    const allPath = parentPath + fixPath(itemPath);
    if (children.length) {
      // 优先判断子级，因为会出现默认路径
      const result = matchRoute(currentPath, children, allPath);
      if (result) return result;
    }
    // 再判断当前路由
    const result = matchPath(allPath, currentPath);
    if (result) return item;
  }
  return null;
}

/**
 * 补全路径的前缀/
 * @param path
 * @returns
 */
function fixPath(path: string) {
  if (path.charAt(0) !== "/") {
    return "/" + path;
  }
  return path;
}
