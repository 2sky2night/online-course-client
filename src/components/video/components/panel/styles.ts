import { createStyles } from "antd-style";

export const useStyle = createStyles(({ token, cx, css }) => {
  const volumeControllerContent = cx(css`
    position: absolute;
    width: 30px;
    height: 130px;
    transform: translateY(-100%) translateX(-30%);
    display: none;
  `);
  const qualityControllerContext = cx(css`
    position: absolute;
    padding-bottom: 30px;
    transform: translateY(-100%) translateX(-30%);
    display: none;
  `);
  return {
    panelRoot: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: "99",
      userSelect: "none",
    },
    bottomBar: {
      padding: "10px",
      color: "white",
      background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
    },
    barContent: {
      padding: "0 8px",
    },
    timeText: {
      fontSize: token.fontSizeSM,
    },
    icon: {
      transform: "scale(1.4)",
      cursor: "pointer",
    },
    volumeBtn: css`
      position: relative;
      &:hover {
        .${volumeControllerContent} {
          display: block;
        }
      }
    `,
    qualityBtn: css`
      position: relative;
      &:hover {
        .${qualityControllerContext} {
          display: block;
        }
      }
    `,
    qualityControllerContext,
    volumeControllerContent,
    qualityController: {
      background: "#000",
      padding: "10px 8px",
    },
    volumeController: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0",
      background: "#000",
      height: "105px",
    },
    volumeText: {
      fontSize: token.fontSizeSM,
      position: "relative",
      top: "-7px",
    },
    pauseIcon: {
      cursor: "pointer",
      fontSize: "18px",
      position: "relative",
      top: "3px",
      right: "-2px",
    },
  };
});
