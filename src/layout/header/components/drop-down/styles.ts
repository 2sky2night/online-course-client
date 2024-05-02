import { createStyles } from "antd-style";

export const useDropDownStyles = createStyles(({ token }) => {
  return {
    content: {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
      color: token.colorText,
    },
    userBox: {
      paddingRight: token.paddingXS,
      paddingLeft: token.paddingXS,
      paddingTop: token.padding,
      paddingBottom: token.padding,
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid",
      borderColor: token.colorBorder,
    },
    userName: {
      width: "100px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      textWrap: "nowrap",
      marginLeft: token.marginXS,
    },
  };
});
