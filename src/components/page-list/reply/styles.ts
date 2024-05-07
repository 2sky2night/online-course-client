import { createStyles } from "antd-style";

export const useReplyPageListStyle = createStyles(({ token }) => {
  return {
    textSub: {
      color: token.colorTextDescription,
      fontSize: token.fontSizeSM,
    },
  };
});
