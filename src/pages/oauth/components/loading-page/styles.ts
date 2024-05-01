import { createStyles } from "antd-style";

export const useLoadingPageStyles = createStyles(({ token }) => {
  return {
    container: {
      userSelect: "none",
      color: token.colorText,
      paddingTop: "30px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    loadingIcon: {
      fontSize: "20px",
      color: token.colorPrimary,
    },
  };
});
