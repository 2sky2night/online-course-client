import { createStyles } from "antd-style";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  /** 多少行省略？--- 默认1行省略 */
  lineClamp?: number;
  style?: React.CSSProperties;
}

const useStyles = (line: number) =>
  createStyles(
    line === 1
      ? {
          text: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            "white-space": "nowrap",
            display: "inline-block",
            "vertical-align": "bottom",
          },
        }
      : {
          text: {
            display: "-webkit-inline-box",
            "-webkit-line-clamp": globalThis.String(line),
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
          },
        },
  );

export function Ellipsis({ children, lineClamp = 1, style = {} }: Props) {
  const { styles } = useStyles(lineClamp)();
  return (
    <span
      className={styles.text}
      style={style}>
      {children}
    </span>
  );
}
