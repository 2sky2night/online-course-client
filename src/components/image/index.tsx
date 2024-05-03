import { IS_ABSOLUTE_PATH, STATIC_SERVER_URL } from "@/constants";

/**
 * 图片组件
 * 1.拼接路径
 * 2.错误兜底 // TODO
 * 3.懒加载 // TODO
 * @param param0
 * @returns
 */
export function Image({
  src,
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  let _src = src || "";
  if (IS_ABSOLUTE_PATH.test(_src)) {
    _src = STATIC_SERVER_URL + _src;
  }
  return (
    <img
      {...props}
      src={_src}></img>
  );
}
