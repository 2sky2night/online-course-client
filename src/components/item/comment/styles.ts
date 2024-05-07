import { createStyles } from "antd-style";

export const useCommentItemStyles = createStyles(({ token, responsive }) => {
  return {
    container: {
      padding: "8px",
      display: "flex",
    },
    content: {
      padding: "5px",
      marginLeft: "5px",
      flexGrow: "1",
      borderBottom: "0.5px solid",
      borderColor: token.colorBorder,
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
    queryReply: {
      cursor: "pointer",
      ":hover": {
        color: token.colorPrimary,
      },
    },
    toReply: {
      cursor: "pointer",
      ":hover": {
        color: token.colorPrimary,
      },
    },
    comment: {
      paddingBottom: "10px",
    },
  };
});
