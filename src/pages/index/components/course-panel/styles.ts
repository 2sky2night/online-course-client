import { createStyles } from "antd-style";

export const useCoursePanelStyles = createStyles(({ token }) => {
  return {
    seeAll: {
      color: token.colorTextDescription,
      cursor: "pointer",
      transition: token.motionDurationFast,
      ":hover": {
        color: token.colorPrimary,
      },
    },
  };
});
