import { createStyles } from "antd-style";

export const usePartitionItemStyles = createStyles(
  ({ token, isDarkMode, responsive }) => {
    return {
      container: {
        cursor: "pointer",
        background: token.colorBgContainer,
        display: "flex",
        flexDirection: "column",
        transition: token.motionDurationFast,
        borderRadius: "3px",
        overflow: "hidden",
        ":hover": {
          background: token.colorBgTextHover,
        },
        [responsive.md]: {
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "8px",
        },
      },
      imgCover: {
        overflow: "hidden",
        color: token.colorWhite,
        background: isDarkMode
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(0, 0, 0, 0.25)",
        height: "170px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: `3px 3px 0 0`,
        fontSize: token.fontSizeLG,
        [responsive.md]: {
          height: "100px",
          width: "100px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          textWrap: "nowrap",
        },
      },
      textSub: {
        color: token.colorTextDescription,
        fontSize: token.fontSizeSM,
        marginLeft: "2px",
      },
      dataContainer: {
        padding: "8px",
        [responsive.md]: {
          flexGrow: "1",
        },
      },
    };
  },
);
