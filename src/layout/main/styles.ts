import { createStyles } from "antd-style";

export const useMainStyles = createStyles(({ token }) => {
  return {
    mainContainer: {
      color: token.colorText,
      background: token.colorBgContainer,
      overflowY: "auto",
      flexGrow: "1",
    },
  };
});
