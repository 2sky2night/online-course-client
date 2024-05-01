import { createStyles } from "antd-style";

export const useLoginFormStyles = createStyles(({ token }) => {
  return {
    title: {
      color: token.colorText,
      fontSize: token.fontSizeHeading4,
      marginBottom: "10px",
    },
    inputEmail: {
      height: "40px",
      fontSize: token.fontSize,
      outline: "none",
      borderBottom: "1px solid",
      borderColor: token.colorBorder,
      display: "block",
      width: "100%",
    },
    inputCodeBox: {
      display: "flex",
      borderBottom: "1px solid",
      borderColor: token.colorBorder,
      paddingBottom: "3px",
    },
    inputCode: {
      fontSize: token.fontSize,
      outline: "none",
      flex: "1",
    },
    icon: {
      fontSize: "35px",
      cursor: "pointer",
    },
    dividerText: {
      color: token.colorTextDescription,
      fontSize: token.fontSizeSM,
    },
    imgIcon: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      cursor: "pointer",
    },
  };
});
