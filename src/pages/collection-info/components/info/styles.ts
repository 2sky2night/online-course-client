import { createStyles } from "antd-style";

export const useCollectionInfoStyles = createStyles(({ token }) => {
  return {
    textSub: {
      color: token.colorTextDescription,
      fontSize: token.fontSizeSM,
    },
  };
});
