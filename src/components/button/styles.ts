import { createStyles } from "antd-style";

export const useButtonStyles = createStyles(({ token }) => {
  return {
    button: {
      background: token.colorBgContainerDisabled,
      border: "none",
      color: token.colorText,
      borderRadius: token.borderRadiusSM,
      padding: "5px 10px",
      fontSize: token.fontSize,
      height: token.controlHeight,
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textWrap: "nowrap",
      ":hover": {
        background: token.colorBgTextHover,
      },
    },
  };
});
