import { createStyles } from "antd-style";

export const useVideoStyles = createStyles(({ token }) => {
  return {
    playerBottom: {
      padding: "10px 5px",
      background: token.colorBgElevated,
      boxShadow: token.boxShadowTertiary,
    },
  };
});
