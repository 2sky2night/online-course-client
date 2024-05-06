import { createStyles } from "antd-style";

export const useLoginFormStyles = createStyles(({ token, isDarkMode }) => {
  return {
    title: {
      color: token.colorText,
      fontSize: token.fontSizeHeading4,
      marginBottom: "10px",
    },
    inputEmail: {
      height: "45px",
      fontSize: token.fontSize,
      outline: "none",
      borderBottom: isDarkMode ? undefined : "1px solid",
      borderColor: isDarkMode ? undefined : token.colorBorder,
      background: isDarkMode ? token.colorBgTextActive : undefined,
      display: "block",
      width: "100%",
      color: token.colorText,
      paddingLeft: "5px",
      paddingRight: "5px",
      boxSizing: "border-box",
    },
    inputCodeBox: {
      display: "flex",
      height: "45px",
      borderBottom: isDarkMode ? undefined : "1px solid",
      borderColor: isDarkMode ? undefined : token.colorBorder,
      paddingBottom: "3px",
      paddingRight: "5px",
      alignItems: "center",
      background: isDarkMode ? token.colorBgTextActive : undefined,
      boxSizing: "border-box",
    },
    inputCode: {
      height: "40px",
      fontSize: token.fontSize,
      outline: "none",
      flex: "1",
      paddingLeft: "5px",
      paddingRight: "5px",
      color: token.colorText,
      background: "transparent",
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
