import { createStyles } from "antd-style";

export const useCommentItemStyles = createStyles(({ token, responsive }) => {
  return {
    container: {
      padding: "8px",
      display: "flex",
    },
    content: {
      padding: "5px",
      flexGrow: "1",
    },
    username: {
      fontSize: token.fontSizeLG,
      [responsive.md]: {
        fontSize: token.fontSize,
      },
    },
    textContent: {
      padding: "8px 5px",
      fontSize: token.fontSizeLG,
      [responsive.md]: {
        fontSize: token.fontSize,
      },
    },
    textSub: {
      color: token.colorTextDescription,
      fontSize: token.fontSizeSM,
    },
    comment: {
      borderBottom: "1px solid",
      borderColor: token.colorBorder,
      paddingBottom: "8px",
    },
  };
});
