import { createStyles } from "antd-style";

export const useVideoStyles = createStyles(({ responsive, token }) => {
  return {
    videoItem: {
      userSelect: "none",
    },
    videoCoverMask: {
      position: "absolute",
      inset: 0,
      color: token.colorWhite,
      padding: "2px",
      background:
        "linear-gradient(transparent 80%, rgba(0, 0, 0, .1) 85%, rgba(0, 0, 0,.4))",
      zIndex: "2",
      transition: ".2s",
      ":hover": {
        opacity: 0,
      },
    },
    videoCoverBottom: {
      position: "absolute",
      bottom: "0px",
      padding: "5px",
      left: "0px",
      right: "0px",
      display: "flex",
      justifyContent: "flex-end",
    },
    videoCover: {
      position: "relative",
      [responsive.tablet]: {
        height: "30vw",
      },
      cursor: "pointer",
      height: "150px",
      borderRadius: token.borderRadius,
      overflow: "hidden",
    },
    videoCoverImg: {
      width: "100%",
      objectFit: "cover",
      background: "#000",
      height: "100%",
      zIndex: "1",
    },
    videoDesc: {
      color: token.colorTextSecondary,
    },
    videoTitle: {
      display: "block",
      margin: "5px 0",
      height: "42px",
      fontSize: "15px",
      transition: token.motionDurationFast,
      ":hover": {
        color: token.colorPrimary,
      },
    },
  };
});
