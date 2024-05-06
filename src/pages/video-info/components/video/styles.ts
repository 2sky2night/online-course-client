import { createStyles } from "antd-style";

export const useVideoStyles = createStyles(({ token, responsive }) => {
  return {
    playerBottom: {
      padding: "10px 5px",
      background: token.colorBgElevated,
      boxShadow: token.boxShadowTertiary,
      [responsive.md]: {
        padding: "5px 3px",
        fontSize: "12px",
      },
    },
  };
});
