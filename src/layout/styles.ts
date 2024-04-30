import { createStyles } from "antd-style";

export const useLayoutStyles = createStyles(({ token }) => {
  return {
    layout: {
      background: token.colorBgBase,
      height: "100svh",
    },
  };
});
