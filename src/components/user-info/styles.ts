import { createStyles } from "antd-style";

export const useUserInfoStyles = createStyles(({ token, responsive }) => {
  return {
    userAvatar: {
      width: "35vw",
      maxWidth: "300px",
      borderRadius: token.borderRadius,
    },
    dataItem: {
      display: "flex",
      flexDirection: "column",
      "&>span:first-child": {
        fontSize: "20px",
        color: token.colorPrimary,
        [responsive.md]: {
          fontSize: "15px",
        },
      },
      "&>span:last-child": {
        fontSize: "18px",
        [responsive.md]: {
          fontSize: "13px",
        },
      },
    },
  };
});
