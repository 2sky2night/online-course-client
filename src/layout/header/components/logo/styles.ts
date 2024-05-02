import { createStyles } from "antd-style";

export const useLogoStyles = createStyles(({ token }) => {
  return {
    logo: {
      userSelect: "none",
      color: token.colorText,
      fontSize: token.fontSizeLG,
    },
  };
});
