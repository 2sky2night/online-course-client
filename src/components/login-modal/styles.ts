import { createStyles } from "antd-style";

export const useLoginModalStyles = createStyles(({ token, responsive }) => {
  token;
  return {
    container: {
      position: "relative",
    },
    closeIconBox: {
      position: "absolute",
      right: "-55px",
      top: "-10px",
      fontSize: "20px",
      cursor: "pointer",
      color: token.colorWhite,
      [responsive.md]: {
        right: "10px",
        top: "0px",
        color: token.colorText,
      },
    },
  };
});
