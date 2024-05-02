import { createStyles } from "antd-style";

export const useHeaderStyles = createStyles(({ token, isDarkMode }) => {
  return {
    headerContainer: {
      color: token.colorText,
      background: token.colorBgContainer,
      zIndex: "1",
      borderBottom: isDarkMode ? "1px solid" : undefined,
      borderBottomColor: isDarkMode ? token.colorBorder : undefined,
    },
  };
});
