import { createStyles } from "antd-style";

export const useCommentsStyles = createStyles(({ token }) => {
  return {
    commentTitle: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
    },
    textSub: {
      color: token.colorTextDescription,
      fontSize: token.fontSize,
    },
  };
});
