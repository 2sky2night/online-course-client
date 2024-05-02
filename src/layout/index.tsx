import { ThemeProvider } from "antd-style";
import { createContext, useEffect, useState } from "react";

import { useSettingStore } from "@/store";

import Header from "./header";
import Main from "./main";
import { useLayoutStyles } from "./styles";

/** AppContent */
export const AppContext = createContext({
  /** 视口宽度 */
  innerWidth: 0,
});

export default function Layout() {
  const isDark = useSettingStore(state => state.isDark);
  const { styles } = useLayoutStyles();
  /** 视口宽度 */
  const [width, setWidth] = useState(0);
  /** 监听窗口尺寸发生变化了 */
  const handleResize = () => {
    setWidth(globalThis.innerWidth);
  };

  useEffect(() => {
    // 立即获取视口宽度
    handleResize();
    // 绑定事件
    globalThis.addEventListener("resize", handleResize);
    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppContext.Provider value={{ innerWidth: width }}>
      <ThemeProvider themeMode={isDark ? "dark" : "light"}>
        <div className={styles.layout}>
          <Header></Header>
          <Main></Main>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
