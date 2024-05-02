import { ThemeProvider } from "antd-style";

import { useSetting } from "@/store";

import Header from "./header";
import Main from "./main";
import { useLayoutStyles } from "./styles";

export default function Layout() {
  const isDark = useSetting(state => state.isDark);
  const { styles } = useLayoutStyles();
  return (
    <ThemeProvider themeMode={isDark ? "dark" : "light"}>
      <div className={styles.layout}>
        <Header></Header>
        <Main></Main>
      </div>
    </ThemeProvider>
  );
}
