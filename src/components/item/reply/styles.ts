import { createStyles } from "antd-style";

export const useReplyItemStyle = createStyles(({ token }) => {
  return {
    textSub: {
      color: token.colorTextDescription,
      fontSize: token.fontSizeSM,
    },
  };
});
