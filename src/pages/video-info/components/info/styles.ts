import { createStyles } from "antd-style";

export const useVideoInfoStyles = createStyles(({ token, responsive }) => {
  return {
    title: {
      fontSize: token.fontSizeHeading3,
      maxWidth: "80% !important",
      marginTop: token.marginMD,
      marginBottom: token.marginSM,
      [responsive.md]: {
        fontSize: "17px",
        marginTop: "5px",
        marginBottom: "5px",
      },
    },
    subTitle: {
      color: token.colorTextDescription,
      fontSize: token.fontSize,
    },
  };
});
