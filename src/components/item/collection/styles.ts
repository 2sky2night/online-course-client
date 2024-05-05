import { createStyles } from "antd-style";

export const useCollecitonItemStyles = createStyles(({ token, responsive }) => {
  return {
    container: {
      userSelect: "none",
      padding: "5px",
    },
    seeAll: {
      color: token.colorTextDescription,
      cursor: "pointer",
      transition: token.motionDurationFast,
      ":hover": {
        color: token.colorPrimary,
      },
    },
    textSub: {
      color: token.colorTextDescription,
    },
    videoList: {
      marginTop: "20px",
      marginLeft: "40px",
      minHeight: "200px",
      overflowX: "auto",
    },
    videoItem: {
      width: "250px",
      marginRight: "10px",
      flexShrink: 0,
      [responsive.md]: {
        width: "200px",
      },
    },
    videoListContent: {
      display: "flex",
      flexWrap: "nowrap",
    },
  };
});
