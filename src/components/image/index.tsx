import { IS_ABSOLUTE_PATH, STATIC_SERVER_URL } from "@/constants";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  /** 是否需要拼接路径 */
  needJoin?: boolean;
}

/**
 * 图片组件
 * 1.拼接路径
 * 2.错误兜底 // TODO
 * 3.懒加载 // TODO
 * @param param0
 * @returns
 */
export function Image({ src, needJoin = true, ...props }: Props) {
  let _src = src || "";
  if (needJoin && IS_ABSOLUTE_PATH.test(_src)) {
    _src = STATIC_SERVER_URL + _src;
  }
  return (
    <img
      {...props}
      src={_src}></img>
  );
}
