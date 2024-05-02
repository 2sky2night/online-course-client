import { useContext, useMemo } from "react";

import { IS_MOBILE } from "@/constants";
import { AppContext } from "@/layout";

/** hooks的方式获取当前是否为移动端(不考虑防抖) */
export function useIsMobile() {
  const context = useContext(AppContext);
  /** 是否为移动端 */
  const isMobile = useMemo(() => {
    return context.innerWidth <= IS_MOBILE;
  }, [context.innerWidth]);

  return {
    /** 是否为移动端 */
    isMobile,
    /** 窗口宽度 */
    innerWidth: context.innerWidth,
  };
}
